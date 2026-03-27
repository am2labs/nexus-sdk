export interface NexusSDKConfig {
  /** Full API origin + base path, e.g. "https://example.com/api/v1" */
  baseUrl: string;
  /** Bearer token issued by the Nexus admin dashboard (nxs_...) */
  apiKey: string;
  /** Site slug identifier (from the Nexus admin dashboard) */
  siteSlug: string;
  /** Log every request and response to the console */
  debug?: boolean;
}

export interface ListParams {
  limit?: number;
  cursor?: string;
  /** Overrides the site's default locale for this call */
  locale?: string;
}

export interface ListBlogParams extends ListParams {
  /** Filter by tag. Repeatable — AND logic (all tags must match) */
  tag?: string;
  /** Only include posts published at or after this date (ISO 8601) */
  from?: string;
  /** Only include posts published at or before this date (ISO 8601) */
  to?: string;
}

export interface GetParams {
  /** Overrides the site's default locale for this call */
  locale?: string;
}
