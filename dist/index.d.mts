//#region src/types.d.ts
interface NexusSDKConfig {
  /** Full API origin + base path, e.g. "https://example.com/api/v1" */
  baseUrl: string;
  /** Bearer token issued by the Nexus admin dashboard (nxs_...) */
  apiKey: string;
  /** Site slug identifier (from the Nexus admin dashboard) */
  siteSlug: string;
  /** Log every request and response to the console */
  debug?: boolean;
}
interface ListParams {
  limit?: number;
  cursor?: string;
  /** Overrides the site's default locale for this call */
  locale?: string;
}
interface ListBlogParams extends ListParams {
  /** Filter by tag. Repeatable — AND logic (all tags must match) */
  tag?: string;
  /** Only include posts published at or after this date (ISO 8601) */
  from?: string;
  /** Only include posts published at or before this date (ISO 8601) */
  to?: string;
}
interface GetParams {
  /** Overrides the site's default locale for this call */
  locale?: string;
}
//#endregion
//#region src/client.d.ts
declare function createNexusClient(config: NexusSDKConfig): {
  getLocales(): Promise<{
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  }>;
  getBranding(params?: GetParams): Promise<{
    globals: {
      phone: string;
      email: string;
      translations: {
        locale: string;
        tagline: string;
        footerCopyright: string;
        footerAddress: string;
      }[];
    } | null;
    logos: {
      id: number;
      role: string;
      image: {
        id: number;
        slug: string;
        url: string;
        altText: string;
      } | null;
      position: number;
      translations: {
        locale: string;
        altText: string;
      }[];
    }[];
    ctas: {
      id: number;
      zone: string;
      url: string;
      openInNewTab: boolean;
      position: number;
      translations: {
        locale: string;
        label: string;
      }[];
    }[];
    socialLinks: {
      id: number;
      platform: string;
      url: string;
      position: number;
    }[];
  } | {
    globals: {
      phone: string;
      email: string;
      translation: {
        locale: string;
        tagline: string;
        footerCopyright: string;
        footerAddress: string;
      } | null;
    } | null;
    logos: {
      id: number;
      role: string;
      image: {
        id: number;
        slug: string;
        url: string;
        altText: string;
      } | null;
      position: number;
      translation: {
        locale: string;
        altText: string;
      } | null;
    }[];
    ctas: {
      id: number;
      position: number;
      url: string;
      zone: string;
      openInNewTab: boolean;
      translation: {
        locale: string;
        label: string;
      } | null;
    }[];
    socialLinks: {
      id: number;
      platform: string;
      url: string;
      position: number;
    }[];
  }>;
  listTestimonials(params?: ListParams): Promise<{
    data: {
      id: number;
      author: string;
      image1: {
        id: number;
        slug: string;
        url: string;
        altText: string;
      } | null;
      image2: {
        id: number;
        slug: string;
        url: string;
        altText: string;
      } | null;
      customFields: {
        key: string;
        label: string;
        type: "string" | "number" | "boolean";
        value: string | number | boolean | null;
      }[];
      translations: {
        locale: string;
        content: string;
      }[];
    }[];
    nextCursor: string | null;
  } | {
    data: {
      id: number;
      author: string;
      image1: {
        id: number;
        slug: string;
        url: string;
        altText: string;
      } | null;
      image2: {
        id: number;
        slug: string;
        url: string;
        altText: string;
      } | null;
      customFields: {
        key: string;
        label: string;
        type: "string" | "number" | "boolean";
        value: string | number | boolean | null;
      }[];
      translation: {
        locale: string;
        content: string;
      } | null;
    }[];
    nextCursor: string | null;
  }>;
  listPages(params?: ListParams): Promise<{
    data: {
      id: number;
      slug: string;
      title: string;
      blocks: {
        id: number;
        type: string;
        position: number;
        meta?: string | null | undefined;
        translations: {
          locale: string;
          content: string;
        }[];
      }[];
    }[];
    nextCursor: string | null;
  } | {
    data: {
      id: number;
      slug: string;
      title: string;
      blocks: {
        id: number;
        position: number;
        type: string;
        meta?: string | null | undefined;
        translation: {
          locale: string;
          content: string;
        } | null;
      }[];
    }[];
    nextCursor: string | null;
  }>;
  getPage(slug: string, params?: GetParams): Promise<{
    id: number;
    slug: string;
    title: string;
    blocks: {
      id: number;
      type: string;
      position: number;
      meta?: string | null | undefined;
      translations: {
        locale: string;
        content: string;
      }[];
    }[];
  } | {
    id: number;
    slug: string;
    title: string;
    blocks: {
      id: number;
      position: number;
      type: string;
      meta?: string | null | undefined;
      translation: {
        locale: string;
        content: string;
      } | null;
    }[];
  }>;
  listBlogPosts(params?: ListBlogParams): Promise<{
    data: {
      id: number;
      slug: string;
      title: string;
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        url: string;
        altText: string;
      } | null | undefined;
      tags: string[];
      translations: {
        locale: string;
        excerpt: string;
        seoTitle: string;
      }[];
      blocks: {
        id: number;
        type: string;
        position: number;
        meta?: string | null | undefined;
        translations: {
          locale: string;
          content: string;
        }[];
      }[];
    }[];
    nextCursor: string | null;
  } | {
    data: {
      id: number;
      slug: string;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      title: string;
      blocks: {
        id: number;
        position: number;
        type: string;
        meta?: string | null | undefined;
        translation: {
          locale: string;
          content: string;
        } | null;
      }[];
      publishedAt: string | null;
      coverImage?: {
        id: number;
        slug: string;
        url: string;
        altText: string;
      } | null | undefined;
      tags: string[];
      translation: {
        locale: string;
        excerpt: string;
        seoTitle: string;
      } | null;
    }[];
    nextCursor: string | null;
  }>;
  getBlogPost(slug: string, params?: GetParams): Promise<{
    id: number;
    slug: string;
    title: string;
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      url: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translations: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    }[];
    blocks: {
      id: number;
      type: string;
      position: number;
      meta?: string | null | undefined;
      translations: {
        locale: string;
        content: string;
      }[];
    }[];
  } | {
    id: number;
    slug: string;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    title: string;
    blocks: {
      id: number;
      position: number;
      type: string;
      meta?: string | null | undefined;
      translation: {
        locale: string;
        content: string;
      } | null;
    }[];
    publishedAt: string | null;
    coverImage?: {
      id: number;
      slug: string;
      url: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
  }>;
  listForms(params?: ListParams): Promise<{
    data: {
      id: number;
      slug: string;
      submitAction: {};
      spamProtection: {};
      translations: {
        locale: string;
        title: string;
        description?: string | null | undefined;
        submitLabel: string;
      }[];
      steps: {
        id: number;
        position: number;
        translations: {
          locale: string;
          title: string;
          description?: string | null | undefined;
        }[];
      }[];
      fields: {
        id: number;
        stepId?: number | null | undefined;
        parentId?: number | null | undefined;
        position: number;
        name: string;
        type: string;
        required: boolean;
        config: {};
        conditions: {};
        translations: {
          locale: string;
          label: string;
          placeholder?: string | null | undefined;
          helperText?: string | null | undefined;
          optionLabels?: {} | null | undefined;
        }[];
      }[];
    }[];
    nextCursor: string | null;
  } | {
    data: {
      id: number;
      slug: string;
      submitAction: {};
      spamProtection: {};
      steps: {
        id: number;
        position: number;
        translation: {
          locale: string;
          title: string;
          description?: string | null | undefined;
        } | null;
      }[];
      fields: {
        name: string;
        id: number;
        position: number;
        type: string;
        stepId?: number | null | undefined;
        parentId?: number | null | undefined;
        required: boolean;
        config: {};
        conditions: {};
        translation: {
          locale: string;
          label: string;
          placeholder?: string | null | undefined;
          helperText?: string | null | undefined;
          optionLabels?: {} | null | undefined;
        } | null;
      }[];
      translation: {
        locale: string;
        title: string;
        description?: string | null | undefined;
        submitLabel: string;
      } | null;
    }[];
    nextCursor: string | null;
  }>;
  getForm(slug: string, params?: GetParams): Promise<{
    id: number;
    slug: string;
    submitAction: {};
    spamProtection: {};
    translations: {
      locale: string;
      title: string;
      description?: string | null | undefined;
      submitLabel: string;
    }[];
    steps: {
      id: number;
      position: number;
      translations: {
        locale: string;
        title: string;
        description?: string | null | undefined;
      }[];
    }[];
    fields: {
      id: number;
      stepId?: number | null | undefined;
      parentId?: number | null | undefined;
      position: number;
      name: string;
      type: string;
      required: boolean;
      config: {};
      conditions: {};
      translations: {
        locale: string;
        label: string;
        placeholder?: string | null | undefined;
        helperText?: string | null | undefined;
        optionLabels?: {} | null | undefined;
      }[];
    }[];
  } | {
    id: number;
    slug: string;
    submitAction: {};
    spamProtection: {};
    steps: {
      id: number;
      position: number;
      translation: {
        locale: string;
        title: string;
        description?: string | null | undefined;
      } | null;
    }[];
    fields: {
      name: string;
      id: number;
      position: number;
      type: string;
      stepId?: number | null | undefined;
      parentId?: number | null | undefined;
      required: boolean;
      config: {};
      conditions: {};
      translation: {
        locale: string;
        label: string;
        placeholder?: string | null | undefined;
        helperText?: string | null | undefined;
        optionLabels?: {} | null | undefined;
      } | null;
    }[];
    translation: {
      locale: string;
      title: string;
      description?: string | null | undefined;
      submitLabel: string;
    } | null;
  }>;
  listJobs(params?: ListParams): Promise<{
    data: {
      id: number;
      slug: string;
      workArrangement: string;
      employmentType: string;
      department: string;
      salaryMin?: number | null | undefined;
      salaryMax?: number | null | undefined;
      salaryCurrency: string;
      location?: {
        id: number;
        name: string;
        city: string;
        state: string;
        country: string;
      } | null | undefined;
      translations: {
        locale: string;
        title: string;
        description: string;
        requirements: string;
        niceToHaves: string;
      }[];
    }[];
    nextCursor: string | null;
  } | {
    data: {
      location?: {
        id: number;
        name: string;
        city: string;
        state: string;
        country: string;
      } | null | undefined;
      id: number;
      slug: string;
      workArrangement: string;
      employmentType: string;
      department: string;
      salaryMin?: number | null | undefined;
      salaryMax?: number | null | undefined;
      salaryCurrency: string;
      translation: {
        locale: string;
        title: string;
        description: string;
        requirements: string;
        niceToHaves: string;
      } | null;
    }[];
    nextCursor: string | null;
  }>;
  getJob(slug: string, params?: GetParams): Promise<{
    id: number;
    slug: string;
    workArrangement: string;
    employmentType: string;
    department: string;
    salaryMin?: number | null | undefined;
    salaryMax?: number | null | undefined;
    salaryCurrency: string;
    location?: {
      id: number;
      name: string;
      city: string;
      state: string;
      country: string;
    } | null | undefined;
    translations: {
      locale: string;
      title: string;
      description: string;
      requirements: string;
      niceToHaves: string;
    }[];
  } | {
    location?: {
      id: number;
      name: string;
      city: string;
      state: string;
      country: string;
    } | null | undefined;
    id: number;
    slug: string;
    workArrangement: string;
    employmentType: string;
    department: string;
    salaryMin?: number | null | undefined;
    salaryMax?: number | null | undefined;
    salaryCurrency: string;
    translation: {
      locale: string;
      title: string;
      description: string;
      requirements: string;
      niceToHaves: string;
    } | null;
  }>;
  listTeamMembers(params?: ListParams): Promise<{
    data: {
      id: number;
      firstName: string;
      lastName: string;
      position: number;
      groupId: number | null;
      image: {
        id: number;
        slug: string;
        url: string;
        altText: string;
      } | null;
      translations: {
        locale: string;
        title: string;
        shortBiography: string;
        longBiography: string;
      }[];
    }[];
    nextCursor: string | null;
  } | {
    data: {
      id: number;
      image: {
        id: number;
        slug: string;
        url: string;
        altText: string;
      } | null;
      position: number;
      firstName: string;
      lastName: string;
      groupId: number | null;
      translation: {
        locale: string;
        title: string;
        shortBiography: string;
        longBiography: string;
      } | null;
    }[];
    nextCursor: string | null;
  }>;
  listNavigations(params?: ListParams): Promise<{
    data: {
      id: number;
      handle: string;
      position: number;
      items: {
        id: number;
        parentId: number | null;
        position: number;
        url: string;
        openInNewTab: boolean;
        translations: {
          locale: string;
          label: string;
        }[];
      }[];
    }[];
    nextCursor: string | null;
  } | {
    data: {
      id: number;
      handle: string;
      position: number;
      items: {
        id: number;
        position: number;
        url: string;
        openInNewTab: boolean;
        parentId: number | null;
        translation: {
          locale: string;
          label: string;
        } | null;
      }[];
    }[];
    nextCursor: string | null;
  }>;
  getNavigation(handle: string, params?: GetParams): Promise<{
    id: number;
    handle: string;
    position: number;
    items: {
      id: number;
      parentId: number | null;
      position: number;
      url: string;
      openInNewTab: boolean;
      translations: {
        locale: string;
        label: string;
      }[];
    }[];
  } | {
    id: number;
    handle: string;
    position: number;
    items: {
      id: number;
      position: number;
      url: string;
      openInNewTab: boolean;
      parentId: number | null;
      translation: {
        locale: string;
        label: string;
      } | null;
    }[];
  }>;
};
type NexusClient = ReturnType<typeof createNexusClient>;
//#endregion
//#region src/localize.d.ts
/**
 * Recursive mapped type that replaces every `translations: T[]` property
 * with a single `translation: T | null` for the resolved locale.
 * Applied recursively through nested objects and arrays.
 */
