---
title: "RELEASE NOTES"
Created: 2025-06-30
modified: 2026-03-03
---
# Release Notes Summary

---
**Last Updated:** 2026-01-31
**Version Range:** v1.0.0 - v1.9.1
**Period:** January 2025 - January 2026

---

## [v1.9.1] – 2026-01-24
### Added
- **Claude AI Skills Level 3** - Advanced prompt engineering with structured outputs
- **17 Copilot Custom Prompts** for PKM workflows:
  - Assess note maturity, Build mental model, Challenge this idea
  - Create MOC structure, Decision analysis, Deep research
  - Explain concept, Extract atomic notes, Extract tasks
  - Find connections, Format as atomic, Generate questions
  - Suggest metadata, Summarize meeting, Synthesize knowledge
  - Emojify, Simplify, Weekly review helper
- **Progressive disclosure patterns** in AI prompts

### Changed
- Upgraded Claude skills from Level 2 to Level 3
- Enhanced prompt templates with context-aware outputs

---

## [v1.9.0] – 2026-01-21
### Added
- **Static Fallback Templates** (`Templates/Static/`) - No Templater required
  - atomic.md, effort.md, source.md, moc.md
  - person.md, place.md, tool.md, area.md, prompt.md
- **Modular Template Architecture** - Separate Meta, Body, and Create templates
- **Core Navigation Snippets** - `_nav-breadcrumb.md`, `_nav-wayfinder.md`, `_section-related.md`

### Changed
- **Template Refactoring Complete** - Reduced from 95+ to ~40 template files
- Consolidated action templates into generic `Actions/` folder
- Updated QuickAdd macros to use new template paths
- Removed legacy `Type/` folder structure

### Removed
- Deprecated `*-Full-Template.md` files (redundant with Meta + Body)
- Legacy Dot, Concept, Idea templates (merged into Atomic)
- Calendar CZ TODO stubs
- v1 variants of Callout, ToC, Kanban templates

---

## [v1.8.0] – 2026-01-31
### Added
- **Meta-Skills Architecture**: 6 chainable AI meta-skills with handoff protocol
    - Note Evolver - Mature notes to evergreen status
    - Learning Path Designer - Optimal learning sequences
    - Content Pipeline - Content workflow optimization
    - Decision Navigator - Structured decision analysis
    - Research Orchestrator - Investigation coordination
    - Idea Validator - Concept validation
- **Claude AI Skills**: Level 3 advanced prompt engineering for PKM workflows
- **Modular Template Architecture**: Complete template refactoring (Phases 1-6)
    - Phase 1-2: Core modular template system
    - Phase 3-4: QuickAdd macro integration
    - Phase 5-6: Validation and deprecated template cleanup
- **Static Fallback Templates**: Templates that work without Templater dependency
- **Vault Report**: Comprehensive documentation of vault structure and features
- **Home Maintenance System** (`🏠 Home Maintenance System`) - Room tracking in 400-Places
- **Review HQ** (`🧭 Review HQ`) - Convergence point for all review workflows
- **Gamification System** - Dashboard, Quick Reference, PKM Gamification
- **GTD Contexts Guide** - Context-based task management
- **Note Classification Guide** (`📍Note Classification Guide`)
- **Calendar Period Architecture** - Connective tissue for temporal system

### Changed
- **Template System Overhaul**: Migrated to modular, component-based architecture
- **Copilot Prompts**: Standardized all 6 meta-skills to consistent template format
- **Legacy Cleanup**: Removed deprecated Type/ folders (Option B cleanup)
- Renamed CHANGELOG, RELEASE NOTES, BACKLOG to capitals
- Plugin settings fixes (Auto-note Mover tags)

### Fixed
- Template compatibility issues with QuickAdd macros
- Deprecated template references updated

---

## [v1.7.0] – 2026-01-15
### Added
- **Comprehensive Gamification System**: XP tracking, challenges, achievement dashboard
- **GTD System Enhancement**: Full Getting Things Done implementation
- **Home Maintenance System**: Room-based organization with quick-start guide
    - Each room tracked in [[400-Places]]
    - Maintenance scheduling and project tracking
- **Review HQ**: Comprehensive convergence point for all review workflows
    - Contextual action callouts throughout
- **Calendar Period Architecture**: Connective tissue linking temporal notes
- **Vault Analysis & Health Report**: System health monitoring
- **GitHub Actions**:
    - Labeler workflow for automated PR labeling
    - Enhanced first issue and PR messages
- **MIT License**: Open source licensing added

