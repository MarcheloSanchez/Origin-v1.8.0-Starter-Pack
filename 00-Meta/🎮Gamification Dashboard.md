---
title: 🎮 Gamification Dashboard
type: dashboard
status: 🔄active
tags: [gamification, dashboard, stats, achievements]
created: 2026-01-02
modified: 2026-01-02
cssclasses: [dashboard, gamification]
---

# 🎮 Gamification Dashboard

> **Welcome to your PKM Game!** Track your progress, unlock achievements, and level up your knowledge management skills.

---

## 🏆 Your Stats

### Current Level & XP

```dataviewjs
// Calculate total XP based on vault activities
const notes = dv.pages().length;
const tasks = dv.pages().file.tasks.length;
const evergreens = dv.pages().where(p => p.maturity === "🌲evergreen").length;
const fruits = dv.pages().where(p => p.maturity === "🍓fruit").length;

// Simple XP calculation (can be enhanced)
const totalXP = (notes * 5) + (tasks * 3) + (evergreens * 50) + (fruits * 100);

// Calculate level
function getLevel(xp) {
    let level = 1;
    while (xp >= getLevelXP(level + 1)) {
        level++;
    }
    return level;
}

function getLevelXP(level) {
    if (level <= 1) return 0;
    return Math.floor(100 * level * (level - 1) / 2);
}

const currentLevel = getLevel(totalXP);
const currentLevelXP = getLevelXP(currentLevel);
const nextLevelXP = getLevelXP(currentLevel + 1);
const xpToNext = nextLevelXP - totalXP;
const progress = ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP) * 100).toFixed(1);

// Level titles
const titles = {
    1: "🌱 Novice Note-Taker",
    2: "📝 Curious Capturer",
    3: "📚 Diligent Documenter",
    4: "🔍 Knowledge Seeker",
    5: "✅ Task Terminator",
    6: "🔗 Link Architect",
    7: "🔄 Review Ritualist",
    8: "🪴 Maturity Cultivator",
    9: "🗺️ MOC Maestro",
    10: "🌲 Evergreen Gardener",
    11: "🍓 Insight Harvester",
    12: "🏗️ System Architect",
    13: "⚔️ Productivity Samurai",
    14: "🧘 Zettelkasten Zen Master",
    15: "⚗️ Knowledge Alchemist",
    16: "💪 Habit Titan",
    17: "🎭 Vault Virtuoso",
    18: "👑 Second Brain Sovereign",
    19: "🧠 Meta-Cognition Master",
    20: "⭐ PKM Legendary"
};

const title = titles[currentLevel] || "🎮 PKM Player";

dv.header(2, `Level ${currentLevel}: ${title}`);
dv.paragraph(`**Total XP:** ${totalXP.toLocaleString()} | **Next Level:** ${xpToNext.toLocaleString()} XP to go`);

// Progress bar
const barLength = 30;
const filled = Math.floor(barLength * progress / 100);
const empty = barLength - filled;
const progressBar = '█'.repeat(filled) + '░'.repeat(empty);
dv.paragraph(`\`${progressBar}\` ${progress}%`);
```

### Quick Stats

```dataview
TABLE WITHOUT ID
    ("📊 " + stat) as "Statistic",
    value as "Value"
FROM ""
WHERE file.path = this.file.path
FLATTEN [
    {stat: "Total Notes", value: length(file.lists)},
    {stat: "Notes This Week", value: "Calculate"},
    {stat: "Tasks Completed", value: "Calculate"},
    {stat: "Current Streak", value: "Calculate"},
    {stat: "Achievements Unlocked", value: "Calculate"}
] as data
FLATTEN data.stat as stat
FLATTEN data.value as value
```

---

## 🏅 Achievements

### Recently Unlocked

```dataviewjs
// Check achievements based on vault data
const achievements = [];

// Note count achievements
const noteCount = dv.pages().length;
if (noteCount >= 1) achievements.push({name: "🏆 First Steps", desc: "Created first note", rarity: "Common"});
if (noteCount >= 100) achievements.push({name: "🏆 Century Club", desc: "Created 100 notes", rarity: "Uncommon"});
if (noteCount >= 500) achievements.push({name: "🏆 Knowledge Factory", desc: "Created 500 notes", rarity: "Rare"});
if (noteCount >= 1000) achievements.push({name: "🏆 Prolific Producer", desc: "Created 1,000 notes", rarity: "Epic"});

// Maturity achievements
const evergreens = dv.pages().where(p => p.maturity === "🌲evergreen").length;
const fruits = dv.pages().where(p => p.maturity === "🍓fruit").length;

