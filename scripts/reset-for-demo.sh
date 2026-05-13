#!/bin/bash
# =============================================================================
# BofA Digital Banking Demo — Pre-Demo Reset Script
# =============================================================================
# Run this 5 minutes before the demo to ensure a clean state.
# Usage: ./scripts/reset-for-demo.sh
#
# Requires: gh CLI (https://cli.github.com/) OR set GITHUB_TOKEN env var
# =============================================================================

REPO="ezraodio/bofa-digital-banking-demo"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}=== BofA Demo Reset ===${NC}"
echo ""

# Check for gh CLI or GITHUB_TOKEN
if command -v gh &> /dev/null; then
  USE_GH=true
elif [ -n "$GITHUB_TOKEN" ]; then
  USE_GH=false
  echo -e "  ${YELLOW}gh CLI not found, using GITHUB_TOKEN with curl${NC}"
else
  echo -e "${RED}ERROR: Need either 'gh' CLI or GITHUB_TOKEN env var${NC}"
  echo "  Install gh: https://cli.github.com/"
  echo "  Or: export GITHUB_TOKEN=ghp_your_token_here"
  exit 1
fi

# Helper: GitHub API call
gh_api() {
  if [ "$USE_GH" = true ]; then
    gh api "$@" 2>/dev/null
  else
    local method="GET"
    local url="$1"
    shift
    while [[ "$#" -gt 0 ]]; do
      case "$1" in
        -X) method="$2"; shift 2 ;;
        --jq) shift 2 ;; # jq handled below
        *) shift ;;
      esac
    done
    curl -s -X "$method" -H "Authorization: token $GITHUB_TOKEN" -H "Accept: application/vnd.github.v3+json" "https://api.github.com/$url"
  fi
}

# 1. Close any open PRs from previous demo runs
echo -e "${YELLOW}[1/5] Closing any open PRs...${NC}"
if [ "$USE_GH" = true ]; then
  OPEN_PRS=$(gh pr list --repo "$REPO" --state open --json number --jq '.[].number' 2>/dev/null || echo "")
else
  OPEN_PRS=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$REPO/pulls?state=open" | python3 -c "import sys,json; [print(p['number']) for p in json.load(sys.stdin)]" 2>/dev/null || echo "")
fi
if [ -n "$OPEN_PRS" ]; then
  for pr in $OPEN_PRS; do
    echo "  Closing PR #$pr"
    if [ "$USE_GH" = true ]; then
      gh pr close "$pr" --repo "$REPO" 2>/dev/null || true
    else
      curl -s -X PATCH -H "Authorization: token $GITHUB_TOKEN" -H "Accept: application/vnd.github.v3+json" "https://api.github.com/repos/$REPO/pulls/$pr" -d '{"state":"closed"}' > /dev/null || true
    fi
  done
  echo -e "  ${GREEN}Done${NC}"
else
  echo -e "  ${GREEN}No open PRs${NC}"
fi

# 2. Delete any leftover migration branches (keep only main)
echo -e "${YELLOW}[2/5] Cleaning up migration branches...${NC}"
if [ "$USE_GH" = true ]; then
  BRANCHES=$(gh api "repos/$REPO/branches" --jq '.[].name' 2>/dev/null | grep -v '^main$' || echo "")
else
  BRANCHES=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$REPO/branches" | python3 -c "import sys,json; [print(b['name']) for b in json.load(sys.stdin) if b['name'] != 'main']" 2>/dev/null || echo "")
fi
if [ -n "$BRANCHES" ]; then
  for branch in $BRANCHES; do
    echo "  Deleting branch: $branch"
    curl -s -X DELETE -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$REPO/git/refs/heads/$branch" > /dev/null 2>&1 || true
  done
  echo -e "  ${GREEN}Done${NC}"
else
  echo -e "  ${GREEN}No branches to clean${NC}"
fi

# 3. Verify main branch has Angular 14
echo -e "${YELLOW}[3/5] Verifying main branch...${NC}"
ANGULAR_VERSION=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$REPO/contents/package.json?ref=main" | python3 -c "import sys,json,base64; print(json.loads(base64.b64decode(json.load(sys.stdin)['content']))['dependencies']['@angular/core'])" 2>/dev/null || echo "unknown")
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
echo "  [ ] Backup: PR #2 (https://github.com/$REPO/pull/2) is your fallback if live demo runs long"
echo ""
echo -e "${GREEN}=== Reset complete! Ready for demo ===${NC}"
