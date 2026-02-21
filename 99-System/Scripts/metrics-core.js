/**
 * Core Metrics Module for Origin PKM v2.0
 * Single source of truth for vault metrics calculations
 *
 * Usage (Templater):
 *   const metrics = await tp.user.metrics_core();
 *   console.log(metrics.getInboxCount(dv));
 *
 * Usage (DataviewJS - inline):
 *   // Import functions from this module via Templater user scripts
 *
 * Created: 2026-02-05
 * Author: Origin PKM Optimization
 */

module.exports = () => {
  // ============================================
  // CANONICAL CONSTANTS (single source of truth)
  // ============================================

  /**
   * Canonical maturity stages — single source of truth for emoji values, ranks, and thresholds.
   * maturity-promoter.js and maturity-evolve.js keep their own local copies; when changing
   * emoji or stage names update this object first and propagate to those files.
   */
  const MATURITY_STAGES = [
    { value: '📤seed',       rank: 1, label: 'Seed — raw capture, unprocessed',          minOutlinks: 0, minInlinks: 0, minStabilityDays: 0   },
    { value: '🌱seedling',   rank: 2, label: 'Seedling — initial thoughts added',         minOutlinks: 2, minInlinks: 1, minStabilityDays: 0   },
    { value: '🪴sapling',    rank: 3, label: 'Sapling — developing, needs refinement',    minOutlinks: 5, minInlinks: 2, minStabilityDays: 30  },
    { value: '🌲evergreen',  rank: 4, label: 'Evergreen — mature, well-linked',           minOutlinks: 10,minInlinks: 5, minStabilityDays: 90  },
    { value: '🍓fruit',      rank: 5, label: 'Fruit — polished, ready to share',          minOutlinks: 0, minInlinks: 0, minStabilityDays: 0   }
  ];

  /**
   * Canonical status values — must match CIS_STATUS.md and yaml_validator.js enums
   */
  const STATUS_VALUES = {
    INBOX:     '📥inbox',
    ACTIVE:    '🔄active',
    WAITING:   '⏳waiting',
    COMPLETED: '✅completed',
    ARCHIVED:  '📦archived',
    PAUSED:    '⏸️paused',
    CANCELLED: '❌cancelled',
    BLOCKED:   '⚠️blocked'
  };

  // ============================================
  // CONFIGURATION
  // ============================================

  const CONFIG = {
    // Health score thresholds
    inbox: {
      excellent: 10,    // 🟢
      good: 20,         // 🟡
      attention: 40     // 🔴
    },
    projects: {
      min: 1,
      max: 7,           // Ideal range
      warning: 12       // Too many
    },
    stale: {
      threshold_days: 14  // Days before project is considered stale
    },
    orphan: {
      percentage: 0.2   // Max 20% orphan notes
    },
    // Weights for health score (total = 100)
    weights: {
      inbox: 25,
      projects: 25,
      stale: 25,
      orphans: 25
    }
  };

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  /**
   * Check if status indicates active state (handles both emoji and plain)
   */
  const isActive = (status) => {
    if (!status) return false;
    const normalized = String(status).toLowerCase();
    return normalized.includes('active') ||
           normalized === '🔄active' ||
           normalized.includes('in_progress') ||
           normalized.includes('in-progress');
  };

  /**
   * Check if status indicates blocked state (distinct from waiting)
   */
  const isBlocked = (status) => {
    if (!status) return false;
    const normalized = String(status).toLowerCase();
    return normalized.includes('blocked') || normalized === '⚠️blocked';
  };

  /**
   * Safe null coalescing for Dataview results
   */
  const safeLength = (dvResult) => dvResult?.length ?? 0;

  // ============================================
  // METRIC FUNCTIONS
  // ============================================

  /**
   * Get inbox item count
   * @param {object} dv - Dataview API object
   * @returns {number}
   */
  const getInboxCount = (dv) => {
    try {
      return safeLength(dv.pages('"+Inbox"'));
    } catch (e) {
      console.error('metrics-core: getInboxCount error:', e);
      return 0;
    }
  };

  /**
   * Get count of active projects
   * @param {object} dv - Dataview API object
   * @returns {number}
   */
  const getActiveProjects = (dv) => {
    try {
      return safeLength(
        dv.pages('"03-Efforts"').where(p => isActive(p.status))
      );
    } catch (e) {
      console.error('metrics-core: getActiveProjects error:', e);
      return 0;
    }
  };

  /**
   * Get count of stale projects (active but not modified recently)
   * @param {object} dv - Dataview API object
   * @param {number} daysThreshold - Days without modification (default: 14)
   * @returns {number}
   */
  const getStaleProjects = (dv, daysThreshold = CONFIG.stale.threshold_days) => {
    try {
      const today = dv.date('today');
      return safeLength(
        dv.pages('"03-Efforts"').where(p => {
          if (!isActive(p.status)) return false;
          const diff = today.diff(p.file.mtime, 'days');
          return diff && diff.days > daysThreshold;
        })
      );
    } catch (e) {
      console.error('metrics-core: getStaleProjects error:', e);
      return 0;
    }
  };

  /**
   * Get count of orphan notes (no related links and no inlinks)
   * @param {object} dv - Dataview API object
   * @returns {number}
   */
  const getOrphanNotes = (dv) => {
    try {
      const pages = dv.pages().where(p =>
        !p.file.path.includes("99-System") &&
        !p.file.path.includes("Templates") &&
        !p.file.path.includes("06-Archive")
      );
      return safeLength(
        pages.where(p =>
          (!p.related || p.related.length === 0) &&
          (!p.file.inlinks || p.file.inlinks.length === 0)
        )
      );
    } catch (e) {
      console.error('metrics-core: getOrphanNotes error:', e);
      return 0;
    }
  };

  /**
   * Get total note count (excluding system folders)
   * @param {object} dv - Dataview API object
   * @returns {number}
   */
  const getTotalNotes = (dv) => {
    try {
      return safeLength(
        dv.pages().where(p =>
          !p.file.path.includes("99-System") &&
          !p.file.path.includes("Templates")
        )
      );
    } catch (e) {
      console.error('metrics-core: getTotalNotes error:', e);
      return 0;
    }
  };

  /**
   * Get count of overdue tasks
   * @param {object} dv - Dataview API object
   * @returns {number}
   */
  const getOverdueTasks = (dv) => {
    try {
      const today = dv.date('today');
      return safeLength(
        dv.pages().file.tasks.where(t => {
          if (t.completed || !t.due) return false;
          const dueDate = dv.date(t.due);
          return dueDate && dueDate < today;
        })
      );
    } catch (e) {
      console.error('metrics-core: getOverdueTasks error:', e);
      return 0;
    }
  };

  /**
   * Get count of waiting-for items
   * @param {object} dv - Dataview API object
   * @returns {number}
   */
  const getWaitingFor = (dv) => {
    try {
      return safeLength(
        dv.pages().file.tasks.where(t =>
          !t.completed && t.text.includes('@waiting')
        )
      );
    } catch (e) {
      console.error('metrics-core: getWaitingFor error:', e);
      return 0;
    }
  };

  // ============================================
  // HEALTH SCORING
  // ============================================

  /**
   * Calculate component health scores
   * @param {object} metrics - Object with inbox, activeProjects, staleProjects, orphanNotes, totalNotes
   * @returns {object} - Scores for each component (0-25 each)
   */
  const calculateComponentScores = (metrics) => {
    const scores = {};

    // Inbox score (0-25)
    if (metrics.inbox <= CONFIG.inbox.excellent) {
      scores.inbox = CONFIG.weights.inbox;
    } else if (metrics.inbox <= CONFIG.inbox.good) {
      scores.inbox = CONFIG.weights.inbox * 0.8;
    } else if (metrics.inbox <= CONFIG.inbox.attention) {
      scores.inbox = CONFIG.weights.inbox * 0.6;
    } else {
      scores.inbox = CONFIG.weights.inbox * 0.2;
    }

    // Projects score (0-25)
    if (metrics.activeProjects >= CONFIG.projects.min &&
        metrics.activeProjects <= CONFIG.projects.max) {
      scores.projects = CONFIG.weights.projects;
    } else if (metrics.activeProjects <= CONFIG.projects.warning) {
      scores.projects = CONFIG.weights.projects * 0.6;
    } else {
      scores.projects = CONFIG.weights.projects * 0.2;
    }

    // Stale projects score (0-25)
    if (metrics.staleProjects === 0) {
      scores.stale = CONFIG.weights.stale;
    } else if (metrics.staleProjects <= 2) {
      scores.stale = CONFIG.weights.stale * 0.8;
    } else {
      scores.stale = CONFIG.weights.stale * 0.4;
    }

    // Orphan notes score (0-25)
    const orphanRatio = metrics.totalNotes > 0 ?
      metrics.orphanNotes / metrics.totalNotes : 0;
    if (orphanRatio <= CONFIG.orphan.percentage) {
      scores.orphans = CONFIG.weights.orphans;
    } else if (orphanRatio <= CONFIG.orphan.percentage * 1.5) {
      scores.orphans = CONFIG.weights.orphans * 0.6;
    } else {
      scores.orphans = CONFIG.weights.orphans * 0.2;
    }

    return scores;
  };

  /**
   * Calculate overall health score (0-100)
   * @param {object} dv - Dataview API object
   * @returns {object} - {score, grade, emoji, components}
   */
  const calculateHealthScore = (dv) => {
    try {
      const metrics = {
        inbox: getInboxCount(dv),
        activeProjects: getActiveProjects(dv),
        staleProjects: getStaleProjects(dv),
        orphanNotes: getOrphanNotes(dv),
        totalNotes: getTotalNotes(dv)
      };

      const components = calculateComponentScores(metrics);
      const score = Math.round(
        components.inbox +
        components.projects +
        components.stale +
        components.orphans
      );

      let grade, emoji;
      if (score >= 80) {
        grade = 'Excellent';
        emoji = '🟢';
      } else if (score >= 60) {
        grade = 'Good';
        emoji = '🟡';
      } else {
        grade = 'Needs Attention';
        emoji = '🔴';
      }

      return {
        score,
        grade,
        emoji,
        metrics,
        components
      };
    } catch (e) {
      console.error('metrics-core: calculateHealthScore error:', e);
      return {
        score: 0,
        grade: 'Error',
        emoji: '⚠️',
        metrics: {},
        components: {}
      };
    }
  };

  // ============================================
  // WEEKLY METRICS
  // ============================================

  /**
   * Get weekly activity metrics
   * @param {object} dv - Dataview API object
   * @returns {object}
   */
  const getWeeklyMetrics = (dv) => {
    try {
      const today = dv.date('today');
      const weekStart = today.minus({days: today.weekday});

      const notesCreated = safeLength(
        dv.pages().where(p => p.file.ctime >= weekStart)
      );

      const tasksCompleted = safeLength(
        dv.pages().file.tasks.where(t => {
          if (!t.completed || !t.completion) return false;
          const completionDate = dv.date(t.completion);
          return completionDate && completionDate >= weekStart;
        })
      );

      const inboxCaptures = safeLength(
        dv.pages('"+Inbox"').where(p => p.file.ctime >= weekStart)
      );

      return {
        notesCreated,
        tasksCompleted,
        inboxCaptures,
        weekStart: weekStart.toISODate()
      };
    } catch (e) {
      console.error('metrics-core: getWeeklyMetrics error:', e);
      return {
        notesCreated: 0,
        tasksCompleted: 0,
        inboxCaptures: 0,
        weekStart: null
      };
    }
  };

  // ============================================
  // GAMIFICATION METRICS
  // ============================================

  /**
   * Get note counts by maturity stage
   * @param {object} dv - Dataview API object
   * @returns {object} - { seed, seedling, sapling, evergreen, fruit }
   */
  const getMaturityCounts = (dv) => {
    try {
      const pages = dv.pages();
      const counts = {};
      for (const stage of MATURITY_STAGES) {
        const key = [...stage.value].slice(1).join(''); // strip leading emoji code point
        counts[key] = safeLength(pages.where(p => p.maturity === stage.value));
      }
      return counts;
    } catch (e) {
      console.error('metrics-core: getMaturityCounts error:', e);
      return { seed: 0, seedling: 0, sapling: 0, evergreen: 0, fruit: 0 };
    }
  };

  /**
   * Get MOC count
   * @param {object} dv - Dataview API object
   * @returns {number}
   */
  const getMOCCount = (dv) => {
    try {
      return safeLength(dv.pages('"01-MOCs"'));
    } catch (e) {
      console.error('metrics-core: getMOCCount error:', e);
      return 0;
    }
  };

  /**
   * Get daily notes count
   * @param {object} dv - Dataview API object
   * @returns {number}
   */
  const getDailyNotesCount = (dv) => {
    try {
      return safeLength(dv.pages('"05-Calendar/Daily"'));
    } catch (e) {
      console.error('metrics-core: getDailyNotesCount error:', e);
      return 0;
    }
  };

  /**
   * Calculate XP and level based on vault activity
   * Uses the same formula as the Gamification Dashboard
   * @param {object} dv - Dataview API object
   * @returns {object} - { totalXP, level, title, nextLevelXP, xpToNext, progress }
   */
  const calculateXP = (dv) => {
    try {
      const notes = safeLength(dv.pages());
      const tasks = safeLength(dv.pages().file.tasks);
      const maturity = getMaturityCounts(dv);

      const totalXP = (notes * 5) + (tasks * 3) + (maturity.evergreen * 50) + (maturity.fruit * 100);

      function getLevelXP(level) {
        if (level <= 1) return 0;
        return Math.floor(100 * level * (level - 1) / 2);
      }

      let level = 1;
      while (totalXP >= getLevelXP(level + 1)) level++;

      const currentLevelXP = getLevelXP(level);
      const nextLevelXP = getLevelXP(level + 1);
      const xpToNext = nextLevelXP - totalXP;
      const progress = ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP) * 100).toFixed(1);

      const titles = {
        1: "🌱 Novice Note-Taker", 2: "📝 Curious Capturer",
        3: "📚 Diligent Documenter", 4: "🔍 Knowledge Seeker",
        5: "✅ Task Terminator", 6: "🔗 Link Architect",
        7: "🔄 Review Ritualist", 8: "🪴 Maturity Cultivator",
        9: "🗺️ MOC Maestro", 10: "🌲 Evergreen Gardener",
        11: "🍓 Insight Harvester", 12: "🏗️ System Architect",
        13: "⚔️ Productivity Samurai", 14: "🧘 Zettelkasten Zen Master",
        15: "⚗️ Knowledge Alchemist", 16: "💪 Habit Titan",
        17: "🎭 Vault Virtuoso", 18: "👑 Second Brain Sovereign",
        19: "🧠 Meta-Cognition Master", 20: "⭐ PKM Legendary"
      };

      return {
        totalXP,
        level,
        title: titles[level] || "🎮 PKM Player",
        nextLevelXP,
        xpToNext,
        progress: parseFloat(progress)
      };
    } catch (e) {
      console.error('metrics-core: calculateXP error:', e);
      return { totalXP: 0, level: 1, title: "🌱 Novice Note-Taker", nextLevelXP: 100, xpToNext: 100, progress: 0 };
    }
  };

  /**
   * Calculate current daily note streak
   * @param {object} dv - Dataview API object
   * @returns {number} - streak length in days
   */
  const getDailyStreak = (dv) => {
    try {
      const dailyNotes = dv.pages('"05-Calendar/Daily"')
        .sort(p => p.file.name, 'desc');

      let streak = 0;
      let checkDate = dv.date("today");

      for (let i = 0; i < dailyNotes.length; i++) {
        const noteDate = dv.date(dailyNotes[i].file.name);
        if (noteDate && noteDate.equals(checkDate)) {
          streak++;
          checkDate = checkDate.minus({days: 1});
        } else {
          break;
        }
      }
      return streak;
    } catch (e) {
      console.error('metrics-core: getDailyStreak error:', e);
      return 0;
    }
  };

  // ============================================
  // PUBLIC API
  // ============================================

  return {
    // Configuration
    CONFIG,

    // Individual metrics
    getInboxCount,
    getActiveProjects,
    getStaleProjects,
    getOrphanNotes,
    getTotalNotes,
    getOverdueTasks,
    getWaitingFor,

    // Gamification
    getMaturityCounts,
    getMOCCount,
    getDailyNotesCount,
    calculateXP,
    getDailyStreak,

    // Aggregates
    calculateHealthScore,
    getWeeklyMetrics,

    // Helpers
    isActive,
    isBlocked,
    safeLength,

    // Constants (single source of truth)
    STATUS_VALUES,
    MATURITY_STAGES
  };
};
