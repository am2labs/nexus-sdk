/**
 * Recursive mapped type that replaces every `translations: T[]` property
 * with a single `translation: T | null` for the resolved locale.
 * Applied recursively through nested objects and arrays.
 */
export type Localized<T> = T extends { translations: Array<infer U> }
  ? Omit<T, "translations"> & { translation: U | null } extends infer R
    ? { [K in keyof R]: Localized<R[K]> }
    : never
  : T extends Array<infer Item>
  ? Array<Localized<Item>>
  : T extends object
  ? { [K in keyof T]: Localized<T[K]> }
  : T;

/**
 * Deep-transforms a response value: every object with a `translations` array
 * has that array replaced by a single `translation` entry matching the given
 * locale, or null if no match is found. All nested objects and arrays are
 * transformed recursively.
 */
export function localize<T>(value: T, locale: string): Localized<T> {
  if (Array.isArray(value)) {
    return value.map((item) => localize(item, locale)) as Localized<T>;
  }
  if (value !== null && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if ("translations" in obj && Array.isArray(obj.translations)) {
      const { translations, ...rest } = obj;
      const translation =
        (translations as Array<{ locale: string }>).find(
          (t) => t.locale === locale
        ) ?? null;
      const localized: Record<string, unknown> = { ...rest, translation };
      for (const key of Object.keys(localized)) {
        if (key !== "translation") {
          localized[key] = localize(localized[key], locale);
        }
      }
      return localized as Localized<T>;
    }
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = localize(v, locale);
    }
    return result as Localized<T>;
  }
  return value as Localized<T>;
}
