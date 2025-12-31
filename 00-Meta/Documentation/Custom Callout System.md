
Test out in template mode

## Custom Callout System 

#🧹tidy  - Not applied because right now are Nick_Custom_Callout doing something. Think about in future

### Core Callouts

**File**: `.obsidian/snippets/custom-callouts.css`

```css
/* PKM System Custom Callouts */

/* Success & Progress Callouts */
.callout[data-callout="success"] {
  --callout-color: 46, 213, 115;
  --callout-icon: lucide-check-circle;
}

.callout[data-callout="progress"] {
  --callout-color: 0, 184, 148;  
  --callout-icon: lucide-trending-up;
}

.callout[data-callout="win"] {
  --callout-color: 85, 163, 255;
  --callout-icon: lucide-trophy;
}

/* Insight & Learning Callouts */
.callout[data-callout="insight"] {
  --callout-color: 253, 203, 110;
  --callout-icon: lucide-lightbulb;
}

.callout[data-callout="connection"] {
  --callout-color: 116, 185, 255;
  --callout-icon: lucide-link-2;
}

.callout[data-callout="synthesis"] {
  --callout-color: 140, 122, 230;
  --callout-icon: lucide-layers;
}

/* Action & Planning Callouts */
.callout[data-callout="action"] {
  --callout-color: 255, 107, 107;
  --callout-icon: lucide-zap;
}

.callout[data-callout="next"] {
  --callout-color: 255, 159, 67;
  --callout-icon: lucide-arrow-right;
}

.callout[data-callout="planning"] {
  --callout-color: 116, 185, 255;
  --callout-icon: lucide-calendar;
}

/* System & Meta Callouts */
.callout[data-callout="system"] {
  --callout-color: 116, 125, 140;
  --callout-icon: lucide-settings;
}

.callout[data-callout="meta"] {
  --callout-color: 162, 155, 254;
  --callout-icon: lucide-layers-3;
}

.callout[data-callout="maintenance"] {
  --callout-color: 255, 159, 67;
  --callout-icon: lucide-wrench;
}

/* Research & Analysis Callouts */
.callout[data-callout="hypothesis"] {
  --callout-color: 116, 185, 255;
  --callout-icon: lucide-flask;
}

.callout[data-callout="evidence"] {
  --callout-color: 140, 122, 230;
  --callout-icon: lucide-search;
}

.callout[data-callout="methodology"] {
  --callout-color: 64, 115, 158;
  --callout-icon: lucide-workflow;
}

/* Creative & Brainstorming Callouts */
.callout[data-callout="idea"] {
  --callout-color: 253, 203, 110;
  --callout-icon: lucide-spark;
}

.callout[data-callout="brainstorm"] {
  --callout-color: 255, 159, 67;
  --callout-icon: lucide-brain;
}

.callout[data-callout="creative"] {
  --callout-color: 140, 122, 230;
  --callout-icon: lucide-palette;
}

/* Problem & Solution Callouts */
.callout[data-callout="problem"] {
  --callout-color: 255, 107, 107;
  --callout-icon: lucide-alert-circle;
}

.callout[data-callout="solution"] {
  --callout-color: 46, 213, 115;
  --callout-icon: lucide-check-square;
}

.callout[data-callout="obstacle"] {
  --callout-color: 255, 159, 67;
  --callout-icon: lucide-construction;
}

/* Review & Reflection Callouts */
.callout[data-callout="reflect"] {
  --callout-color: 116, 125, 140;
  --callout-icon: lucide-mirror;
}

.callout[data-callout="lesson"] {
  --callout-color: 0, 184, 148;
  --callout-icon: lucide-graduation-cap;
}

.callout[data-callout="pattern"] {
  --callout-color: 140, 122, 230;
  --callout-icon: lucide-trending-up;
}

```

### Callout Usage Examples

