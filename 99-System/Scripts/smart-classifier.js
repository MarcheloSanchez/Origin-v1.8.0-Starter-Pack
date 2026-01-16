// smart-classifier.js — Intelligent note classification and metadata suggestion
// Purpose: Analyze note content and suggest type, folder, tags, and metadata
// Requires: QuickAdd or Templater
// Run: On new notes or during processing sessions
//
// Usage (QuickAdd): Add as UserScript in macro
// Usage (Templater): <%* await tp.user.smart_classifier() %>

/**
 * Smart Classification System
 * Analyzes note content to suggest:
 * - Note type (Atomic, Effort, Source, MOC, Meeting)
 * - Target folder
 * - Relevant tags
 * - Related notes
 * - Maturity level
 */

module.exports = async (args) => {
  const { app, Notice } = window;
  const QuickAdd = window.QuickAddApi;

  try {
    // Get current file
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
      new Notice("❌ No active file to classify");
      return;
    }

    // Read file content
    const content = await app.vault.read(activeFile);
    const cache = app.metadataCache.getFileCache(activeFile);
    const frontmatter = cache?.frontmatter || {};

    // Skip if already classified (unless force reclassify)
    const isClassified = frontmatter.type && frontmatter.type !== 'undefined';
    if (isClassified && !args?.force) {
      const reclassify = await confirmAction(
        `Note is already classified as "${frontmatter.type}". Reclassify?`
      );
      if (!reclassify) {
        new Notice("❌ Classification cancelled");
        return;
      }
    }

    // Analyze content
    const analysis = analyzeContent(content, frontmatter, activeFile.basename);

    // Present suggestions to user
    const classification = await presentSuggestions(analysis, QuickAdd);

    if (!classification) {
      new Notice("❌ Classification cancelled");
      return;
    }

    // Apply classification
    await applyClassification(activeFile, classification, content);

    new Notice(`✅ Note classified as ${classification.type}`);

    return {
      type: classification.type,
      folder: classification.folder,
      tags: classification.tags
    };

  } catch (error) {
    new Notice(`❌ Classification error: ${error.message}`);
    console.error("Smart classifier error:", error);
  }
};

/**
 * Analyze note content to determine characteristics
 */
