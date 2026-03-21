//#region src/types.d.ts
interface NexusSDKConfig {
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
interface ListParams {
  limit?: number;
  cursor?: string;
  /** Overrides defaultLocale for this call */
  locale?: string;
}
interface GetParams {
  /** Overrides defaultLocale for this call */
  locale?: string;
}
//#endregion
//#region src/client.d.ts
declare function createNexusClient(config: NexusSDKConfig): {
  listTestimonials(params?: ListParams): Promise<{
    data: {
      id: number;
      author: string;
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
      translation: {
        locale: string;
        content: string;
      } | null;
    }[];
    nextCursor: string | null;
  }>;
  getTestimonial(id: number, params?: GetParams): Promise<{
    id: number;
    author: string;
    translations: {
      locale: string;
      content: string;
    }[];
  } | {
    id: number;
    author: string;
    translation: {
      locale: string;
      content: string;
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
        id: number;
        position: number;
        stepId?: number | null | undefined;
        parentId?: number | null | undefined;
        name: string;
        type: string;
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
  getForm(id: number, params?: GetParams): Promise<{
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
      id: number;
      position: number;
      stepId?: number | null | undefined;
      parentId?: number | null | undefined;
      name: string;
      type: string;
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
  getPage(id: number, params?: GetParams): Promise<{
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
  listTeamMembers(params?: ListParams): Promise<{
    data: {
      id: number;
      firstName: string;
      lastName: string;
      position: number;
      groupId: number | null;
      translations: {
        locale: string;
        title: string;
      }[];
    }[];
    nextCursor: string | null;
  } | {
    data: {
      id: number;
      position: number;
      firstName: string;
      lastName: string;
      groupId: number | null;
      translation: {
        locale: string;
        title: string;
      } | null;
    }[];
    nextCursor: string | null;
  }>;
  getTeamMember(id: number, params?: GetParams): Promise<{
    id: number;
    firstName: string;
    lastName: string;
    position: number;
    groupId: number | null;
    translations: {
      locale: string;
      title: string;
    }[];
  } | {
    id: number;
    position: number;
    firstName: string;
    lastName: string;
    groupId: number | null;
    translation: {
      locale: string;
      title: string;
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
  getJob(id: number, params?: GetParams): Promise<{
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
        parentId: number | null;
        url: string;
        openInNewTab: boolean;
        translation: {
          locale: string;
          label: string;
        } | null;
      }[];
    }[];
    nextCursor: string | null;
  }>;
  getNavigation(id: number, params?: GetParams): Promise<{
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
      parentId: number | null;
      url: string;
      openInNewTab: boolean;
      translation: {
        locale: string;
        label: string;
      } | null;
    }[];
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
      galleryImageId: number | null;
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
      position: number;
      role: string;
      galleryImageId: number | null;
      translation: {
        locale: string;
        altText: string;
      } | null;
    }[];
    ctas: {
      id: number;
      position: number;
      url: string;
      openInNewTab: boolean;
      zone: string;
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
export { type GetParams, type ListParams, type Localized, type NexusClient, type NexusSDKConfig, createNexusClient };
//# sourceMappingURL=index.d.mts.map