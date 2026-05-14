---
name: bofa-coding-standards
description: BofA Digital Banking coding standards, authentication patterns, and design system rules.
---

# BofA Digital Banking — Coding Standards

## Design System

- Primary brand color (BofA Red): `#c41230`
- Secondary brand color (BofA Navy): `#012169`
- Font family: `Connections, Helvetica Neue, Helvetica, Arial, sans-serif`
- Cards: 8px border-radius, subtle box-shadow
- All focusable elements must meet WCAG 2.1 AA contrast (2px solid #012169 outline)

## Component Conventions

- All components use `app-` prefix (e.g., `app-account-card`, `app-balance-widget`)
- Shared components live in `src/app/shared/components/`
- Each component has `.ts`, `.html`, `.scss`, `.spec.ts` files
- Feature modules are lazy-loaded and live in `src/app/features/`

## Authentication Patterns (CRITICAL — preserve exactly)

- **TokenInterceptor** adds 4 headers to every HTTP request:
  1. `Authorization: Bearer <token>`
  2. `X-SSO-Session-Id: <session-id>`
  3. `X-Request-Id: <uuid>`
  4. `X-Client-Version: <version>`
- **Token refresh on 401:** Queue pending requests, refresh token, replay queue
- **AuthGuard:** Enforces authentication (isAuthenticated check) before route activation. MFA is handled upstream in AuthService login flow.
- **Demo mode:** `AuthService` auto-bootstraps a mock session for local development

## Testing Standards

- Framework: Jasmine + Karma (ChromeHeadless for CI)
- All components must have `.spec.ts` files
- Mock services via DI, not HTTP interceptors
- CI runs: `ng test --no-watch --browsers=ChromeHeadless`

## Angular 18 Migration Notes

When migrating to Angular 18:
- `mat-chip-list` → `mat-chip-listbox` (with `multiple` attribute for multi-select patterns)
- `appearance="legacy"` → `appearance="outline"`
- M3 theming requires explicit token overrides for brand colors (use `!important`)
- Functional interceptors/guards use `inject()` — do NOT use constructor injection
- All components must be standalone with inline Material imports
