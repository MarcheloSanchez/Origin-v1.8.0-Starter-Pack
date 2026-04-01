/**
 * Normalize Prompt YAML — Batch script for legacy and copilot prompts
 *
 * Modes:
 *   - "legacy"  : Normalize Prompts_org/ files (add type, status, prompt_status, rename fields)
 *   - "copilot" : Add standard YAML fields to copilot-custom-prompts/ (keep copilot-command-* fields)
 *   - "dryRun"  : Preview changes without writing
 *
 * Usage (QuickAdd):
 *   Arguments: {"mode":"legacy"} or {"mode":"copilot"} or {"mode":"legacy","dryRun":true}
 *
 * Usage (Templater):
 *   <%* await tp.user.normalize_prompts({ mode: "legacy" }) %>
 */
module.exports = async (rawArgs) => {
  let args = rawArgs || {};
  if (typeof args === "string") {
    try { args = JSON.parse(args || "{}"); } catch { args = {}; }
  }
  const { app, Notice } = window;

  const mode = (args.mode || "legacy").toLowerCase();
  const dryRun = !!args.dryRun;

  const LEGACY_FOLDER = "07-Prompts/Prompts_org";
  const COPILOT_FOLDER = "07-Prompts/Drafts/copilot-custom-prompts";

  const listMarkdownFiles = async (dir) => {
    const out = [];
    const walk = async (p) => {
      try {
        const { files, folders } = await app.vault.adapter.list(p);
        for (const f of files) if (f.endsWith(".md")) out.push(f);
        for (const d of folders) await walk(d);
      } catch {}
    };
    await walk(dir);
    return out;
  };

  const today = new Date().toISOString().slice(0, 10);

  if (mode === "legacy") {
    const files = await listMarkdownFiles(LEGACY_FOLDER);
    let changed = 0;

    for (const path of files) {
      const file = app.vault.getAbstractFileByPath(path);
      if (!file) continue;
      let content = await app.vault.read(file);
      const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
      const m = content.match(fmRegex);
      if (!m) continue;

      const cache = app.metadataCache.getFileCache(file);
      const fm = cache?.frontmatter ? { ...cache.frontmatter } : {};
      for (const k of ["position", "frontmatterLinks", "headings"]) delete fm[k];

      let needsUpdate = false;

      // Rename legacy fields
      const renames = {
        "Category": "prompt_category",
        "Type": "prompt_type",
        "Audience": "audience",
        "Difficulty": "difficulty",
        "Source": "source"
      };
      for (const [from, to] of Object.entries(renames)) {
        if (fm[from] != null && fm[to] == null) {
          fm[to] = fm[from];
          delete fm[from];
          needsUpdate = true;
        }
      }

      // Add missing required fields
      if (!fm.type) { fm.type = "prompt"; needsUpdate = true; }
      if (!fm.status) { fm.status = "📥inbox"; needsUpdate = true; }
      if (!fm.prompt_status) { fm.prompt_status = "draft"; needsUpdate = true; }
      if (!fm.created) { fm.created = today; needsUpdate = true; }

      // Add tags if missing
      if (!fm.tags) {
        fm.tags = ["🤖AI/prompt"];
        needsUpdate = true;
      } else if (Array.isArray(fm.tags) && !fm.tags.some(t => String(t).includes("🤖"))) {
        fm.tags.push("🤖AI/prompt");
        needsUpdate = true;
      }

      // Add fileClass if missing
      if (!fm.fileClass) { fm.fileClass = "prompt"; needsUpdate = true; }

      if (!needsUpdate) continue;
      if (dryRun) { changed++; continue; }

      // Rebuild YAML
      const yamlScalar = (v) => {
        if (typeof v === "boolean" || typeof v === "number") return String(v);
        if (v == null || v === "") return "";
        const s = String(v);
        return /[:#>\-\[\]\{\},&*!|'"%@`]|^\s|\s$/.test(s) ? `"${s.replace(/"/g, '\\"')}"` : s;
      };

      let yaml = "";
      for (const [k, v] of Object.entries(fm)) {
        if (Array.isArray(v)) {
          if (v.length === 0) { yaml += `${k}: []\n`; continue; }
          yaml += `${k}:\n`;
          for (const item of v) yaml += `  - ${yamlScalar(item)}\n`;
        } else {
          yaml += `${k}: ${yamlScalar(v)}\n`;
        }
      }

      const body = content.slice(m[0].length);
      const EOL = content.includes("\r\n") ? "\r\n" : "\n";
      const newContent = `---${EOL}${yaml}---${body}`;
      await app.vault.modify(file, newContent);
      changed++;
    }

    new Notice(`${dryRun ? "[DRY RUN] " : ""}Legacy prompts: ${changed}/${files.length} updated`);
    console.log(`Legacy prompts: ${changed}/${files.length} updated${dryRun ? " (dry run)" : ""}`);

  } else if (mode === "copilot") {
    const files = await listMarkdownFiles(COPILOT_FOLDER);
    let changed = 0;

    for (const path of files) {
      const file = app.vault.getAbstractFileByPath(path);
      if (!file) continue;
      let content = await app.vault.read(file);
      const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
      const m = content.match(fmRegex);
      if (!m) continue;

      const cache = app.metadataCache.getFileCache(file);
      const fm = cache?.frontmatter ? { ...cache.frontmatter } : {};
      for (const k of ["position", "frontmatterLinks", "headings"]) delete fm[k];

      // Skip if already has standard fields
      if (fm.type === "prompt" && fm.status && fm.prompt_status) continue;

      // Add standard fields alongside copilot-command-* fields
      if (!fm.type) fm.type = "prompt";
      if (!fm.fileClass) fm.fileClass = "prompt";
      if (!fm.status) fm.status = "🔄active";
      if (!fm.prompt_status) fm.prompt_status = "draft";
      if (!fm.prompt_type) fm.prompt_type = "utility";
      if (!fm.difficulty) fm.difficulty = "beginner";
      if (!fm.created) fm.created = today;
      if (!fm.tags) {
        fm.tags = ["🤖AI/prompt", "🧹tidy"];
      } else if (Array.isArray(fm.tags)) {
        if (!fm.tags.some(t => String(t).includes("🤖"))) fm.tags.push("🤖AI/prompt");
        if (!fm.tags.includes("🧹tidy")) fm.tags.push("🧹tidy");
      }

      if (dryRun) { changed++; continue; }

      // Rebuild YAML preserving copilot-command-* fields
      const yamlScalar = (v) => {
        if (typeof v === "boolean" || typeof v === "number") return String(v);
        if (v == null || v === "") return "";
        const s = String(v);
        return /[:#>\-\[\]\{\},&*!|'"%@`]|^\s|\s$/.test(s) ? `"${s.replace(/"/g, '\\"')}"` : s;
      };

      let yaml = "";
      for (const [k, v] of Object.entries(fm)) {
        if (Array.isArray(v)) {
          if (v.length === 0) { yaml += `${k}: []\n`; continue; }
          yaml += `${k}:\n`;
          for (const item of v) yaml += `  - ${yamlScalar(item)}\n`;
        } else {
          yaml += `${k}: ${yamlScalar(v)}\n`;
        }
      }

      const body = content.slice(m[0].length);
      const EOL = content.includes("\r\n") ? "\r\n" : "\n";
      const newContent = `---${EOL}${yaml}---${body}`;
      await app.vault.modify(file, newContent);
      changed++;
    }

    new Notice(`${dryRun ? "[DRY RUN] " : ""}Copilot prompts: ${changed}/${files.length} updated`);
    console.log(`Copilot prompts: ${changed}/${files.length} updated${dryRun ? " (dry run)" : ""}`);
  }
};
