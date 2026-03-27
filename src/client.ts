import createClient from "openapi-fetch";
import type { paths } from "./generated/api.js";
import type { NexusSDKConfig, ListParams, ListBlogParams, GetParams } from "./types.js";
import { localize } from "./localize.js";

async function unwrap<T>(
  result: Promise<{ data?: T; error?: unknown; response: Response }>
): Promise<T> {
  const { data, error, response } = await result;
  if (error || !response.ok) {
    const msg =
      typeof error === "object" && error !== null && "error" in error
        ? (error as { error: string }).error
        : `HTTP ${response.status}`;
    throw new Error(msg);
  }
  return data as T;
}

export function createNexusClient(config: NexusSDKConfig) {
  const http = createClient<paths>({
    baseUrl: config.baseUrl,
    headers: { Authorization: `Bearer ${config.apiKey}` },
  });

  if (config.debug) {
    http.use({
      async onResponse({ request, response }) {
        const body = await response.clone().json().catch(() => "(non-JSON body)");
        console.debug(`[nexus-sdk] ${request.method} ${request.url} → ${response.status}`, body);
        return undefined;
      },
    });
  }

  // Lazily fetched and cached default locale from the /locales endpoint.
  // undefined = not yet fetched; null = fetched but no default configured.
  let _cachedDefaultLocale: string | null | undefined = undefined;

  async function fetchDefaultLocale(): Promise<string | null> {
    if (_cachedDefaultLocale !== undefined) return _cachedDefaultLocale;
    const data = await unwrap(
      http.GET("/websites/{siteSlug}/locales", {
        params: { path: { siteSlug: config.siteSlug } },
      })
    );
    _cachedDefaultLocale = data.default ?? null;
    return _cachedDefaultLocale;
  }

  async function resolveLocale(params?: { locale?: string }): Promise<string | undefined> {
    if (params?.locale) return params.locale;
    return (await fetchDefaultLocale()) ?? undefined;
  }

  async function maybeLocalize<T>(data: T, locale: string | undefined) {
    return locale ? localize(data, locale) : data;
  }

  return {
    // --- Locales ---

    async getLocales() {
      return unwrap(
        http.GET("/websites/{siteSlug}/locales", {
          params: { path: { siteSlug: config.siteSlug } },
        })
      );
    },

    // --- Branding ---

    async getBranding(params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/branding", {
          params: { path: { siteSlug: config.siteSlug } },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },

    // --- Testimonials ---

    async listTestimonials(params?: ListParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/testimonials", {
          params: {
            path: { siteSlug: config.siteSlug },
            query: { limit: params?.limit, cursor: params?.cursor },
          },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },

    // --- Pages ---

    async listPages(params?: ListParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/pages", {
          params: {
            path: { siteSlug: config.siteSlug },
            query: { limit: params?.limit, cursor: params?.cursor },
          },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },

    async getPage(slug: string, params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/pages/{slug}", {
          params: { path: { siteSlug: config.siteSlug, slug } },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },

    // --- Blog ---

    async listBlogPosts(params?: ListBlogParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/blog", {
          params: {
            path: { siteSlug: config.siteSlug },
            query: {
              limit: params?.limit,
              cursor: params?.cursor,
              tag: params?.tag,
              from: params?.from,
              to: params?.to,
            },
          },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },

    async getBlogPost(slug: string, params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/blog/{slug}", {
          params: { path: { siteSlug: config.siteSlug, slug } },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },

    // --- Forms ---

    async listForms(params?: ListParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/forms", {
          params: {
            path: { siteSlug: config.siteSlug },
            query: { limit: params?.limit, cursor: params?.cursor },
          },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },

    async getForm(slug: string, params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/forms/{slug}", {
          params: { path: { siteSlug: config.siteSlug, slug } },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },

    // --- Jobs ---

    async listJobs(params?: ListParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/jobs", {
          params: {
            path: { siteSlug: config.siteSlug },
            query: { limit: params?.limit, cursor: params?.cursor },
          },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },

    async getJob(slug: string, params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/jobs/{slug}", {
          params: { path: { siteSlug: config.siteSlug, slug } },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },

    // --- Team Members ---

    async listTeamMembers(params?: ListParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/team-members", {
          params: {
            path: { siteSlug: config.siteSlug },
            query: { limit: params?.limit, cursor: params?.cursor },
          },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },

    // --- Navigations ---

    async listNavigations(params?: ListParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/navigations", {
          params: {
            path: { siteSlug: config.siteSlug },
            query: { limit: params?.limit, cursor: params?.cursor },
          },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },

    async getNavigation(handle: string, params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteSlug}/navigations/{handle}", {
          params: { path: { siteSlug: config.siteSlug, handle } },
        })
      );
      return maybeLocalize(data, await resolveLocale(params));
    },
  };
}

export type NexusClient = ReturnType<typeof createNexusClient>;
