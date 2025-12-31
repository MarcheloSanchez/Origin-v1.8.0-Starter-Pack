module.exports = async (tp) => {
  const { app } = window;
  
  const statusFlow = {
    "📥inbox": "🔄active",
    "🔄active": "⏳waiting", 
    "⏳waiting": "✅completed",
    "✅completed": "📦archived"
  };
  
  const file = app.workspace.getActiveFile();
  if (!file) {
    new Notice("No active file");
    return;
  }
  
  const metadata = app.metadataCache.getFileCache(file)?.frontmatter;
  const currentStatus = metadata?.status;
  const nextStatus = statusFlow[currentStatus];
  
  if (!nextStatus) {
    new Notice(`No next status for: ${currentStatus}`);
    return;
  }
  
  const content = await app.vault.read(file);
  const newContent = content.replace(
    /^status: .*/m, 
    `status: ${nextStatus}`
  );
  
  await app.vault.modify(file, newContent);
  new Notice(`Status: ${currentStatus} → ${nextStatus}`);
};