### Changed
- **Security Hardening**: Replaced hardcoded credentials with environment variables
- **Workspace Configuration**: Updated workspace.json settings
- **Template Organization**: Reorganization with missing templates added

### Fixed
- **Security Vulnerability**: Removed secrets from vault
- **Auto-Note Mover**: Fixed missing "#" in tag configuration

---

## [v1.6.0] – 2025-10-13
## Added
- JavaScript modules for progression tracking
- New markdown files for knowledge/media/guides/meetings/Meta
- [[🧹Cleaning Lady]], [[🌱Incubator]], universal templates, new hotkeys, and cheatsheets
- Custom Callout System, Kanban settings, practical examples, YAML orchestrator scripts, quarterly templates, playbooks, standards, more +About sections
- Efforts management schema (YAML)
- - New hotkeys:
    - Quick Tag: `ALT+T`
    - Split Right: `CTRL+SHIFT+ALT+➝`
    - Split Down: `CTRL+SHIFT+ALT+↓`
    - Toggle Right Sidebar: `CTRL+ALT+SHIFT+L`
    - Toggle Left Sidebar: `CTRL+ALT+SHIFT+P`
    - Add Property: `CTRL+;`
## Changed
- CSS and layout streamlined, “Dots” system clarified as category/folder
- Major file, folder, metadata, and template renaming/consolidation
- Calendar/dashboard attributes and icons refactored
- Governance, naming convention, and folder standards strengthened
- Large clean-up and restructuring of notes, organization, and workflow guides
## Fixed
- Maintenance script improvement, template fallback process clarified
- Metadata duplication issues solved
- Quarterly/calendar templates compatibility ensured
- Status/maturity tracking scripts partially fixed (Templater/QuickAdd pending)

## [v1.5.0] – 2025-08-23 
## Added
- **Atomic template system** - Streamlined template approach replacing complex Inbox templates
- **Commander/QuickAdd integration** - Prepared Add functionality with templates and metadata
- **Question system** for Templates - Added #❔question tagging for template queries
- **Atomic Filled Out** - Complete atomic note template implementation
## Changed
- **Template optimization** - Reviewed and updated all template commands
- **Release preparation** - v1.5.0 staging and testing
- **Inbox template** - Removed as unnecessary with Atomic template approach
---
## [v1.4.1] – 2025-08-20
## Added
- **Data foundation system** - Six core data base files:
    - `_Templates_Data.base`
    - `_Dots_Data.base`
    - `_Inbox_Data.base`
    - `_Sources_Data.base`
    - `_Calendar_Data.base`
    - `_Effortless_Data.base`
## Changed
- **Template organization** - Moved Templates/Templater structure for better organization
- **Template reconfiguration** - Planned systematic template restructuring
- **Sidebar system** - Deleted `🙃 Sidebar` as `🏡Home` provides all needed functionality with better linking
---
## [v1.4.0] – 2025-08-16
## Added
- **Technical documentation suite**:
    - Templater User Guide Technical Document
    - Git User Guide Technical Document
    - Overview of Metadata with query awareness
- **Automation enhancements**:
    - `⚡ Automation Menu` - Fully functional
    - CIS (Context Information System) components: MOOD, WEATHER
- **Organizational tools**:
    - Choosing system methodology
    - Cleanup Checklist for maintenance
## Changed
- **Query system** - Attempted updates to Sidebar queries
---
## [v1.3.5] – 2025-08-14
## Added
- **Dashboard expansion** - Vault Home Dashboard as supplement to existing Home/Sidebar systems
- **Metadata improvements** - Critical Missing Metadata Query for data integrity
- **Calendar organization** - Reviews subfolder for better structure
## Changed
- **Home navigation** - Updated home-note with enhanced functionality
---
## [v1.3.4] – 2025-08-13
## Added
- **User experience** - House Tour (`🏡House Tour`) for new user onboarding
- **Template infrastructure** - Future template structure: Add, Capture, Meta categories
## Changed
- **Quality assurance** - Peer review process implemented (by Zůza)
## Fixed
- **Templater scripts** - Resolved multiple script failures and functionality issues
---
## [v1.3.3] – 2025-08-11
## Added
- **PKM overview** - Comprehensive Personal Knowledge Management system overview
- **Prompt engineering system**:
    - Prompt_Type classification
    - Prompt_attributes_explained documentation
    - Copilot-custom-prompts integration
- **AI integration** - Copilot setup (pending Face ID verification)
- **Technical documentation** - Obsidian Technical Document with showcase integration
## Changed
- **Tag system** - Reverted to YAML-based status tags (removed from tag names)
- **File properties** - Updated Hidden property and Changelog panel placement
---
## [v1.3.2] – 2025-08-08 (Major Release)
## Added
- **Enhanced tagging system**:
    - Effort tags: `#🔥on`
