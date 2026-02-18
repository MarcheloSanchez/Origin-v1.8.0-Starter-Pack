/**
 * YAML Schema Validator for Origin PKM
 *
 * Validates note frontmatter against type-specific schemas.
 * Reports missing required fields, invalid enum values, and format issues.
 *
 * Usage (Templater):
 *   const validator = await tp.user.yaml_validator();
 *   const result = validator.validateNote(yaml, 'effort');
 *
 * Usage (QuickAdd):
 *   Run with arguments: {"mode": "lint", "folder": "03-Efforts"}
 *
 * Created: 2026-02-05
 */

module.exports = () => {
  // ============================================
  // SCHEMA DEFINITIONS
  // ============================================

  const SCHEMAS = {
    // Base schema (all notes)
    base: {
      required: ['title', 'type', 'status', 'created'],
      optional: ['modified', 'tags', 'related', 'fileClass', 'aliases'],
      enums: {
        status: ['📥inbox', '🔄active', '⏳waiting', '✅completed', '📦archived', '⏸️paused', '❌cancelled', '⚠️blocked'],
        type: ['atomic', 'effort', 'source', 'moc', 'meeting', 'prompt', 'tool', 'person', 'place', 'area', 'daily', 'weekly', 'monthly', 'archive']
      },
      dateFields: ['created', 'modified'],
      arrayFields: ['tags', 'related', 'aliases']
    },

    // Atomic notes (02-Dots)
    atomic: {
      extends: 'base',
      required: ['title', 'type', 'status', 'created', 'tags'],
      optional: ['maturity', 'domain', 'confidence_level', 'evidence_quality', 'related'],
      enums: {
        maturity: ['📤seed', '🌱seedling', '🪴sapling', '🌲evergreen', '🍓fruit'],
        confidence_level: ['high', 'medium', 'low', 'uncertain'],
        evidence_quality: ['strong', 'moderate', 'weak', 'anecdotal']
      }
    },

    // Effort/Project notes (03-Efforts)
    effort: {
      extends: 'base',
      required: ['title', 'type', 'status', 'created', 'priority'],
      optional: ['due', 'completion_percentage', 'next_actions', 'energy', 'context', 'blockers', 'outcome'],
      enums: {
        priority: ['high', 'medium', 'low'],
        energy: ['high', 'medium', 'low'],
        context: ['work', 'home', 'computer', 'calls', 'errands', 'anywhere']
      },
      dateFields: ['created', 'modified', 'due', 'start', 'end'],
      numericFields: ['completion_percentage']
    },

    // Source notes (04-Sources)
    source: {
      extends: 'base',
      required: ['title', 'type', 'status', 'created'],
      optional: ['source_author', 'source_type', 'source_url', 'source_date', 'read_status', 'rating'],
      enums: {
        source_type: ['book', 'article', 'video', 'podcast', 'course', 'paper', 'website'],
        read_status: ['unread', 'reading', 'completed', 'reference'],
        rating: ['1', '2', '3', '4', '5']
      }
    },

    // MOC notes (01-MOCs)
    moc: {
      extends: 'base',
      required: ['title', 'type', 'status', 'created'],
      optional: ['coverage_areas', 'completeness', 'review_frequency', 'last_review'],
      enums: {
        completeness: ['draft', 'partial', 'comprehensive'],
        review_frequency: ['weekly', 'monthly', 'quarterly']
      }
    },

    // Meeting notes
    meeting: {
      extends: 'base',
      required: ['title', 'type', 'status', 'created'],
      optional: ['participants', 'meeting_type', 'location', 'action_items', 'meeting_date', 'duration'],
      enums: {
        meeting_type: ['standup', 'planning', 'review', 'retrospective', '1-on-1', 'workshop']
      },
      arrayFields: ['participants', 'action_items']
    },

    // Person notes (300-People)
    person: {
      extends: 'base',
      required: ['title', 'type', 'status', 'created'],
      optional: ['relationship', 'contact_method', 'last_interaction', 'areas_of_expertise'],
      enums: {
        relationship: ['colleague', 'mentor', 'friend', 'family', 'client', 'acquaintance']
      }
    },

    // Tool notes (500-Tools)
    tool: {
      extends: 'base',
      required: ['title', 'type', 'status', 'created'],
      optional: ['tool_category', 'mastery_level', 'usage_frequency', 'cost', 'platform'],
      enums: {
        mastery_level: ['beginner', 'intermediate', 'advanced', 'expert'],
        usage_frequency: ['daily', 'weekly', 'monthly', 'rarely']
      }
    },

    // Daily notes (05-Calendar)
    daily: {
      extends: 'base',
      required: ['title', 'type', 'created'],
      optional: ['energy', 'mood', 'focus_area', 'wins_today'],
      enums: {
        energy: ['high', 'medium', 'low']
      }
    }
  };

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  /**
   * Merge schema with base schema
   */
  const getFullSchema = (type) => {
    const schema = SCHEMAS[type] || SCHEMAS.base;
    const base = SCHEMAS.base;

    return {
      required: [...new Set([...(base.required || []), ...(schema.required || [])])],
      optional: [...new Set([...(base.optional || []), ...(schema.optional || [])])],
      enums: { ...base.enums, ...schema.enums },
      dateFields: [...new Set([...(base.dateFields || []), ...(schema.dateFields || [])])],
      arrayFields: [...new Set([...(base.arrayFields || []), ...(schema.arrayFields || [])])],
      numericFields: schema.numericFields || []
    };
  };

  /**
   * Check if value is valid date format (YYYY-MM-DD)
   */
  const isValidDate = (value) => {
    if (!value) return true; // Empty is not invalid, just missing
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(String(value));
  };

  /**
   * Check if value is valid array
   */
  const isValidArray = (value) => {
    return Array.isArray(value);
  };

  // ============================================
  // VALIDATION FUNCTIONS
  // ============================================

  /**
   * Validate a single note's YAML
   * @param {object} yaml - Parsed YAML frontmatter
   * @param {string} type - Note type (effort, atomic, source, etc.)
   * @returns {object} - { valid, errors, warnings }
   */
  const validateNote = (yaml, type = null) => {
    const errors = [];
    const warnings = [];

    if (!yaml) {
      return { valid: false, errors: ['No frontmatter found'], warnings: [] };
    }

    // Determine type from yaml or parameter
    const noteType = type || yaml.type || 'base';
    const schema = getFullSchema(noteType);

    // 1. Check required fields
    schema.required.forEach(field => {
      if (yaml[field] === undefined || yaml[field] === null || yaml[field] === '') {
        errors.push(`Missing required field: ${field}`);
      }
    });

    // 2. Validate enum values
    Object.entries(schema.enums || {}).forEach(([field, allowedValues]) => {
      if (yaml[field] !== undefined && yaml[field] !== null && yaml[field] !== '') {
        const value = String(yaml[field]).toLowerCase();
        const normalizedAllowed = allowedValues.map(v => v.toLowerCase());
        if (!normalizedAllowed.includes(value)) {
          warnings.push(`Invalid ${field}: "${yaml[field]}". Expected: ${allowedValues.join(', ')}`);
        }
      }
    });

    // 3. Validate date fields
    (schema.dateFields || []).forEach(field => {
      if (yaml[field] && !isValidDate(yaml[field])) {
        warnings.push(`Invalid date format for ${field}: "${yaml[field]}". Expected: YYYY-MM-DD`);
      }
    });

    // 4. Validate array fields
    (schema.arrayFields || []).forEach(field => {
      if (yaml[field] && !isValidArray(yaml[field])) {
        warnings.push(`Field ${field} should be an array`);
      }
    });

    // 5. Validate numeric fields
    (schema.numericFields || []).forEach(field => {
      if (yaml[field] !== undefined && yaml[field] !== null && yaml[field] !== '') {
        const num = Number(yaml[field]);
        if (isNaN(num)) {
          warnings.push(`Field ${field} should be numeric: "${yaml[field]}"`);
        }
      }
    });

    // 6. Check for unknown fields (optional - just info)
    const knownFields = [...schema.required, ...schema.optional, 'position', 'frontmatterLinks'];
    Object.keys(yaml).forEach(field => {
      if (!knownFields.includes(field)) {
        // Don't warn about common system fields
        if (!['cssclasses', 'cssclass', 'obsidianUIMode', 'up', 'in'].includes(field)) {
          // This is just informational, not a warning
        }
      }
    });

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      type: noteType
    };
  };

  /**
   * Validate multiple notes via Dataview
   * @param {object} dv - Dataview API object
   * @param {string} folder - Folder path to validate
   * @param {object} options - { limit, type }
   * @returns {array} - Array of validation results
   */
  const validateFolder = (dv, folder = '""', options = {}) => {
    try {
      const limit = options.limit || 100;
      const filterType = options.type || null;

      const pages = dv.pages(folder)
        .where(p => !p.file.path.includes('Templates'))
        .limit(limit);

      const results = [];

      pages.forEach(p => {
        const cache = app.metadataCache.getFileCache(app.vault.getAbstractFileByPath(p.file.path));
        const yaml = cache?.frontmatter;

        if (!yaml) {
          results.push({
            file: p.file.link,
            path: p.file.path,
            valid: false,
            errors: ['No frontmatter'],
            warnings: []
          });
          return;
        }

        const type = filterType || yaml.type || 'base';
        const validation = validateNote(yaml, type);

        if (!validation.valid || validation.warnings.length > 0) {
          results.push({
            file: p.file.link,
            path: p.file.path,
            ...validation
          });
        }
      });

      return results;
    } catch (e) {
      console.error('yaml_validator: validateFolder error:', e);
      return [];
    }
  };

  /**
   * Render validation report as Dataview output
   * @param {object} dv - Dataview API object
   * @param {string} folder - Folder to validate
   * @param {object} options
   */
  const renderValidationReport = (dv, folder = '""', options = {}) => {
    try {
      const results = validateFolder(dv, folder, options);
      const errors = results.filter(r => !r.valid);
      const warnings = results.filter(r => r.valid && r.warnings.length > 0);

      dv.header(3, `📋 YAML Validation Report`);
      dv.paragraph(`**Folder:** ${folder}`);
      dv.paragraph(`**Issues found:** ${errors.length} errors, ${warnings.length} warnings`);

      if (errors.length > 0) {
        dv.header(4, `🔴 Errors (${errors.length})`);
        dv.table(
          ["Note", "Errors"],
          errors.slice(0, 20).map(r => [r.file, r.errors.join('; ')])
        );
      }

      if (warnings.length > 0) {
        dv.header(4, `🟡 Warnings (${warnings.length})`);
        dv.table(
          ["Note", "Warnings"],
          warnings.slice(0, 20).map(r => [r.file, r.warnings.join('; ')])
        );
      }

      if (errors.length === 0 && warnings.length === 0) {
        dv.paragraph("✅ All notes pass validation!");
      }
    } catch (e) {
      dv.paragraph(`⚠️ Error running validation: ${e.message}`);
    }
  };

  // ============================================
  // PUBLIC API
  // ============================================

  return {
    SCHEMAS,
    getFullSchema,
    validateNote,
    validateFolder,
    renderValidationReport,
    isValidDate,
    isValidArray
  };
};
