/** Arabic is served at the root, English under /en (see src/proxy.ts). */
export const LOCALES = ['ar', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export type L10n = Record<Locale, string>;

export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === 'ar' ? 'rtl' : 'ltr');

/** A site path in the given language: href('en', '/shop') → '/en/shop', href('ar', '/shop') → '/shop'. */
export function href(l: Locale, path = '/') {
  if (l === 'ar') return path;
  return path === '/' ? '/en' : `/en${path}`;
}

/** Western digits in both languages, as most Saudi stores print prices. */
export function price(l: Locale, sar: number) {
  const n = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(sar);
  return l === 'ar' ? `${n} ر.س` : `SAR ${n}`;
}
