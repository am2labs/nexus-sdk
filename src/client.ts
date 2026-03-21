import createClient from "openapi-fetch";
import type { paths } from "./generated/api.js";
import type { NexusSDKConfig, ListParams, GetParams } from "./types.js";
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

  function resolveLocale(params?: { locale?: string }): string | undefined {
    return params?.locale ?? config.defaultLocale;
  }

  function maybeLocalize<T>(data: T, locale: string | undefined) {
    return locale ? localize(data, locale) : data;
  }

  return {
    // --- Testimonials ---

    async listTestimonials(params?: ListParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/testimonials", {
          params: {
            path: { siteId: config.siteId },
            query: { limit: params?.limit, cursor: params?.cursor },
          },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },

    async getTestimonial(id: number, params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/testimonials/{id}", {
          params: { path: { siteId: config.siteId, id } },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },

    // --- Forms ---

    async listForms(params?: ListParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/forms", {
          params: {
            path: { siteId: config.siteId },
            query: { limit: params?.limit, cursor: params?.cursor },
          },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },

    async getForm(id: number, params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/forms/{id}", {
          params: { path: { siteId: config.siteId, id } },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },

    // --- Pages ---

    async listPages(params?: ListParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/pages", {
          params: {
            path: { siteId: config.siteId },
            query: { limit: params?.limit, cursor: params?.cursor },
          },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },

    async getPage(id: number, params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/pages/{id}", {
          params: { path: { siteId: config.siteId, id } },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },

    // --- Team Members ---

    async listTeamMembers(params?: ListParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/team-members", {
          params: {
            path: { siteId: config.siteId },
            query: { limit: params?.limit, cursor: params?.cursor },
          },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },

    async getTeamMember(id: number, params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/team-members/{id}", {
          params: { path: { siteId: config.siteId, id } },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },

    // --- Jobs ---

    async listJobs(params?: ListParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/jobs", {
          params: {
            path: { siteId: config.siteId },
            query: { limit: params?.limit, cursor: params?.cursor },
          },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },

    async getJob(id: number, params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/jobs/{id}", {
          params: { path: { siteId: config.siteId, id } },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },

    // --- Navigations ---

    async listNavigations(params?: ListParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/navigations", {
          params: {
            path: { siteId: config.siteId },
            query: { limit: params?.limit, cursor: params?.cursor },
          },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },

    async getNavigation(id: number, params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/navigations/{id}", {
          params: { path: { siteId: config.siteId, id } },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },

    // --- Branding ---

    async getBranding(params?: GetParams) {
      const data = await unwrap(
        http.GET("/websites/{siteId}/branding", {
          params: { path: { siteId: config.siteId } },
        })
      );
      return maybeLocalize(data, resolveLocale(params));
    },
  };
}

export type NexusClient = ReturnType<typeof createNexusClient>;
