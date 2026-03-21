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

function makeClient(defaultLocale?: string) {
  return createNexusClient({
    baseUrl: BASE_URL,
    apiKey: API_KEY,
    siteId: SITE_ID,
    defaultLocale,
  });
}

const testimonialEn = {
  id: 1,
  author: "Alice",
  translations: [
    { locale: "en", content: "Great service!" },
    { locale: "es", content: "¡Gran servicio!" },
  ],
};

const testimonialListResponse = {
  data: [testimonialEn],
  nextCursor: null,
};

describe("createNexusClient", () => {
  describe("request construction", () => {
    it("injects siteId into the path", async () => {
      let capturedUrl = "";
      server.use(
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
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, ({ request }) => {
          url = new URL(request.url);
          return HttpResponse.json(testimonialListResponse);
        })
      );
      await makeClient().listTestimonials({ limit: 5, cursor: "abc123" });
      expect(url!.searchParams.get("limit")).toBe("5");
      expect(url!.searchParams.get("cursor")).toBe("abc123");
    });

    it("includes the id in the path for get-by-id methods", async () => {
      let capturedUrl = "";
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/testimonials/:id`, ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json(testimonialEn);
        })
      );
      await makeClient().getTestimonial(99);
      expect(capturedUrl).toContain("/testimonials/99");
    });
  });

  describe("locale filtering", () => {
    it("returns raw response (translations array) when no locale is set", async () => {
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, () =>
          HttpResponse.json(testimonialListResponse)
        )
      );
      const result = await makeClient().listTestimonials();
      expect(result.data[0]).toHaveProperty("translations");
      expect(result.data[0]).not.toHaveProperty("translation");
    });

    it("applies defaultLocale — replaces translations with translation", async () => {
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, () =>
          HttpResponse.json(testimonialListResponse)
        )
      );
      const result = await makeClient("en").listTestimonials();
      const item = result.data[0] as { translation: { locale: string; content: string } };
      expect(item.translation).toEqual({ locale: "en", content: "Great service!" });
      expect(item).not.toHaveProperty("translations");
    });

    it("per-call locale overrides defaultLocale", async () => {
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, () =>
          HttpResponse.json(testimonialListResponse)
        )
      );
      const result = await makeClient("en").listTestimonials({ locale: "es" });
      const item = result.data[0] as { translation: { locale: string; content: string } };
      expect(item.translation?.locale).toBe("es");
      expect(item.translation?.content).toBe("¡Gran servicio!");
    });

    it("sets translation: null when locale has no match", async () => {
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/testimonials`, () =>
          HttpResponse.json(testimonialListResponse)
        )
      );
      const result = await makeClient("fr").listTestimonials();
      const item = result.data[0] as { translation: null };
      expect(item.translation).toBeNull();
    });
  });

  describe("error handling", () => {
    it("throws with the API error string on 404", async () => {
      server.use(
        http.get(`${BASE_URL}/websites/:siteId/testimonials/:id`, () =>
          HttpResponse.json({ error: "Resource not found" }, { status: 404 })
        )
      );
      await expect(makeClient().getTestimonial(999)).rejects.toThrow("Resource not found");
    });

    it("throws with HTTP status fallback when body has no error field", async () => {
      server.use(
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
