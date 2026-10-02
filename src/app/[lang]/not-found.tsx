'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Mark } from '@/components/Mark';
import { ProductCard } from '@/components/ProductCard';
import { bySlug } from '@/lib/catalog';
import { COPY } from '@/lib/copy';
import { href, type Locale } from '@/lib/i18n';

/** Not-found pages get no params, so the language comes from the address. */
export default function NotFound() {
  const path = usePathname() || '/';
  const lang: Locale = path === '/en' || path.startsWith('/en/') ? 'en' : 'ar';
  const t = COPY[lang].notFound;
  const picks = ['dahna-coat', 'layl-abaya', 'najd-overshirt'].map(bySlug).filter((p) => p !== undefined);

  return (
    <>
      <Header lang={lang} />
      <main className="pt-16 md:pt-[72px]">
        <section className="shell flex min-h-[78svh] flex-col items-center justify-center py-20 text-center">
          <Mark shimmer className="w-[clamp(7rem,14vw,10rem)] text-camel" />
          <p className="label mt-10 text-ash">{t.kicker}</p>
          <h1 className="display mt-4 text-[clamp(3.4rem,9vw,7.5rem)]">{t.title}</h1>
          <p className="mt-6 max-w-[44ch] leading-relaxed text-ink/75">{t.body}</p>
          <Link href={href(lang, '/shop')} className="label mt-10 inline-flex bg-ink px-8 py-4 text-bone transition-opacity hover:opacity-85">
            {t.cta}
          </Link>
        </section>
        <section className="shell border-t hairline py-16">
          <h2 className="label text-ash">{t.suggest}</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-4 lg:grid-cols-3">
            {picks.map((p) => (
              <ProductCard key={p.slug} product={p} lang={lang} sizes="(min-width: 1024px) 33vw, 50vw" />
            ))}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
