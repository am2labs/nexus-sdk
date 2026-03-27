import createClient from "openapi-fetch";
//#region src/localize.ts
/**
* Deep-transforms a response value: every object with a `translations` array
* has that array replaced by a single `translation` entry matching the given
* locale, or null if no match is found. All nested objects and arrays are
* transformed recursively.
*/
function localize(value, locale) {
	if (Array.isArray(value)) return value.map((item) => localize(item, locale));
	if (value !== null && typeof value === "object") {
		const obj = value;
		if ("translations" in obj && Array.isArray(obj.translations)) {
			const { translations, ...rest } = obj;
			const translation = translations.find((t) => t.locale === locale) ?? null;
			const localized = {
				...rest,
				translation
			};
			for (const key of Object.keys(localized)) if (key !== "translation") localized[key] = localize(localized[key], locale);
			return localized;
		}
		const result = {};
		for (const [k, v] of Object.entries(obj)) result[k] = localize(v, locale);
		return result;
	}
	return value;
}
//#endregion
//#region src/client.ts
async function unwrap(result) {
	const { data, error, response } = await result;
	if (error || !response.ok) {
		const msg = typeof error === "object" && error !== null && "error" in error ? error.error : `HTTP ${response.status}`;
		throw new Error(msg);
	}
	return data;
}
function createNexusClient(config) {
	const http = createClient({
		baseUrl: config.baseUrl,
		headers: { Authorization: `Bearer ${config.apiKey}` }
	});
	if (config.debug) http.use({ async onResponse({ request, response }) {
		const body = await response.clone().json().catch(() => "(non-JSON body)");
		console.debug(`[nexus-sdk] ${request.method} ${request.url} → ${response.status}`, body);
	} });
	let _cachedDefaultLocale = void 0;
	async function fetchDefaultLocale() {
		if (_cachedDefaultLocale !== void 0) return _cachedDefaultLocale;
		_cachedDefaultLocale = (await unwrap(http.GET("/websites/{siteSlug}/locales", { params: { path: { siteSlug: config.siteSlug } } }))).default ?? null;
		return _cachedDefaultLocale;
	}
	async function resolveLocale(params) {
		if (params?.locale) return params.locale;
		return await fetchDefaultLocale() ?? void 0;
	}
	async function maybeLocalize(data, locale) {
		return locale ? localize(data, locale) : data;
	}
	return {
		async getLocales() {
			return unwrap(http.GET("/websites/{siteSlug}/locales", { params: { path: { siteSlug: config.siteSlug } } }));
		},
		async getBranding(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/branding", { params: { path: { siteSlug: config.siteSlug } } })), await resolveLocale(params));
		},
		async listTestimonials(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/testimonials", { params: {
				path: { siteSlug: config.siteSlug },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), await resolveLocale(params));
		},
		async listPages(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/pages", { params: {
				path: { siteSlug: config.siteSlug },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), await resolveLocale(params));
		},
		async getPage(slug, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/pages/{slug}", { params: { path: {
				siteSlug: config.siteSlug,
				slug
			} } })), await resolveLocale(params));
		},
		async listBlogPosts(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/blog", { params: {
				path: { siteSlug: config.siteSlug },
				query: {
					limit: params?.limit,
					cursor: params?.cursor,
					tag: params?.tag,
					from: params?.from,
					to: params?.to
				}
			} })), await resolveLocale(params));
		},
		async getBlogPost(slug, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/blog/{slug}", { params: { path: {
				siteSlug: config.siteSlug,
				slug
			} } })), await resolveLocale(params));
		},
		async listForms(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/forms", { params: {
				path: { siteSlug: config.siteSlug },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), await resolveLocale(params));
		},
		async getForm(slug, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/forms/{slug}", { params: { path: {
				siteSlug: config.siteSlug,
				slug
			} } })), await resolveLocale(params));
		},
		async listJobs(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/jobs", { params: {
				path: { siteSlug: config.siteSlug },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), await resolveLocale(params));
		},
		async getJob(slug, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/jobs/{slug}", { params: { path: {
				siteSlug: config.siteSlug,
				slug
			} } })), await resolveLocale(params));
		},
		async listTeamMembers(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/team-members", { params: {
				path: { siteSlug: config.siteSlug },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), await resolveLocale(params));
		},
		async listNavigations(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/navigations", { params: {
				path: { siteSlug: config.siteSlug },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), await resolveLocale(params));
		},
		async getNavigation(handle, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteSlug}/navigations/{handle}", { params: { path: {
				siteSlug: config.siteSlug,
				handle
			} } })), await resolveLocale(params));
		}
	};
}
//#endregion
export { createNexusClient };

//# sourceMappingURL=index.mjs.map