**In Templates**:
```markdown
> [!success] Project Milestone Reached
> Successfully completed the literature review phase ahead of schedule. Key finding: 23 relevant papers identified with strong methodology overlap.

> [!insight] Connection Discovered  
> The remote work creativity research connects strongly to attention restoration theory - remote workers may benefit from nature breaks between creative sessions.

> [!action] Next Steps Required
> - [ ] Complete statistical analysis by Friday
> - [ ] Schedule follow-up interview with 5 participants
> - [ ] Begin drafting methodology section

> [!system] Template Update Needed
> Current project template feels repetitive for quick updates. Consider creating simplified update template.

> [!reflect] Weekly Learning
> This week's pattern: Deep work sessions most productive in morning, creative insights often come during walks/breaks.
```

## Visual Hierarchy System

### Header Styling

**File**: `.obsidian/snippets/visual-hierarchy.css`

```css
/* Visual Hierarchy Enhancements */

/* Emoji-Enhanced Headers */
.markdown-preview-view h1::before,
.markdown-rendered h1::before {
  content: "🎯 ";
  margin-right: 8px;
}

.markdown-preview-view h2::before,
.markdown-rendered h2::before {
  content: "📋 ";
  margin-right: 6px;
  font-size: 0.9em;
}

.markdown-preview-view h3::before,
.markdown-rendered h3::before {
  content: "• ";
  margin-right: 4px;
  color: var(--text-accent);
  font-weight: bold;
}

/* Status-Based Styling */
.frontmatter-container[data-status="active"] {
  border-left: 4px solid #2ed573;
  background: rgba(46, 213, 115, 0.1);
}

.frontmatter-container[data-status="waiting"] {
  border-left: 4px solid #ffd32a;
  background: rgba(255, 211, 42, 0.1);
}

.frontmatter-container[data-status="completed"] {
  border-left: 4px solid #00b894;
  background: rgba(0, 184, 148, 0.1);
}

/* Priority Visual Indicators */
.markdown-preview-view .tag[href="#high-priority"],
.markdown-rendered .tag[href="#high-priority"] {
  background: #ff4757;
  color: white;
  font-weight: bold;
  border-radius: 12px;
  padding: 2px 8px;
}

.markdown-preview-view .tag[href="#urgent"],
.markdown-rendered .tag[href="#urgent"] {
  background: #ff3838;
  color: white;
  font-weight: bold;
  border-radius: 12px;
  padding: 2px 8px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

/* Note Type Indicators */
.markdown-preview-view .tag[href="#atomic"],
.markdown-rendered .tag[href="#atomic"] {
  background: #3742fa;
  color: white;
}

.markdown-preview-view .tag[href="#effort"],
.markdown-rendered .tag[href="#effort"] {
  background: #2ed573;
  color: white;
}

.markdown-preview-view .tag[href="#source"],
.markdown-rendered .tag[href="#source"] {
  background: #ff6b6b;
  color: white;
}

.markdown-preview-view .tag[href="#moc"],
.markdown-rendered .tag[href="#moc"] {
  background: #8c7ae6;
  color: white;
}

/* Progress Bars for Projects */
.progress-bar {
  width: 100%;
  height: 20px;
  background-color: var(--background-secondary);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2ed573, #00b894);
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
}

/* Dashboard Grid Layout */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.dashboard-card {
  background: var(--background-secondary);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--background-modifier-border);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.dashboard-card h3 {
  margin-top: 0;
  color: var(--text-accent);
  border-bottom: 2px solid var(--text-accent);
  padding-bottom: 8px;
}
```

### Mobile-Friendly Visual Adjustments

```css
/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    margin: 15px 0;
  }
  
  .dashboard-card {
    padding: 15px;
    border-radius: 8px;
  }
  
  .markdown-preview-view h1::before,
  .markdown-rendered h1::before,
  .markdown-preview-view h2::before,
  .markdown-rendered h2::before {
    display: none; /* Hide emoji headers on mobile for space */
  }
  
  .tag {
    font-size: 11px;
    padding: 1px 6px;
  }
  
  .progress-bar {
    height: 16px;
    margin: 8px 0;
  }
}
```

## Theme Integration

### Light/Dark Theme Support

**File**: `.obsidian/snippets/theme-integration.css`

