<%*

const dv = app.plugins.plugins["dataview"].api;

const vault = app.vault;

const moment = window.moment;



// === Time range parameters ===

const today = moment();

const start = today.clone().subtract(6, "days");

const end = today.clone();



// === Target folder with daily notes ===

const pages = dv.pages('"05 Calendar/Daily"')

.where(p => p.file.day >= start && p.file.day <= end)

.sort(p => p.file.day, 'asc');



let output = `# 🗓 Week Summary ${start.format("YYYY-MM-DD")} – ${end.format("YYYY-MM-DD")}\n\n`;



for (const page of pages) {

const filePath = page.file.path;

const fileObj = vault.getAbstractFileByPath(filePath);

if (!fileObj) continue;



const fileContent = await vault.read(fileObj);



const getSection = (title) => {

const regex = new RegExp(`###\\s*${title}[\\s\\S]*?(?=\\n###|\\n##|$)`, "i");

const match = fileContent.match(regex);

return match ? match[0].replace(/###.*\n/, "").trim() : "";

};



const gratitude = getSection("🌞 What am I grateful for\\?");

const insight = getSection("🧠 What caught my attention\\/taught me\\?");

const emotion = getSection("💭 Emotion experienced\\?");

const highlight = page.highlight ?? "";



output += `## 📅 ${page.file.day.toFormat("YYYY-MM-DD")} ([[${page.file.name}]])\n`;

if (highlight) output += `- ✨ highlight:: ${highlight}\n`;

if (gratitude) output += `- 🌞 Gratitude: ${gratitude}\n`;

if (insight) output += `- 🧠 Insight: ${insight}\n`;

if (emotion) output += `- 💭 Emotion: ${emotion}\n`;

output += `\n`;

}



output += `---\n\n## ✍️ Week Reflection\n- What went well:\n- What I'd like to change:\n- What I want to try next week:\n`;



tR += output;

%>