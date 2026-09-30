import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Shop } from '@/components/Shop';
import { PRODUCTS } from '@/lib/catalog';
import { COPY } from '@/lib/copy';
import { isLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/shop'>): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: COPY[lang].home.edit } : {};
}

export default async function ShopPage({ params }: PageProps<'/[lang]/shop'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Shop lang={lang} products={PRODUCTS} />;
}