```css
/* Theme-Aware Visual Elements */

/* Light Theme Specific */
.theme-light {
  --pkm-primary: #3742fa;
  --pkm-success: #2ed573;
  --pkm-warning: #ffd32a;
  --pkm-danger: #ff4757;
  --pkm-info: #40739e;
  
  --pkm-bg-primary: rgba(255, 255, 255, 0.9);
  --pkm-bg-secondary: rgba(248, 249, 250, 0.9);
  --pkm-border: rgba(0, 0, 0, 0.1);
  --pkm-shadow: rgba(0, 0, 0, 0.1);
}

/* Dark Theme Specific */
.theme-dark {
  --pkm-primary: #5352ed;
  --pkm-success: #00b894;
  --pkm-warning: #fdcb6e;
  --pkm-danger: #ff7675;
  --pkm-info: #74b9ff;
  
  --pkm-bg-primary: rgba(30, 30, 30, 0.9);
  --pkm-bg-secondary: rgba(45, 45, 45, 0.9);
  --pkm-border: rgba(255, 255, 255, 0.1);
  --pkm-shadow: rgba(0, 0, 0, 0.3);
}

/* Universal Elements Using Theme Variables */
.pkm-card {
  background: var(--pkm-bg-secondary);
  border: 1px solid var(--pkm-border);
  box-shadow: 0 2px 8px var(--pkm-shadow);
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
}

.pkm-highlight {
  background: var(--pkm-primary);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.pkm-status-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.pkm-status-active { background: var(--pkm-success); }
.pkm-status-waiting { background: var(--pkm-warning); }
.pkm-status-blocked { background: var(--pkm-danger); }
.pkm-status-completed { background: var(--pkm-info); }
```

## Visual Templates

### Dashboard Card Template

**Usage in notes**:
```html
<div class="dashboard-grid">
  <div class="dashboard-card">
    <h3>🚀 Active Projects</h3>
    <!-- Dataview query here -->
  </div>
  
  <div class="dashboard-card">
    <h3>📥 Inbox Status</h3>
    <!-- System health info -->
  </div>
  
  <div class="dashboard-card">
    <h3>💡 Recent Insights</h3>
    <!-- Latest atomic notes -->
  </div>
</div>
```

### Progress Visualization Template

**For project notes**:
```html
<div class="progress-bar">
  <div class="progress-fill" style="width: 65%;">65% Complete</div>
</div>
```

### Status Cards Template

**For system health**:
```markdown
> [!success]+ System Health: Excellent
> - 📥 Inbox: 8 items ✅
> - 🚀 Active Projects: 4 ✅  
> - 🔗 Connection Density: 78% ✅
> - 📚 Learning Velocity: 3 sources/week ✅

> [!system]+ This Week's Focus
> **Priority Theme**: Research Project Sprint
> **Energy Management**: Morning deep work, afternoon processing
> **Review Scheduled**: Friday 4 PM
```

## Icon Usage Guidelines

### Consistency Rules

1. **Same Icon = Same Meaning**: Never use 🚀 for both projects and rockets
2. **Contextual Hierarchy**: More important = more visually prominent icon
3. **Emotional Resonance**: Match icon feeling to content (⚡ for energy, 🌱 for growth)
4. **Cultural Awareness**: Avoid icons with strong cultural connotations
5. **Accessibility First**: Icons enhance, never replace text meaning

### Template Integration

**Standard format for all templates**:
```markdown
# 🎯 [Title] - [Icon represents note type/purpose]

## 📋 [Section] - [Icon represents section function]

### • [Subsection] - [Bullet for hierarchy]

**🔑 Key Point**: [Bold icon for emphasis]
**⚡ Action Required**: [Dynamic icon for urgency]
**💡 Insight**: [Light bulb for ideas]
```

### Icon Evolution Strategy

**Monthly icon review**:
- Which icons are used most frequently?
- Are any icons confusing or misleading?
- What new icon needs have emerged?
- How can icon system be simplified?

**Icon retirement process**:
- Identify low-usage icons
- Find replacements or combinations
- Update all templates systematically
- Document changes in system evolution log

---

This visual organization system transforms the functional PKM templates into an aesthetically coherent, psychologically supportive, and visually scannable knowledge management environment that works across light/dark themes and desktop/mobile platforms.