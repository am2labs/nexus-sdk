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
	function resolveLocale(params) {
		return params?.locale ?? config.defaultLocale;
	}
	function maybeLocalize(data, locale) {
		return locale ? localize(data, locale) : data;
	}
	return {
		async listTestimonials(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/testimonials", { params: {
				path: { siteId: config.siteId },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), resolveLocale(params));
		},
		async getTestimonial(id, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/testimonials/{id}", { params: { path: {
				siteId: config.siteId,
				id
			} } })), resolveLocale(params));
		},
		async listForms(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/forms", { params: {
				path: { siteId: config.siteId },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), resolveLocale(params));
		},
		async getForm(id, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/forms/{id}", { params: { path: {
				siteId: config.siteId,
				id
			} } })), resolveLocale(params));
		},
		async listPages(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/pages", { params: {
				path: { siteId: config.siteId },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), resolveLocale(params));
		},
		async getPage(id, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/pages/{id}", { params: { path: {
				siteId: config.siteId,
				id
			} } })), resolveLocale(params));
		},
		async listTeamMembers(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/team-members", { params: {
				path: { siteId: config.siteId },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), resolveLocale(params));
		},
		async getTeamMember(id, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/team-members/{id}", { params: { path: {
				siteId: config.siteId,
				id
			} } })), resolveLocale(params));
		},
		async listJobs(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/jobs", { params: {
				path: { siteId: config.siteId },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), resolveLocale(params));
		},
		async getJob(id, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/jobs/{id}", { params: { path: {
				siteId: config.siteId,
				id
			} } })), resolveLocale(params));
		},
		async listNavigations(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/navigations", { params: {
				path: { siteId: config.siteId },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), resolveLocale(params));
		},
		async getNavigation(id, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/navigations/{id}", { params: { path: {
				siteId: config.siteId,
				id
			} } })), resolveLocale(params));
		},
		async getBranding(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/branding", { params: { path: { siteId: config.siteId } } })), resolveLocale(params));
		}
	};
}
//#endregion
export { createNexusClient };

//# sourceMappingURL=index.mjs.map