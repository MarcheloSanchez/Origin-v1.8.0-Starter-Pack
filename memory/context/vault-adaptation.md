# Vault Adaptation for Different Scenarios

How Origin's core system adapts to different use cases (personal PKM vs. work-only vs. mixed).

## Design Principle

All Origin folders/systems are **core and non-negotiable**. Adaptability happens at **configuration time**, not by removing layers.

### Three Deployment Scenarios

#### 1. Personal/Learning Vault (Like Current Origin)
- **02-Dots:** Full spectrum (ideas, concepts, people, places, things)
- **03-Efforts:** Personal projects (learning, creative, life goals)
- **04-Sources:** Books, articles, podcasts, videos, courses
- **05-Calendar:** Daily notes, weekly reviews, yearly reflections
- **Use case:** Lifelong learning, personal development, knowledge capture

#### 2. Work-Only Vault (Team/Company)
- **02-Dots:** Restricted to work-relevant atomics (work-related concepts, company info, skills)
- **03-Efforts:** Only work projects (features, initiatives, bugs)
- **04-Sources:** Work references (docs, specs, meeting notes, design files)
- **05-Calendar:** Daily standup notes, weekly status reports, monthly reviews
- **Use case:** Professional PKM; single source of truth for work context

#### 3. Mixed Vault (Personal + Work)
- **02-Dots:** Split by tag (work-related vs. personal vs. general)
- **03-Efforts:** Projects tagged by domain (work/personal/learning)
- **04-Sources:** Tagged and filterable by domain
- **05-Calendar:** Daily notes capture both; weekly reports separated by domain
- **Use case:** Solo entrepreneur, freelancer, or hybrid professional who wants unified PKM

## Implementation Strategy: "Core Adaptability"

### What Stays the Same (100% of Files)
- **+Inbox:** Always the capture entry (no change)
- **00-Meta:** System docs + workflows (minimal customization per vault)
- **01-MOCs:** Always navigation hubs (structure changes per domain, not files)
- **06-Archive:** Always the completed bucket
- **99-System:** Scripts, config, FileClass, CIS enums (shared across deployments)
- **Templates:** All 155 templates available (used selectively per vault)

### What Changes (Configuration, Not Deletion)

#### 02-Dots (Atomic Knowledge)
**Configuration Point:** What topics/types are in scope?

**Personal vault:**
```
02-Dots/
├── Ideas/
├── Concepts/
├── Statements/
├── Things/
├── People/           ← Include personal contacts, interests
├── Places/           ← Travel, venues, locations
└── Organizations/    ← Companies, nonprofits, clubs
```

**Work vault:**
```
02-Dots/
├── Concepts/         ← Work methodologies, frameworks
├── Statements/       ← Company principles, decisions
├── Things/           ← Tools, systems, infrastructure
├── People/           ← Colleagues, stakeholders, contacts (work only)
├── Organizations/    ← Customers, vendors, partners
└── Projects/         ← (optional) project metadata
```

**Mixed vault:**
```
02-Dots/
├── Ideas/            (tag: #personal or #learning)
├── Concepts/         (auto-tag: #work or #general)
├── Statements/       (scoped by domain)
├── Things/           (tagged by domain)
├── People/           (tagged: #work, #personal)
├── Places/           (tagged: #personal)
└── Organizations/    (tagged by type)
```

#### 03-Efforts (Projects)
**Configuration Point:** What constitutes a "project"?

**Personal vault:**
```
03-Efforts/
├── On/               ← Currently active
├── Ongoing/          ← Running background projects
└── Simmering/        ← Low-priority backlog
```

**Work vault:**
```
03-Efforts/
├── On/               ← Sprint/current quarter features
├── Ongoing/          ← Long-running initiatives
├── Simmering/        ← Backlog, future work
└── (Optional: by-team/ folders)
```

**Mixed vault:**
```
03-Efforts/
├── Work/             ← Work projects (tagged: #work)
│   ├── On/
│   ├── Ongoing/
│   └── Simmering/
├── Personal/         ← Personal projects (tagged: #personal)
│   ├── On/
│   ├── Ongoing/
│   └── Simmering/
└── Learning/         ← Learning projects (tagged: #learning)
    ├── On/
    ├── Ongoing/
    └── Simmering/
```

