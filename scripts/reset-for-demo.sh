#!/bin/bash
# =============================================================================
# BofA Digital Banking Demo — Pre-Demo Reset Script
# =============================================================================
# Run this 5 minutes before the demo to ensure a clean state.
# Usage: ./scripts/reset-for-demo.sh
# =============================================================================

set -e

REPO="ezraodio/bofa-digital-banking-demo"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}=== BofA Demo Reset ===${NC}"
echo ""

# 1. Close any open PRs from previous demo runs
echo -e "${YELLOW}[1/5] Closing any open PRs...${NC}"
OPEN_PRS=$(gh pr list --repo "$REPO" --state open --json number --jq '.[].number' 2>/dev/null || echo "")
if [ -n "$OPEN_PRS" ]; then
  for pr in $OPEN_PRS; do
    echo "  Closing PR #$pr"
    gh pr close "$pr" --repo "$REPO" 2>/dev/null || true
  done
  echo -e "  ${GREEN}Done${NC}"
else
  echo -e "  ${GREEN}No open PRs${NC}"
fi

# 2. Delete any leftover migration branches
echo -e "${YELLOW}[2/5] Cleaning up migration branches...${NC}"
BRANCHES=$(gh api "repos/$REPO/branches" --jq '.[].name' 2>/dev/null | grep -v '^main$' | grep -v '^initial-setup$' || echo "")
if [ -n "$BRANCHES" ]; then
  for branch in $BRANCHES; do
    echo "  Deleting branch: $branch"
    gh api -X DELETE "repos/$REPO/git/refs/heads/$branch" 2>/dev/null || true
  done
  echo -e "  ${GREEN}Done${NC}"
else
  echo -e "  ${GREEN}No branches to clean${NC}"
fi

# 3. Verify main branch has Angular 14
echo -e "${YELLOW}[3/5] Verifying main branch...${NC}"
ANGULAR_VERSION=$(gh api "repos/$REPO/contents/package.json?ref=main" --jq '.content' 2>/dev/null | base64 -d | python3 -c "import sys,json; print(json.load(sys.stdin)['dependencies']['@angular/core'])" 2>/dev/null || echo "unknown")
echo -e "  Angular version on main: ${GREEN}$ANGULAR_VERSION${NC}"

# 4. Verify Devin Playbook is accessible
echo -e "${YELLOW}[4/5] Playbook URL:${NC}"
echo -e "  ${GREEN}https://app.devin.ai/settings/playbooks/b58c6d6b9d314bab8173083cacedce2b${NC}"
echo "  (Open this and verify it loads)"

# 5. Pre-demo checklist
echo ""
echo -e "${YELLOW}[5/5] Pre-Demo Checklist:${NC}"
echo "  [ ] Browser tab 1: GitHub repo (https://github.com/$REPO)"
echo "  [ ] Browser tab 2: Devin app with Playbook open"
echo "  [ ] Browser tab 3: Comparison slide (https://comparison-slide-ljoqqeat.devinapps.com)"
echo "  [ ] Browser tab 4: localhost:4200 (run: nvm use 16 && npm install && npx ng serve)"
echo "  [ ] Network: Verify stable internet connection"
echo "  [ ] Backup: Know where PR #1 backup is if live demo fails"
echo ""
echo -e "${GREEN}=== Reset complete! Ready for demo ===${NC}"
