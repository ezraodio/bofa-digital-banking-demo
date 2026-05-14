# Angular 14 → 18 Migration Playbook

## Overview

Migrate this Angular 14 application to Angular 18. This Playbook is designed for enterprise banking apps with custom authentication, Material component libraries, and strict security requirements.

## Setup

- Create a new branch (e.g., `angular-18-migrated`) from the main branch
- Use Node 20.x for Angular 18 compatibility
- Run `npm install --legacy-peer-deps` if peer dependency conflicts arise

## Migration Rules

**Authentication (CRITICAL):**
- Identify ALL custom HTTP headers in interceptors and preserve them exactly
- Preserve token refresh logic and request queuing patterns
- Preserve route guard logic including MFA enforcement

**Material components:**
- Migrate all legacy Material components to MDC equivalents
- `mat-chip-list` → context-dependent: `mat-chip-listbox` (selection), `mat-chip-grid` (input), `mat-chip-set` (display)
- `appearance="legacy"` → `appearance="outline"` on all form fields
- Update SCSS selectors from legacy internal classes to MDC equivalents
- Preserve brand colors throughout — do not use default Material palettes

**Architecture:**
- Convert class-based interceptors to `HttpInterceptorFn` using `inject()`
- Convert class-based guards to `CanActivateFn` using `inject()`
- Convert all structural directives to built-in control flow (`@if`, `@for` with `track`, `@switch`)
- Convert all components to standalone and delete NgModule files
- Update bootstrap to `bootstrapApplication` with `provideRouter`, `provideAnimations`, `provideHttpClient(withInterceptors([...]))`

**Theming:**
- Migrate from M2 `define-palette`/`define-light-theme` to M3 `define-theme` API
- Override M3 system tokens with brand colors (M3 tokens have higher specificity than custom CSS)
- For button overrides, use both MDC token variables AND `!important` to ensure brand colors render correctly

## Commit Structure

Deliver the migration as 8 logical, independently-reviewable commits:

1. `chore: update Angular framework to v18` — packages, TypeScript, zone.js, tsconfig
2. `refactor: migrate Material components to MDC` — component API changes + SCSS
3. `refactor: convert TokenInterceptor to functional interceptor` — preserve all auth headers
4. `refactor: convert AuthGuard to functional guard` — preserve access control logic
5. `refactor: migrate template control flow to @if/@for/@switch` — all templates
6. `refactor: convert to standalone components` — delete modules, update bootstrap
7. `style: migrate Material theming to M3 API` — brand color preservation
8. `test: update all specs for Angular 18 patterns` — TestBed imports, polyfills

## Validation

- `ng build` must succeed with zero errors
- `ng test --no-watch` must pass all specs (coverage must not decrease)
- Zero remaining legacy patterns: no `*ngIf`, `*ngFor`, `@NgModule`, class-based guards/interceptors
- All authentication headers must be present in the functional interceptor
- Visual output must match pre-migration appearance (brand colors, layout)
- Open a PR to the main branch with a description covering all 8 commits
