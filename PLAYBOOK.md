# Angular 14 → 18 Migration Playbook

## Overview

Step-by-step migration recipe for upgrading an Angular 14 application with Angular Material to Angular 18. This playbook was used to migrate the BofA Digital Banking demo and can be adapted for similar enterprise Angular applications.

## Prerequisites

| Tool    | Angular 14 | Angular 18 |
|---------|-----------|-----------|
| Node.js | 16.x      | 20.x+     |
| npm     | 8.x       | 10.x      |
| TypeScript | 4.7    | 5.4       |

## Migration Steps

### Step 1: Update Angular Framework to v18

Update all `@angular/*` packages from 14.x to 18.x in `package.json`:

```bash
# Update core Angular packages
npm install @angular/core@18 @angular/common@18 @angular/compiler@18 \
  @angular/platform-browser@18 @angular/platform-browser-dynamic@18 \
  @angular/router@18 @angular/forms@18 @angular/animations@18 \
  @angular/material@18 @angular/cdk@18 --legacy-peer-deps

# Update dev dependencies
npm install -D @angular/cli@18 @angular/compiler-cli@18 \
  @angular-devkit/build-angular@18 typescript@5.4 --legacy-peer-deps
```

Update `tsconfig.json`:
- `target`: `ES2022`
- `module`: `ES2022`
- `useDefineForClassFields`: `false`
- `lib`: `["ES2022", "dom"]`

Update `zone.js` to `~0.14.0` and `rxjs` to `~7.8.0`.

**Commit**: `chore: update Angular framework to v18`

---

### Step 2: Migrate Material Components to MDC

Angular Material 15+ replaced legacy components with MDC-based versions. Key changes:

| Before (v14)                    | After (v18)                      |
|--------------------------------|----------------------------------|
| `<mat-chip-list>`              | `<mat-chip-listbox>`             |
| `<mat-chip>`                   | `<mat-chip-option>`              |
| `[selected]` on mat-chip       | `[selected]` on mat-chip-option  |
| `appearance="legacy"`          | `appearance="outline"`           |
| `.mat-chip-list-wrapper`       | `.mat-mdc-chip-set`              |
| `.mat-standard-chip`           | `.mat-mdc-chip`                  |
| `matChipRemove` directive      | `matChipRemove` (same API)       |

Update all component SCSS to use `.mat-mdc-*` prefixed selectors instead of `.mat-*`.

**Commit**: `refactor: migrate Material components to MDC`

---

### Step 3: Convert HTTP Interceptors to Functional

Replace class-based `HttpInterceptor` with `HttpInterceptorFn`:

```typescript
// Before (Angular 14)
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req, next) { ... }
}

// After (Angular 18)
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  // ... same logic
};
```

Register with `provideHttpClient(withInterceptors([tokenInterceptor]))` instead of `HTTP_INTERCEPTORS` provider.

**Commit**: `refactor: convert TokenInterceptor to functional interceptor`

---

### Step 4: Convert Guards to Functional

Replace class-based `CanActivate` with `CanActivateFn`:

```typescript
// Before (Angular 14)
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route, state) { ... }
}

// After (Angular 18)
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // ... same logic
};
```

Update route configs: `canActivate: [AuthGuard]` → `canActivate: [authGuard]`.

**Commit**: `refactor: convert AuthGuard to functional guard`

---

### Step 5: Migrate Template Control Flow

Replace structural directives with built-in control flow:

| Before                           | After                                      |
|---------------------------------|--------------------------------------------|
| `*ngIf="condition"`             | `@if (condition) { ... }`                  |
| `*ngIf="x; else tmpl"`         | `@if (x) { ... } @else { ... }`           |
| `*ngFor="let item of items"`   | `@for (item of items; track item.id) { }` |
| `[ngSwitch]` / `*ngSwitchCase` | `@switch (expr) { @case (val) { } }`      |

Note: `@for` requires a `track` expression for optimal performance.

**Commit**: `refactor: migrate template control flow to @if/@for/@switch`

---

### Step 6: Convert to Standalone Components

1. Add `standalone: true` to every `@Component` decorator
2. Move Material/Common imports from NgModule into each component's `imports` array
3. Remove all NgModule files (`app.module.ts`, `shared.module.ts`, feature modules)
4. Create `app.routes.ts` with standalone route config using `loadComponent`
5. Update `main.ts`:

```typescript
// Before
platformBrowserDynamic().bootstrapModule(AppModule);

// After
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
});
```

**Commit**: `refactor: convert to standalone components`

---

### Step 7: Migrate Material Theming to M3 API

Update `styles.scss`:

```scss
// Before (v14)
$primary: mat.define-palette($custom-palette);
$theme: mat.define-light-theme((color: (primary: $primary)));

// After (v18 M3)
$theme: mat.define-theme((
  color: (theme-type: light, primary: mat.$red-palette, tertiary: mat.$blue-palette),
  typography: (brand-family: '"Your Font", sans-serif'),
));
html { @include mat.all-component-themes($theme); }
```

Update CSS overrides to use MDC class names: `.mat-card` → `.mat-mdc-card`.

**Commit**: `style: migrate Material theming to M3 API`

---

### Step 8: Update Test Specs

1. Replace `declarations` with `imports` in `TestBed.configureTestingModule`
2. Import standalone components directly: `imports: [MyComponent]`
3. Remove `require.context` from `test.ts` — Angular 18 auto-discovers specs
4. Update `angular.json` test config: use `include: ["src/**/*.spec.ts"]` and `polyfills: ["zone.js", "zone.js/testing"]`
5. Run all tests and fix any remaining failures

**Commit**: `test: update all specs for Angular 18 patterns`

---

## Verification Checklist

- [ ] `ng build` succeeds with no errors
- [ ] `ng test --no-watch` — all specs pass
- [ ] `ng serve` — app loads and renders correctly
- [ ] No `*ngIf`, `*ngFor`, `*ngSwitch` remain in templates
- [ ] No `@NgModule` declarations remain
- [ ] No class-based guards or interceptors remain
- [ ] All Material components use MDC variants
- [ ] Brand colors and visual design unchanged
- [ ] PR has 8 clean, logical commits
