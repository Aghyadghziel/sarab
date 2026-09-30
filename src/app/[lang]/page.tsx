import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Parallax } from '@/components/Parallax';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { PRODUCTS, bySlug } from '@/lib/catalog';
import { COPY } from '@/lib/copy';
import { href, isLocale, price } from '@/lib/i18n';

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = COPY[lang];
  const h = t.home;
  const coat = bySlug('dahna-coat')!;

  const tiles = [
    { c: 'women' as const, img: '/img/p/dahna-sand-campaign.webp' },
    { c: 'men' as const, img: '/img/p/najd-bone-campaign.webp' },
    { c: 'accessories' as const, img: '/img/p/qafilah-camel-campaign.webp' },
  ];

  return (
    <>
      <Header lang={lang} overFilm />
      <main>
        <Hero
          label={t.hero.label}
          collection={t.hero.collection}
          cloth={t.hero.cloth}
          season={t.hero.season}
          shop={t.hero.shop}
          shopHref={href(lang, '/shop')}
          hint={t.hero.hint}
          tag={{ name: coat.name[lang], price: price(lang, coat.price), cta: t.hero.tagShop, href: href(lang, '/product/dahna-coat') }}
        />

        {/* The collection, as a store shows it. */}
        <section className="shell pb-24 pt-20 md:pt-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="display text-[clamp(2.4rem,4.6vw,4.2rem)]">{h.edit}</h2>
              <p className="mt-3 max-w-[46ch] text-ash">{h.editLead}</p>
            </div>
            <Link href={href(lang, '/shop')} className="label border-b border-ink pb-1">
              {h.viewAll}
            </Link>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-4 lg:grid-cols-4">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70}>
                <ProductCard product={p} lang={lang} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* One piece, up close. */}
        <section className="grid grid-cols-1 bg-paper md:grid-cols-2">
          <Parallax src="/img/p/dahna-sand-detail.webp" alt={t.product.gallery(coat.name[lang], 3)} className="h-[70svh] md:h-[92svh]" sizes="(min-width: 768px) 50vw, 100vw" />
          <div className="flex items-center px-[clamp(1.25rem,6vw,6rem)] py-16">
            <Reveal className="max-w-[30rem]">
              <p className="label text-ash">{h.featureKicker}</p>
              <h2 className="display mt-5 text-[clamp(2.4rem,4.2vw,4rem)]">{h.featureTitle}</h2>
              <p className="mt-6 leading-relaxed text-ink/80">{h.featureBody}</p>
              <p className="mt-6 tabular-nums">{price(lang, coat.price)}</p>
              <Link href={href(lang, '/product/dahna-coat')} className="label mt-8 inline-flex bg-ink px-7 py-4 text-bone transition-opacity hover:opacity-85">
                {h.featureCta}
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Categories */}
        <section className="shell py-24">
          <Reveal>
            <h2 className="label text-ash">{h.shopBy}</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {tiles.map((tile, i) => (
              <Reveal key={tile.c} delay={i * 80}>
                <Link href={href(lang, `/shop/${tile.c}`)} className="group relative block aspect-[3/4] overflow-hidden bg-paper">
                  <Image src={tile.img} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/45 via-transparent to-transparent" />
                  <span className="display absolute bottom-6 start-6 text-[clamp(2rem,3vw,2.8rem)] text-bone">{t.category[tile.c]}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* After sunset */}
        <section className="grain relative overflow-hidden bg-night text-bone">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr]">
            <Parallax src="/img/p/layl-ink-campaign.webp" alt={bySlug('layl-abaya')!.name[lang]} className="h-[80svh] md:h-[100svh]" sizes="(min-width: 768px) 55vw, 100vw" />
            <div className="flex flex-col justify-center gap-10 px-[clamp(1.25rem,5vw,5rem)] py-16">
              <Reveal>
                <p className="label text-bone/60">{h.nightKicker}</p>
                <h2 className="display mt-5 max-w-[16ch] text-[clamp(2.3rem,3.8vw,3.8rem)]">{h.nightTitle}</h2>
                <p className="mt-6 max-w-[40ch] leading-relaxed text-bone/75">{h.nightBody}</p>
                <Link href={href(lang, '/product/layl-abaya')} className="label mt-8 inline-flex bg-bone px-7 py-4 text-ink transition-opacity hover:opacity-85">
                  {h.nightCta}
                </Link>
              </Reveal>
              <Reveal delay={120} className="w-[min(100%,300px)]">
                <Link href={href(lang, '/product/dahna-coat?colour=night')} className="block">
                  <span className="relative block aspect-[3/4] overflow-hidden">
                    <Image src="/img/p/dahna-night-campaign.webp" alt="" fill sizes="300px" className="object-cover" />
                  </span>
                  <span className="mt-3 flex justify-between gap-3 text-[14px]">
                    <span>
                      {coat.name[lang]} · {coat.colours[1].name[lang]}
                    </span>
                    <span className="tabular-nums text-bone/70">{price(lang, coat.price)}</span>
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Story teaser */}
        <section className="shell grid grid-cols-1 items-center gap-10 py-24 md:grid-cols-2 md:gap-20">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-paper md:order-last">
            <Image src="/img/p/shamal-camel-campaign.webp" alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal>
            <p className="label text-ash">{h.storyKicker}</p>
            <h2 className="display mt-5 max-w-[14ch] text-[clamp(2.4rem,4.2vw,4rem)]">{h.storyTitle}</h2>
            <p className="mt-6 max-w-[40ch] leading-relaxed text-ink/80">{h.storyBody}</p>
            <Link href={href(lang, '/story')} className="label mt-8 inline-flex border-b border-ink pb-1">
              {h.storyCta}
            </Link>
          </Reveal>
        </section>

        {/* Service */}
        <section className="border-t hairline">
          <div className="shell grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
            {t.service.map((s) => (
              <div key={s.title}>
                <p className="label">{s.title}</p>
                <p className="mt-2 text-[14px] text-ash">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
