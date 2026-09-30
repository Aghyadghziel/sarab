import Link from 'next/link';
import { CATEGORIES, type Category, type Product } from '@/lib/catalog';
import { COPY } from '@/lib/copy';
import { href, type Locale } from '@/lib/i18n';
import { Footer } from './Footer';
import { Header } from './Header';
import { ProductCard } from './ProductCard';

export function Shop({ lang, products, active }: { lang: Locale; products: Product[]; active?: Category }) {
  const t = COPY[lang];
  const tabs = [{ key: undefined, label: t.shop.all, path: '/shop' }, ...CATEGORIES.map((c) => ({ key: c, label: t.category[c], path: `/shop/${c}` }))];
  return (
    <>
      <Header lang={lang} />
      <main className="shell pb-24 pt-28 md:pt-36">
        <h1 className="display text-[clamp(2.6rem,5vw,4.6rem)]">{active ? t.category[active] : t.home.edit}</h1>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y hairline py-4">
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                href={href(lang, tab.path)}
                aria-current={tab.key === active ? 'page' : undefined}
                className={`label pb-0.5 ${tab.key === active ? 'border-b border-ink' : 'text-ash hover:text-ink'}`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
          <p className="text-[13px] text-ash">{t.shop.items(products.length)}</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-4 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} lang={lang} priority={i < 4} />
          ))}
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
