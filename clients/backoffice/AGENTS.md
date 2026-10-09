# Backoffice conventions

Follow the patterns already used in this app. Do not introduce NgModules, `.component.ts` filenames, `ChangeDetectionStrategy.OnPush`, `toSignal`, or ESLint rules.

## Stack

Angular 22 standalone app. Vitest. Tailwind + Spartan HLM (`libs/ui`, `@spartan-ng/brain`). Prettier (`printWidth: 100`, `singleQuote: true`, HTML parser `angular`). No ESLint config.

## Folders

- Pages (routed): `src/app/pages/{auth|private}/{page-name}/`
- Feature and shared UI: `src/app/components/` (feature groups such as `property-management/`)
- Shared library: `src/app/library/` (`constants`, `interfaces`, `models`, `services`, `types`, `utils`)
- HTTP wiring: `src/app/api/` (`BASE_URL`, `EndpointsService`)
- Helm UI: `libs/ui/`

## File naming

Per-feature folder. Basename matches the folder. No `.component.ts` suffix.

| Role | File |
|------|------|
| Class | `{name}.ts` |
| Template | `{name}.html` |
| Styles | `{name}.css` via `styleUrl` |
| Spec | `{name}.spec.ts` |
| Form | `{name}.form.ts` when the page/component has a reactive form |

Class names are PascalCase matching the folder, without a `Component` suffix (`Login`, `PropertyManagementModal`). Selectors are `app-{kebab}` (`prefix`: `app`).

## Library suffixes

- `*I` interfaces (`PropertyI`, `ListingFilterI`)
- `*C` const maps / endpoint collections (`PropertyPostEndpointsC`, `ListingFilterC`)
- `*U` utils (`GetTokenU`, `ValidateImagesU`)
- `*T` types derived from const arrays (`ListingFilterT`)
- `*E` string-union enums (`PropertyStatusE`)

## Components

Standalone by default with `imports: [...]`. DI via `inject()`. UI state uses `signal()`, `input()`, `output()`, `model()`. HTTP uses RxJS `.subscribe({ next, error })`.

Import blocks are typically labeled (`// Angular Imports`, `// Library`, `// Components`, `// Libs`, `// Forms`). Template-facing members are `protected`. Services use constructor injection and `@Injectable({ providedIn: 'root' })`.

Reference modules: `pages/auth/login` (page + `*.form.ts` + subscribe in the page) and `pages/private/property-management` (page composing child components + `PropertyService`).

## Forms

Reactive forms only. Factory in a sibling `*.form.ts` returning `FormGroup` / `FormControl` / `Validators`. Bind with `formControlName` and `ReactiveFormsModule`. Existing factory names are mixed (`loginForm` vs `CreatePropertyForm`); keep the name already in that folder.

## HTTP

```
ApiService.onList / onPost / onPatch
  → *EndpointsC in library/models
  → EndpointsService._endpointC
  → PropertyService or the page
```

`onList` in `PropertyService` subscribes internally and writes `properties` / `propertyCurrentPage` signals. Create/update return the Observable so the caller can wait on `response.success`. Errors use `toast` from `@spartan-ng/brain/sonner`.

## UI

Prefer existing HLM imports (`@libs` or `spartan-ng/helm/*`). Icons via `provideIcons` (`@ng-icons/lucide` or `@ng-icons/fluent-ui`). Path aliases: `@library`, `@api`, `@libs`, `@components/*`, `@environments`, `spartan-ng/helm/*`.

## Do not invent

NgModules, OnPush as a policy, ESLint, `toSignal` / async-pipe data loading, `.component.ts` naming, or a new UI kit when `libs/ui` already has the primitive.
