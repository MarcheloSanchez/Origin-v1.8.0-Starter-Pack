// templates.js — resilient after renames; supports new + legacy names
// ────────────────────────────────────────────────────────────────────
const ROOTS = [
  "Templates/New-Notes/Type",
  "Templates/Type",
  "Templates"
];

// Map folder Type → short prefix used in filenames
const TYPE_PREFIX = {
  "Atomic": "A",
  "Effort": "E",
  "Source": "S",
  "MOC": "MOC",
  "Meeting": "MTG",
  "Prompt": "PRM"
};

// Preferred (new) names, then legacy fallbacks
function candidateNames(prefix, kind) {
  if (kind === "meta") {
    return [
      `${prefix}-Meta.yaml`,
      "Meta.yaml",
      "00.Meta.yaml"           // legacy
    ];
  }
  if (kind === "body") {
    return [
      `${prefix}-Body`,
      "Body",
      "10.Chapters.body"       // legacy
    ];
  }
  return [];
}

// Render a Templater include (so internal Templater tags get processed)
async function includeNote(tp, pathNoExt) {
  return await tp.file.include(`[[${pathNoExt}]]`);
}

// Resolve the full path of the template note we should include
function normalizeType(type) {
  // allow passing either folder name ("Atomic") or prefix ("A")
  if (TYPE_PREFIX[type]) return { folder: type, prefix: TYPE_PREFIX[type] };
  // reverse lookup for direct prefix (e.g., "A")
  for (const k of Object.keys(TYPE_PREFIX)) {
    if (TYPE_PREFIX[k] === type) return { folder: k, prefix: type };
  }
  // last resort: use as both
  return { folder: type, prefix: type };
}

function tryPaths(type, kind) {
  const { folder, prefix } = normalizeType(type);
  const names = candidateNames(prefix, kind);
  const out = [];
  for (const root of ROOTS) {
    for (const name of names) {
      out.push(`${root}/${folder}/${name}.md`);
    }
  }
  return out;
}

function fileExists(path) {
  return !!app.vault.getAbstractFileByPath(path);
}

async function resolveTemplatePath(type, kind) {
  const candidates = tryPaths(type, kind);
  for (const full of candidates) {
    if (fileExists(full)) return full;
  }
  return null;
}

async function includeByKind(tp, type, kind) {
  const full = await resolveTemplatePath(type, kind);
  if (!full) return "";
  // Templater include wants the path without .md
  const noExt = full.endsWith(".md") ? full.slice(0, -3) : full;
  return await includeNote(tp, noExt);
}

// ── YAML frontmatter splitter (tolerant of BOM/whitespace)
function splitFrontmatter(text) {
  const m = text.match(/^\uFEFF?\s*---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!m) return null;
  const front = text.slice(0, m[0].length);
  const rest  = text.slice(m[0].length);
  return { front, rest };
}

async function readActive() {
  const f = app.workspace.getActiveFile();
  if (!f) throw new Error("No active file");
  return await app.vault.read(f);
}
async function writeActive(s) {
  const f = app.workspace.getActiveFile();
  if (!f) throw new Error("No active file");
  return await app.vault.modify(f, s);
}

// ── 1) Add Meta — inject FM if missing
async function inject_meta_if_missing(tp, type) {
  const current = await readActive();
  const fm = splitFrontmatter(current);
  if (fm) { new Notice("AddMeta: frontmatter exists — skipped"); return "exists"; }
  const meta = await includeByKind(tp, type, "meta");
  if (!meta?.trim()) { new Notice("AddMeta: meta template not found/empty"); return "no-meta"; }
  await writeActive(meta + "\n\n" + current);
  new Notice("AddMeta: injected");
  return "ok";
}

// ── 2) Add Chapters — add/replace body, preserve FM if present
async function add_chapters(tp, type) {
  const bodyTpl = await includeByKind(tp, type, "body");
  if (!bodyTpl?.trim()) { new Notice("AddChapters: body template not found/empty"); return "no-body"; }
  const current = await readActive();
  const fm = splitFrontmatter(current);
  if (!fm) {
    await writeActive(bodyTpl);
    new Notice("AddChapters: added (no YAML in note)");
    return "ok";
  }
  await writeActive(fm.front + "\n\n" + bodyTpl);
  new Notice("AddChapters: replaced body (kept YAML)");
  return "ok";
}

// ── 3) Create (empty/auto) — write meta + body
async function combine(tp, type, mode = "empty") {
  let meta = await includeByKind(tp, type, "meta");
  const body = await includeByKind(tp, type, "body");
  if (!meta?.trim() || !body?.trim()) {
    new Notice("Create: meta/body template missing"); return "missing";
  }
  if (mode === "auto") {
    meta = meta.replace('status: "📥inbox"', 'status: "🔄active"');
  }
  await writeActive(meta + "\n\n" + body);
  new Notice(`Create: ${type} (${mode})`);
  return "ok";
}

// ── 4) Reset Body — keep YAML, replace body with template
async function reset_body(tp, type) {
  const bodyTpl = await includeByKind(tp, type, "body");
  if (!bodyTpl?.trim()) { new Notice("Reset: body template not found/empty"); return "no-body"; }
  const current = await readActive();
  const fm = splitFrontmatter(current);
  if (!fm) {
    await writeActive(bodyTpl);
    new Notice("Reset: set body (no YAML found)");
    return "ok";
  }
  await writeActive(fm.front + "\n\n" + bodyTpl);
  new Notice("Reset: replaced body (kept YAML)");
  return "ok";
}

// ── 5) Reset Meta — replace YAML only
async function reset_meta(tp, type) {
  const metaTpl = await includeByKind(tp, type, "meta");
  if (!metaTpl?.trim()) { new Notice("ResetMeta: meta template missing"); return "missing"; }
  const current = await readActive();
  const fm = splitFrontmatter(current);
  if (!fm) {
    await writeActive(metaTpl + "\n\n" + current);
    new Notice("ResetMeta: inserted meta (no YAML found)");
    return "ok";
  }
  await writeActive(metaTpl + "\n\n" + fm.rest);
  new Notice("ResetMeta: replaced YAML");
  return "ok";
}

// ── 6) Reset All — YAML + body from templates
async function reset_all(tp, type, mode = "empty") {
  let metaTpl = await includeByKind(tp, type, "meta");
  const bodyTpl = await includeByKind(tp, type, "body");
  if (!metaTpl?.trim() || !bodyTpl?.trim()) { new Notice("ResetAll: meta/body template missing"); return "missing"; }
  if (mode === "auto") metaTpl = metaTpl.replace('status: "📥inbox"', 'status: "🔄active"');
  await writeActive(metaTpl + "\n\n" + bodyTpl);
  new Notice(`ResetAll: ${type} (${mode}) — YAML + chapters replaced`);
  return "ok";
}

module.exports = {
  inject_meta_if_missing,
  add_chapters,
  combine,
  reset_body,
  reset_meta,
  reset_all
};
