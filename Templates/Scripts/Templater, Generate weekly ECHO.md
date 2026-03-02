<%
const today = moment();
const weekStart = today.clone().startOf('week');

let dashboard = `# Weekly Overview (${weekStart.format('DD.MM')} - ${today.format('DD.MM')})\n\n`;

dashboard += `## Stats:\n`;
dashboard += `- New notes: ${newNotesCount}\n`;
dashboard += `- Completed tasks: ${completedTasks}\n`;
dashboard += `- Active projects: ${activeProjects}\n\n`;

dashboard += `## Top tags this week:\n`;
dashboard += getTopTags().map(tag => `- ${tag}`).join('\n');

return dashboard;
%>