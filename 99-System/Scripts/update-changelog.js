// update-changelog.js — Changelog Auto-Updater
// Purpose: Drafts a CHANGELOG entry from recent vault changes
// Requires: QuickAdd (UserScript macro)
// Run: On demand via QuickAdd command
//
// Usage (QuickAdd): Add as UserScript in macro "📋 Update Changelog"
// Output: Prepends a dated section to CHANGELOG.md

/**
 * Changelog Auto-Updater
 *
 * Reads CHANGELOG.md, parses the last entry date, queries all notes
 * created or modified since then, groups by category (Scripts, Templates,
 * Dashboards, Notes, Config), and prepends a draft section. The user
 * can then edit/curate before committing.
 *
 * Format: DD/MM/YY headers with bullet items (matching existing style).
 */

module.exports = async (args) => {
  const { app, Notice } = window;

  try {
    new Notice("📋 Scanning vault changes...");

    const changelogPath = "CHANGELOG.md";
    const changelogFile = app.vault.getAbstractFileByPath(changelogPath);

    if (!changelogFile) {
      new Notice("⚠️ CHANGELOG.md not found at vault root.");
      return;
    }

    const changelogContent = await app.vault.read(changelogFile);

    // ============================================
    // PARSE LAST CHANGELOG DATE
    // ============================================

    // Format: # DD/MM/YY
    const dateHeaderRegex = /^# (\d{2})\/(\d{2})\/(\d{2})\s*$/m;
    const match = changelogContent.match(dateHeaderRegex);

    let sinceDate;
    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1; // JS months 0-indexed
      const year = 2000 + parseInt(match[3], 10);
      sinceDate = new Date(year, month, day);
      sinceDate.setHours(0, 0, 0, 0);
    } else {
      // Fallback: last 7 days
      sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - 7);
      sinceDate.setHours(0, 0, 0, 0);
    }

    const sinceTimestamp = sinceDate.getTime();

    // ============================================
    // GATHER CHANGES SINCE LAST ENTRY
    // ============================================

    const allFiles = app.vault.getMarkdownFiles();
    const metadataCache = app.metadataCache;

    const getFM = (file) => metadataCache.getFileCache(file)?.frontmatter || {};

    // Categorize changes
    const categories = {
      scripts: [],     // 99-System/Scripts/
      templates: [],   // Templates/
      dashboards: [],  // Root dashboards
      config: [],      // .obsidian/ or 99-System/Config/
      notes: []        // Everything else
    };

    for (const file of allFiles) {
      const isNew = file.stat.ctime > sinceTimestamp;
      const isModified = !isNew && file.stat.mtime > sinceTimestamp;

      if (!isNew && !isModified) continue;

      const action = isNew ? "Added" : "Modified";
      const name = file.basename;
      const entry = `${action} [[${name}]]`;

      if (file.path.includes("99-System/Scripts/")) {
        categories.scripts.push(`${action} \`${file.name}\``);
      } else if (file.path.includes("Templates/")) {
        categories.templates.push(entry);
      } else if (
        file.path.startsWith("99-System/") ||
        file.path === "👁️Dashboard.md" ||
        file.path === "TODO.md" ||
        file.path === "🧭 Review HQ.md" ||
        file.path === "🏡Home.md"
      ) {
        categories.dashboards.push(entry);
      } else if (file.path.includes("99-System/Config/") || file.path.includes("99-System/CIS/")) {
        categories.config.push(`${action} \`${file.name}\``);
      } else {
        categories.notes.push(entry);
      }
    }

    // Also check non-markdown config files that changed
    // (QuickAdd, hotkeys, etc. — we can't easily detect these, so skip)

    // ============================================
    // COUNT TOTALS
    // ============================================

    const totalChanges =
      categories.scripts.length +
      categories.templates.length +
      categories.dashboards.length +
      categories.config.length +
      categories.notes.length;

    if (totalChanges === 0) {
      new Notice("📋 No changes detected since last changelog entry.");
      return;
    }

    // ============================================
    // FORMAT CHANGELOG SECTION
    // ============================================

    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    const dateHeader = `# ${dd}/${mm}/${yy}`;

    let section = `${dateHeader}\n`;

    if (categories.scripts.length > 0) {
      section += categories.scripts.map(e => `- ${e}`).join('\n') + '\n';
    }
    if (categories.templates.length > 0) {
      section += categories.templates.map(e => `- ${e}`).join('\n') + '\n';
    }
    if (categories.dashboards.length > 0) {
      section += categories.dashboards.map(e => `- ${e}`).join('\n') + '\n';
    }
    if (categories.config.length > 0) {
      section += categories.config.map(e => `- ${e}`).join('\n') + '\n';
    }
    if (categories.notes.length > 0) {
      // Limit notes to 20 to avoid huge changelogs
      const shown = categories.notes.slice(0, 20);
      section += shown.map(e => `- ${e}`).join('\n') + '\n';
      if (categories.notes.length > 20) {
        section += `- ...and ${categories.notes.length - 20} more notes\n`;
      }
    }

    section += `---\n`;

    // ============================================
    // PREPEND TO CHANGELOG
    // ============================================

    // Find insertion point: after frontmatter + header links, before first date entry
    const lines = changelogContent.split('\n');
    let insertIndex = -1;

    // Skip frontmatter
    let inFrontmatter = false;
    let frontmatterEnd = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        if (!inFrontmatter) {
          inFrontmatter = true;
        } else {
          frontmatterEnd = i;
          break;
        }
      }
    }

    // Find first date header after frontmatter
    for (let i = frontmatterEnd + 1; i < lines.length; i++) {
      if (dateHeaderRegex.test(lines[i])) {
        insertIndex = i;
        break;
      }
    }

    let updatedContent;
    if (insertIndex !== -1) {
      const before = lines.slice(0, insertIndex).join('\n');
      const after = lines.slice(insertIndex).join('\n');
      updatedContent = before + '\n' + section + after;
    } else {
      // No existing date header found, append after frontmatter
      updatedContent = changelogContent + '\n' + section;
    }

    await app.vault.modify(changelogFile, updatedContent);

    new Notice(`📋 Changelog updated: ${totalChanges} changes since ${sinceDate.toISOString().split('T')[0]}`);

    // Open the changelog for review
    await app.workspace.getLeaf().openFile(changelogFile);

  } catch (e) {
    console.error("update-changelog: Error:", e);
    new Notice(`⚠️ Changelog update failed: ${e.message}`);
  }
};
