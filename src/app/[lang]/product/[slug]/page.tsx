import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { ProductView } from '@/components/ProductView';
import { PRODUCTS, bySlug } from '@/lib/catalog';
import { COPY } from '@/lib/copy';
import { isLocale } from '@/lib/i18n';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/[lang]/product/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = bySlug(slug);
  if (!isLocale(lang) || !p) return {};
  return {
    title: p.name[lang],
    description: p.description[lang],
    openGraph: { images: [p.colours[0].images.studio] },
  };
}

export default async function ProductPage({ params, searchParams }: PageProps<'/[lang]/product/[slug]'>) {
  const { lang, slug } = await params;
  const p = bySlug(slug);
  if (!isLocale(lang) || !p) notFound();
  const colour = (await searchParams).colour;
  const pairs = p.pairs.map(bySlug).filter((x) => x !== undefined);

  return (
    <>
      <Header lang={lang} />
      <main className="pt-16 md:pt-[72px]">
        <ProductView product={p} lang={lang} initialColour={typeof colour === 'string' ? colour : undefined} />
        <section className="shell border-t hairline py-16">
          <h2 className="label text-ash">{COPY[lang].product.wearWith}</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-4 lg:grid-cols-3">
            {pairs.map((x) => (
              <ProductCard key={x.slug} product={x} lang={lang} sizes="(min-width: 1024px) 33vw, 50vw" />
            ))}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
