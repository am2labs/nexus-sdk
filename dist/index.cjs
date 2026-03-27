Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let openapi_fetch = require("openapi-fetch");
openapi_fetch = __toESM(openapi_fetch);
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
	const http = (0, openapi_fetch.default)({
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
		_cachedDefaultLocale = (await unwrap(http.GET("/websites/{siteId}/locales", { params: { path: { siteId: config.siteId } } }))).default ?? null;
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
			return unwrap(http.GET("/websites/{siteId}/locales", { params: { path: { siteId: config.siteId } } }));
		},
		async getBranding(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/branding", { params: { path: { siteId: config.siteId } } })), await resolveLocale(params));
		},
		async listTestimonials(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/testimonials", { params: {
				path: { siteId: config.siteId },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), await resolveLocale(params));
		},
		async listPages(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/pages", { params: {
				path: { siteId: config.siteId },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), await resolveLocale(params));
		},
		async getPage(slug, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/pages/{slug}", { params: { path: {
				siteId: config.siteId,
				slug
			} } })), await resolveLocale(params));
		},
		async listBlogPosts(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/blog", { params: {
				path: { siteId: config.siteId },
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
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/blog/{slug}", { params: { path: {
				siteId: config.siteId,
				slug
			} } })), await resolveLocale(params));
		},
		async listForms(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/forms", { params: {
				path: { siteId: config.siteId },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), await resolveLocale(params));
		},
		async getForm(slug, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/forms/{slug}", { params: { path: {
				siteId: config.siteId,
				slug
			} } })), await resolveLocale(params));
		},
		async listJobs(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/jobs", { params: {
				path: { siteId: config.siteId },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), await resolveLocale(params));
		},
		async getJob(slug, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/jobs/{slug}", { params: { path: {
				siteId: config.siteId,
				slug
			} } })), await resolveLocale(params));
		},
		async listTeamMembers(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/team-members", { params: {
				path: { siteId: config.siteId },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), await resolveLocale(params));
		},
		async listNavigations(params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/navigations", { params: {
				path: { siteId: config.siteId },
				query: {
					limit: params?.limit,
					cursor: params?.cursor
				}
			} })), await resolveLocale(params));
		},
		async getNavigation(id, params) {
			return maybeLocalize(await unwrap(http.GET("/websites/{siteId}/navigations/{id}", { params: { path: {
				siteId: config.siteId,
				id
			} } })), await resolveLocale(params));
		}
	};
}
//#endregion
exports.createNexusClient = createNexusClient;

//# sourceMappingURL=index.cjs.map