if (evergreens >= 50) achievements.push({name: "🌲 Forest Keeper", desc: "50 evergreen notes", rarity: "Rare"});
if (evergreens >= 100) achievements.push({name: "🌲 Master Gardener", desc: "100 evergreen notes", rarity: "Legendary"});
if (fruits >= 10) achievements.push({name: "🍓 Fruit Harvester", desc: "Created 10 fruit notes", rarity: "Epic"});

// MOC achievements
const mocs = dv.pages('"01-MOCs"').length;
if (mocs >= 20) achievements.push({name: "🗺️ MOC Architect", desc: "Created 20 MOCs", rarity: "Epic"});

// Calendar achievements
const dailyNotes = dv.pages('"05-Calendar/Daily"').length;
if (dailyNotes >= 7) achievements.push({name: "🔥 Week Warrior", desc: "7 daily notes", rarity: "Common"});
if (dailyNotes >= 30) achievements.push({name: "🔥 Month Master", desc: "30 daily notes", rarity: "Rare"});
if (dailyNotes >= 365) achievements.push({name: "🔥 Year Legend", desc: "365 daily notes", rarity: "Legendary"});

// Display achievements
if (achievements.length > 0) {
    dv.table(
        ["Achievement", "Description", "Rarity"],
        achievements.slice(-5).reverse().map(a => [a.name, a.desc, a.rarity])
    );
} else {
    dv.paragraph("*Start creating notes to unlock achievements!*");
}

dv.paragraph(`**Total Unlocked:** ${achievements.length} achievements`);
```

### Achievement Progress

```dataviewjs
// Track progress toward next achievements
const noteCount = dv.pages().length;
const evergreens = dv.pages().where(p => p.maturity === "🌲evergreen").length;
const fruits = dv.pages().where(p => p.maturity === "🍓fruit").length;
const mocs = dv.pages('"01-MOCs"').length;

const progressTowards = [];

// Next note milestones
if (noteCount < 100) progressTowards.push({goal: "Century Club (100 notes)", progress: noteCount, target: 100});
else if (noteCount < 500) progressTowards.push({goal: "Knowledge Factory (500 notes)", progress: noteCount, target: 500});
else if (noteCount < 1000) progressTowards.push({goal: "Prolific Producer (1,000 notes)", progress: noteCount, target: 1000});

// Evergreen progress
if (evergreens < 50) progressTowards.push({goal: "Forest Keeper (50 evergreens)", progress: evergreens, target: 50});
else if (evergreens < 100) progressTowards.push({goal: "Master Gardener (100 evergreens)", progress: evergreens, target: 100});

// Fruit progress
if (fruits < 10) progressTowards.push({goal: "Fruit Harvester (10 fruits)", progress: fruits, target: 10});
else if (fruits < 50) progressTowards.push({goal: "Orchard Owner (50 fruits)", progress: fruits, target: 50});

// MOC progress
if (mocs < 20) progressTowards.push({goal: "MOC Architect (20 MOCs)", progress: mocs, target: 20});

dv.table(
    ["Next Goal", "Progress"],
    progressTowards.slice(0, 5).map(p => {
        const percent = ((p.progress / p.target) * 100).toFixed(1);
        const barLength = 20;
        const filled = Math.floor(barLength * p.progress / p.target);
        const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
        return [p.goal, `\`${bar}\` ${p.progress}/${p.target} (${percent}%)`];
    })
);
```

---

## 🎯 Active Challenges

### Daily Challenges

```dataviewjs
const today = dv.date("today");
const dayOfWeek = today.toFormat("cccc");

// Daily challenges rotate by day of week
const dailyChallenges = {
    "Monday": "🎯 Fresh Start: Process inbox to zero",
    "Tuesday": "🔗 Connection Day: Create 10 internal links",
    "Wednesday": "📝 Writing Day: Create 3 new notes",
    "Thursday": "✅ Task Day: Complete 5 high-priority tasks",
    "Friday": "🔄 Review Day: Complete weekly review",
    "Saturday": "🌱 Growth Day: Promote 3 notes in maturity",
    "Sunday": "🧘 Reflection Day: Write daily note with gratitude"
};

dv.paragraph(`**Today's Challenge (${dayOfWeek}):** ${dailyChallenges[dayOfWeek]}`);
dv.paragraph("**Reward:** 50 XP + Daily Challenge Badge");
```

### Weekly Challenges

```dataviewjs
const weekNum = dv.date("today").weekNumber;
const weeklyRotation = weekNum % 4;

const weeklyChallenges = [
    "🌲 **Evergreen Week:** Promote 5 notes to evergreen status",
    "🗺️ **MOC Week:** Create or update 2 Maps of Content",
    "📚 **Learning Week:** Complete 1 book/course and create notes",
    "🔥 **Streak Week:** Maintain 7-day daily note streak"
];

