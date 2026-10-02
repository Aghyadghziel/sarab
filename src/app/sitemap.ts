import type { MetadataRoute } from 'next';
import { CATEGORIES, PRODUCTS } from '@/lib/catalog';
import { SITE_URL } from '@/lib/copy';
import { href } from '@/lib/i18n';

/** Every page in both languages, each pointing at its twin. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/shop', '/story', ...CATEGORIES.map((c) => `/shop/${c}`), ...PRODUCTS.map((p) => `/product/${p.slug}`)];
  return paths.flatMap((path) => {
    const languages = { ar: SITE_URL + href('ar', path), en: SITE_URL + href('en', path) };
    return (['ar', 'en'] as const).map((l) => ({ url: languages[l], alternates: { languages } }));
  });
}
