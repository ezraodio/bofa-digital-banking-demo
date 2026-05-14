# Angular 14 → 18 Migration Playbook

## Overview

Migrate this BofA Digital Banking app from Angular 14 to Angular 18 in 8 logical commits.
Each commit should be atomic and reviewable independently.

## Prerequisites

- Node.js 20.x
- Target branch: `angular-18-migrated` (create from `main`)

## Migration Steps (8 Commits)

### 1. `chore: update Angular framework to v18`
- Update all `@angular/*` packages from 14.x to 18.2.0
- Update TypeScript from 4.7 to 5.4
- Update zone.js to 0.14, rxjs to 7.8
- Update `tsconfig.json` target/module to ES2022
- Resolve any dependency conflicts

### 2. `refactor: migrate Material components to MDC`
- `mat-chip-list` → `mat-chip-listbox` (with `multiple` attribute for multi-select)
- `mat-chip` → `mat-chip-option`
- `appearance="legacy"` → `appearance="outline"` on all form fields
- Update SCSS selectors from legacy to MDC equivalents:
  - `.mat-chip-list-wrapper` → `.mdc-evolution-chip-set__chips`
  - `.mat-standard-chip` → `.mat-mdc-chip`
  - `.mat-chip-selected` → `.mat-mdc-chip-selected`
- Preserve BofA brand colors: Red `#c41230`, Navy `#012169`

### 3. `refactor: convert TokenInterceptor to functional interceptor`
- Convert `src/app/core/interceptors/token.interceptor.ts` from class-based `HttpInterceptor` to `HttpInterceptorFn`
- Use `inject(AuthService)` instead of constructor injection
- **CRITICAL:** Preserve ALL 4 SSO headers exactly:
  - `Authorization: Bearer <token>`
  - `X-SSO-Session-Id`
  - `X-Request-Id`
  - `X-Client-Version`
- Preserve the 401 token refresh flow with request queuing

### 4. `refactor: convert AuthGuard to functional guard`
- Convert `src/app/core/guards/auth.guard.ts` from class-based `CanActivate`/`CanActivateChild` to `CanActivateFn`
- Use `inject(AuthService)` and `inject(Router)`
- Preserve MFA enforcement logic

### 5. `refactor: migrate template control flow to @if/@for/@switch`
- Convert all `*ngIf` → `@if` / `@else`
- Convert all `*ngFor` → `@for` with explicit `track` expressions
- Convert all `ngSwitch`/`*ngSwitchCase` → `@switch`/`@case`
- Files to update:
  - `src/app/app.component.html`
  - `src/app/features/dashboard/dashboard.component.html`
  - `src/app/features/transfers/transfers.component.html`
  - `src/app/shared/components/alert-banner/alert-banner.component.html`
  - `src/app/shared/components/account-card/account-card.component.html`
  - `src/app/shared/components/balance-widget/balance-widget.component.html`
  - `src/app/shared/components/chip-filter/chip-filter.component.html`
  - `src/app/shared/components/transaction-list/transaction-list.component.html`

### 6. `refactor: convert to standalone components`
- Add `standalone: true` to all 9 components
- Move Material imports from SharedModule into each component's `imports` array
- Delete all NgModule files:
  - `src/app/app.module.ts`
  - `src/app/core/core.module.ts`
  - `src/app/shared/shared.module.ts` (if exists)
  - `src/app/features/dashboard/dashboard.module.ts`
  - `src/app/features/transfers/transfers.module.ts`
- Create `src/app/app.routes.ts` with `loadComponent` lazy loading
- Update `src/main.ts` to use `bootstrapApplication` with:
  - `provideRouter(routes)`
  - `provideAnimations()`
  - `provideHttpClient(withInterceptors([tokenInterceptor]))`

### 7. `style: migrate Material theming to M3 API`
- Replace `define-palette`/`define-light-theme` with M3 `define-theme` API
- Override M3 system tokens with BofA brand colors
- Override MDC button tokens for accent buttons:
  - `--mdc-protected-button-container-color: #012169`
  - `--mdc-filled-button-container-color: #012169`
  - Use `!important` on `background-color` to override M3 token specificity

### 8. `test: update all specs for Angular 18 patterns`
- Replace `declarations` with `imports` in all TestBed configurations
- Update polyfills to `["zone.js", "zone.js/testing"]`
- Ensure all specs pass with `ng test --no-watch`

## Validation

After all 8 commits:
- `ng build` should succeed with zero errors
- `ng test --no-watch` should pass all specs
- No remaining instances of: `*ngIf`, `*ngFor`, `@NgModule`, class-based guards/interceptors
- All 4 SSO headers must be present in the functional interceptor
- Create a PR from `angular-18-migrated` → `main`
