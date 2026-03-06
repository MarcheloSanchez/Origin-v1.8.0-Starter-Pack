// auto-metadata.js — Automatic metadata population and enrichment
// Purpose: Fill in missing frontmatter fields with intelligent defaults
// Requires: QuickAdd or Templater
// Run: On new notes or during batch processing
//
// Usage (QuickAdd): Add as UserScript in macro
// Usage (Templater): <%* await tp.user.auto_metadata() %>

/**
 * Auto-Metadata System
 * Automatically populates missing frontmatter fields:
 * - created, modified dates
 * - up (parent link)
 * - related (suggestions based on content)
 * - tags (based on type and content)
 * - status (if applicable)
 * - maturity (for atomics)
 */

module.exports = async (args) => {
  const { app, Notice } = window;

  try {
    // Get current file or process multiple files
    const filesToProcess = args?.files || [app.workspace.getActiveFile()];

    if (!filesToProcess || filesToProcess.length === 0) {
      new Notice("❌ No files to process");
      return;
    }

    let processedCount = 0;
    let updatedCount = 0;

    for (const file of filesToProcess) {
      if (!file) continue;

      const result = await processFile(file);
      processedCount++;

      if (result.updated) {
        updatedCount++;
      }
    }

    new Notice(`✅ Processed ${processedCount} files, updated ${updatedCount}`);

    return {
      processed: processedCount,
      updated: updatedCount
    };

  } catch (error) {
    new Notice(`❌ Auto-metadata error: ${error.message}`);
    console.error("Auto-metadata error:", error);
  }
};

/**
 * Process a single file
 */
async function processFile(file) {
  const content = await app.vault.read(file);
  const cache = app.metadataCache.getFileCache(file);
  const frontmatter = cache?.frontmatter || {};

  let updated = false;
  const newMetadata = { ...frontmatter };

  // 1. Created date (if missing)
  if (!newMetadata.created) {
    newMetadata.created = window.moment(file.stat.ctime).format('YYYY-MM-DD');
    updated = true;
  }

  // 2. Modified date (always update to current)
  const currentModified = window.moment().format('YYYY-MM-DD');
  if (newMetadata.modified !== currentModified) {
    newMetadata.modified = currentModified;
    updated = true;
  }

  // 3. Type (if missing) - use folder-based detection
  if (!newMetadata.type || newMetadata.type === 'undefined') {
    newMetadata.type = detectTypeFromPath(file.path);
    updated = true;
  }

  // 4. Status (if missing and type requires it)
  const statusTypes = ['effort', 'source', 'meeting', 'atomic', 'area', 'person', 'place', 'tool', 'moc'];
  if (!newMetadata.status && statusTypes.includes(newMetadata.type)) {
    newMetadata.status = '📥inbox';
    updated = true;
  }

  // 5. Maturity (for atomics if missing)
  if (newMetadata.type === 'atomic' && !newMetadata.maturity) {
    newMetadata.maturity = calculateMaturity(content);
    updated = true;
  }

  // 6. Tags (ensure at least type-based tag)
  if (!newMetadata.tags || newMetadata.tags.length === 0) {
    newMetadata.tags = generateDefaultTags(newMetadata.type, file.path);
    updated = true;
  }

  // 7. Up (parent link) - suggest based on folder
  if (!newMetadata.up) {
    newMetadata.up = suggestParentLink(file.path);
    updated = true;
  }

  // 8. Related notes (suggest based on content and backlinks)
  if (!newMetadata.related || newMetadata.related.length === 0) {
    const suggestions = await suggestRelatedNotes(file, content);
    if (suggestions.length > 0) {
      newMetadata.related = suggestions;
      updated = true;
    }
  }

  // 9. Title (use filename if missing)
  if (!newMetadata.title) {
    newMetadata.title = file.basename;
    updated = true;
  }

  // Write back if updated
  if (updated) {
    await updateFrontmatter(file, content, newMetadata);
  }

  return { updated, metadata: newMetadata };
}

/**
 * Detect note type from file path
 */
function detectTypeFromPath(path) {
  if (path.includes('+Inbox')) return 'undefined';
  if (path.includes('01-MOCs')) return 'moc';
  if (path.includes('02-Dots/100-Atomics')) return 'atomic';
  if (path.includes('02-Dots/200-Areas')) return 'area';
  if (path.includes('02-Dots/300-People')) return 'person';
  if (path.includes('02-Dots/400-Places')) return 'place';
  if (path.includes('02-Dots/500-Tools')) return 'tool';
  if (path.includes('02-Dots')) return 'atomic';
  if (path.includes('03-Efforts')) return 'effort';
  if (path.includes('04-Sources/440-Meetings')) return 'meeting';
  if (path.includes('04-Sources')) return 'source';
  if (path.includes('05-Calendar/Daily')) return 'daily';
  if (path.includes('05-Calendar/Weekly')) return 'weekly';
  if (path.includes('05-Calendar/Monthly')) return 'monthly';
  if (path.includes('05-Calendar/Quarterly')) return 'quarterly';
  if (path.includes('05-Calendar/Yearly')) return 'yearly';
  if (path.includes('07-Prompts')) return 'prompt';

  return 'undefined';
}

// Canonical maturity emoji values — keep in sync with metrics-core.js MATURITY_STAGES
const MV = {
  SEED:      '📤seed',
  SEEDLING:  '🌱seedling',
  SAPLING:   '🪴sapling',
  EVERGREEN: '🌲evergreen',
  FRUIT:     '🍓fruit'
};

/**
 * Calculate maturity based on content depth (word count + structural signals).
 * Uses a different algorithm than maturity-promoter.js (link counts) — both are
 * intentional: this is used at creation time when link counts are near zero.
 */
