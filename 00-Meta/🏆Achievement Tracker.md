---
title: 🏆 Achievement Tracker
type: tracker
status: 🔄active
tags: [gamification, achievements, tracker]
created: 2026-01-02
modified: 2026-01-02
---

# 🏆 Achievement Tracker

> **Track your unlocked achievements and progress toward new ones!**

---

## 🎖️ Unlocked Achievements

### Recently Earned (Last 30 Days)

```dataviewjs
// Manual achievement log - add entries as you unlock them
const recentAchievements = [
    // Example: {date: "2026-01-02", name: "First Steps", category: "🏆 Creation", rarity: "Common", xp: 10},
];

if (recentAchievements.length > 0) {
    dv.table(
        ["Date", "Achievement", "Category", "Rarity", "XP"],
        recentAchievements.map(a => [a.date, a.name, a.category, a.rarity, a.xp])
    );
} else {
    dv.paragraph("*Start unlocking achievements!*");
}
```

### All Achievements (Manual Log)

**To track achievements manually, add them below as you unlock them:**

#### 🏆 Creation Achievements
- [ ] First Steps (1 note) - 10 XP
- [ ] Century Club (100 notes) - 100 XP
- [ ] Knowledge Factory (500 notes) - 500 XP
- [ ] Prolific Producer (1,000 notes) - 1,500 XP
- [ ] Atomic Adept (50 atomic notes) - 150 XP
- [ ] Source Scholar (100 sources) - 300 XP
- [ ] Template Master (10 custom templates) - 400 XP
- [ ] MOC Architect (20 MOCs) - 600 XP

#### ✅ Productivity Achievements
- [ ] Task Slayer (10 tasks) - 20 XP
- [ ] Productivity Beast (100 tasks) - 200 XP
- [ ] Task Terminator (500 tasks) - 800 XP
- [ ] Inbox Zero Hero (1st inbox zero) - 50 XP
- [ ] Zero Tolerance (10× inbox zero) - 200 XP
- [ ] Inbox Ninja (50× inbox zero) - 800 XP
- [ ] GTD Guru (10 weekly reviews) - 400 XP
- [ ] Review Ritualist (52 weekly reviews) - 2,000 XP
- [ ] High Priority Hunter (50 high priority tasks) - 300 XP
- [ ] Project Finisher (10 projects) - 500 XP

#### 🌱 Growth Achievements
- [ ] Seed Sower (10 seed notes) - 15 XP
- [ ] Green Thumb (10 seedlings) - 50 XP
- [ ] Gardener (10 saplings) - 150 XP
- [ ] Forest Keeper (50 evergreens) - 600 XP
- [ ] Fruit Harvester (10 fruit notes) - 1,000 XP
- [ ] Master Gardener (100 evergreens) - 3,000 XP
- [ ] Orchard Owner (50 fruits) - 5,000 XP

#### 🔗 Connection Achievements
- [ ] Link Builder (50 links) - 30 XP
- [ ] Web Weaver (500 links) - 250 XP
- [ ] Network Architect (2,000 links) - 1,000 XP
- [ ] Backlink Champion (20+ backlinks on note) - 200 XP
- [ ] Hub Creator (50+ backlinks) - 800 XP
- [ ] Knowledge Nexus (100+ backlinks) - 2,500 XP

#### 🔥 Streak Achievements
- [ ] Week Warrior (7-day streak) - 75 XP
- [ ] Month Master (30-day streak) - 500 XP
- [ ] Quarter Champion (90-day streak) - 2,000 XP
- [ ] Year Legend (365-day streak) - 10,000 XP
- [ ] Weekly Reviewer (4-week review streak) - 200 XP
- [ ] Review Champion (12-week review streak) - 800 XP
- [ ] Inbox Discipline (7-day zero streak) - 150 XP
- [ ] Zero Master (30-day zero streak) - 1,200 XP

#### 🎯 Special Achievements
- [ ] Night Owl (create note after midnight) - 20 XP
- [ ] Early Bird (create note before 6am) - 20 XP
- [ ] Weekend Warrior (10 weekend sessions) - 100 XP
- [ ] Vault Analyst (run health report) - 50 XP
- [ ] Perfect Day (daily + inbox zero + 3 tasks) - 150 XP
- [ ] Perfect Week (7 perfect days) - 1,500 XP
- [ ] Metadata Master (100 complete notes) - 400 XP
- [ ] Tag Wizard (50+ unique tags) - 200 XP
- [ ] Context King (use all GTD contexts) - 150 XP
- [ ] Energy Expert (track energy 30 days) - 300 XP

#### 📚 Learning Achievements
- [ ] Book Worm (10 books) - 200 XP
- [ ] Avid Reader (50 books) - 800 XP
- [ ] Course Completer (5 courses) - 300 XP
- [ ] Lifelong Learner (20 courses) - 1,200 XP
- [ ] Meeting Master (50 meeting notes) - 250 XP
- [ ] Knowledge Sharer (share 10 notes) - 500 XP

#### 🏅 Mastery Achievements
- [ ] Vault Veteran (100 days) - 300 XP
- [ ] PKM Professional (365 days) - 1,500 XP
- [ ] System Designer (create workflow) - 1,000 XP
- [ ] Automation Ace (10 custom scripts) - 1,500 XP
- [ ] Dashboard Designer (custom dashboard) - 600 XP
- [ ] Template Titan (25 custom templates) - 2,000 XP

#### 💎 Hidden Achievements
- [ ] Easter Egg Hunter (find hidden note) - 777 XP
- [ ] Completionist (unlock all achievements) - 10,000 XP
- [ ] Speed Demon (50 notes in one day) - 1,000 XP
- [ ] Link Explosion (100 links in one day) - 800 XP
- [ ] Marathon Runner (8+ hour session) - 500 XP
- [ ] Comeback Kid (return after 30 days) - 200 XP

---

## 📊 Achievement Statistics

**Total Achievements:** _____ / 70+
**Total XP from Achievements:** _____
**Completion Rate:** _____%

**By Rarity:**
- ⚪ Common: _____ / ~15
- 🟢 Uncommon: _____ / ~20
- 🔵 Rare: _____ / ~15
- 🟣 Epic: _____ / ~12
- 🟠 Legendary: _____ / ~8

**By Category:**
- 🏆 Creation: _____ / 8
- ✅ Productivity: _____ / 10
- 🌱 Growth: _____ / 7
- 🔗 Connection: _____ / 6
- 🔥 Streak: _____ / 8
- 🎯 Special: _____ / 10
- 📚 Learning: _____ / 6
- 🏅 Mastery: _____ / 6
- 💎 Hidden: _____ / 6

---

## 🎯 Next Goals

### Close to Unlocking

**Within 10% of goal:**
1.
2.
3.

**Within 25% of goal:**
1.
2.
3.

---

## 🗓️ Achievement Log

### 2026

**January:**
-

**February:**
-

**March:**
-

---

## 📝 Notes

**Favorite achievements:**


**Hardest to earn:**


**Proudest moment:**


---

## Related

- [[00-Meta/🎮Gamification Dashboard|Gamification Dashboard]]
- [[99-System/CIS/gamification-achievements|All Achievements Reference]]
- [[99-System/CIS/gamification-levels|Level System]]

---

*Last updated: `= this.file.mtime`*
