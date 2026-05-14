---
name: angular-14-to-18-migration
description: Migrate this BofA Digital Banking app from Angular 14 to Angular 18 following the 8-commit Playbook structure. Use this skill when performing the Angular migration.
---

# Angular 14 → 18 Migration

## Overview

This app is a BofA-style digital banking portal. Migrate it from Angular 14.2.0 to Angular 18.2.0 in 8 logical commits.

## Key Constraints

- **Brand colors must be preserved exactly:** Red `#c41230`, Navy `#012169`
- **All 4 SSO headers must be preserved:** `Authorization`, `X-SSO-Session-Id`, `X-Request-Id`, `X-Client-Version`
- **Token refresh with request queuing must be preserved** in the functional interceptor
- **MFA enforcement must be preserved** in the functional guard
- **Visual output must be identical** — the app should look the same before and after

## 8-Commit Structure

Follow this exact order and naming:

1. `chore: update Angular framework to v18` — packages, TypeScript, zone.js, tsconfig
2. `refactor: migrate Material components to MDC` — mat-chip-list → mat-chip-listbox (with `multiple`), mat-chip → mat-chip-option, appearance="legacy" → "outline", SCSS selectors
3. `refactor: convert TokenInterceptor to functional interceptor` — class → HttpInterceptorFn, inject(AuthService), preserve ALL headers
4. `refactor: convert AuthGuard to functional guard` — class → CanActivateFn, inject(AuthService), inject(Router)
5. `refactor: migrate template control flow to @if/@for/@switch` — all 8 template files
6. `refactor: convert to standalone components` — all 9 components, delete NgModules, bootstrapApplication
7. `style: migrate Material theming to M3 API` — define-theme, override M3 tokens with BofA colors
8. `test: update all specs for Angular 18 patterns` — TestBed imports, polyfills

## M3 Theming — Critical

When migrating to M3, the button accent color MUST be overridden. M3 tokens have higher specificity than custom CSS. Use:

```scss
.mat-mdc-raised-button {
  &.mat-accent {
    --mdc-protected-button-container-color: #012169;
    --mdc-protected-button-label-text-color: #ffffff;
    --mdc-filled-button-container-color: #012169;
    --mdc-filled-button-label-text-color: #ffffff;
    background-color: #012169 !important;
    color: #ffffff !important;
  }
}
```

## Running the App

```bash
# Angular 14 (main branch)
nvm use 16
npm install
npx ng serve --port 4200

# Angular 18 (angular-18-migrated branch)
nvm use 20
npm install
npx ng serve --port 4201
```

## Testing

```bash
npx ng test --no-watch --browsers=ChromeHeadless
npx ng build
```

## Auth Bootstrap (Demo Mode)

The app uses a demo session bootstrap in `auth.service.ts` that provides mock tokens so the app renders without a real SSO provider. This must be preserved during migration.

## File Paths for Migration

Key files that need changes:
- `src/app/core/interceptors/token.interceptor.ts` — SSO headers
- `src/app/core/guards/auth.guard.ts` — MFA enforcement
- `src/app/shared/components/chip-filter/chip-filter.component.html` — mat-chip-list
- `src/app/shared/components/chip-filter/chip-filter.component.scss` — Material internal classes
- `src/app/features/transfers/transfers.component.html` — appearance="legacy"
- `src/styles.scss` — theming and button overrides
- `src/main.ts` — bootstrapApplication
- All `*.module.ts` files — delete after standalone conversion
