import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { createNexusClient } from "./client.js";

const BASE_URL = "http://localhost/api/v1";
const SITE_ID = 42;
const API_KEY = "nxs_testkey";

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function makeClient() {
  return createNexusClient({ baseUrl: BASE_URL, apiKey: API_KEY, siteId: SITE_ID });
}

// Locale endpoint fixtures
const localesEn = { locales: [{ locale: "en", name: "English", isDefault: true }], default: "en" };
const localesNone = { locales: [], default: null };

// Testimonial fixtures
const testimonialEn = {
  id: 1,
  author: "Alice",
  translations: [
    { locale: "en", content: "Great service!" },
    { locale: "es", content: "¡Gran servicio!" },
  ],
};
const testimonialListResponse = { data: [testimonialEn], nextCursor: null };

describe("createNexusClient", () => {
  describe("request construction", () => {
    it("injects siteId into the path", async () => {
      let capturedUrl = "";
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => HttpResponse.json(localesNone)),
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, ({ request, params }) => {
          capturedUrl = request.url;
          expect(params.siteId).toBe(String(SITE_ID));
          return HttpResponse.json(testimonialListResponse);
        })
      );
      await makeClient().listTestimonials();
      expect(capturedUrl).toContain(`/websites/${SITE_ID}/testimonials`);
    });

    it("sends the Authorization header on every request", async () => {
      let capturedAuth = "";
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => HttpResponse.json(localesNone)),
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, ({ request }) => {
          capturedAuth = request.headers.get("Authorization") ?? "";
          return HttpResponse.json(testimonialListResponse);
        })
      );
      await makeClient().listTestimonials();
      expect(capturedAuth).toBe(`Bearer ${API_KEY}`);
    });

    it("forwards limit and cursor as query params", async () => {
      let url: URL | null = null;
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => HttpResponse.json(localesNone)),
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, ({ request }) => {
          url = new URL(request.url);
          return HttpResponse.json(testimonialListResponse);
        })
      );
      await makeClient().listTestimonials({ limit: 5, cursor: "abc123" });
      expect(url!.searchParams.get("limit")).toBe("5");
      expect(url!.searchParams.get("cursor")).toBe("abc123");
    });

    it("includes the slug in the path for slug-based get methods", async () => {
      let capturedUrl = "";
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => HttpResponse.json(localesNone)),
        http.get(`${BASE_URL}/websites/:siteId/pages/:slug`, ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json({ id: 1, slug: "about-us", title: "About Us", blocks: [] });
        })
      );
      await makeClient().getPage("about-us");
      expect(capturedUrl).toContain("/pages/about-us");
    });

    it("includes the numeric id in the path for getNavigation", async () => {
      let capturedUrl = "";
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => HttpResponse.json(localesNone)),
        http.get(`${BASE_URL}/websites/:siteId/navigations/:id`, ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json({ id: 1, handle: "main-menu", position: 1, items: [] });
        })
      );
      await makeClient().getNavigation(1);
      expect(capturedUrl).toContain("/navigations/1");
    });
  });

  describe("locale resolution", () => {
    it("fetches default locale from the /locales endpoint on first call", async () => {
      let localesFetched = false;
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => {
          localesFetched = true;
          return HttpResponse.json(localesEn);
        }),
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, () =>
          HttpResponse.json(testimonialListResponse)
        )
      );
      await makeClient().listTestimonials();
      expect(localesFetched).toBe(true);
    });

    it("caches the default locale — only one /locales request per client lifetime", async () => {
      let localeCallCount = 0;
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => {
          localeCallCount++;
          return HttpResponse.json(localesEn);
        }),
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, () =>
          HttpResponse.json(testimonialListResponse)
        )
      );
      const client = makeClient();
      await client.listTestimonials();
      await client.listTestimonials();
      expect(localeCallCount).toBe(1);
    });

    it("returns raw response (translations array) when site has no default locale", async () => {
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => HttpResponse.json(localesNone)),
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, () =>
          HttpResponse.json(testimonialListResponse)
        )
      );
      const result = await makeClient().listTestimonials();
      expect(result.data[0]).toHaveProperty("translations");
      expect(result.data[0]).not.toHaveProperty("translation");
    });

    it("applies the API default locale — replaces translations with translation", async () => {
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => HttpResponse.json(localesEn)),
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, () =>
          HttpResponse.json(testimonialListResponse)
        )
      );
      const result = await makeClient().listTestimonials();
      const item = result.data[0] as { translation: { locale: string; content: string } };
      expect(item.translation).toEqual({ locale: "en", content: "Great service!" });
      expect(item).not.toHaveProperty("translations");
    });

    it("per-call locale overrides the API default locale", async () => {
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => HttpResponse.json(localesEn)),
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, () =>
          HttpResponse.json(testimonialListResponse)
        )
      );
      const result = await makeClient().listTestimonials({ locale: "es" });
      const item = result.data[0] as { translation: { locale: string; content: string } };
      expect(item.translation?.locale).toBe("es");
      expect(item.translation?.content).toBe("¡Gran servicio!");
    });

    it("per-call locale skips the /locales fetch entirely", async () => {
      let localesFetched = false;
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => {
          localesFetched = true;
          return HttpResponse.json(localesEn);
        }),
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, () =>
          HttpResponse.json(testimonialListResponse)
        )
      );
      await makeClient().listTestimonials({ locale: "en" });
      expect(localesFetched).toBe(false);
    });

    it("sets translation: null when locale has no match", async () => {
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () =>
          HttpResponse.json({ locales: [{ locale: "fr", name: "French", isDefault: true }], default: "fr" })
        ),
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, () =>
          HttpResponse.json(testimonialListResponse)
        )
      );
      const result = await makeClient().listTestimonials();
      const item = result.data[0] as { translation: null };
      expect(item.translation).toBeNull();
    });
  });

  describe("blog", () => {
    const blogListResponse = {
      data: [
        {
          id: 1,
          slug: "hello-world",
          title: "Hello World",
          publishedAt: "2025-01-01T00:00:00Z",
          tags: ["react"],
          translations: [{ locale: "en", excerpt: "First post", seoTitle: "Hello" }],
          blocks: [],
        },
      ],
      nextCursor: null,
    };

    it("forwards tag, from, and to as query params", async () => {
      let url: URL | null = null;
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => HttpResponse.json(localesNone)),
        http.get(`${BASE_URL}/websites/:siteId/blog`, ({ request }) => {
          url = new URL(request.url);
          return HttpResponse.json(blogListResponse);
        })
      );
      await makeClient().listBlogPosts({
        tag: "react",
        from: "2025-01-01T00:00:00Z",
        to: "2025-12-31T23:59:59Z",
      });
      expect(url!.searchParams.get("tag")).toBe("react");
      expect(url!.searchParams.get("from")).toBe("2025-01-01T00:00:00Z");
      expect(url!.searchParams.get("to")).toBe("2025-12-31T23:59:59Z");
    });

    it("fetches a single blog post by slug", async () => {
      let capturedUrl = "";
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => HttpResponse.json(localesNone)),
        http.get(`${BASE_URL}/websites/:siteId/blog/:slug`, ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json(blogListResponse.data[0]);
        })
      );
      await makeClient().getBlogPost("hello-world");
      expect(capturedUrl).toContain("/blog/hello-world");
    });
  });

  describe("error handling", () => {
    it("throws with the API error string on 404", async () => {
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => HttpResponse.json(localesNone)),
        http.get(`${BASE_URL}/websites/:siteId/pages/:slug`, () =>
          HttpResponse.json({ error: "Resource not found" }, { status: 404 })
        )
      );
      await expect(makeClient().getPage("does-not-exist")).rejects.toThrow("Resource not found");
    });

    it("throws with HTTP status fallback when body has no error field", async () => {
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/locales`, () => HttpResponse.json(localesNone)),
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, () =>
          new HttpResponse(null, { status: 500 })
        )
      );
      await expect(makeClient().listTestimonials()).rejects.toThrow("HTTP 500");
    });

    it("throws on 401 unauthorized", async () => {
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/branding`, () =>
          HttpResponse.json({ error: "Missing or invalid API key" }, { status: 401 })
        )
      );
      await expect(makeClient().getBranding()).rejects.toThrow("Missing or invalid API key");
    });
  });
});
