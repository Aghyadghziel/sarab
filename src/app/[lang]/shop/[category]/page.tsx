import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Shop } from '@/components/Shop';
import { CATEGORIES, inCategory, type Category } from '@/lib/catalog';
import { COPY } from '@/lib/copy';
import { isLocale } from '@/lib/i18n';

const isCategory = (v: string): v is Category => (CATEGORIES as string[]).includes(v);

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<'/[lang]/shop/[category]'>): Promise<Metadata> {
  const { lang, category } = await params;
  return isLocale(lang) && isCategory(category) ? { title: COPY[lang].category[category] } : {};
}

export default async function CategoryPage({ params }: PageProps<'/[lang]/shop/[category]'>) {
  const { lang, category } = await params;
  if (!isLocale(lang) || !isCategory(category)) notFound();
  return <Shop lang={lang} products={inCategory(category)} active={category} />;
}