#### 04-Sources (External References)
**Configuration Point:** What types of sources matter?

**Personal vault:**
```
04-Sources/
├── Knowledge/        ← Articles, research, blogs
├── Media/            ← Books, podcasts, videos, courses
├── Guides/           ← How-to, tutorials, documentation
└── Meetings/         ← Notes from conversations, interviews
```

**Work vault:**
```
04-Sources/
├── Knowledge/        ← Company docs, specs, RFCs, standards
├── Media/            ← Design files, recordings, recordings
├── Guides/           ← Internal wikis, runbooks, playbooks
├── Meetings/         ← Standup notes, 1:1s, all-hands
└── (Optional: Customers/, Competitors/, Markets/)
```

**Mixed vault:**
```
04-Sources/
├── Knowledge/        (filtered by tag: #work, #personal, #learning)
├── Media/            (filtered by tag)
├── Guides/           (filtered by tag)
└── Meetings/         (filtered by tag)
```

#### 05-Calendar (Periodic Notes)
**Configuration Point:** Review frequency and aggregation structure

**Personal vault:**
```
05-Calendar/
├── Daily/            ← Personal daily notes
├── Weekly/           ← Weekly reviews (generated)
├── Monthly/          ← Monthly reflections
├── Quarterly/        ← Quarterly reviews
└── Yearly/           ← Year-end reflections
```

**Work vault:**
```
05-Calendar/
├── Daily/            ← Standup notes + quick captures
├── Weekly/           ← Status reports (generated)
├── Monthly/          ← Monthly reviews
├── Quarterly/        ← Quarterly planning/retrospectives
└── (Optional: 1:1/ for manager)
```

**Mixed vault:**
```
05-Calendar/
├── Daily/            ← Unified (tagged by domain)
├── Weekly/
│   ├── Work/         ← Auto-generated status report
│   └── Personal/     ← Auto-generated personal review
├── Monthly/          ← Separated or unified depending on preference
├── Quarterly/
└── Yearly/
```

## Configuration Template for v2.0

When deploying Origin v2.0 to a new vault, decision points:

```yaml
VAULT_CONFIG:
  scenario: personal | work | mixed

  02-Dots:
    include_personal_contacts: true/false
    include_places: true/false
    include_ideas: true/false

  03-Efforts:
    by_domain: true/false  # if mixed, add Work/Personal/Learning folders
    nested_status: true/false  # if yes, nest On/Ongoing/Simmering per domain

  04-Sources:
    custom_folders: [list of domain-specific source types]
    tag_filtering: true/false

  05-Calendar:
    separated_reviews: true/false  # if mixed, generate separate weekly reports
    review_frequency: [daily, weekly, monthly, quarterly, yearly]

  00-Meta:
    tag_schema: [define what tags mean in this vault]
    status_workflow: [customize status progression for this domain]
    maturity_targets: [adjust maturity goals per note type]
```

## Example: Work Vault Minimal Setup

Starting from Origin, configure as:

1. **Delete or archive:** personal-focused folders (Places, Ideas, non-work People)
2. **Keep:** All core systems and scripts (they work with filtered data)
3. **Tag heavily:** Mark work-relevant 02-Dots atomics with `#work`
4. **Configure Dataview:** Queries only show work-tagged notes in reviews
5. **Adjust workflows:** Weekly reports focus on status, blockers, next week
6. **Customize CIS_STATUS:** Add custom statuses if needed (e.g., "blocked-by-design-review")
7. **Update 00-Meta:** Document the work-specific setup and tag schema

**Result:** Replicable work vault with all Origin infrastructure, zero data sharing between personal context.

## Why "Core Adaptability" Works

- **Scripts don't care about folder names:** yaml_orchestrator.js, maturity-promoter.js work on any note
- **Dataview is flexible:** Queries can filter by tag, type, folder, or any frontmatter field
- **Templates are optional:** Create new custom templates without touching core Origin templates
- **CIS enums are extensible:** Add work-specific statuses (e.g., CIS_STATUS.md can be extended)
- **YAML metadata is universal:** The same frontmatter schema works for personal, work, or mixed content

This means **migrating a vault is mostly configuration + tagging**, not rewriting scripts or removing folders.

