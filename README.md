# nexus-sdk

TypeScript SDK for the Nexus Public API. Wraps all read endpoints with a type-safe client that handles authentication, site scoping, and optional locale filtering out of the box.

## Installation

```bash
npm install nexus-sdk
```

## Quick start

```ts
import { createNexusClient } from "nexus-sdk";

const nexus = createNexusClient({
  baseUrl: "https://your-nexus-site.com/api/v1",
  apiKey: "nxs_your_api_key",
  siteId: 42,
});

const { data: testimonials } = await nexus.listTestimonials();
```

## Configuration

Pass a config object to `createNexusClient`. All options except `defaultLocale` are required.

```ts
const nexus = createNexusClient({
  baseUrl: "https://your-nexus-site.com/api/v1", // API origin + base path
  apiKey: "nxs_your_api_key",                    // from Admin > Website > Settings
  siteId: 42,                                    // numeric site ID
  defaultLocale: "en",                           // optional — see Localization
});
```

| Option | Type | Description |
|---|---|---|
| `baseUrl` | `string` | Full URL to the API base path, e.g. `https://example.com/api/v1` |
| `apiKey` | `string` | Bearer token issued from the Nexus admin dashboard (`nxs_...`) |
| `siteId` | `number` | Numeric site identifier. Injected into every request automatically. |
| `defaultLocale` | `string` | ISO 639-1 locale code. When set, enables locale filtering on all responses. |

### AstroJS setup

Create a shared client instance and import it in your pages and components:

```ts
// src/lib/nexus.ts
import { createNexusClient } from "nexus-sdk";

export const nexus = createNexusClient({
  baseUrl: import.meta.env.NEXUS_BASE_URL,
  apiKey:  import.meta.env.NEXUS_API_KEY,
  siteId:  Number(import.meta.env.NEXUS_SITE_ID),
  defaultLocale: import.meta.env.NEXUS_LOCALE ?? "en",
});
```

```ini
# .env
NEXUS_BASE_URL=https://your-nexus-site.com/api/v1
NEXUS_API_KEY=nxs_your_api_key
NEXUS_SITE_ID=42
NEXUS_LOCALE=en
```

## Methods

Every list method accepts an optional `ListParams` object. Every get-by-id method accepts a numeric `id` and an optional `GetParams` object.

### Testimonials

```ts
// List all approved testimonials (paginated)
const { data, nextCursor } = await nexus.listTestimonials({ limit: 10 });

// Get a single testimonial by ID
const testimonial = await nexus.getTestimonial(1);
```

### Forms

```ts
// List all approved forms
const { data, nextCursor } = await nexus.listForms();

// Get a single form with all its steps and fields
const form = await nexus.getForm(5);
```

### Pages

```ts
// List all published content pages
const { data, nextCursor } = await nexus.listPages();

// Get a single page with all its content blocks
const page = await nexus.getPage(3);
```

### Team members

```ts
// List all approved team members
const { data, nextCursor } = await nexus.listTeamMembers({ limit: 50 });

// Get a single team member
const member = await nexus.getTeamMember(7);
```

### Jobs

```ts
// List all approved job listings
const { data, nextCursor } = await nexus.listJobs();

// Get a single job listing
const job = await nexus.getJob(12);
```

### Navigations

```ts
// List all approved navigations with their items
const { data, nextCursor } = await nexus.listNavigations();

// Get a single navigation (e.g. main menu)
const nav = await nexus.getNavigation(1);
```

### Branding

```ts
// Get site branding: globals, logos, CTAs, social links
const branding = await nexus.getBranding();
```

## Pagination

List methods return a `data` array and a `nextCursor` string. Pass `nextCursor` back as `cursor` to fetch the next page. When `nextCursor` is `null`, you have reached the last page.

```ts
let cursor: string | undefined;
const allTestimonials = [];

do {
  const { data, nextCursor } = await nexus.listTestimonials({ limit: 100, cursor });
  allTestimonials.push(...data);
  cursor = nextCursor ?? undefined;
} while (cursor);
```

The maximum `limit` per request is `100`. The default is `20`.

## Localization

The API embeds all available translations in every response. The SDK can automatically filter these down to a single locale so your code never has to deal with the `translations` array directly.

**Set `defaultLocale` at init** and every response is transformed: each `translations: T[]` array throughout the entire response tree (including nested objects like form fields, navigation items, and branding logos) is replaced with a single `translation: T | null`.

```ts
const nexus = createNexusClient({ ..., defaultLocale: "en" });

const { data } = await nexus.listTestimonials();

// Without defaultLocale:
// data[0].translations = [{ locale: "en", content: "..." }, { locale: "es", content: "..." }]

// With defaultLocale: "en":
// data[0].translation = { locale: "en", content: "..." }
// data[0].translations  ← does not exist
```

`translation` is `null` when the requested locale has no match for that item.

**Override per call** using the `locale` option:

```ts
// Use Spanish for this call only, regardless of defaultLocale
const { data } = await nexus.listJobs({ locale: "es" });
```

**Skip filtering for one call** by passing an empty string or simply not setting `defaultLocale`:

```ts
// Raw response — all translation arrays intact
const { data } = await nexus.listPages();
```

The `Localized<T>` utility type is exported if you need to annotate variables:

```ts
import type { Localized } from "nexus-sdk";
import type { components } from "nexus-sdk";

type LocalizedTestimonial = Localized<components["schemas"]["Testimonial"]>;
```

## Error handling

All methods throw a plain `Error` when the request fails. The error message is taken from the API's `error` response field when available, or falls back to `HTTP <status>`.

```ts
try {
  const page = await nexus.getPage(999);
} catch (err) {
  // err.message === "Resource not found"
}
```

Common error messages from the API:

| Status | Message |
|---|---|
| `401` | `Missing or invalid API key` |
| `403` | `API key siteId does not match path siteId` |
| `404` | `Resource not found` |
| `429` | `Rate limit exceeded` |

## TypeScript

The SDK is fully typed. Return types are inferred from the OpenAPI spec — no manual annotations needed.

```ts
// Type is inferred as the localized or raw shape automatically
const branding = await nexus.getBranding();

// Annotate a variable using the NexusClient type
import type { NexusClient } from "nexus-sdk";

let client: NexusClient;
```