function calculateMaturity(content) {
  // Remove frontmatter
  const body = content.replace(/^---[\s\S]*?---\n/, '');

  const wordCount = body.split(/\s+/).filter(w => w.length > 0).length;
  const hasHeadings = /^#{1,6}\s/m.test(body);
  const hasLinks = /\[\[.*?\]\]/.test(body);
  const hasCodeBlocks = /```/.test(body);
  const hasLists = /^[-*+]\s/m.test(body);

  // Score-based maturity
  let score = 0;

  if (wordCount > 500) score += 3;
  else if (wordCount > 200) score += 2;
  else if (wordCount > 50) score += 1;

  if (hasHeadings) score += 1;
  if (hasLinks) score += 1;
  if (hasCodeBlocks) score += 1;
  if (hasLists) score += 1;

  // Map score to maturity level (fruit not auto-assigned — requires human judgment)
  if (score >= 7) return MV.EVERGREEN;
  if (score >= 5) return MV.SAPLING;
  if (score >= 3) return MV.SEEDLING;
  return MV.SEED;
}

/**
 * Generate default tags based on type
 */
function generateDefaultTags(type, path) {
  const tags = [];

  // Type-based tags
  const typeTagMap = {
    'atomic': ['💡'],
    'effort': ['🚀', '📥inbox'],
    'source': ['📚', '📥inbox'],
    'meeting': ['🤝', '📥inbox'],
    'moc': ['🗺️'],
    'prompt': ['🤖'],
    'daily': ['📅']
  };

  if (typeTagMap[type]) {
    tags.push(...typeTagMap[type]);
  }

  // Folder-based contextual tags
  if (path.includes('+Inbox')) tags.push('📥inbox');
  if (path.includes('03-Efforts')) tags.push('🚀');

  return tags.length > 0 ? tags : ['📝'];
}

/**
 * Suggest parent link based on folder structure
 */
function suggestParentLink(path) {
  // Default home
  let parent = '[[🏡Home]]';

  // Folder-specific parents
  if (path.includes('01-MOCs')) parent = '[[01-MOCs]]';
  if (path.includes('02-Dots/100-Atomics')) parent = '[[100-Atomics]]';
  if (path.includes('02-Dots/200-Areas')) parent = '[[200-Areas]]';
  if (path.includes('02-Dots/300-People')) parent = '[[300-People]]';
  if (path.includes('02-Dots/400-Places')) parent = '[[400-Places]]';
  if (path.includes('02-Dots/500-Tools')) parent = '[[500-Tools]]';
  if (path.includes('02-Dots')) parent = '[[02-Dots]]';
  if (path.includes('03-Efforts')) parent = '[[03-Efforts]]';
  if (path.includes('04-Sources/440-Meetings')) parent = '[[440-Meetings]]';
  if (path.includes('04-Sources')) parent = '[[04-Sources]]';
  if (path.includes('05-Calendar')) parent = '[[05-Calendar]]';
  if (path.includes('07-Prompts')) parent = '[[07-Prompts]]';

  return parent;
}

/**
 * Suggest related notes based on content and backlinks
 */
async function suggestRelatedNotes(file, content) {
  const suggestions = [];

  // 1. Extract existing wikilinks from content
  const linkMatches = content.matchAll(/\[\[(.*?)\]\]/g);
  const contentLinks = new Set();

  for (const match of linkMatches) {
    const linkText = match[1].split('|')[0]; // Handle aliases
    contentLinks.add(linkText);
  }

  // 2. Get backlinks to this note
  const cache = app.metadataCache.getFileCache(file);
  const backlinks = app.metadataCache.getBacklinksForFile(file);

  // 3. Combine content links and backlinks (limit to 5)
  const allLinks = Array.from(contentLinks);

  if (backlinks && backlinks.data) {
    for (const [path, refs] of Object.entries(backlinks.data)) {
      const linkedFile = app.vault.getAbstractFileByPath(path);
      if (linkedFile && allLinks.length < 5) {
        allLinks.push(`[[${linkedFile.basename}]]`);
      }
    }
  }

  // Return top 5 suggestions
  return allLinks.slice(0, 5);
}

/**
 * Update file frontmatter
 */
async function updateFrontmatter(file, content, metadata) {
  // Parse existing frontmatter
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  let body = content;

  if (fmMatch) {
    body = content.slice(fmMatch[0].length);
  }

  // Serialize new frontmatter in proper order
  const orderedKeys = [
    'up', 'in', 'title', 'type', 'tags',
    'status', 'maturity', 'priority', 'completion',
    'created', 'modified', 'due', 'archived_date',
    'related', 'source-type', 'author', 'url', 'rating',
    'cssclasses', 'obsidianUIMode'
  ];

  const lines = ['---'];

  // Add fields in order
  for (const key of orderedKeys) {
    if (metadata[key] !== undefined && metadata[key] !== null) {
      const value = metadata[key];

      if (Array.isArray(value)) {
        if (value.length > 0) {
          lines.push(`${key}:`);
          for (const item of value) {
            lines.push(`  - ${item}`);
          }
        }
      } else if (typeof value === 'object') {
        // Skip complex objects for now
        continue;
      } else {
        lines.push(`${key}: ${value}`);
      }
    }
  }

  // Add any remaining fields not in ordered list
  for (const [key, value] of Object.entries(metadata)) {
    if (!orderedKeys.includes(key) && value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          lines.push(`${key}:`);
          for (const item of value) {
            lines.push(`  - ${item}`);
          }
        }
      } else if (typeof value !== 'object') {
        lines.push(`${key}: ${value}`);
      }
    }
  }

  lines.push('---');

  // Build new content
  const newContent = lines.join('\n') + body;

  // Write back to file
  await app.vault.modify(file, newContent);
}
