// batch-process-inbox.js — Batch process inbox notes with classification and metadata
// Purpose: Efficiently process multiple inbox notes at once
// Requires: QuickAdd
// Run: Weekly during GTD review or when inbox has 10+ items
//
// Usage (QuickAdd): Add as UserScript in macro

/**
 * Batch Inbox Processing System
 * Workflow:
 * 1. Get all notes from +Inbox folder
 * 2. For each note:
 *    - Run smart classification
 *    - Fill in auto-metadata
 *    - Move to appropriate folder
 *    - Update status
 * 3. Generate processing report
 */

module.exports = async (args) => {
  const { app, Notice } = window;
  const QuickAdd = window.QuickAddApi;

  try {
    // Get all inbox notes
    const inboxFolder = app.vault.getAbstractFileByPath('+Inbox');
    if (!inboxFolder) {
      new Notice("❌ Inbox folder not found");
      return;
    }

    const inboxNotes = app.vault.getMarkdownFiles()
      .filter(f => f.path.startsWith('+Inbox/'))
      .sort((a, b) => b.stat.ctime - a.stat.ctime); // Newest first

    if (inboxNotes.length === 0) {
      new Notice("✅ Inbox is empty!");
      return;
    }

    // Confirm batch processing
    const confirmMessage = `Process ${inboxNotes.length} inbox notes?\n\nThis will:\n- Classify each note\n- Fill in metadata\n- Move to appropriate folders`;

    let proceed;
    if (QuickAdd) {
      proceed = await QuickAdd.yesNoPrompt("Batch Process Inbox", confirmMessage);
    } else {
      proceed = window.confirm(confirmMessage);
    }

    if (!proceed) {
      new Notice("❌ Batch processing cancelled");
      return;
    }

    // Processing configuration
    const config = {
      autoClassify: args?.autoClassify !== false, // Default: true
      autoMove: args?.autoMove !== false, // Default: true
      requireConfirmation: args?.requireConfirmation !== false, // Default: true
      maxNotes: args?.maxNotes || inboxNotes.length // Process all by default
    };

    // Process notes
    const results = {
      processed: 0,
      classified: 0,
      moved: 0,
      errors: [],
      byType: {}
    };

    new Notice(`🔄 Processing ${Math.min(config.maxNotes, inboxNotes.length)} notes...`);

    for (let i = 0; i < Math.min(config.maxNotes, inboxNotes.length); i++) {
      const note = inboxNotes[i];

      try {
        // Process single note
        const result = await processInboxNote(note, config, QuickAdd);

        results.processed++;

        if (result.classified) {
          results.classified++;

          // Track by type
          if (!results.byType[result.type]) {
            results.byType[result.type] = 0;
          }
          results.byType[result.type]++;
        }

        if (result.moved) {
          results.moved++;
        }

        // Show progress every 5 notes
        if ((i + 1) % 5 === 0) {
          new Notice(`📊 Progress: ${i + 1}/${inboxNotes.length} notes processed`);
        }

      } catch (error) {
        results.errors.push({
          note: note.basename,
          error: error.message
        });
        console.error(`Error processing ${note.basename}:`, error);
      }
    }

    // Show completion report
    showCompletionReport(results);

    return results;

  } catch (error) {
    new Notice(`❌ Batch processing error: ${error.message}`);
    console.error("Batch processing error:", error);
  }
};

/**
 * Process a single inbox note
 */
async function processInboxNote(file, config, QuickAdd) {
  const content = await app.vault.read(file);
  const cache = app.metadataCache.getFileCache(file);
  const frontmatter = cache?.frontmatter || {};

  const result = {
    classified: false,
    moved: false,
    type: null,
    folder: null
  };

  // 1. Smart classification
  if (config.autoClassify) {
    const classification = await classifyNote(file, content, frontmatter, config.requireConfirmation, QuickAdd);

    if (classification) {
      result.classified = true;
      result.type = classification.type;
      result.folder = classification.folder;

      // Update frontmatter
      await updateNoteFrontmatter(file, content, classification);
    }
  }

  // 2. Auto-fill metadata
  await fillMetadata(file);

  // 3. Move to target folder
  if (config.autoMove && result.folder && !file.path.startsWith(result.folder)) {
    const newPath = `${result.folder}/${file.name}`;

    try {
      await app.fileManager.renameFile(file, newPath);
      result.moved = true;
    } catch (error) {
      console.error(`Failed to move ${file.name}:`, error);
    }
  }

  return result;
}

/**
 * Classify note (simplified version of smart-classifier)
 */
async function classifyNote(file, content, frontmatter, requireConfirmation, QuickAdd) {
  // Skip if already classified
  if (frontmatter.type && frontmatter.type !== 'undefined') {
    return null;
  }

  // Analyze content
  const analysis = analyzeContent(content, file.basename);

  // If confidence is high and no confirmation required, auto-classify
  if (!requireConfirmation && analysis.confidence > 0.7) {
    return {
      type: analysis.suggestedType,
      folder: analysis.suggestedFolder,
      tags: analysis.suggestedTags,
      maturity: analysis.suggestedMaturity,
      status: analysis.suggestedType === 'atomic' ? undefined : '📥inbox'
    };
  }

  // Otherwise, require user confirmation (for batch mode, skip complex confirmations)
  return {
    type: analysis.suggestedType,
    folder: analysis.suggestedFolder,
    tags: analysis.suggestedTags,
    maturity: analysis.suggestedMaturity,
    status: analysis.suggestedType === 'atomic' ? undefined : '📥inbox'
  };
}

