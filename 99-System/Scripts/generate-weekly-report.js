// generate-weekly-report.js — Automated Weekly Report Generator
// Purpose: Creates a structured weekly report note with metrics, highlights, and goals
// Requires: QuickAdd (UserScript macro)
// Run: Weekly via QuickAdd command or manually
//
// Usage (QuickAdd): Add as UserScript in macro "Generate Weekly Report"
// Output: Creates a new note in 05-Calendar/Weekly/

/**
 * Weekly Report Generator
 *
 * Gathers metrics from the vault and generates a structured weekly report:
 * - Notes created/modified this week
 * - Tasks completed this week
 * - Inbox throughput
 * - Connection growth
 * - Maturity promotions
 * - Top highlights
 *
 * Output Location: 05-Calendar/Weekly/Weekly Report YYYY-WNN.md
 * Update Frequency: Weekly (recommended Sunday evening)
 */

module.exports = async (args) => {
  const { app, Notice } = window;

  try {
    new Notice("📊 Generating weekly report...");

    // ============================================
    // DATE CALCULATIONS
    // ============================================

    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1); // Monday
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Sunday
    weekEnd.setHours(23, 59, 59, 999);

    const formatDate = (d) => d.toISOString().split('T')[0];
    const weekStartStr = formatDate(weekStart);
    const weekEndStr = formatDate(weekEnd);

    // ISO week number
    const getWeekNumber = (d) => {
      const dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNum = dt.getUTCDay() || 7;
      dt.setUTCDate(dt.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
      return Math.ceil(((dt - yearStart) / 86400000 + 1) / 7);
    };

    const weekNum = String(getWeekNumber(now)).padStart(2, '0');
    const year = now.getFullYear();
    const reportTitle = `Weekly Report ${year}-W${weekNum}`;

    // ============================================
    // GATHER METRICS VIA OBSIDIAN API
    // ============================================

    const allFiles = app.vault.getMarkdownFiles();
    const metadataCache = app.metadataCache;

    // Helper: get frontmatter for a file
    const getFM = (file) => metadataCache.getFileCache(file)?.frontmatter || {};

    // Helper: check if date is in this week
    const isThisWeek = (timestamp) => {
      return timestamp >= weekStart.getTime() && timestamp <= weekEnd.getTime();
    };

    // Notes created this week
    const notesCreated = allFiles.filter(f =>
      isThisWeek(f.stat.ctime) &&
      !f.path.includes("Templates") &&
      !f.path.includes("99-System")
    );

    // Notes modified this week (excluding created this week to avoid double-count)
    const notesModified = allFiles.filter(f =>
      isThisWeek(f.stat.mtime) &&
      !isThisWeek(f.stat.ctime) &&
      !f.path.includes("Templates") &&
      !f.path.includes("99-System")
    );

    // Tasks completed this week (status = completed, modified this week)
    const tasksCompleted = allFiles.filter(f => {
      const fm = getFM(f);
      return fm.status === "✅completed" && isThisWeek(f.stat.mtime);
    });

    // Inbox count (current)
    const inboxItems = allFiles.filter(f => f.path.startsWith("+Inbox/"));

    // Notes by folder this week
    const createdByFolder = {};
    notesCreated.forEach(f => {
      const folder = f.path.split('/')[0];
      createdByFolder[folder] = (createdByFolder[folder] || 0) + 1;
    });

    // Effort status counts
    const efforts = allFiles.filter(f => f.path.startsWith("03-Efforts/"));
    const activeEfforts = efforts.filter(f => getFM(f).status === "🔄active");
    const completedEfforts = efforts.filter(f =>
      getFM(f).status === "✅completed" && isThisWeek(f.stat.mtime)
    );

    // Maturity distribution (02-Dots)
    const atomics = allFiles.filter(f => f.path.startsWith("02-Dots/"));
    const maturityCounts = { '📤seed': 0, '🌱seedling': 0, '🪴sapling': 0, '🌲evergreen': 0, '🍓fruit': 0 };
    atomics.forEach(f => {
      const m = getFM(f).maturity;
      if (m && maturityCounts[m] !== undefined) maturityCounts[m]++;
    });

    // Read cache for comparison (last week's values)
    const cacheFile = app.vault.getAbstractFileByPath("00-Meta/_Metrics Cache.md");
    let cacheData = {};
    if (cacheFile) {
      const cacheContent = await app.vault.read(cacheFile);
      const lines = cacheContent.split('\n');
      lines.forEach(line => {
        const match = line.match(/^(\w+)::\s*(.+)$/);
        if (match) cacheData[match[1]] = match[2].trim();
      });
    }

    // ============================================
    // GENERATE REPORT CONTENT
    // ============================================

    const totalNotes = allFiles.filter(f =>
      !f.path.includes("Templates") && !f.path.includes("99-System")
    ).length;

    const folderBreakdown = Object.entries(createdByFolder)
      .sort((a, b) => b[1] - a[1])
      .map(([folder, count]) => `| ${folder} | ${count} |`)
      .join('\n');

    const maturityBreakdown = Object.entries(maturityCounts)
      .map(([stage, count]) => `| ${stage} | ${count} |`)
      .join('\n');

    const reportContent = `---
title: "${reportTitle}"
type: weekly
status: 🔄active
created: ${formatDate(now)}
tags:
  - 📊report
  - 📅weekly
related:
  - "[[👁️Dashboard]]"
  - "[[🧭 Review HQ]]"
---

# 📊 ${reportTitle}

> **Period**: ${weekStartStr} to ${weekEndStr}

---

## 📈 Key Metrics

| Metric | This Week | Total |
|--------|-----------|-------|
| Notes Created | ${notesCreated.length} | ${totalNotes} |
| Notes Modified | ${notesModified.length} | — |
| Tasks Completed | ${tasksCompleted.length} | — |
| Efforts Completed | ${completedEfforts.length} | — |
| Active Efforts | ${activeEfforts.length} | ${efforts.length} |
| Current Inbox | ${inboxItems.length} | — |

---

## 📁 Creation Breakdown

| Folder | Notes Created |
|--------|--------------|
${folderBreakdown || "| — | 0 |"}

---

## 🌱 Maturity Pipeline

| Stage | Count |
|-------|-------|
${maturityBreakdown}

---

## 🏆 Highlights

> [!success]+ This Week's Wins
> - ${notesCreated.length} new notes created
> - ${tasksCompleted.length} tasks completed
> - ${completedEfforts.length} efforts finished
${notesCreated.length > 10 ? "> - Strong note creation week!" : ""}
${tasksCompleted.length > 5 ? "> - Excellent task throughput!" : ""}

---

## 🎯 Next Week Focus

> [!todo]+ Goals for Next Week
> - [ ] Process inbox (currently ${inboxItems.length} items)
> - [ ] Review ${activeEfforts.length} active efforts
> - [ ] Add connections to reduce orphan notes
> - [ ]

---

## 📊 Trends

\`\`\`dataviewjs
/**
 * QUERY: Weekly Creation Trend (Last 8 Weeks)
 * PURPOSE: Visualize recent productivity patterns
 */
try {
  const today = dv.date('today');
  const weeks = [];

  for (let i = 7; i >= 0; i--) {
    const wStart = today.minus({weeks: i}).startOf('week');
    const wEnd = wStart.plus({days: 6});
    const count = dv.pages()
      .where(p =>
        !p.file.path.includes("Templates") &&
        p.file.ctime >= wStart &&
        p.file.ctime <= wEnd
      ).length ?? 0;

    weeks.push({
      week: wStart.toFormat("MM-dd"),
      count
    });
  }

  const maxCount = Math.max(...weeks.map(w => w.count), 1);
  dv.paragraph("### 8-Week Creation Trend\\n");
  weeks.forEach(w => {
    const bar = '█'.repeat(Math.round(w.count / maxCount * 25));
    const pad = '░'.repeat(25 - bar.length);
    dv.paragraph(\`**W\${w.week}**: \${bar}\${pad} \${w.count}\`);
  });
} catch (e) {
  dv.paragraph(\`⚠️ Error: \${e.message}\`);
}
\`\`\`

---

*Generated: ${formatDate(now)} by Weekly Report Generator*
*Navigate: [[👁️Dashboard]] | [[🧭 Review HQ]] | [[🎯GTD Command Center]]*
`;

    // ============================================
    // WRITE REPORT FILE
    // ============================================

    // Ensure folder exists
    const folderPath = "05-Calendar/Weekly";
    const folder = app.vault.getAbstractFileByPath(folderPath);
    if (!folder) {
      await app.vault.createFolder(folderPath);
    }

    const filePath = `${folderPath}/${reportTitle}.md`;
    const existingFile = app.vault.getAbstractFileByPath(filePath);

    if (existingFile) {
      await app.vault.modify(existingFile, reportContent);
      new Notice(`📊 Updated: ${reportTitle}`);
    } else {
      await app.vault.create(filePath, reportContent);
      new Notice(`📊 Created: ${reportTitle}`);
    }

    // Open the report
    const reportFile = app.vault.getAbstractFileByPath(filePath);
    if (reportFile) {
      await app.workspace.getLeaf().openFile(reportFile);
    }

  } catch (e) {
    console.error("generate-weekly-report: Error:", e);
    new Notice(`⚠️ Report generation failed: ${e.message}`);
  }
};