## Changed
- **Folder structure** - Updated to `[00-Folder]` namespace with corresponding query updates
- **Calendar system** - Completed comprehensive review of Calendar notes
- **GPT integration** - Organized GPT folder dump for next release
## Fixed
- **Release management** - v1.4.0 officially released
---
## [v1.3.1] – 2025-08-06
## Added
- **Task management**:
    - Tasks plugin integration
    - TODO note for centralized task overview
- **Visual enhancements** - Typography showcase for CSS implementations
## Changed
- **Template optimization** - Cleaned up daily journal templates
- **Weekly workflow** - Updated Templater Week Review functionality
- **Metadata completion** - Enhanced Calendar Metadata (previously empty)
## Fixed
- **Plugin conflicts** - Calendar plugin template compatibility with Periodic Notes
- **Plugin management** - Identified Lazy Plugin Loader auto-enabling disabled plugins
---
## [v1.3.0] – 2025-08-04
## Added
- **Workflow templates** - FLOW_CREATION_TEMPLATE for process documentation
- **Enhanced callouts** - Task callouts added to Nick Milo's Custom Callouts
- **Experimental features** - Beta home-note-cs-meh-inspiration with query integration
## Changed
- **Query system** - Updated home-note queries for better functionality
- **Task management** - Cleaned and reorganized My PKM Tasks (some remain under review)
- **Folder naming** - Planned rename: Templater → TemplateR-Auto, Templates → TemplateS-Manual
---
## [v1.2.3] – 2025-07-28
## Added
- **Metadata system** - Metadata Menu plugin for enhanced data management
- **File organization** - FileClasses system for contained metadata management
- **Context Information System (CIS)** - Files and Prompt class implementation
---
## [v1.2.4] – 2025-07-23
## Added
- **Automation infrastructure**:
    - Advanced URI plugin for future automations
    - Format Converter core plugin (evaluation needed)
    - Lazy Plugin Loader for performance optimization
## Changed
- **Core plugins** - Disabled Workspaces and other unused core features
---
## [v1.2.5] – 2025-07-17
## Added
- **System architecture** - `99-System` folder for system-level organization
- **Plugin management** - Python script for plugin version tracking (CSV/TXT output)
- **Template examples** - Concrete examples for each attribute type in Inbox
## Changed
- **Documentation consolidation** - Merged Tags Complete Guide into PKM Tags
- **Template review** - Comprehensive template and metadata file updates
- **Query system** - Enhanced folder notes with modification date overviews
## Fixed
- **Script visibility** - Python scripts properly organized in Script folder
---
## [v1.2.6] – 2025-07-12
## Added
- **Kanban workflow system**:
    - Kanban Handbook
    - PKM Kanban Templates
    - Template Cards for Kanban (General, Content, Learning)
- **Comprehensive handbooks**:
    - Templater Handbook 2025
    - Obsidian Troubleshooting Handbook
    - Enhanced Debug Guide
- **Experimental tools** - NOT TESTED Batch-Tag-Updater
- **Guidelines** - Systematic guidelines documentation
---
## Summary Statistics
**Development Period:** 13 months (January 2025 - January 2026)  
**Total Changes:** 100+ individual updates  
**Major Releases:** 8 (v1.0.0 through v1.8.0)  
**Update Sessions:** 20+ development cycles
**Change Distribution:**
- **Added:** 75+ new features and components (70%)
- **Changed:** 25+ modifications and improvements (25%)
- **Fixed:** 10+ bug fixes and resolutions (5%)
**Focus Areas (v1.7.0-v1.8.0):**
- AI & Meta-Skills Integration (30%)
- Template System Overhaul (25%)
- Review & GTD Systems (20%)
- Security & Infrastructure (15%)
- Gamification & Tracking (10%)
---
## [v1.2.2] – 2025-07-09
### Added
- **+About** query system for notes starting with "+About..."
- **Git Handbook** for version control guidance
- **Plugins evaluation** list in Backlog
- **Calendar Logs** folder for better organization
- **Guidelines** section (under development)

### Changed
- **Release workflow** refinement and testing
- **Git backup** process improvements

### Fixed
- Release test workflow implementation

---

