#!/usr/bin/env bash
# Reset the BofA Digital Banking demo repo to a clean state for a live demo.
# Usage: bash scripts/reset-for-demo.sh
#
# Requires: gh CLI (authenticated) OR GITHUB_TOKEN env var

set -euo pipefail

REPO="ezraodio/bofa-digital-banking-demo"
BRANCH_TO_DELETE="angular-18-migrated"

echo "=== BofA Demo Reset Script ==="
echo ""

# --- Close all open PRs ---
echo "Closing all open PRs..."
if command -v gh &>/dev/null; then
  OPEN_PRS=$(gh pr list --repo "$REPO" --state open --json number --jq '.[].number' 2>/dev/null || true)
  for pr in $OPEN_PRS; do
    echo "  Closing PR #$pr..."
    gh pr close "$pr" --repo "$REPO" 2>/dev/null || echo "  (already closed or failed)"
  done
elif [ -n "${GITHUB_TOKEN:-}" ]; then
  OPEN_PRS=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO/pulls?state=open" | \
    python3 -c "import sys,json; [print(p['number']) for p in json.load(sys.stdin)]" 2>/dev/null || true)
  for pr in $OPEN_PRS; do
    echo "  Closing PR #$pr..."
    curl -s -X PATCH -H "Authorization: token $GITHUB_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"state":"closed"}' \
      "https://api.github.com/repos/$REPO/pulls/$pr" >/dev/null 2>&1 || echo "  (failed)"
  done
else
  echo "  WARNING: Neither 'gh' CLI nor GITHUB_TOKEN found. Skipping PR cleanup."
  echo "  Manually close any open PRs at: https://github.com/$REPO/pulls"
fi

# --- Delete migration branches ---
echo ""
echo "Deleting remote branches..."
for branch in "$BRANCH_TO_DELETE"; do
  echo "  Deleting origin/$branch..."
  git push origin --delete "$branch" 2>/dev/null || echo "  (branch doesn't exist or already deleted)"
done

# Clean up any devin/ branches
DEVIN_BRANCHES=$(git ls-remote --heads origin 'refs/heads/devin/*' 2>/dev/null | awk '{print $2}' | sed 's|refs/heads/||' || true)
for branch in $DEVIN_BRANCHES; do
  echo "  Deleting origin/$branch..."
  git push origin --delete "$branch" 2>/dev/null || echo "  (failed)"
done

# --- Verify clean state ---
echo ""
echo "=== Pre-Demo Checklist ==="
echo ""

# Check branches
REMOTE_BRANCHES=$(git ls-remote --heads origin 2>/dev/null | awk '{print $2}' | sed 's|refs/heads/||' || true)
echo "Remote branches:"
for b in $REMOTE_BRANCHES; do
  if [ "$b" = "main" ]; then
    echo "  ✓ $b (expected)"
  else
    echo "  ✗ $b (unexpected — delete manually)"
  fi
done

# Check open PRs
echo ""
if command -v gh &>/dev/null; then
  PR_COUNT=$(gh pr list --repo "$REPO" --state open --json number --jq 'length' 2>/dev/null || echo "?")
  if [ "$PR_COUNT" = "0" ]; then
    echo "Open PRs: ✓ none"
  else
    echo "Open PRs: ✗ $PR_COUNT still open — close them at https://github.com/$REPO/pulls"
  fi
else
  echo "Open PRs: (install gh CLI to auto-check, or verify at https://github.com/$REPO/pulls)"
fi

echo ""
echo "=== Ready for demo ==="
echo ""
echo "Open these tabs:"
echo "  1. https://github.com/$REPO (main branch)"
echo "  2. https://app.devin.ai (Playbook ready)"
echo "  3. https://comparison-slide-ljoqqeat.devinapps.com (code comparison)"
echo "  4. https://comparison-deploy-byyhabuu.devinapps.com (visual before/after)"
