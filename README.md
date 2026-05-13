# BofA Digital Banking Demo

Demo app simulating Bank of America's digital banking platform for Devin migration demo. Built on Angular 14 with Angular Material, featuring enterprise patterns like SSO/MFA authentication, custom analytics SDK, and BofA brand theming.

## Prerequisites

- **Node.js 16.x** (for Angular 14 on `main`)
- **Node.js 20.x** (for Angular 18 on `angular-18-migrated`)
- Angular CLI: `npm install -g @angular/cli@14`

## Setup

```bash
npm install
ng serve        # http://localhost:4200
ng test         # Run all specs
ng build        # Production build
```

## Branches

| Branch | Description |
|--------|-------------|
| `main` | Angular 14 app — the "before" state |
| `angular-18-migrated` | Angular 18 app — the fully migrated "after" state |

## Architecture

- **Angular 14.2** with Angular Material 14
- **NgModule-based architecture** with lazy-loaded feature modules
- **Custom BofA theme** — Red (#c41230) and Navy (#012169) palettes
- **SSO/MFA auth** — `TokenInterceptor` with `X-SSO-Session-Id`, `X-Request-Id`, `X-Client-Version` headers
- **Class-based `AuthGuard`** implementing `CanActivate` / `CanActivateChild`
- **Analytics SDK** with batched event queue and `@TrackEvent` decorator
- **Shared component library** — account-card, transaction-list, balance-widget, chip-filter, transfer-form, alert-banner

## Project Structure

```
src/app/
├── core/
│   ├── services/         # AuthService, AnalyticsService
│   ├── interceptors/     # TokenInterceptor (class-based)
│   ├── guards/           # AuthGuard (class-based)
│   ├── decorators/       # @TrackEvent
│   └── core.module.ts
├── shared/
│   ├── components/       # Reusable UI components
│   ├── models/           # TypeScript interfaces and enums
│   └── shared.module.ts
└── features/
    ├── dashboard/        # Dashboard feature (lazy-loaded)
    └── transfers/        # Transfers feature (lazy-loaded)
```
