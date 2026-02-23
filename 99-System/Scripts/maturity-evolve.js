// maturity-evolve.js — QuickAdd-compatible maturity stage picker
// Purpose: Let user pick a maturity stage and update the current note's frontmatter
// Requires: QuickAdd
// Run: Via QuickAdd macro (Process > Set Maturity)

module.exports = async (args) => {
  const { app, Notice } = window;
  const QuickAdd = window.QuickAddApi;

  // Canonical emoji values — keep in sync with metrics-core.js MATURITY_STAGES
  const MV = {
    SEED:      '📤seed',
    SEEDLING:  '🌱seedling',
    SAPLING:   '🪴sapling',
    EVERGREEN: '🌲evergreen',
    FRUIT:     '🍓fruit'
  };

  try {
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
      new Notice("No active file to update");
      return;
    }

    const stages = [
      { label: `📤 Seed — raw capture, unprocessed`,       value: MV.SEED      },
      { label: `🌱 Seedling — initial thoughts added`,      value: MV.SEEDLING  },
      { label: `🪴 Sapling — developing, needs refinement`, value: MV.SAPLING   },
      { label: `🌲 Evergreen — mature, well-linked`,         value: MV.EVERGREEN },
      { label: `🍓 Fruit — polished, ready to share`,        value: MV.FRUIT     }
    ];

    const cache = app.metadataCache.getFileCache(activeFile);
    const currentMaturity = cache?.frontmatter?.maturity || "📤seed";

    let selected;
    if (QuickAdd) {
      selected = await QuickAdd.suggester(
        stages.map(s => s.label),
        stages.map(s => s.value),
        false,
        `Current: ${currentMaturity}`
      );
    } else {
      new Notice("QuickAdd API not available");
      return;
    }

    if (!selected) {
      new Notice("Maturity update cancelled");
      return;
    }

    // Read and update frontmatter
    let content = await app.vault.read(activeFile);

    if (content.match(/^---\s*\n[\s\S]*?\n---/)) {
      if (/maturity:/.test(content)) {
        content = content.replace(/maturity:.*/, `maturity: ${selected}`);
      } else {
        content = content.replace(/^(---\s*\n)/, `$1maturity: ${selected}\n`);
      }
    } else {
      content = `---\nmaturity: ${selected}\n---\n${content}`;
    }

    await app.vault.modify(activeFile, content);
    new Notice(`Maturity updated: ${currentMaturity} → ${selected}`);

  } catch (error) {
    new Notice(`Maturity update error: ${error.message}`);
    console.error("maturity-evolve error:", error);
  }
};
