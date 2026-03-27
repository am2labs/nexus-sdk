//#region src/types.d.ts
interface NexusSDKConfig {
  /** Full API origin + base path, e.g. "https://example.com/api/v1" */
  baseUrl: string;
  /** Bearer token issued by the Nexus admin dashboard (nxs_...) */
  apiKey: string;
  /** Numeric site identifier */
  siteId: number;
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
  }>;
  getBranding(params?: GetParams): Promise<{
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
  }>;
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
  }>;
  listPages(params?: ListParams): Promise<{
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
  }>;
  getPage(slug: string, params?: GetParams): Promise<{
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
  }>;
  listBlogPosts(params?: ListBlogParams): Promise<{
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
  }>;
  getBlogPost(slug: string, params?: GetParams): Promise<{
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
  }>;
  getForm(slug: string, params?: GetParams): Promise<{
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
  }>;
  listJobs(params?: ListParams): Promise<{
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
  }>;
  getJob(slug: string, params?: GetParams): Promise<{
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
  }>;
  listTeamMembers(params?: ListParams): Promise<{
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
  }>;
  listNavigations(params?: ListParams): Promise<{
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
  }>;
  getNavigation(id: number, params?: GetParams): Promise<{
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
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
  } | {
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
        r2Key: string;
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
      r2Key: string;
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
    data: {
      id: number;
      author: string;
      translation: {
        locale: string;
        content: string;
      } | null;
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
  } | {
    locales: {
      locale: string;
      name: string;
      isDefault: boolean;
    }[];
    default: string | null;
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
      publishedAt: string | null;
      author?: {
        id: number;
        firstName: string;
        lastName: string;
      } | null | undefined;
      coverImage?: {
        id: number;
        slug: string;
        r2Key: string;
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
    publishedAt: string | null;
    author?: {
      id: number;
      firstName: string;
      lastName: string;
    } | null | undefined;
    coverImage?: {
      id: number;
      slug: string;
      r2Key: string;
      altText: string;
    } | null | undefined;
    tags: string[];
    translation: {
      locale: string;
      excerpt: string;
      seoTitle: string;
    } | null;
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
export { type GetParams, type ListBlogParams, type ListParams, type Localized, type NexusClient, type NexusSDKConfig, createNexusClient };
//# sourceMappingURL=index.d.cts.map