## [v1.2.1] – 2025-06-30
### Added
- **Backlog** system for tracking future improvements
- **Enhanced Auto Note Mover** with individual tag efforts (#🔥on, etc.)
- **Ideas and Concepts** dots for better knowledge linking

### Changed
- **Templater scripts** updated for better functionality
- **Hotkey system** - Quick tag hotkey changed to CTRL+ALT+T
- **Tag management** - cleared out redundant tags

### Fixed
- Release date scheduling issues

---

## [v1.2.0] – 2025-06-25
### Added
- **Weekly Review** system for regular maintenance
- **Templater automation scripts**: Weekly Maintenance, Daily note, Archive
- **QuickAdd Handbook** for quick capture workflows
- **Git workflow** documentation
- **Origin Vault processes** and procedures
- **Origin MAINFRAME** central hub
- **Implementation checklist** for systematic setup
- **Weekly Git backup** shell script
- **Origin Vault Workflow Guide** comprehensive documentation

### Changed
- **Template system** upgraded from "Template, Properties, Effort (Kit)" to "Templa"
- **Sidebar** enhancements and updates
- **Metadata integration** into Changelog

### Fixed
- Removed outdated README v2

---

## [v1.1.0] – 2025-06-17
### Added
- **Feedback system** for BETA versions
- **Version tracking** capabilities

### Changed
- Version progression from 1.0 to 1.1

---

## [v1.0.1] – 2025-06-16
### Added
- **Vault metadata** system
- **Plugin version tracking** in dedicated note
- **Git backup** implementation
- **User feedback** collection system

### Changed
- Major version release from 1.0 to 1.1

---

## [v1.0.0] – 2025-06-12
### Added
- **Timestamp and Date utilities**: InsertTimestamp, InsertDateTag, ConvertText
- **Template Index** for better template management
- **PKM Tasks** system
- **Script collection**: CMD, JS, AHK for future automation
- **Dataview Query Handbook** for advanced queries
- **Evergreen notes** system
- **BOAT notes** methodology
- **README** documentation

### Changed
- **Templater structure** - separated Templates and Templater
- **Note organization** - combined Dataview components

---

## [v0.9.0] – 2025-06-10
### Added
- **START HERE** quick start guide
- **Automated tagging** script based on context
- **Automated note moving** script based on tags

### Changed
- **Journal system** verification and improvements

---

## [v0.8.0] – 2025-06-08
### Added
- **Hotkeys & Automation** comprehensive system
  - Daily, Weekly, Monthly automation
  - Total hotkeys integration
  - Templater functionality
- **Hotkeys Quick Reference** for Obsidian, Windows, PowerToys, FastKeys
- **Visual hotkeys** multiple showcase methods
- **Icon pack** for better visual organization
- **Template collection**: Inbox Capture, Archive note, Home Navigation, Quick Tagging
- **PKM Tags** system with complete guide
- **PKM Metadata** structure for individual notes

### Changed
- **Template organization** - structured into folders
- **Syntax improvements** - fixed folder naming issues

### Fixed
- **Folder naming** - resolved "05-Archive" syntax error with dash and numbering

---

## [v0.7.0] – 2025-06-06
### Added
- **AI Copilot** integration for assistance
- **Sidebar** with Dataview of captured notes and performance metrics
- **Performance Metrics** tracking system
- **Knowledge organization**: Library, Maps, Add, Language MOC, Relate, Thinking Map, Communicate
- **Debug Guide** for troubleshooting
- **PKM MOC** (Map of Contents)
- **Plugin comparison** research (Vyhledávání plugin porovnání)

### Changed
- **Dashboard templates** - marked for future enhancement

---

## [v0.6.0] – 2025-06-05
### Added
- **Home sidebar** integration
- **Template folders** organization
- **YAML templater** basics
- **Documentation** improvements
- **Hotkeys & Automation** evolution
- **Bilingual vault** solution (EN + CZ)

### Changed
- **Tag system** improvements with suggestions
- **Plugin visualization** updates

### Fixed
- **Sidebar CSS** - missing cssclass = sidebar

---

## [v0.5.0] – 2025-06-04
### Added
- **PKM foundation systems**:
  - PKM Metadata
  - PKM Queries
  - PKM Folders
  - PKM Tags
  - PKM Workflows - Global Guidelines
- **README** documentation
- **AI brainstorming** for Meta Vault

### Changed
- **Version 1.1** saved
- **Vault restructuring** major reorganization
- **Query system** - prevented self-referencing

---

## [v0.1.0] – 2025-05-30
### Added
- **Foundation elements**:
  - Changelog system
  - Home hub
- **Version 1.0** project initiation

---

## [v0.0.1] – 2025-01-01
### Added
- **Initial template** system

---

*This release notes summary consolidates all changes from the project changelog, organized chronologically from most recent to oldest.*