type Localized<T> = T extends {
  translations: Array<infer U>;
} ? Omit<T, "translations"> & {
  translation: U | null;
} extends infer R ? { [K in keyof R]: Localized<R[K]> } : never : T extends Array<infer Item> ? Array<Localized<Item>> : T extends object ? { [K in keyof T]: Localized<T[K]> } : T;
//#endregion
//#region src/generated/api.d.ts
interface components {
  schemas: {
    Translation: {
      /**
       * @description ISO 639-1 language code
       * @example en
       * @example es
       */
      locale: string; /** @description Translated testimonial body */
      content: string;
    };
    CustomFieldValue: {
      /** @description Machine-readable custom field key */key: string; /** @description Human-readable custom field label */
      label: string;
      /**
       * @description JSON scalar type for the custom field value
       * @enum {string}
       */
      type: "string" | "number" | "boolean"; /** @description Custom field value, or null when no value has been set */
      value: string | number | boolean | null;
    };
    Testimonial: {
      id: number;
      author: string; /** @description First gallery image, or null if none assigned */
      image1: components["schemas"]["GalleryImage"] | null; /** @description Second gallery image, or null if none assigned */
      image2: components["schemas"]["GalleryImage"] | null; /** @description Testimonial custom field values in configured field order */
      customFields: components["schemas"]["CustomFieldValue"][];
      translations: components["schemas"]["Translation"][];
    };
    TestimonialListResponse: {
      data: components["schemas"]["Testimonial"][]; /** @description Opaque cursor for the next page. Pass as the `cursor` query parameter to fetch the next batch. Null when there are no more results. */
      nextCursor: string | null;
    };
    FormTranslation: {
      /**
       * @description ISO 639-1 language code
       * @example en
       * @example es
       */
      locale: string;
      title: string;
      description?: string | null;
      submitLabel: string;
    };
    FormStepTranslation: {
      locale: string;
      title: string;
      description?: string | null;
    };
    FormStep: {
      id: number;
      position: number;
      translations: components["schemas"]["FormStepTranslation"][];
    };
    FormFieldTranslation: {
      locale: string;
      label: string;
      placeholder?: string | null;
      helperText?: string | null; /** @description Map of option value to translated label, or null */
      optionLabels?: Record<string, never> | null;
    };
    FormField: {
      id: number;
      stepId?: number | null;
      parentId?: number | null;
      position: number;
      name: string; /** @description Field type: text, email, tel, url, number, textarea, select, radio, checkbox, checkbox_group, group */
      type: string;
      required: boolean; /** @description Field-type-specific configuration (options, min/max, etc.) */
      config: Record<string, never>; /** @description Conditional visibility rules */
      conditions: Record<string, never>;
      translations: components["schemas"]["FormFieldTranslation"][];
    };
    Form: {
      id: number;
      slug: string; /** @description Submit action configuration */
      submitAction: Record<string, never>; /** @description Spam protection configuration */
      spamProtection: Record<string, never>;
      translations: components["schemas"]["FormTranslation"][];
      steps: components["schemas"]["FormStep"][];
      fields: components["schemas"]["FormField"][];
    };
    FormListResponse: {
      data: components["schemas"]["Form"][]; /** @description Opaque cursor for the next page. Pass as the `cursor` query parameter to fetch the next batch. Null when there are no more results. */
      nextCursor: string | null;
    };
    ContentBlockTranslation: {
      /**
       * @description ISO 639-1 language code
       * @example en
       * @example es
       */
      locale: string; /** @description Translated block content */
      content: string;
    };
    ContentBlock: {
      id: number; /** @description Block type (e.g. text, image, video) */
      type: string;
      position: number; /** @description Optional JSON metadata for the block */
      meta?: string | null;
      translations: components["schemas"]["ContentBlockTranslation"][];
    };
    Page: {
      id: number;
      slug: string;
      title: string;
      blocks: components["schemas"]["ContentBlock"][];
    };
    PageListResponse: {
      data: components["schemas"]["Page"][]; /** @description Opaque cursor for the next page. Pass as the `cursor` query parameter to fetch the next batch. Null when there are no more results. */
      nextCursor: string | null;
    };
    TeamMemberTranslation: {
      /**
       * @description ISO 639-1 language code
       * @example en
       * @example es
       */
      locale: string; /** @description Translated job title */
      title: string; /** @description Translated short biography */
      shortBiography: string; /** @description Translated long biography */
      longBiography: string;
    };
    TeamMember: {
      id: number;
      firstName: string;
      lastName: string;
      position: number;
      groupId: number | null; /** @description Profile image, or null if none assigned */
      image: components["schemas"]["GalleryImage"] | null;
      translations: components["schemas"]["TeamMemberTranslation"][];
    };
    TeamMemberListResponse: {
      data: components["schemas"]["TeamMember"][]; /** @description Opaque cursor for the next page. Pass as the `cursor` query parameter to fetch the next batch. Null when there are no more results. */
      nextCursor: string | null;
    };
    JobTranslation: {
      /**
       * @description ISO 639-1 language code
       * @example en
       * @example es
       */
      locale: string;
      title: string;
      description: string;
      requirements: string;
      niceToHaves: string;
    };
    JobLocation: {
      id: number;
      name: string;
      city: string;
      state: string;
      country: string;
    };
    Job: {
      id: number;
      slug: string; /** @description Work arrangement: on_site, remote, hybrid */
      workArrangement: string; /** @description Employment type: full_time, part_time, contract, internship */
      employmentType: string;
      department: string;
      salaryMin?: number | null;
      salaryMax?: number | null;
      salaryCurrency: string;
      location?: components["schemas"]["JobLocation"] | null;
      translations: components["schemas"]["JobTranslation"][];
    };
    JobListResponse: {
      data: components["schemas"]["Job"][]; /** @description Opaque cursor for the next page. Pass as the `cursor` query parameter to fetch the next batch. Null when there are no more results. */
      nextCursor: string | null;
    };
    NavigationItemTranslation: {
      /** @example en */locale: string; /** @example Home */
      label: string;
    };
    NavigationItem: {
      id: number;
      parentId: number | null;
      position: number;
      url: string;
      openInNewTab: boolean;
      translations: components["schemas"]["NavigationItemTranslation"][];
    };
    Navigation: {
      id: number; /** @example main-menu */
      handle: string;
      position: number;
      items: components["schemas"]["NavigationItem"][];
    };
    NavigationListResponse: {
      data: components["schemas"]["Navigation"][]; /** @description Opaque cursor for the next page. Pass as the `cursor` query parameter to fetch the next batch. Null when there are no more results. */
      nextCursor: string | null;
    };
    BrandingGlobalsTranslation: {
      /**
       * @description ISO 639-1 language code
       * @example en
       * @example es
       */
      locale: string;
      tagline: string;
      footerCopyright: string;
      footerAddress: string;
    };
    BrandingGlobals: {
      phone: string;
      email: string;
      translations: components["schemas"]["BrandingGlobalsTranslation"][];
    };
    BrandingLogoTranslation: {
      locale: string;
      altText: string;
    };
    BrandingLogo: {
      id: number;
      role: string; /** @description Logo image, or null if none assigned */
      image: components["schemas"]["GalleryImage"] | null;
      position: number;
      translations: components["schemas"]["BrandingLogoTranslation"][];
    };
    BrandingCtaTranslation: {
      locale: string;
      label: string;
    };
    BrandingCta: {
      id: number;
      zone: string;
      url: string;
      openInNewTab: boolean;
      position: number;
      translations: components["schemas"]["BrandingCtaTranslation"][];
    };
    BrandingSocialLink: {
      id: number;
      platform: string;
      url: string;
      position: number;
    };
    BrandingResponse: {
      /** @description Site-wide globals, or null if none published */globals: components["schemas"]["BrandingGlobals"] | null;
      logos: components["schemas"]["BrandingLogo"][];
      ctas: components["schemas"]["BrandingCta"][];
      socialLinks: components["schemas"]["BrandingSocialLink"][];
    };
    Locale: {
      /**
       * @description ISO 639-1 language code
       * @example en
       * @example es
       */
      locale: string;
      /**
       * @description Display name
       * @example English
       * @example Spanish
       */
      name: string; /** @description Whether this is the site's default locale */
      isDefault: boolean;
    };
    LocalesResponse: {
      locales: components["schemas"]["Locale"][]; /** @description The locale code of the default locale, or null if no locales are configured. */
      default: string | null;
    };
    BlogAuthor: {
      id: number;
      firstName: string;
      lastName: string;
    };
    BlogCoverImage: {
      id: number;
      slug: string;
      /**
       * Format: uri
       * @description Fully qualified public URL to the cover image
       */
      url: string;
      altText: string;
    };
    GalleryImage: {
      id: number;
      slug: string;
      /**
       * Format: uri
       * @description Fully qualified public URL to the image file
       */
      url: string;
      altText: string;
    };
    BlogPostTranslation: {
      /**
       * @description ISO 639-1 language code
       * @example en
       * @example es
       */
      locale: string;
      excerpt: string;
      seoTitle: string;
    };
    BlogPost: {
      id: number;
      slug: string;
      title: string; /** Format: date-time */
      publishedAt: string | null;
      author?: components["schemas"]["BlogAuthor"] | null;
      coverImage?: components["schemas"]["BlogCoverImage"] | null;
      tags: string[];
      translations: components["schemas"]["BlogPostTranslation"][];
      blocks: components["schemas"]["ContentBlock"][];
    };
    BlogListResponse: {
      data: components["schemas"]["BlogPost"][]; /** @description Opaque cursor for the next page. Pass as the `cursor` query parameter to fetch the next batch. Null when there are no more results. */
      nextCursor: string | null;
    };
    ErrorResponse: {
      /** @description Human-readable error message */error: string;
    };
  };
  responses: {
    /** @description Missing or invalid API key */Unauthorized: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "error": "Missing or invalid API key"
         *     }
         */
        "application/json": components["schemas"]["ErrorResponse"];
      };
    }; /** @description API key does not grant access to the requested site */
    Forbidden: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "error": "API key siteSlug does not match path siteSlug"
         *     }
         */
        "application/json": components["schemas"]["ErrorResponse"];
      };
    }; /** @description Resource not found or not published */
    NotFound: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "error": "Resource not found"
         *     }
         */
        "application/json": components["schemas"]["ErrorResponse"];
      };
    }; /** @description Form not found or not published */
    NotFoundForm: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "error": "Form not found"
         *     }
         */
        "application/json": components["schemas"]["ErrorResponse"];
      };
    }; /** @description Rate limit exceeded (documented, not yet implemented) */
    RateLimited: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        /**
         * @example {
         *       "error": "Rate limit exceeded"
         *     }
         */
        "application/json": components["schemas"]["ErrorResponse"];
      };
    };
  };
  parameters: {
    /** @description Site slug identifier */siteSlug: string; /** @description Form slug identifier */
    formSlug: string; /** @description Page slug identifier */
    pageSlug: string; /** @description Job slug identifier */
    jobSlug: string; /** @description Navigation handle identifier */
    navigationHandle: string; /** @description Blog post slug identifier */
    blogPostSlug: string;
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}
//#endregion
//#region src/index.d.ts
type GalleryImage = components["schemas"]["GalleryImage"];
type CustomFieldValue = components["schemas"]["CustomFieldValue"];
//#endregion
export { CustomFieldValue, GalleryImage, type GetParams, type ListBlogParams, type ListParams, type Localized, type NexusClient, type NexusSDKConfig, createNexusClient };
//# sourceMappingURL=index.d.mts.map