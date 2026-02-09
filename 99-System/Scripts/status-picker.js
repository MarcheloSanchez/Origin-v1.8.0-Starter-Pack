// status-picker.js — Set note status via picker
// Purpose: Quick status change with visual selection
// Requires: QuickAdd
// Run: From Commander Page Header

module.exports = async (args) => {
  const { app, Notice } = window;
  const QuickAdd = window.QuickAddApi;

  const statusOptions = [
    { value: "📥inbox", label: "📥 Inbox - Unprocessed" },
    { value: "🔄active", label: "🔄 Active - In progress" },
    { value: "⏳waiting", label: "⏳ Waiting - Blocked/external" },
    { value: "✅completed", label: "✅ Completed - Done" },
    { value: "📦archived", label: "📦 Archived - Filed away" }
  ];

  const file = app.workspace.getActiveFile();
  if (!file) {
    new Notice("No active file");
    return;
  }

  // Get current status
  const metadata = app.metadataCache.getFileCache(file)?.frontmatter;
  const currentStatus = metadata?.status || "(none)";

  // Show picker
  let selectedStatus;
  if (QuickAdd) {
    const choice = await QuickAdd.suggester(
      statusOptions.map(s => s.label),
      statusOptions.map(s => s.value)
    );
    if (!choice) {
      new Notice("Status change cancelled");
      return;
    }
    selectedStatus = choice;
  } else {
    // Fallback without QuickAdd API
    const choices = statusOptions.map((s, i) => `${i + 1}. ${s.label}`).join("\n");
    const input = window.prompt(`Current: ${currentStatus}\n\nSelect new status:\n${choices}`);
    const index = parseInt(input) - 1;
    if (isNaN(index) || index < 0 || index >= statusOptions.length) {
      new Notice("Invalid selection");
      return;
    }
    selectedStatus = statusOptions[index].value;
  }

  // Skip if same status
  if (selectedStatus === currentStatus) {
    new Notice("Status unchanged");
    return;
  }

  // Update YAML
  const content = await app.vault.read(file);
  let newContent;

  if (/^status:\s*.*/m.test(content)) {
    // Replace existing status
    newContent = content.replace(/^status:\s*.*/m, `status: ${selectedStatus}`);
  } else {
    // Add status after frontmatter opening
    const fmMatch = content.match(/^---\s*\n/);
    if (fmMatch) {
      newContent = content.replace(/^---\s*\n/, `---\nstatus: ${selectedStatus}\n`);
    } else {
      // No frontmatter, create it
      newContent = `---\nstatus: ${selectedStatus}\n---\n\n${content}`;
    }
  }

  await app.vault.modify(file, newContent);
  new Notice(`Status: ${currentStatus} → ${selectedStatus}`);
};
