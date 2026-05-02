// obsidian-ooda-agent.js — OODA Loop Metadata Suggestion Agent
// ─────────────────────────────────────────────────────────────────────────────
// Purpose: Analyze note content through OODA loop reasoning and suggest
//          frontmatter metadata aligned with Origin's CIS taxonomy.
//
// Modes:
//   cli    — Node.js CLI: read file path, output JSON suggestion
//   batch  — Batch mode: process multiple files
//   stream — Streaming analysis with reasoning trace
//
// OODA Loop:
//   Observe  — Gather raw signals: word count, structure, links, keywords
//   Orient   — Filter through CIS lens: type taxonomy, status, maturity rules
//   Decide   — Score candidates, pick best; cascade through types if uncertain
//   Act      — Output final suggestion + optional YAML frontmatter block
//
// Usage:
//   node obsidian-ooda-agent.js <file.md> [--vault /path/to/vault] [--stream] [--apply]
//   node obsidian-ooda-agent.js --batch "folder/*.md" [--vault /path/to/vault]
//   node obsidian-ooda-agent.js --interactive

"use strict";

const fs   = require("fs");
const path = require("path");

// ─── Minimal frontmatter parser (no external deps) ────────────────────────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return { attributes: {}, body: raw };

  const yamlBlock = match[1];
  const after     = raw.slice(match[0].length);
  const attrs    = {};
  const lines    = yamlBlock.split("\n");
  let   i        = 0;

  while (i < lines.length) {
    const line = lines[i].trimEnd();
    i++;

    // Skip blank lines
    if (line === "") continue;

    // Inline array: `tags: [a, b, c]`
    const arrMatch = line.match(/^(\w+):\s*\[(.+)\]\s*$/);
    if (arrMatch) {
      attrs[arrMatch[1]] = arrMatch[2].split(",").map(v => v.trim().replace(/^["']|["']$/g, ""));
      continue;
    }

    // Multiline array: `key:` followed by indented `- val` lines
    if (line.match(/^\w+:\s*$/) && lines[i]?.match(/^\s+-/)) {
      const key   = line.match(/^(\w+):/)[1];
      const vals  = [];
      while (lines[i]?.match(/^\s+-/)) {
        vals.push(lines[i].trim().replace(/^\s+-\s*/, "").replace(/^["']|["']$/g, ""));
        i++;
      }
      attrs[key] = vals;
      continue;
    }

    // Key: value (including empty)
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      attrs[kvMatch[1]] = kvMatch[2].replace(/^["']|["']$/g, "").trim();
    }
  }

  return { attributes: attrs, body: after };
}

// ─── CIS Taxonomy ────────────────────────────────────────────────────────────

const VAULT_ROOT = process.argv.includes("--vault")
  ? process.argv[process.argv.indexOf("--vault") + 1]
  : path.join(__dirname, "..", "..");

const TYPES = [
  "atomic", "effort", "source", "moc", "meeting",
  "person", "place", "tool", "area", "prompt"
];

const STATUS_VALUES = [
  "📥inbox", "🔄active", "⏳waiting", "✅completed",
  "📦archived", "⏸️paused", "❌cancelled", "⚠️blocked"
];

const MATURITY_STAGES = [
  "📤seed", "🌱seedling", "🪴sapling", "🌲evergreen", "🍓fruit"
];

// Folder canonical map — used for Orient stage
const FOLDER_MAP = {
  atomic:  "02-Knowledge/Atomics",
  effort:  "03-Efforts",
  source:  "04-Sources",
  meeting: "04-Sources/Meetings",
  moc:     "01-MOCs",
  area:    "02-Knowledge/Areas",
  person:  "02-Knowledge/People",
  place:   "02-Knowledge/Places",
  tool:    "02-Knowledge/Tools",
  prompt:  "07-Prompts",
  system:  "99-System",
  daily:   "05-Calendar/Daily",
  weekly:  "05-Calendar/Weekly",
  monthly: "05-Calendar/Monthly",
  archive: "06-Archive"
};

// CIS keyword signatures — Orient stage uses these to score type candidates
const TYPE_SIGNATURES = {
  effort: {
    keywords: ["project", "task", "goal", "milestone", "deadline", "action item",
               "next action", "deliverable", "objective", "roadmap", "TODO", "DONE"],
    structural: { tasks: 3, headings: 1 }
  },
  source: {
    keywords: ["source", "author", "book", "article", "video", "podcast",
               "url:", "link:", "isbn", "doi", "publication", "abstract",
               "quote", "chapter", "publisher"],
    structural: { quotes: 2, links: 1 }
  },
  meeting: {
    keywords: ["meeting", "call", "participants", "agenda", "action items",
               "decisions", "minutes", "attendees", "absent", "calendar invite",
               "scheduled", "zoom", "teams", "in person"],
    structural: { participants: 5, tasks: 1 }
  },
  moc: {
    keywords: ["map of content", "overview", "index", "catalog", "hub",
               "navigation", "collection", "summary", "dashboard", "toc"],
    structural: { links: 2, headings: 2 }
  },
  atomic: {
    keywords: ["idea", "concept", "insight", "thought", "note", "observation",
               "pattern", "principle", "lesson", "learned", "realization"],
    structural: { wordCount: [20, 800] }
  },
  area: {
    keywords: ["area", "responsibility", "domain", "horizon", "ongoing",
               "focus area", "sphere", "expertise", "responsibility"],
    structural: { headings: 2 }
  },
  person: {
    keywords: ["contact", "email:", "phone:", "linkedin", "github", "colleague",
               "mentor", "network", "relationship", "stakeholder", "role:",
               "organization:", "title:", "bio:"],
    structural: { links: 1, emails: 5 }
  },
  place: {
    keywords: ["location", "address", "city", "country", "visited", "travel",
               "coordinates", "latitude", "longitude", "place", "venue",
               "restaurant", "cafe", "office", "home", "出差", "dovolená"],
    structural: { coordinates: 5 }
  },
  tool: {
    keywords: ["tool", "software", "plugin", "installation", "version", "npm",
               "pip", "brew", "install", "setup", "config", "integration",
               "pricing", "license", "api", "github", "documentation"],
    structural: { codeBlocks: 3, links: 1 }
  },
  prompt: {
    keywords: ["prompt", "model", "llm", "ai", "copilot", "instruction:",
               "system prompt", "role:", "context:", "output format:",
               "example:", "constraint:", "eval_score", "benchmark",
               "temperature", "token", "few-shot"],
    structural: { headings: 2, codeBlocks: 1 }
  }
};

// ─── OODA Loop ───────────────────────────────────────────────────────────────

class OODAAgent {
  constructor(content, filename, frontmatter) {
    this.raw       = content;
    this.filename  = filename;
    this.existing  = frontmatter || {};
    this.observers = null;
    this._orient    = null;
    this._decision = null;
    this._acts      = null;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // OBSERVE — Extract raw signals from the note
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  observe() {
    const body = this.raw.replace(/^---[\s\S]*?---\n?/, "");

    // Strip Obsidian callout markers for cleaner analysis
    const clean = body
      .replace(/^> \[!(?:note|info|success|warning|tip|abstract|summary)\][^\n]*\n/gm, "")
      .replace(/^>\s?/gm, "")
      .replace(/^%%[\s\S]*?%%/gm, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`]*`/g, "");

    const signals = {
      raw: body,
      clean,
      wordCount:   clean.split(/\s+/).filter(w => w.length > 2).length,
      charCount:    body.length,
      linkCount:    (body.match(/\[\[.*?\]\]/g) || []).length,
      outboundLinks: (body.match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g) || []).map(l => {
        const m = l.match(/\[\[([^\]|]+)/);
        return m ? m[1] : null;
      }).filter(Boolean),
      headingCount:    (body.match(/^#{1,6}\s+.+$/gm) || []).length,
      taskCount:       (body.match(/^- \[[ x]\]/gm) || []).length,
      codeBlockCount:  (body.match(/```[\s\S]*?```/g) || []).length,
      quoteCount:      (body.match(/^>\s+.+$/gm) || []).length,
      hasFrontmatter:  /^---/.test(this.raw),
      hasDataview:     /`?dv[s]?\./.test(body) || /\[\[([^\]]+\.md)\]\]/.test(body),
      hasMermaid:      /```mermaid/.test(body),
      hasTable:        /^\|.*\|/.test(body),
      hasChecklist:    /^- \[[ x]\]/.test(body),
      // Typed link counts
      backlinks:       [],  // populated externally if vault scanned
      // Content shape signals
      isVeryShort:     clean.length < 80,
      isVeryLong:      clean.length > 4000,
      hasTitle:        /^#\s+.+$/m.test(body),
      firstPerson:     /\b(I|me|my|mine)\b/.test(clean),
      isQuestion:       /[?!]\s*$/.test(clean.trim()) || /^what|how|why|when|where|who|should|could|would/i.test(clean.trim()),
      isPersonal:       /\b(I|my|we|our|personal|home)\b/.test(clean),
      isWork:           /\b(work|team|project|deadline|client|meeting)\b/i.test(clean),
      isReference:      /\b(book|author|source|article|study|paper)\b/i.test(clean),
      // Date patterns
      hasDate:         /\b\d{4}-\d{2}-\d{2}\b/.test(body),
      // Energy/context signals
      hasEnergy:       /\b(focus|deep work|energy|flow)\b/i.test(clean),
      hasPriority:     /\b(urgent|important|priority|asap|critical)\b/i.test(clean),
      // Maturity signals
      hasMaturityExample: /for example|such as|instance|illustration/.test(clean),
      hasConclusion:      /\b(therefore|conclusion|summary|in summary|so|thus)\b/i.test(clean),
      hasEvidence:        /\b(because|since|research|study|data|evidence|show|prove)\b/i.test(clean)
    };

    // Score keyword hits per type
    signals.typeKeywordHits = {};
    for (const [type, cfg] of Object.entries(TYPE_SIGNATURES)) {
      let score = 0;
      for (const kw of cfg.keywords) {
        const regex = new RegExp(kw, "gi");
        const hits  = (clean.match(regex) || []).length;
        if (hits > 0) {
          score += hits;
          if (!signals.typeKeywordHits[type]) signals.typeKeywordHits[type] = [];
          signals.typeKeywordHits[type].push({ keyword: kw, count: hits });
        }
      }
      if (score === 0) delete signals.typeKeywordHits[type];
    }

    // Structural boost per type
    for (const [type, cfg] of Object.entries(TYPE_SIGNATURES)) {
      if (!signals.typeKeywordHits[type]) continue;
      let boost = 0;
      const s = cfg.structural;

      if (s.tasks       && signals.taskCount      > 0) boost += s.tasks;
      if (s.headings     && signals.headingCount   > 0) boost += s.headings;
      if (s.links        && signals.linkCount      > 0) boost += s.links;
      if (s.quotes       && signals.quoteCount      > 0) boost += s.quotes;
      if (s.codeBlocks   && signals.codeBlockCount > 0) boost += s.codeBlocks;
      if (s.participants && /participants:/i.test(body)) boost += s.participants;
      if (s.emails       && /\b[\w.-]+@[\w.-]+\.\w+\b/.test(body)) boost += s.emails;
      if (s.coordinates  && /\d{1,3}\.\d{1,6}[,\s]+\d{1,3}\.\d{1,6}/.test(body)) boost += s.coordinates;

      if (s.wordCount) {
        const [lo, hi] = s.wordCount;
        if (signals.wordCount >= lo && signals.wordCount <= hi) boost += 2;
      }

      if (boost > 0 && signals.typeKeywordHits[type]) {
        signals.typeKeywordHits[type]._boost = boost;
      }
    }

    this.observers = signals;
    return signals;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ORIENT — Filter signals through CIS lens; compute type scores
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  runOrient() {
    if (!this.observers) this.observe();
    const s = this.observers;

    // ── Filename hint ──────────────────────────────────────────────────────
    const fname = this.filename.replace(/\.md$/i, "").replace(/^\d+-/, "");
    const FN_HINTS = {
      effort:  [/^effort/i, /^project/i, /^(todo|task)/i, /^mt[ _#]/i],
      source:  [/^source/i, /^book/i, /^article/i],
      meeting: [/^(mtg|meeting|call)/i],
      moc:     [/^moc/i, /^map/i, /^index/i],
      atomic:  [/^(note|idea|atomic|concept|insight)/i],
      area:    [/^area/i],
      person:  [/^(person|contact|people)/i],
      place:   [/^(place|location|venue)/i],
      tool:    [/^tool/i, /^setup/i],
      prompt:  [/^prompt/i, /^agent/i]
    };

    for (const [type, patterns] of Object.entries(FN_HINTS)) {
      for (const re of patterns) {
        if (re.test(fname)) {
          if (!s.typeKeywordHits[type]) s.typeKeywordHits[type] = [];
          s.typeKeywordHits[type]._fnameBoost = (s.typeKeywordHits[type]._fnameBoost || 0) + 5;
        }
      }
    }

    // ── Score each type candidate ──────────────────────────────────────────
    const scores = {};
    for (const type of TYPES) {
      const hits = s.typeKeywordHits[type] || [];
      const kwScore  = hits.filter(h => typeof h.count === "number").reduce((a, h) => a + h.count, 0);
      const boost    = hits._boost    || 0;
      const fnameB   = hits._fnameBoost || 0;

      // Structural priors
      let prior = 0.5;
      if (type === "atomic" && s.wordCount > 0)  prior += 0.1;
      if (type === "moc"    && s.linkCount > 2)  prior += 0.2;
      if (type === "effort" && s.taskCount > 0)  prior += 0.3;
      if (type === "meeting"&& /participants:/i.test(s.raw)) prior += 0.5;

      scores[type] = {
        raw:          kwScore + boost + fnameB,
        normalized:   0,
        prior,
        confidence:   0,
        hits:         hits.filter(h => typeof h.count === "number"),
        boost,
        fnameBoost:   fnameB,
        reasoning:    []
      };
    }

    // ── Normalize to 0-1 ─────────────────────────────────────────────────
    const maxRaw = Math.max(...Object.values(scores).map(t => t.raw), 1);
    let   maxConf = 0;

    for (const [type, data] of Object.entries(scores)) {
      data.normalized = data.raw / maxRaw;
      // Bayesian-ish: combine normalized score with prior
      data.confidence = Math.min((data.normalized * 0.7) + (data.prior * 0.3), 1);
      if (data.confidence > maxConf) maxConf = data.confidence;

      const top = data.hits.slice(0, 5);
      if (top.length > 0) {
        data.reasoning.push(`matched: ${top.map(h => h.keyword).join(", ")}`);
      }
      if (data.fnameBoost > 0) data.reasoning.push(`filename hint +${data.fnameBoost}`);
      if (data.boost      > 0) data.reasoning.push(`structural boost +${data.boost}`);
      if (data.prior     > 0.6) data.reasoning.push(`strong prior (${data.prior})`);
    }

    // Cascade: if top score is weak, bubble up alternatives for Decide
    const threshold = 0.35;
    const candidates = Object.entries(scores)
      .sort(([,a], [,b]) => b.confidence - a.confidence)
      .map(([type, data]) => ({ type, ...data }));

    if (candidates[0].confidence < threshold && candidates[1]) {
      // Top choice is uncertain — mark cascade candidates
      candidates[0].cascaded = true;
      candidates[1].cascaded  = false;
    } else {
      candidates[0].cascaded = false;
    }

    // Apply existing frontmatter as hard constraint
    if (this.existing.type) {
      const existingType = this.existing.type.toLowerCase();
      if (TYPES.includes(existingType)) {
        if (!scores[existingType]) scores[existingType] = { raw: 0, normalized: 0, prior: 1, confidence: 1, hits: [], reasoning: ["locked from existing frontmatter"] };
        else { scores[existingType].confidence = 1; scores[existingType].reasoning.push("locked from existing frontmatter"); }
        // Bump locked type to top
        const locked = candidates.find(c => c.type === existingType);
        if (locked) { locked.confidence = 1; locked.cascaded = false; }
      }
    }

    this._orient = { scores, candidates, threshold, topCandidate: candidates[0] };
    return this._orient;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // DECIDE — Select type, status, maturity, tags, folder
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  decide() {
    if (!this._orient) this.runOrient();
    const { candidates, topCandidate } = this._orient;
    const s = this.observers;
    const existing = this.existing;

    // ── Type Decision ─────────────────────────────────────────────────────
    let decidedType = topCandidate.type;
    let typeConfidence = topCandidate.confidence;
    let decisionReason = topCandidate.reasoning.join("; ") || "highest OODA score";
    let isUncertain    = topCandidate.cascaded || false;

    if (isUncertain) {
      decisionReason += ` [⚠️ cascade: secondary type ${candidates[1]?.type} was close]`;
    }

    // ── Status Decision ───────────────────────────────────────────────────
    let status = existing.status || "📥inbox";
    let statusReason = "default for new notes";

    if (existing.status) {
      status = existing.status;
      statusReason = "preserve existing";
    } else if (decidedType === "effort" || decidedType === "meeting") {
      status = "🔄active";
      statusReason = "type default: efforts and meetings start active";
    } else if (s.isPersonal && decidedType === "atomic") {
      status = "📥inbox";
      statusReason = "personal atomics need processing before activation";
    } else if (decidedType === "moc" || decidedType === "area") {
      status = "🔄active";
      statusReason = "structure notes are immediately active";
    }

    // ── Maturity Decision ─────────────────────────────────────────────────
    let maturity = existing.maturity || "📤seed";
    let maturityReason = "default seed";

    if (existing.maturity) {
      maturity = existing.maturity;
      maturityReason = "preserve existing";
    } else if (s.wordCount > 800 && s.linkCount >= 5 && s.headingCount >= 3) {
      maturity = "🌲evergreen";
      maturityReason = "rich content, strong linkage, well-structured";
    } else if (s.wordCount > 400 && s.linkCount >= 2 && (s.hasEvidence || s.hasConclusion)) {
      maturity = "🪴sapling";
      maturityReason = "developed content with reasoning";
    } else if (s.wordCount > 100 || s.hasTitle) {
      maturity = "🌱seedling";
      maturityReason = "has content structure, growing";
    } else if (s.hasMaturityExample || s.hasConclusion) {
      maturity = "🌱seedling";
      maturityReason = "shows elaboration beyond raw capture";
    }

    // ── Folder Decision ───────────────────────────────────────────────────
    const folder = existing.in?.[0]?.replace(/^\[\[|\]\]$/g, "") ||
                   existing.folder ||
                   FOLDER_MAP[decidedType] ||
                   "+Inbox";
    let folderReason = `based on type: ${decidedType}`;

    // ── Tags Decision ─────────────────────────────────────────────────────
    // Strip YAML array markers (e.g. "- 💡atomic" → "💡atomic")
    const cleanTags = (existing.tags || []).map(t => t.replace(/^-\s*/, "").trim());
    const autoTags = new Set(cleanTags);
    const tagSignals = [
      { tag: "💡atomic",    patterns: [/\b(idea|concept|insight|principle)\b/i] },
      { tag: "🚀effort",    patterns: [/\b(project|task|goal|deadline)\b/i] },
      { tag: "📚source",    patterns: [/\b(book|author|article|publication)\b/i] },
      { tag: "🤝meeting",  patterns: [/\b(meeting|call|participants)\b/i] },
      { tag: "🗺️MOC",      patterns: [/\b(map|index|hub|overview)\b/i] },
      { tag: "🎯priority-high", patterns: [/\b(urgent|important|priority|critical)\b/i] },
      { tag: "💼work",      patterns: [/\b(work|team|project|client|business)\b/i] },
      { tag: "🏠home",     patterns: [/\b(home|personal|family)\b/i] },
      { tag: "🌱develop",  patterns: [/\b(develop|evolve|expand|grow)\b/i] },
      { tag: "❔question",  patterns: [/\b(what|how|why|when|should|could)\b/i] },
      { tag: "⚗️experiment", patterns: [/\b(test|experiment|trial|pilot)\b/i] },
      { tag: "🌍international", patterns: [/\b(czech|german|french|international)\b/i] }
    ];

    for (const { tag, patterns } of tagSignals) {
      if (!autoTags.has(tag)) {
        for (const re of patterns) {
          if (re.test(s.clean)) { autoTags.add(tag); break; }
        }
      }
    }

    const tags = [...autoTags].slice(0, 8); // cap at 8 tags

    // ── Related Notes ─────────────────────────────────────────────────────
    const related = s.outboundLinks.slice(0, 5);

    // ── Title Extraction ─────────────────────────────────────────────────
    let title = existing.title || "";
    if (!title) {
      const h1Match = s.raw.match(/^#\s+(.+)$/m);
      title = h1Match ? h1Match[1].trim() : this.filename.replace(/\.md$/i, "");
    }

    this._decision = {
      type:            decidedType,
      typeConfidence,
      decisionReason,
      isUncertain,
      status,
      statusReason,
      maturity,
      maturityReason,
      folder,
      folderReason,
      tags,
      related,
      title
    };
    return this._decision;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ACT — Format the final output
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  act(options = {}) {
    if (!this._decision) this.decide();
    const d = this._decision;
    const s = this.observers;
    const o = this._orient;

    const result = {
      // Core decisions
      type:       d.type,
      status:     d.status,
      maturity:   d.maturity,
      folder:     d.folder,
      tags:       d.tags,
      related:    d.related,
      title:      d.title,

      // Confidence & quality signals
      confidence:         d.typeConfidence,
      decisionReason:     d.decisionReason,
      isUncertain:        d.isUncertain,
      alternativeType:    o.candidates[1]?.type || null,
      alternativeConfidence: o.candidates[1]?.confidence || 0,

      // Signals for review
      signals: {
        wordCount:      s.wordCount,
        linkCount:      s.linkCount,
        headingCount:   s.headingCount,
        taskCount:      s.taskCount,
        codeBlockCount: s.codeBlockCount,
        hasFrontmatter: s.hasFrontmatter
      },

      // Maturity & status reasoning
      maturityReason: d.maturityReason,
      statusReason:   d.statusReason,
      folderReason:   d.folderReason
    };

    if (options.format === "yaml") {
      return this._formatYAML(result);
    }
    if (options.format === "markdown") {
      return this._formatMarkdown(result, o);
    }
    return result;
  }

  _formatYAML(r) {
    const lines = [
      "---",
      `title: "${r.title}"`,
      `type: ${r.type}`,
      `status: ${r.status}`,
      `maturity: ${r.maturity}`,
      `created: ${new Date().toISOString().split("T")[0]}`,
      `modified: ${new Date().toISOString().split("T")[0]}`,
      `in:`,
      `  - "[[${r.folder}]]"`,
      `tags:`,
      ...r.tags.map(t => `  - ${t}`),
    ];
    if (r.related.length > 0) {
      lines.push("related:");
      r.related.forEach(n => lines.push(`  - "[[${n}]]"`));
    }
    lines.push("---");
    return lines.join("\n");
  }

  _formatMarkdown(r, o) {
    const icon = r.typeConfidence > 0.6 ? "✅" : r.typeConfidence > 0.35 ? "⚠️" : "❓";
    const lines = [
      `## ${icon} OODA Metadata Suggestion`,
      "",
      `| Field | Value | Confidence |`,
      `|-------|-------|------------|`,
      `| **Type** | ${r.type} | ${(r.typeConfidence * 100).toFixed(0)}% |`,
      `| **Status** | ${r.status} | ${r.statusReason} |`,
      `| **Maturity** | ${r.maturity} | ${r.maturityReason} |`,
      `| **Folder** | ${r.folder} | ${r.folderReason} |`,
      `| **Tags** | ${r.tags.join(", ") || "(none)"} | |`,
      `| **Title** | ${r.title} | |`,
      "",
      `**Reasoning**: ${r.decisionReason}`,
      ""
    ];

    if (r.isUncertain && r.alternativeType) {
      lines.push(`> [!warning] **Uncertain** — ${r.type} (${(r.typeConfidence*100).toFixed(0)}%) is close to **${r.alternativeType}** (${(r.alternativeConfidence*100).toFixed(0)}%). Review carefully.`);
      lines.push("");
    }

    lines.push("### Top Type Candidates", "");
    for (const c of o.candidates.slice(0, 4)) {
      if (c.confidence > 0.05) {
        lines.push(`- **${c.type}**: ${(c.confidence*100).toFixed(0)}% — ${c.reasoning.join("; ") || "signal detected"}`);
      }
    }

    lines.push("", "### Observed Signals", "");
    lines.push(`- Words: ${r.signals.wordCount} | Links: ${r.signals.linkCount} | Headings: ${r.signals.headingCount} | Tasks: ${r.signals.taskCount}`);

    return lines.join("\n");
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Full run — convenience wrapper
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  run(options = {}) {
    this.observe();
    this.runOrient();
    this.decide();
    return this.act(options);
  }
}

// ─── CLI / Batch Entry Points ────────────────────────────────────────────────

function runCLI() {
  const args = process.argv.slice(2);

  if (args.includes("--interactive") || args.includes("-i")) {
    return runInteractive();
  }

  const batchIdx = args.indexOf("--batch");
  if (batchIdx !== -1) {
    const glob = args[batchIdx + 1];
    if (!glob) { console.error("❌ --batch requires a glob pattern"); process.exit(1); }
    return runBatch(glob);
  }

  const fileArg = args.find(a => !a.startsWith("--"));
  if (!fileArg) {
    return runHelp();
  }

  return runSingle(fileArg);
}

function runSingle(filePath) {
  const vaultRoot = process.argv.includes("--vault")
    ? process.argv[process.argv.indexOf("--vault") + 1]
    : VAULT_ROOT;

  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(vaultRoot, filePath);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File not found: ${fullPath}`);
    process.exit(1);
  }

  const raw    = fs.readFileSync(fullPath, "utf8");
  const parsed = parseFrontmatter(raw);
  const fname  = path.basename(fullPath);

  const agent = new OODAAgent(parsed.body, fname, parsed.attributes);
  const result = agent.run({ format: "json" });

  const isStream = process.argv.includes("--stream");
  const isYAML   = process.argv.includes("--yaml");

  if (isYAML || process.argv.includes("--apply")) {
    process.stdout.write(agent.act({ format: "yaml" }));
    process.stdout.write("\n");
  } else if (isStream) {
    // Show reasoning trace
    console.log("\n🟢 OBSERVE:", JSON.stringify(agent.observers, null, 2).slice(0, 300) + "...");
    console.log("\n🟡 ORIENT:", agent.orient.topCandidate.type,
      `(conf: ${(agent.orient.topCandidate.confidence * 100).toFixed(0)}%)`);
    console.log("\n🔵 DECIDE:", JSON.stringify(agent.decision, null, 2));
    console.log("\n✅ ACT:");
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(JSON.stringify(result, null, 2));
  }
}

function runBatch(pattern) {
  const vaultRoot = process.argv.includes("--vault")
    ? process.argv[process.argv.indexOf("--vault") + 1]
    : VAULT_ROOT;

  const glob   = require("glob");
  const files  = glob.sync(pattern, { cwd: vaultRoot, absolute: true });

  if (files.length === 0) {
    console.error(`❌ No files matched: ${pattern}`);
    process.exit(1);
  }

  console.log(`📦 Batch: ${files.length} files\n`);

  const results = files.map(f => {
    try {
      const raw    = fs.readFileSync(f, "utf8");
      const parsed = parseFrontmatter(raw);
      const agent  = new OODAAgent(parsed.body, path.basename(f), parsed.attributes);
      const result = agent.run();

      return { file: f, ok: true, result };
    } catch (e) {
      return { file: f, ok: false, error: e.message };
    }
  });

  const passed = results.filter(r => r.ok);
  const failed = results.filter(r => !r.ok);

  for (const r of results) {
    const icon = r.ok ? "✅" : "❌";
    const type = r.ok ? r.result.type : r.error;
    console.log(`${icon} ${path.basename(r.file)} → ${type}`);
  }

  console.log(`\n📊 ${passed.length}/${files.length} processed successfully`);
  if (failed.length > 0) {
    console.log(`❌ ${failed.length} failed`);
    process.exit(1);
  }
}

function runInteractive() {
  const readline = require("readline");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const prompt = (q) => new Promise(res => rl.question(q, res));

  console.log("\n🤖 OODA Agent — Interactive Mode");
  console.log("Paste note content (Ctrl+D to finish, Ctrl+C to quit):\n");

  let content = "";
  rl.on("line", line => { content += line + "\n"; });

  rl.question("Filename (e.g. My Idea.md): ", async (fname) => {
    rl.close();
    const agent = new OODAAgent(content, fname || "untitled.md", {});
    const result = agent.run({ format: "markdown" });
    console.log("\n" + result);
  });
}

function runHelp() {
  console.log(`
🤖 OODA Metadata Agent — Obsidian Vault

USAGE
  node obsidian-ooda-agent.js <file.md> [options]
  node obsidian-ooda-agent.js --batch "folder/*.md"
  node obsidian-ooda-agent.js --interactive

OPTIONS
  --vault <path>     Vault root (default: auto-detect from script location)
  --stream          Show OODA reasoning trace (Observe → Orient → Decide → Act)
  --yaml            Output YAML frontmatter block instead of JSON
  --apply           Output YAML frontmatter + confirm to write back to file
  --batch <glob>    Process multiple files matching glob pattern
  -i, --interactive  Read content from stdin interactively

EXAMPLES
  # Single file
  node obsidian-ooda-agent.js "02-Knowledge/Atomics/My Idea.md" --stream

  # Batch process inbox
  node obsidian-ooda-agent.js --batch "+Inbox/*.md" --vault "C:/vault"

  # Output YAML suggestion
  node obsidian-ooda-agent.js "03-Efforts/New Project.md" --yaml

  # Interactive mode
  node obsidian-ooda-agent.js --interactive < input.txt

OODA LOOP
  Observe  — Extract signals: word count, links, structure, keywords
  Orient   — Score type candidates through CIS lens
  Decide   — Pick best type + status + maturity + tags
  Act      — Output structured suggestion (JSON / YAML / Markdown)

TYPES
  atomic · effort · source · moc · meeting
  person · place · tool · area · prompt
`);
}

module.exports = { OODAAgent };

// Auto-run if executed directly
if (require.main === module) {
  runCLI();
}