/**
 * Analyze content (simplified version)
 */
function analyzeContent(content, filename) {
  const body = content.replace(/^---[\s\S]*?---\n/, '');
  const wordCount = body.split(/\s+/).filter(w => w.length > 0).length;

  // Simple keyword-based detection
  const typeScores = {
    effort: 0,
    source: 0,
    meeting: 0,
    moc: 0,
    atomic: 0
  };

  // Keyword matching
  if (/projekt|project|úkol|task|cíl|goal/i.test(body)) typeScores.effort += 3;
  if (/zdroj|source|kniha|book|článek|article|url:/i.test(body)) typeScores.source += 3;
  if (/meeting|schůzka|účastníci|participants|agenda/i.test(body)) typeScores.meeting += 3;
  if (/moc|přehled|overview|index|hub/i.test(body)) typeScores.moc += 2;

  // Structural hints
  if (/- \[[ x]\]/.test(body)) typeScores.effort += 2;
  if (/^>\s/m.test(body)) typeScores.source += 1;
  if (/\[\[.*?\]\]/.test(body) && /^#{1,6}\s/m.test(body)) typeScores.moc += 2;

  // Filename hints
  if (/^(MTG|Meeting)/i.test(filename)) typeScores.meeting += 5;
  if (/^(MOC|Přehled)/i.test(filename)) typeScores.moc += 5;
  if (/^(Effort|Projekt)/i.test(filename)) typeScores.effort += 5;
  if (/^(Source|Zdroj|Book)/i.test(filename)) typeScores.source += 5;

  // Determine type
  const maxScore = Math.max(...Object.values(typeScores));
  const suggestedType = maxScore > 0
    ? Object.keys(typeScores).find(type => typeScores[type] === maxScore)
    : 'atomic';

  // Folder mapping
  const folderMap = {
    atomic: '02-Dots/100-Atomics',
    effort: '03-Efforts',
    source: '04-Sources',
    meeting: '04-Sources/Meetings',
    moc: '01-MOCs'
  };

  // Maturity suggestion
  let maturity = '📤seed';
  if (wordCount > 500) maturity = '🌲evergreen';
  else if (wordCount > 200) maturity = '🪴sapling';
  else if (wordCount > 50) maturity = '🌱seedling';

  return {
    suggestedType,
    suggestedFolder: folderMap[suggestedType],
    suggestedTags: [],
    suggestedMaturity: maturity,
    confidence: Math.min(maxScore / 10, 1)
  };
}

/**
 * Update note frontmatter
 */
async function updateNoteFrontmatter(file, content, classification) {
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  let frontmatter = {};
  let body = content;

  if (fmMatch) {
    const fmText = fmMatch[1];
    frontmatter = parseSimpleYAML(fmText);
    body = content.slice(fmMatch[0].length);
  }

  // Update classification
  frontmatter.type = classification.type;
  if (classification.status) frontmatter.status = classification.status;
  if (classification.maturity && classification.type === 'atomic') {
    frontmatter.maturity = classification.maturity;
  }
  if (!frontmatter.created) {
    frontmatter.created = window.moment(file.stat.ctime).format('YYYY-MM-DD');
  }
  frontmatter.modified = window.moment().format('YYYY-MM-DD');

  // Serialize
  const newContent = serializeYAML(frontmatter) + body;
  await app.vault.modify(file, newContent);
}

/**
 * Fill metadata for note
 */
async function fillMetadata(file) {
  // This would call auto-metadata.js logic
  // For now, just ensure basic fields exist
  const content = await app.vault.read(file);
  const cache = app.metadataCache.getFileCache(file);
  const frontmatter = cache?.frontmatter || {};

  let updated = false;
  const metadata = { ...frontmatter };

  if (!metadata.created) {
    metadata.created = window.moment(file.stat.ctime).format('YYYY-MM-DD');
    updated = true;
  }

  if (!metadata.modified) {
    metadata.modified = window.moment().format('YYYY-MM-DD');
    updated = true;
  }

  if (updated) {
    const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    const body = fmMatch ? content.slice(fmMatch[0].length) : content;
    const newContent = serializeYAML(metadata) + body;
    await app.vault.modify(file, newContent);
  }
}

/**
 * Simple YAML parser
 */
function parseSimpleYAML(text) {
  const result = {};
  const lines = text.split('\n');

  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      result[key] = value.trim();
    }
  }

  return result;
}

/**
 * Simple YAML serializer
 */
function serializeYAML(obj) {
  const lines = ['---'];

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      lines.push(`${key}: ${value}`);
    }
  }

  lines.push('---\n');
  return lines.join('\n');
}

/**
 * Show completion report
 */
function showCompletionReport(results) {
  const typeBreakdown = Object.entries(results.byType)
    .map(([type, count]) => `  ${type}: ${count}`)
    .join('\n');

  const report = `
📊 Batch Processing Complete!

✅ Processed: ${results.processed} notes
🏷️ Classified: ${results.classified} notes
📁 Moved: ${results.moved} notes
${results.errors.length > 0 ? `⚠️ Errors: ${results.errors.length}` : ''}

Classification Breakdown:
${typeBreakdown || '  (none)'}
  `.trim();

  new Notice(report, 8000);

  // Log detailed results
  console.log('Batch Processing Results:', results);

  if (results.errors.length > 0) {
    console.error('Processing Errors:', results.errors);
  }
}
