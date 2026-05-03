#!/bin/bash
# build-starter-pack.sh — Export clean Origin Starter Pack from personal vault
# Usage: bash 99-System/Scripts/build-starter-pack.sh [output-dir]
# Run from vault root: cd Origin-v1.9.1-Starter-Pack && bash 99-System/Scripts/build-starter-pack.sh
#
# Compatible with: Git Bash (Windows), bash (macOS/Linux)

set -euo pipefail

# ── Config ──────────────────────────────────────────────────────────────
VAULT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
VERSION=$(grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' "$VAULT_ROOT/CHANGELOG.md" | head -1 || echo "v2.0.0")
OUTPUT_DIR="${1:-$VAULT_ROOT/../Origin-Starter-Pack-$VERSION}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

echo "==================================================="
echo "  Origin Starter Pack Builder"
echo "  Source:  $VAULT_ROOT"
echo "  Output:  $OUTPUT_DIR"
echo "  Version: $VERSION"
echo "==================================================="

# ── Safety check ────────────────────────────────────────────────────────
if [[ -d "$OUTPUT_DIR" ]]; then
  echo "WARNING: Output directory exists. Backing up to ${OUTPUT_DIR}.bak-$TIMESTAMP"
  mv "$OUTPUT_DIR" "${OUTPUT_DIR}.bak-$TIMESTAMP"
fi

mkdir -p "$OUTPUT_DIR"

# ── Step 1: Copy everything (cp -r, works everywhere) ──────────────────
echo ""
echo "[1/5] Copying vault..."
cp -r "$VAULT_ROOT/." "$OUTPUT_DIR/"

# Remove .git immediately (not needed in distribution)
rm -rf "$OUTPUT_DIR/.git" "$OUTPUT_DIR/.github" "$OUTPUT_DIR/NUL" 2>/dev/null || true

echo "   OK - Full copy complete"

# ── Step 2: Remove personal content ────────────────────────────────────
echo ""
echo "[2/5] Stripping personal content..."

# --- Inbox: keep only tutorials and +About ---
find "$OUTPUT_DIR/+Inbox" -maxdepth 1 -name '*.md' \
  ! -name 'Tutorial*' \
  ! -name '+*' \
  -delete 2>/dev/null && echo "   - Inbox" || true

# --- Calendar: remove personal daily notes, keep tutorials ---
find "$OUTPUT_DIR/05-Calendar/Daily" -maxdepth 1 -name '*.md' \
  ! -name 'Tutorial*' \
  ! -name '+*' \
  -delete 2>/dev/null && echo "   - Daily notes" || true

# --- Calendar: remove personal logs ---
rm -rf "$OUTPUT_DIR/05-Calendar/_Logs" 2>/dev/null || true

# --- Efforts: remove personal active/paused/waiting ---
rm -rf "$OUTPUT_DIR/03-Efforts/Active" 2>/dev/null || true
rm -rf "$OUTPUT_DIR/03-Efforts/Paused" 2>/dev/null || true
rm -rf "$OUTPUT_DIR/03-Efforts/Waiting" 2>/dev/null || true
echo "   - Personal Efforts"

# --- Sources: remove personal meeting notes (keep tutorials) ---
find "$OUTPUT_DIR/04-Sources/Meetings" -maxdepth 1 -name '*.md' \
  ! -name 'Tutorial*' \
  ! -name '+*' \
  ! -name 'Meetings.md' \
  -delete 2>/dev/null || true
# Remove personal source notes
for pattern in "Content -" "Research -"; do
  find "$OUTPUT_DIR/04-Sources" -maxdepth 1 -name "${pattern}*" -delete 2>/dev/null || true
done
echo "   - Personal Sources"

# --- Archive: remove personal completed work ---
rm -rf "$OUTPUT_DIR/06-Archive/Completed" 2>/dev/null || true
rm -rf "$OUTPUT_DIR/06-Archive/Prompts-Docs" 2>/dev/null || true
rm -f "$OUTPUT_DIR/06-Archive/Archive filled out.md" 2>/dev/null || true
rm -f "$OUTPUT_DIR/06-Archive/Archived_CHANGELOG.md" 2>/dev/null || true
echo "   - Archive"

# --- Prompts: keep 01-Docs, remove personal prompt content ---
rm -rf "$OUTPUT_DIR/99-System/Prompts/Reference" 2>/dev/null || true
rm -rf "$OUTPUT_DIR/99-System/Prompts/Workbench" 2>/dev/null || true
rm -rf "$OUTPUT_DIR/99-System/Prompts/Fun" 2>/dev/null || true
rm -rf "$OUTPUT_DIR/99-System/Prompts/Archive" 2>/dev/null || true
rm -rf "$OUTPUT_DIR/99-System/Prompts/Inbox" 2>/dev/null || true
echo "   - Personal Prompts"

# --- MOCs: remove personal MOC ---
find "$OUTPUT_DIR/01-MOCs" -maxdepth 1 -name '*My PKM*' -delete 2>/dev/null || true
echo "   - Personal MOCs"

# --- System: remove personal caches/reports ---
rm -f "$OUTPUT_DIR/99-System/Documentation/VAULT-REPORT.md" 2>/dev/null || true
rm -f "$OUTPUT_DIR/99-System/_Metrics Cache.md" 2>/dev/null || true
rm -rf "$OUTPUT_DIR/99-System/Documentation/Checklists" 2>/dev/null || true
echo "   - Personal System/Meta"

# --- Test/scratch files ---
rm -f "$OUTPUT_DIR/02-Knowledge/Atomics/test atomic.md" 2>/dev/null || true

# --- Misc personal dirs ---
rm -rf "$OUTPUT_DIR/QuickAdd Packages" 2>/dev/null || true
rm -rf "$OUTPUT_DIR/memory" 2>/dev/null || true
rm -rf "$OUTPUT_DIR/docs" 2>/dev/null || true
echo "   - Misc cleanup"

echo "   OK - Personal content stripped"

# ── Step 3: Remove all .base files (personal DB state) ─────────────────
echo ""
echo "[3/5] Removing .base files..."
BASE_COUNT=$(find "$OUTPUT_DIR" -name '*.base' | wc -l | tr -d ' ')
find "$OUTPUT_DIR" -name '*.base' -delete 2>/dev/null || true
echo "   OK - Removed $BASE_COUNT .base files"

# ── Step 4: Clean .obsidian state ──────────────────────────────────────
echo ""
echo "[4/5] Cleaning Obsidian state..."

# Remove personal workspace state
rm -f "$OUTPUT_DIR/.obsidian/workspace.json" 2>/dev/null || true

# Remove plugin usage/history data (keep functional configs)
rm -f "$OUTPUT_DIR/.obsidian/plugins/recent-files-obsidian/data.json" 2>/dev/null || true
rm -f "$OUTPUT_DIR/.obsidian/plugins/various-complements/histories.json" 2>/dev/null || true
rm -rf "$OUTPUT_DIR/.obsidian/plugins/smart-connections" 2>/dev/null || true

# Remove Claude temp files from Scripts
find "$OUTPUT_DIR/99-System/Scripts" -name 'tmpclaude-*' -delete 2>/dev/null || true

# Remove backup files
find "$OUTPUT_DIR" -name '*.bak-*' -delete 2>/dev/null || true
find "$OUTPUT_DIR" -name '*.backup' -delete 2>/dev/null || true

echo "   OK - Obsidian state cleaned"

# ── Step 5: Generate manifest ──────────────────────────────────────────
echo ""
echo "[5/5] Generating manifest..."

NOTE_COUNT=$(find "$OUTPUT_DIR" -name '*.md' | wc -l | tr -d ' ')
TEMPLATE_COUNT=$(find "$OUTPUT_DIR/Templates" -name '*.md' 2>/dev/null | wc -l | tr -d ' ')
SCRIPT_COUNT=$(find "$OUTPUT_DIR/99-System/Scripts" -name '*.js' 2>/dev/null | wc -l | tr -d ' ')
CIS_COUNT=$(find "$OUTPUT_DIR/99-System/CIS" -name '*.md' 2>/dev/null | wc -l | tr -d ' ')
TUTORIAL_COUNT=$(find "$OUTPUT_DIR" -name 'Tutorial*' | wc -l | tr -d ' ')
SOURCE_COMMIT=$(cd "$VAULT_ROOT" && git rev-parse --short HEAD 2>/dev/null || echo "unknown")

cat > "$OUTPUT_DIR/.starter-pack-manifest.json" << EOF
{
  "name": "Origin Starter Pack",
  "version": "$VERSION",
  "built": "$TIMESTAMP",
  "source_commit": "$SOURCE_COMMIT",
  "stats": {
    "notes": $NOTE_COUNT,
    "templates": $TEMPLATE_COUNT,
    "scripts": $SCRIPT_COUNT,
    "cis_enums": $CIS_COUNT,
    "tutorials": $TUTORIAL_COUNT
  }
}
EOF

echo "   OK - Manifest written"

# ── Summary ─────────────────────────────────────────────────────────────
echo ""
echo "==================================================="
echo "  Starter Pack built successfully!"
echo ""
echo "  Output:     $OUTPUT_DIR"
echo "  Notes:      $NOTE_COUNT"
echo "  Templates:  $TEMPLATE_COUNT"
echo "  Scripts:    $SCRIPT_COUNT"
echo "  CIS Enums:  $CIS_COUNT"
echo "  Tutorials:  $TUTORIAL_COUNT"
echo ""
echo "  Next steps:"
echo "    1. Open in Obsidian and verify everything works"
echo "    2. Check QuickAdd menus (Ctrl+Q)"
echo "    3. Verify no personal content leaked"
echo "    4. Zip and distribute!"
echo "==================================================="
