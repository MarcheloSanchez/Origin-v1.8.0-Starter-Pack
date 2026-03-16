// archive-subscription.js — Archive a subscription note with cancellation metadata
// Requires: QuickAdd or Templater. Run from the subscription note you want to archive.
// Destination: 06-Archive/Subscriptions/

const ARCH_ROOT = "06-Archive/Subscriptions";

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

function upsertLine(fm, key, value) {
  const re = new RegExp(`^${key}\\s*:.*$`, "m");
  if (re.test(fm)) return fm.replace(re, `${key}: ${value}`);
  return fm + `\n${key}: ${value}`;
}

function getFMValue(fm, key) {
  const m = fm.match(new RegExp(`^${key}\\s*:\\s*(.+)$`, "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : null;
}

module.exports = async (params) => {
  const { app, quickAddApi: qa } = params;

  const file = app.workspace.getActiveFile();
  if (!file) { new Notice("❌ No active file"); return; }

  // Read current content
  let text = await app.vault.read(file);
  const { front, rest } = splitFM(text);

  // Validate it's a subscription note
  const noteType = front ? getFMValue(front, "type") : null;
  if (noteType && noteType !== "subscription") {
    const proceed = await qa.yesNoPrompt(
      `This note has type "${noteType}", not "subscription". Archive anyway?`
    );
    if (!proceed) return;
  }

  // Gather cancellation info
  const reason = await qa.inputPrompt(
    "Cancellation reason",
    "e.g. too expensive, stopped using, found alternative"
  );
  if (reason === null) { new Notice("❌ Cancelled"); return; }

  const alternative = await qa.inputPrompt(
    "Alternative found? (leave blank if none)",
    "e.g. Free tier, Other service name"
  );

  // Calculate total spend if possible
  let totalSpent = "";
  if (front) {
    const cost = getFMValue(front, "cost");
    const started = getFMValue(front, "started");
    const cycle = getFMValue(front, "billing_cycle");
    if (cost && started && (cycle === "monthly" || cycle === "annual")) {
      const startDate = new Date(started);
      const now = new Date();
      const months = Math.round((now - startDate) / (1000 * 60 * 60 * 24 * 30.44));
      const currency = getFMValue(front, "currency") || "CZK";
      if (cycle === "monthly") {
        totalSpent = `${Math.round(parseFloat(cost) * months)} ${currency} (${months} months)`;
      } else {
        const years = Math.round(months / 12);
        totalSpent = `${Math.round(parseFloat(cost) * years)} ${currency} (${years} years)`;
      }
    }
  }

  // Update YAML fields
  let fm = front ?? "";
  fm = upsertLine(fm, "status", "📦archived");
  fm = upsertLine(fm, "cancelled", ymd());
  fm = upsertLine(fm, "cancellation_reason", `"${reason.replace(/"/g, "'")}"`);
  if (alternative?.trim()) {
    fm = upsertLine(fm, "alternative_found", `"${alternative.trim().replace(/"/g, "'")}"`);
  }

  // Update body — fill in Cancellation Notes section if present
  let updatedRest = rest;
  if (rest.includes("**Cancelled:**")) {
    updatedRest = rest
      .replace(/\*\*Cancelled:\*\*\s*\n?/, `**Cancelled:** ${ymd()}\n`)
      .replace(/\*\*Reason:\*\*\s*\n?/, `**Reason:** ${reason}\n`)
      .replace(/\*\*Alternative found:\*\*\s*\n?/, `**Alternative found:** ${alternative?.trim() || "None"}\n`);
    if (totalSpent) {
      updatedRest = updatedRest.replace(
        /\*\*Total spent:\*\*.*\n?/,
        `**Total spent:** ${totalSpent}\n`
      );
    }
  }

  const newText = `---\n${fm.trim()}\n---\n\n${updatedRest.trimStart()}`;
  await app.vault.modify(file, newText);

  // Move to archive folder
  const base = file.basename + ".md";
  const dest = `${ARCH_ROOT}/${base}`;
  await app.vault.createFolder(ARCH_ROOT).catch(() => {}); // ok if exists
  await app.fileManager.renameFile(file, dest);

  new Notice(`📦 Subscription archived → ${dest}`);
  if (totalSpent) new Notice(`💰 Total spent: ${totalSpent}`, 6000);
};