function analyzeContent(content, frontmatter, filename) {
  const analysis = {
    wordCount: 0,
    hasCodeBlocks: false,
    hasLinks: false,
    hasTasks: false,
    hasQuotes: false,
    hasHeadings: false,
    keywordMatches: {},
    suggestedType: null,
    suggestedFolder: null,
    suggestedTags: [],
    suggestedMaturity: '📤seed',
    confidence: 0
  };

  // Remove frontmatter for content analysis
  const bodyContent = content.replace(/^---[\s\S]*?---\n/, '');

  // Word count
  analysis.wordCount = bodyContent.split(/\s+/).filter(w => w.length > 0).length;

  // Structural features
  analysis.hasCodeBlocks = /```/.test(bodyContent);
  analysis.hasLinks = /\[\[.*?\]\]/.test(bodyContent);
  analysis.hasTasks = /- \[[ x]\]/.test(bodyContent);
  analysis.hasQuotes = /^>\s/m.test(bodyContent);
  analysis.hasHeadings = /^#{1,6}\s/m.test(bodyContent);

  // Keyword-based type detection
  const typeKeywords = {
    effort: ['projekt', 'project', 'úkol', 'task', 'cíl', 'goal', 'milník', 'milestone', 'deadline', 'akce', 'action'],
    source: ['zdroj', 'source', 'kniha', 'book', 'článek', 'article', 'video', 'podcast', 'autor', 'author', 'url:', 'link:'],
    meeting: ['meeting', 'schůzka', 'call', 'hovor', 'účastníci', 'participants', 'agenda', 'action items', 'rozhodnutí', 'decisions'],
    moc: ['moc', 'map of content', 'přehled', 'overview', 'index', 'katalog', 'catalog', 'hub'],
    atomic: ['myšlenka', 'idea', 'koncept', 'concept', 'poznámka', 'note', 'poznatek', 'insight']
  };

  // Score each type based on keyword matches
  const typeScores = {};
  for (const [type, keywords] of Object.entries(typeKeywords)) {
    typeScores[type] = 0;
    for (const keyword of keywords) {
      const regex = new RegExp(keyword, 'gi');
      const matches = bodyContent.match(regex);
      if (matches) {
        typeScores[type] += matches.length;
        if (!analysis.keywordMatches[type]) {
          analysis.keywordMatches[type] = [];
        }
        analysis.keywordMatches[type].push(keyword);
      }
    }
  }

  // Structural scoring
  if (analysis.hasTasks) typeScores.effort = (typeScores.effort || 0) + 3;
  if (analysis.hasQuotes) typeScores.source = (typeScores.source || 0) + 2;
  if (analysis.hasLinks && analysis.hasHeadings) typeScores.moc = (typeScores.moc || 0) + 2;
  if (bodyContent.includes('Účastníci:') || bodyContent.includes('Participants:')) {
    typeScores.meeting = (typeScores.meeting || 0) + 5;
  }

  // Filename-based hints
  if (/^(MTG|Meeting|Schůzka)/i.test(filename)) typeScores.meeting = (typeScores.meeting || 0) + 5;
  if (/^(MOC|Přehled)/i.test(filename)) typeScores.moc = (typeScores.moc || 0) + 5;
  if (/^(Effort|Projekt|Project)/i.test(filename)) typeScores.effort = (typeScores.effort || 0) + 5;
  if (/^(Source|Zdroj|Book|Kniha)/i.test(filename)) typeScores.source = (typeScores.source || 0) + 5;

  // Determine suggested type
  const maxScore = Math.max(...Object.values(typeScores));
  if (maxScore > 0) {
    analysis.suggestedType = Object.keys(typeScores).find(type => typeScores[type] === maxScore);
    analysis.confidence = Math.min(maxScore / 10, 1); // Normalize to 0-1
  } else {
    // Default to atomic if no strong signals
    analysis.suggestedType = 'atomic';
    analysis.confidence = 0.3;
  }

  // Suggest folder based on type
  const folderMap = {
    atomic: '02-Dots/100-Atomics',
    effort: '03-Efforts',
    source: '04-Sources',
    meeting: '04-Sources/Meetings',
    moc: '01-MOCs'
  };
  analysis.suggestedFolder = folderMap[analysis.suggestedType] || '+Inbox';

  // Suggest maturity based on content depth
  if (analysis.wordCount > 500 && analysis.hasLinks && analysis.hasHeadings) {
    analysis.suggestedMaturity = '🌲evergreen';
  } else if (analysis.wordCount > 200 && analysis.hasHeadings) {
    analysis.suggestedMaturity = '🪴sapling';
  } else if (analysis.wordCount > 50) {
    analysis.suggestedMaturity = '🌱seedling';
  }

  // Suggest tags based on content
  const tagKeywords = {
    '📥inbox': ['inbox', 'nová', 'new', 'nezpracováno'],
    '🔄active': ['aktivní', 'active', 'probíhá', 'ongoing'],
    '💡idea': ['nápad', 'idea', 'myšlenka'],
    '🎯priority-high': ['důležité', 'important', 'urgent', 'asap', 'priorita'],
    '💼work': ['práce', 'work', 'job', 'business'],
    '🏠home': ['dům', 'home', 'personal', 'osobní'],
    '🌱develop': ['vývoj', 'development', 'růst', 'growth']
  };

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    for (const keyword of keywords) {
      if (new RegExp(keyword, 'i').test(bodyContent)) {
        analysis.suggestedTags.push(tag);
        break;
      }
    }
  }

  return analysis;
}

/**
 * Present suggestions to user for confirmation/modification
 */
async function presentSuggestions(analysis, QuickAdd) {
  const typeOptions = [
    { label: `💡 Atomic (${analysis.suggestedType === 'atomic' ? '⭐ Suggested' : 'Other'})`, value: 'atomic' },
    { label: `🚀 Effort (${analysis.suggestedType === 'effort' ? '⭐ Suggested' : 'Other'})`, value: 'effort' },
    { label: `📚 Source (${analysis.suggestedType === 'source' ? '⭐ Suggested' : 'Other'})`, value: 'source' },
    { label: `🤝 Meeting (${analysis.suggestedType === 'meeting' ? '⭐ Suggested' : 'Other'})`, value: 'meeting' },
    { label: `🗺️ MOC (${analysis.suggestedType === 'moc' ? '⭐ Suggested' : 'Other'})`, value: 'moc' }
  ];

  let selectedType;
  if (QuickAdd) {
    selectedType = await QuickAdd.suggester(
      typeOptions.map(o => o.label),
      typeOptions.map(o => o.value),
      false,
      `Select note type (Confidence: ${Math.round(analysis.confidence * 100)}%)`
    );
  } else {
    // Fallback for non-QuickAdd environment
    const typeIndex = await promptSelect(
      "Select note type:",
      typeOptions.map(o => o.label)
    );
    selectedType = typeOptions[typeIndex]?.value;
  }

  if (!selectedType) return null;

  // Folder selection based on type
  const folderMap = {
    atomic: '02-Dots/100-Atomics',
    effort: '03-Efforts',
    source: '04-Sources',
    meeting: '04-Sources/Meetings',
    moc: '01-MOCs'
  };

  return {
    type: selectedType,
    folder: folderMap[selectedType],
    tags: analysis.suggestedTags,
    maturity: analysis.suggestedMaturity,
    status: selectedType === 'atomic' ? undefined : '📥inbox'
  };
}

/**
 * Apply classification to note
 */
async function applyClassification(file, classification, content) {
  // Parse frontmatter
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  let frontmatter = {};
  let body = content;

  if (fmMatch) {
    // Parse existing YAML
    const fmText = fmMatch[1];
    frontmatter = parseYAML(fmText);
    body = content.slice(fmMatch[0].length);
  }

  // Update frontmatter
  frontmatter.type = classification.type;
  if (classification.status) frontmatter.status = classification.status;
  if (classification.maturity && classification.type === 'atomic') {
    frontmatter.maturity = classification.maturity;
  }

  // Add suggested tags if not already present
  if (!frontmatter.tags) frontmatter.tags = [];
  for (const tag of classification.tags) {
    if (!frontmatter.tags.includes(tag)) {
      frontmatter.tags.push(tag);
    }
  }

  // Ensure required metadata exists
  if (!frontmatter.created) {
    frontmatter.created = window.moment(file.stat.ctime).format('YYYY-MM-DD');
  }
  if (!frontmatter.modified) {
    frontmatter.modified = window.moment().format('YYYY-MM-DD');
  }

  // Build new content
  const newFrontmatter = serializeYAML(frontmatter);
  const newContent = `---\n${newFrontmatter}\n---${body}`;

  // Write back to file
  await app.vault.modify(file, newContent);

  // Move to target folder if different
  if (!file.path.startsWith(classification.folder)) {
    const newPath = `${classification.folder}/${file.name}`;
    try {
      await app.fileManager.renameFile(file, newPath);
      new Notice(`📁 Moved to ${classification.folder}`);
    } catch (err) {
      console.error("Failed to move file:", err);
    }
  }
}

/**
 * Simple YAML parser (basic implementation)
 */
function parseYAML(text) {
  const result = {};
  const lines = text.split('\n');

  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      // Handle arrays
      if (value.trim().startsWith('[')) {
        result[key] = JSON.parse(value);
      } else if (value.trim() === '') {
        result[key] = '';
      } else {
        result[key] = value.trim();
      }
    }
  }

  return result;
}

/**
 * Simple YAML serializer
 */
function serializeYAML(obj) {
  const lines = [];

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }

  return lines.join('\n');
}

/**
 * Confirm action helper
 */
async function confirmAction(message) {
  return window.confirm(message);
}

/**
 * Select prompt helper (fallback)
 */
async function promptSelect(message, options) {
  const choice = window.prompt(`${message}\n${options.map((o, i) => `${i}: ${o}`).join('\n')}`);
  return parseInt(choice) || 0;
}
