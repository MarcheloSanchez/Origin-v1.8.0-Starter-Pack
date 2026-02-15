module.exports = async (params) => {
  const { app } = params;
  const file = app.vault.getAbstractFileByPath("🏡Home.md");
  if (file) {
    await app.workspace.getLeaf(false).openFile(file);
  } else {
    new Notice("🏡Home.md not found");
  }
};
