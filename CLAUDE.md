# Nexus SDK — Claude Context

## What this is

A TypeScript SDK for the Nexus Public API, intended to be consumed by an AstroJS application. It ships as a dual ESM+CJS package and auto-generates its type layer from `openapi.yaml`.

## Architecture

Two distinct layers:

```
openapi.yaml
    │  npm run generate
    ▼
src/generated/api.ts     ← machine-generated, never edit by hand, gitignored
    │
    ▼
src/client.ts            ← hand-crafted wrapper methods (the public API)
src/localize.ts          ← deep locale-filter utility
src/types.ts             ← NexusSDKConfig, ListParams, GetParams
src/index.ts             ← re-exports only
```

**The generated layer** (`src/generated/api.ts`) is produced by `openapi-typescript` and contains only TypeScript type declarations — no runtime code. `openapi-fetch` consumes the `paths` type to give `http.GET(...)` calls full type safety.

**The wrapper layer** (`src/client.ts`) is what callers actually use. Every method:
1. Pulls `siteId` and the auth header from config — callers never pass these
2. Calls the underlying `openapi-fetch` client
3. Unwraps `{ data, error, response }` and throws on failure with the API's `error` string
4. If a locale is resolved, passes the response through `localize()` before returning

## Common tasks

```bash
mise run generate      # Regenerate src/generated/api.ts from openapi.yaml (run after spec changes)
mise run build         # Compile to dist/ (ESM + CJS)
mise run test          # Run tests once
mise run test:watch    # Vitest watch mode
mise run dev           # Build in watch mode
mise run ci            # generate → build → test in sequence
```

Or via npm directly: `npm run generate`, `npm run build`, `npm test`.

## Critical conventions

**`.js` extensions in all imports.** The package uses `"module": "NodeNext"` in tsconfig, which requires explicit file extensions in relative imports. Every import inside `src/` must be written as:
```ts
import { localize } from "./localize.js";  // ✅
import { localize } from "./localize";     // ❌ will fail to compile
```
TypeScript resolves `.js` to the corresponding `.ts` file at compile time — this is correct and expected.

**`src/generated/` is gitignored.** Always run `npm run generate` before `npm run build` in a fresh checkout. The `mise run ci` task does this automatically.

**`dist/` is committed to git.** This package is installed directly from GitHub, where `devDependencies` are not available, so `dist/` must be pre-built and committed. Always run `npm run prepare` and commit the updated `dist/` alongside any source changes.

## Adding a new endpoint

When a new endpoint is added to `openapi.yaml`:

1. Run `npm run generate` — the new path and types appear in `src/generated/api.ts` automatically
2. Add a wrapper method in `src/client.ts` following the existing pattern:
   ```ts
   async listWidgets(params?: ListParams) {
     const data = await unwrap(
       http.GET("/websites/{siteId}/widgets", {
         params: {
           path: { siteId: config.siteId },
           query: { limit: params?.limit, cursor: params?.cursor },
         },
       })
     );
     return maybeLocalize(data, resolveLocale(params));
   },
   ```
3. Re-export any new schema types from `src/index.ts` if callers will need to annotate variables
4. Add tests in `src/client.test.ts` covering at minimum: correct path, locale filtering, one error case

## Locale filtering

The `defaultLocale` config option triggers a deep transform of every response. `localize()` in `src/localize.ts` walks the entire response tree recursively and replaces every `translations: T[]` array with a single `translation: T | null` matching the locale.

- If the locale has no match, `translation` is `null` — never throws
- Without a locale (no `defaultLocale`, no per-call override), the raw response is returned unchanged with `translations` arrays intact
- Per-call `locale` in `ListParams` / `GetParams` overrides `defaultLocale` for that call only
- The `Localized<T>` mapped type in `src/localize.ts` describes the transformed shape statically

The API itself has no server-side locale filtering — all translations are embedded in every response regardless. The locale feature is entirely client-side.

## Package output

`tsdown` produces four files in `dist/`:

| File | Purpose |
|---|---|
| `dist/index.mjs` | ESM entry (for Vite/AstroJS/bundlers) |
| `dist/index.cjs` | CJS entry (for Node `require()`) |
| `dist/index.d.mts` | Types for ESM consumers |
| `dist/index.d.cts` | Types for CJS consumers |

The `exports` map in `package.json` routes consumers to the correct file automatically.

## Testing

- **`src/localize.test.ts`** — pure unit tests, no mocking. Tests the recursive transform logic including deeply nested structures (Form → steps/fields, BrandingResponse → logos/ctas/globals).
- **`src/client.test.ts`** — integration-style tests using MSW (`msw/node` + `setupServer`) to intercept `fetch` at the network level. Tests request construction (path, headers, query params) and response handling (locale filtering, error throwing).

When adding tests for a new endpoint, follow the MSW pattern in `src/client.test.ts`: register a handler with `server.use(http.get(...))`, call the client method, assert on the result.

## Key files

| File | Role |
|---|---|
| `openapi.yaml` | Source of truth for all API types and endpoints |
| `src/types.ts` | Public config/param interfaces |
| `src/localize.ts` | `Localized<T>` type + `localize()` runtime function |
| `src/client.ts` | `createNexusClient()` factory — the main file to edit |
| `src/index.ts` | Re-exports only, no logic |
| `tsdown.config.ts` | Build config (dual ESM+CJS, dts, sourcemaps) |
| `vitest.config.ts` | Test config |
| `mise.toml` | Task runner |
