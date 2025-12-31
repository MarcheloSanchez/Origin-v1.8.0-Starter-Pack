// archive_note.js — move current note to Archive and update YAML
// Requires: Templater. Works from any note.
// Destination folder: 06-Archive/Completed (change if you prefer)

const ARCH_ROOT = "06-Archive/Completed";

function ymd() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

function splitFM(text) {
  const m = text.match(/^\uFEFF?\s*---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!m) return { front: null, rest: text };
  return { front: m[1], rest: text.slice(m[0].length), raw: m[0] };
}

function ensureTagList(fm) {
  // naive: supports "tags: [..]" or block-list
  if (!/^tags\s*:/m.test(fm)) {
    return fm + `\ntags:\n  - "#📦archived"`;
  }
  // add archived tag if missing
  const hasArray = /^tags\s*:\s*\[(.*?)\]/ms;
  const hasBlock = /^tags\s*:\s*\n([\s\S]*?)(\n\S|$)/m;
  if (hasArray.test(fm)) {
    return fm.replace(hasArray, (m, inner) => {
      return `tags: [${inner.includes("#📦archived") ? inner : (inner.trim() ? inner + ", " : "") + '"#📦archived"'}]`;
    });
  }
  if (hasBlock.test(fm)) {
    return fm.replace(/^tags\s*:\s*\n([\s\S]*?)(\n\S|$)/m, (m, block, tail) => {
      if (block.includes("#📦archived")) return m;
      return `tags:\n${block}  - "#📦archived"${tail}`;
    });
  }
  return fm;
}

function upsertLine(fm, key, value) {
  const re = new RegExp(`^${key}\\s*:.*$`, "m");
  if (re.test(fm)) return fm.replace(re, `${key}: ${value}`);
  return fm + `\n${key}: ${value}`;
}

async function main(tp) {
  const file = app.vault.getAbstractFileByPath(tp.file.path(true));
  if (!file) { new Notice("Archive: cannot find current file"); return; }

  // read and update YAML
  let text = await app.vault.read(file);
  const { front, rest } = splitFM(text);

  let fm = front ?? "";
  if (!front) fm = "";                // create FM section if missing
  fm = upsertLine(fm, "status", "📦archived");
  fm = upsertLine(fm, "archived", ymd());
  fm = ensureTagList(fm);

  const newText = `---\n${fm.trim()}\n---\n\n${rest.trimStart()}`;
  await app.vault.modify(file, newText);

  // move to archive folder
  const base = tp.file.title + ".md";
  const dest = `${ARCH_ROOT}/${base}`;
  await app.vault.createFolder(ARCH_ROOT).catch(() => {}); // ok if exists
  await app.fileManager.renameFile(file, dest);

  new Notice(`📦 Archived → ${dest}`);
}

module.exports = main;