dv.paragraph(`**This Week's Challenge:**`);
dv.paragraph(weeklyChallenges[weeklyRotation]);
dv.paragraph("**Reward:** 200 XP + Weekly Challenge Badge");
```

### Monthly Challenge

```dataviewjs
const month = dv.date("today").toFormat("MMMM");

dv.paragraph(`**${month} Challenge:** 🏆 **Perfect Month**`);
dv.paragraph("Complete ALL of the following:");
dv.list([
    "Daily note every day (30 days)",
    "4 weekly reviews",
    "Create 20 new notes",
    "Achieve inbox zero 10 times",
    "Complete 50 tasks"
]);
dv.paragraph("**Reward:** 1,000 XP + Exclusive Monthly Badge + 2x XP multiplier for next week");
```

---

## 📊 Statistics

### This Week's Activity

```dataview
TABLE WITHOUT ID
    file.link as "Recent Notes",
    type as "Type",
    maturity as "Maturity",
    dateformat(file.ctime, "yyyy-MM-dd HH:mm") as "Created"
FROM ""
WHERE file.ctime >= date(today) - dur(7 days)
    AND file.folder != "Templates"
    AND file.folder != "99-System"
SORT file.ctime DESC
LIMIT 10
```

### Maturity Distribution

```dataviewjs
const maturityCounts = {
    "📤 Seed": dv.pages().where(p => p.maturity === "📤seed").length,
    "🌱 Seedling": dv.pages().where(p => p.maturity === "🌱seedling").length,
    "🪴 Sapling": dv.pages().where(p => p.maturity === "🪴sapling").length,
    "🌲 Evergreen": dv.pages().where(p => p.maturity === "🌲evergreen").length,
    "🍓 Fruit": dv.pages().where(p => p.maturity === "🍓fruit").length
};

dv.table(
    ["Maturity Level", "Count", "Percentage"],
    Object.entries(maturityCounts).map(([level, count]) => {
        const total = dv.pages().length;
        const percent = ((count / total) * 100).toFixed(1);
        const barLength = 20;
        const filled = Math.floor(barLength * count / total);
        const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
        return [level, count, `\`${bar}\` ${percent}%`];
    })
);
```

### Personal Records

```dataviewjs
dv.table(
    ["Record", "Value", "Date"],
    [
        ["Most notes in one day", "Calculate", "TBD"],
        ["Longest daily note streak", "Calculate", "TBD"],
        ["Most tasks in one day", "Calculate", "TBD"],
        ["Most links created in one day", "Calculate", "TBD"]
    ]
);
```

---

## 🔥 Streaks

### Current Streaks

```dataviewjs
// Calculate streaks from daily notes
const dailyNotes = dv.pages('"05-Calendar/Daily"')
    .sort(p => p.file.name, 'desc');

let currentStreak = 0;
let checkDate = dv.date("today");

for (let i = 0; i < dailyNotes.length; i++) {
    const noteDate = dv.date(dailyNotes[i].file.name);
    if (noteDate && noteDate.equals(checkDate)) {
        currentStreak++;
        checkDate = checkDate.minus({days: 1});
    } else {
        break;
    }
}

dv.paragraph(`🔥 **Daily Note Streak:** ${currentStreak} days`);

// Streak milestones
if (currentStreak >= 365) dv.paragraph("🏆 **LEGENDARY!** One year streak!");
else if (currentStreak >= 90) dv.paragraph("🏆 **EPIC!** Quarter year streak!");
else if (currentStreak >= 30) dv.paragraph("🏆 **RARE!** Month streak!");
else if (currentStreak >= 7) dv.paragraph("🏆 **Keep going!** Week streak!");
```

---

## 🎮 Quick Actions

> [!tip] Earn XP Now!
> - [ ] 📝 Create a new note (+5 XP)
> - [ ] ✅ Complete a task (+5 XP)
> - [ ] 🔗 Add 3 internal links (+3 XP)
> - [ ] 📥 Process inbox (+2 XP per item)
> - [ ] 🌱 Promote a note maturity (+10-100 XP)
> - [ ] 🔄 Do weekly review (+25 XP)

---

## 📚 Resources

- [[99-System/CIS/gamification-activities|Activity Points Reference]]
- [[99-System/CIS/gamification-levels|Level System]]
- [[99-System/CIS/gamification-achievements|All Achievements]]
- [[00-Meta/Documentation/🎮My PKM Gamification|Gamification Documentation]]

---

## 🎯 Goals

### Short-term (This Week)
- [ ] Reach level X
- [ ] Unlock Y achievement
- [ ] Complete daily challenge 5/7 days
- [ ] Maintain Z day streak

### Long-term (This Month)
- [ ] Reach level X
- [ ] Create 20 new notes
- [ ] Promote 10 notes to evergreen
- [ ] Complete monthly challenge

---

*Last updated: `= this.file.mtime`*
*Keep playing, keep growing! 🚀*
