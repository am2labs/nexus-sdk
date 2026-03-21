import { describe, it, expect } from "vitest";
import { localize } from "./localize.js";

describe("localize", () => {
  it("picks the matching translation and drops the array", () => {
    const input = {
      id: 1,
      author: "Alice",
      translations: [
        { locale: "en", content: "Great service!" },
        { locale: "es", content: "¡Gran servicio!" },
      ],
    };
    const result = localize(input, "en");
    expect(result).toEqual({
      id: 1,
      author: "Alice",
      translation: { locale: "en", content: "Great service!" },
    });
    expect(result).not.toHaveProperty("translations");
  });

  it("returns translation: null when the locale has no match", () => {
    const input = {
      id: 1,
      author: "Alice",
      translations: [{ locale: "en", content: "Great service!" }],
    };
    const result = localize(input, "fr");
    expect(result.translation).toBeNull();
  });

  it("transforms arrays of objects", () => {
    const input = [
      { id: 1, translations: [{ locale: "en", content: "One" }] },
      { id: 2, translations: [{ locale: "en", content: "Two" }] },
    ];
    const result = localize(input, "en");
    expect(result[0]).toEqual({ id: 1, translation: { locale: "en", content: "One" } });
    expect(result[1]).toEqual({ id: 2, translation: { locale: "en", content: "Two" } });
  });

  it("recurses into nested objects — list response with data array", () => {
    const input = {
      data: [
        {
          id: 1,
          author: "Alice",
          translations: [{ locale: "en", content: "Hello" }],
        },
      ],
      nextCursor: null,
    };
    const result = localize(input, "en");
    expect(result.data[0].translation).toEqual({ locale: "en", content: "Hello" });
    expect(result.nextCursor).toBeNull();
  });

  it("recurses deeply — Form with steps and fields each having translations", () => {
    const input = {
      id: 10,
      slug: "contact",
      translations: [{ locale: "en", title: "Contact Us", submitLabel: "Send" }],
      steps: [
        {
          id: 1,
          position: 0,
          translations: [{ locale: "en", title: "Step 1" }],
        },
      ],
      fields: [
        {
          id: 1,
          name: "email",
          translations: [{ locale: "en", label: "Email" }],
        },
      ],
    };
    const result = localize(input, "en");
    expect(result.translation).toEqual({ locale: "en", title: "Contact Us", submitLabel: "Send" });
    expect(result.steps[0].translation).toEqual({ locale: "en", title: "Step 1" });
    expect(result.fields[0].translation).toEqual({ locale: "en", label: "Email" });
    expect(result).not.toHaveProperty("translations");
    expect(result.steps[0]).not.toHaveProperty("translations");
  });

  it("recurses deeply — BrandingResponse with logos and ctas arrays", () => {
    const input = {
      globals: {
        phone: "555-1234",
        email: "hello@example.com",
        translations: [{ locale: "en", tagline: "We build things", footerCopyright: "©2024", footerAddress: "123 Main St" }],
      },
      logos: [
        {
          id: 1,
          role: "primary",
          translations: [{ locale: "en", altText: "Logo" }],
        },
      ],
      ctas: [
        {
          id: 1,
          zone: "header",
          url: "/contact",
          translations: [{ locale: "en", label: "Contact" }],
        },
      ],
      socialLinks: [{ id: 1, platform: "twitter", url: "https://twitter.com/x" }],
    };
    const result = localize(input, "en");
    expect(result.globals.translation?.tagline).toBe("We build things");
    expect(result.logos[0].translation?.altText).toBe("Logo");
    expect(result.ctas[0].translation?.label).toBe("Contact");
    expect(result.socialLinks[0]).toEqual({ id: 1, platform: "twitter", url: "https://twitter.com/x" });
  });

  it("passes null values through without throwing", () => {
    const input = {
      globals: null,
      logos: [],
      ctas: [],
      socialLinks: [],
    };
    expect(() => localize(input, "en")).not.toThrow();
    const result = localize(input, "en");
    expect(result.globals).toBeNull();
  });

  it("passes primitives through unchanged", () => {
    expect(localize("hello", "en")).toBe("hello");
    expect(localize(42, "en")).toBe(42);
    expect(localize(true, "en")).toBe(true);
  });
});
