# nexus-sdk

TypeScript SDK for the Nexus Public API. It wraps the read-only public endpoints with a typed client that handles bearer authentication, site scoping, cursor pagination, errors, and optional locale filtering.

## Installation

Install directly from the public GitHub repository:

```bash
npm install github:am2labs/nexus-sdk
```

## Quick start

```ts
import { createNexusClient } from "@am2labs/nexus-sdk";

const nexus = createNexusClient({
  baseUrl: "https://your-nexus-site.com/api/v1",
  apiKey: "nxs_your_api_key",
  siteSlug: "acme",
});

const { data: pages } = await nexus.listPages();
const page = await nexus.getPage("about-us");
```

## Configuration

Pass a config object to `createNexusClient`.

```ts
const nexus = createNexusClient({
  baseUrl: "https://your-nexus-site.com/api/v1", // API origin + base path
  apiKey: "nxs_your_api_key",                    // from Admin > Website > Settings
  siteSlug: "acme",                              // site slug identifier
  debug: false,                                  // optional request/response logging
});
```

| Option | Type | Description |
|---|---|---|
| `baseUrl` | `string` | Full URL to the API base path, e.g. `https://example.com/api/v1` |
| `apiKey` | `string` | Bearer token issued from the Nexus admin dashboard (`nxs_...`) |
| `siteSlug` | `string` | Site slug identifier. Injected into every request path automatically. |
| `debug` | `boolean` | Optional. Logs each request URL, status, and JSON response body to `console.debug`. |

### AstroJS setup

Create a shared client instance and import it in your pages and components:

```ts
// src/lib/nexus.ts
import { createNexusClient } from "@am2labs/nexus-sdk";

export const nexus = createNexusClient({
  baseUrl: import.meta.env.NEXUS_BASE_URL,
  apiKey: import.meta.env.NEXUS_API_KEY,
  siteSlug: import.meta.env.NEXUS_SITE_SLUG,
});
```

```ini
# .env
NEXUS_BASE_URL=https://your-nexus-site.com/api/v1
NEXUS_API_KEY=nxs_your_api_key
NEXUS_SITE_SLUG=acme
```

## Methods

Every list method accepts an optional `ListParams` object with `limit`, `cursor`, and `locale`. Slug-based get methods accept the slug first and an optional `GetParams` object second. `getNavigation` accepts a navigation handle.

| Method | Description |
|---|---|
| `getLocales()` | Return enabled site locales and the default locale code. |
| `getBranding(params?)` | Return site branding: globals, logos, CTAs, and social links. |
| `listTestimonials(params?)` | List published testimonials. |
| `listForms(params?)` | List published forms. |
| `getForm(slug, params?)` | Return a published form by slug. |
| `listPages(params?)` | List published content pages. |
| `getPage(slug, params?)` | Return a published page by slug. |
| `listBlogPosts(params?)` | List published blog posts. Supports `limit`, `cursor`, `tag`, `from`, `to`, and `locale`. |
| `getBlogPost(slug, params?)` | Return a published blog post by slug. |
| `listTeamMembers(params?)` | List published team members. |
| `listJobs(params?)` | List published job listings. |
| `getJob(slug, params?)` | Return a published job listing by slug. |
| `listNavigations(params?)` | List published navigations. |
| `getNavigation(handle, params?)` | Return a published navigation by handle. |

### Examples

```ts
const { locales, default: defaultLocale } = await nexus.getLocales();

const branding = await nexus.getBranding();

const { data: testimonials, nextCursor } = await nexus.listTestimonials({
  limit: 10,
});

const ratingField = testimonials[0]?.customFields.find((field) => field.key === "rating");

const form = await nexus.getForm("contact-us");
const page = await nexus.getPage("about-us");
const job = await nexus.getJob("senior-designer");
const nav = await nexus.getNavigation("main-menu");
```

### Blog

```ts
const { data: posts } = await nexus.listBlogPosts({
  tag: "react",
  from: "2025-01-01T00:00:00Z",
  to: "2025-12-31T23:59:59Z",
  limit: 20,
});

const post = await nexus.getBlogPost("hello-world");
```

`from` and `to` are ISO 8601 date-time strings. `tag` filters posts by tag.

## Pagination

List methods return a `data` array and a `nextCursor` string. Pass `nextCursor` back as `cursor` to fetch the next page. When `nextCursor` is `null`, you have reached the last page.

```ts
let cursor: string | undefined;
const allPages = [];

do {
  const { data, nextCursor } = await nexus.listPages({ limit: 100, cursor });
  allPages.push(...data);
  cursor = nextCursor ?? undefined;
} while (cursor);
```

The maximum `limit` per request is `100`. The API default is `20`.

## Localization

The API embeds all available translations in each response as `translations` arrays. For content endpoints, the SDK resolves a locale before returning data:

1. If you pass `locale` for the call, that locale is used.
2. Otherwise, the SDK fetches `/websites/{siteSlug}/locales` once, caches the site's default locale, and uses it for later calls.
3. If the site has no default locale, the raw response is returned with `translations` arrays intact.

When a locale is resolved, every `translations: T[]` array throughout the response tree is replaced with `translation: T | null`.

```ts
const { data } = await nexus.listTestimonials({ locale: "en" });

// Raw API item:
// data[0].translations = [{ locale: "en", content: "..." }, { locale: "es", content: "..." }]

// Localized item:
// data[0].translation = { locale: "en", content: "..." }
// data[0].translations does not exist
```

`translation` is `null` when the requested locale has no match for that item.

Override the site default per call:

```ts
const { data } = await nexus.listJobs({ locale: "es" });
const page = await nexus.getPage("about-us", { locale: "es" });
```

Fetch locale metadata directly:

```ts
const locales = await nexus.getLocales();
// { locales: [{ locale: "en", name: "English", isDefault: true }], default: "en" }
```

The `Localized<T>` utility type is exported if you need to annotate a localized shape.

```ts
import type { Localized } from "@am2labs/nexus-sdk";

type Testimonial = {
  author: string;
  translations: Array<{ locale: string; content: string }>;
};

type LocalizedTestimonial = Localized<Testimonial>;
// { author: string; translation: { locale: string; content: string } | null }
```

## Error handling

All methods throw a plain `Error` when the request fails. The error message is taken from the API's `error` response field when available, or falls back to `HTTP <status>`.

```ts
try {
  const page = await nexus.getPage("missing-page");
} catch (err) {
  // err.message === "Resource not found"
}
```

Common error messages from the API:

| Status | Message |
|---|---|
| `401` | `Missing or invalid API key` |
| `403` | `API key siteSlug does not match path siteSlug` |
| `404` | `Resource not found` |
| `429` | `Rate limit exceeded` |

## TypeScript

The SDK is fully typed. Return types are inferred from the OpenAPI spec, and the package exports the client and parameter types:

```ts
import type {
  CustomFieldValue,
  GetParams,
  GalleryImage,
  ListBlogParams,
  ListParams,
  NexusClient,
  NexusSDKConfig,
} from "@am2labs/nexus-sdk";

let client: NexusClient;
let image: GalleryImage | null;
let customField: CustomFieldValue;
```

`GalleryImage` and `CustomFieldValue` are also exported for convenience.
