# Digital Banking Portal — Angular 14 Demo

This is a sample Angular 14 application built to demonstrate Devin's migration capabilities. It mirrors the architecture of a large enterprise digital banking application.

## Architecture

- **Angular 14.2** with Angular Material 14
- **Shared Component Library** (`src/app/shared/`) — reusable UI components built on Angular Material
- **Custom Design System** — branded theming layer on top of Angular Material
- **NgModule-based architecture** (Angular 14 default)
- **SSO/MFA Integration** — mock auth service with token interceptor, auth guard, SSO session management
- **Proprietary Analytics SDK** — event tracking service with batching, page view tracking, and custom decorator
- **Lazy-loaded feature modules** — dashboard module loaded on demand

## Shared Components

| Component | Description | Angular Material Dependencies |
|-----------|-------------|-------------------------------|
| `AccountCardComponent` | Displays account info with balance, type, and quick actions | MatCard, MatIcon, MatChips, MatButton |
| `TransactionTableComponent` | Sortable, filterable, paginated transaction list | MatTable, MatPaginator, MatSort, MatFormField |
| `NavSidebarComponent` | Collapsible navigation sidebar with user profile | MatSidenav, MatList, MatIcon, MatDivider |
| `AlertBannerComponent` | Dismissable alert notifications (fraud, warnings, info) | MatIcon, MatButton, MatChips |
| `SearchInputComponent` | Debounced search input with clear button | MatFormField, MatInput, MatIcon |
| `BalanceDisplayComponent` | Total balance overview with account type breakdown | MatCard, MatIcon |
| `NotificationBellComponent` | Notification dropdown with unread badge | MatMenu, MatBadge, MatIcon |
| `QuickActionsComponent` | Grid of quick action buttons with analytics tracking | MatButton, MatIcon |

## Migration Target

The goal is to migrate this project from **Angular 14 to Angular 18**, which involves:

1. **Dependency updates** — `@angular/*` and `@angular/material` packages across 4 major versions
2. **NgModules → Standalone components** — architectural shift introduced in Angular 15
3. **Angular Material MDC migration** — new DOM structure, CSS class names, theming APIs (Angular 15)
4. **Control flow syntax** — `*ngIf` → `@if`, `*ngFor` → `@for` (Angular 17)
5. **Material 3 theming** — new theming API (Angular 18)
6. **SSO/MFA integration preservation** — auth guard, token interceptor must remain functional
7. **Analytics SDK compatibility** — event tracking decorators and services must continue working
8. **Test verification** — all unit tests must pass after migration

## Running

```bash
npm install
ng serve        # Dev server at http://localhost:4200
ng test         # Run unit tests
ng build        # Production build
```

## Project Structure

```
src/app/
├── core/
│   ├── auth/           # SSO/MFA authentication service
│   └── analytics/      # Proprietary analytics SDK
├── shared/
│   ├── components/     # 8 shared UI components
│   ├── decorators/     # Analytics event tracking decorator
│   ├── guards/         # Auth guard (CanActivate, CanActivateChild)
│   ├── interceptors/   # Token interceptor with SSO headers
│   ├── models/         # TypeScript interfaces and enums
│   └── shared.module.ts
├── features/
│   └── dashboard/      # Lazy-loaded dashboard module
├── app.module.ts       # Root module with HTTP interceptor registration
├── app-routing.module.ts  # Routing with auth guard
└── app.component.ts    # Root component with analytics initialization
```
