<%*
const name = await tp.system.prompt("Quick prompt name:");
if (!name) return;
const instruction = await tp.system.prompt("Prompt instruction text:");
const today = tp.date.now("YYYY-MM-DD");
const fileName = name.replace(/[\\/:*?"<>|]/g, "-");

const content = `---
in:
  - "[[07-Prompts]]"
title: "${name}"
type: prompt
fileClass: prompt
tags:
  - 🤖prompt
  - quick
status: 🔄active
prompt_type: utility
prompt_status: draft
difficulty: beginner
created: ${today}
modified: ${today}
related:
  - "[[]]"
---

# 💡 Quick Prompt: ${name}

## 📋 Instruction
\`\`\`
${instruction || "(The prompt text goes here)"}
\`\`\`
`;

const folder = "07-Prompts/Drafts";
const filePath = `${folder}/${fileName}.md`;
await app.vault.create(filePath, content);
await app.workspace.openLinkText(filePath, "", true);
%>
