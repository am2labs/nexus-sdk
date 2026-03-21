export interface NexusSDKConfig {
  /** Full API origin + base path, e.g. "https://example.com/api/v1" */
  baseUrl: string;
  /** Bearer token issued by the Nexus admin dashboard (nxs_...) */
  apiKey: string;
  /** Numeric site identifier */
  siteId: number;
  /** ISO 639-1 locale applied to all responses unless overridden per-call */
  defaultLocale?: string;
  /** Log every request and response to the console */
  debug?: boolean;
}

export interface ListParams {
  limit?: number;
  cursor?: string;
  /** Overrides defaultLocale for this call */
  locale?: string;
}

export interface GetParams {
  /** Overrides defaultLocale for this call */
  locale?: string;
}
