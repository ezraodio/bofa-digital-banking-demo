---
name: testing-bofa-app
description: How to build, test, and run the BofA Digital Banking app locally. Use this when you need to verify the app works, run tests, or capture screenshots.
---

# Testing the BofA Digital Banking App

## Quick Start

```bash
# Install dependencies
npm install

# Run tests (headless)
npx ng test --no-watch --browsers=ChromeHeadless

# Build (production)
npx ng build

# Serve locally
npx ng serve --port 4200
```

## Node Version Requirements

- **Angular 14 (`main` branch):** Node 16 (`nvm use 16`)
- **Angular 18 (`angular-18-migrated` branch):** Node 20 (`nvm use 20`)

## App Routes

- `/dashboard` — Main dashboard with alerts, balance widget, account cards, transaction list
- `/transfers` — Transfer form with account selection and amount input

## What to Verify

### Visual checks (localhost:4200/dashboard or :4201):
- Navy toolbar with "Digital Banking" title
- Left sidenav with Dashboard and Transfers links
- 3 alert banners (Suspicious Activity, Payment Due, Statement Available)
- Balance widget showing $55,202.31
- 3 account cards (Primary Checking, Emergency Fund, Cash Rewards Visa)
- Navy "Transfer" buttons on each card (NOT outlined, NOT pink/white)
- Transaction list with chip filter (All, Credits, Debits, Transfers, Payments)

### Test output:
- All specs should pass (44 on v14, 57 on v18)
- Zero build errors
- No `ng build` warnings about missing dependencies

## Auth Bootstrap

The app uses a mock auth session so it renders without a real SSO backend. The `AuthService` auto-creates a demo session on initialization. If you see a login redirect or blank page, the auth bootstrap is broken — check `auth.service.ts`.

## Brand Colors

- Primary (Red): `#c41230` — used for active nav items, "View Details" links
- Accent (Navy): `#012169` — used for toolbar background, "Transfer" buttons, focus outlines
- Background: `#f5f5f5` — main content area

## Demo Assets

Screenshots and recordings are in `demo-assets/`:
- `demo-assets/screenshots/` — 27 PNGs (v14 app, v18 app, code, terminal, PR diffs)
- `demo-assets/recordings/` — 2 MP4 walkthrough videos
