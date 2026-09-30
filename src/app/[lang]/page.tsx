import { notFound } from 'next/navigation';
import { Collection } from '@/components/Collection';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Parallax } from '@/components/Parallax';
import { Reveal } from '@/components/Reveal';
import { BRAND, COPY, homeOf, isLocale } from '@/lib/content';

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = COPY[lang];

  return (
    <>
      <Header home={homeOf(lang)} nav={t.nav} />
      <main>
        <Hero {...t.hero} nameAr={BRAND.nameAr} />

        {/* The idea */}
        <section className="bg-bone py-[clamp(5rem,13vw,12rem)] text-ink">
          <div className="shell">
            <Reveal>
              <p className="kicker text-copper">{t.manifesto.kicker}</p>
              <p className="display mt-8 max-w-[22ch] text-[clamp(2.1rem,5.2vw,5rem)] leading-[1.08] rtl:leading-[1.4]">{t.manifesto.body}</p>
            </Reveal>
            <div className="mt-[clamp(3rem,7vw,6rem)] grid grid-cols-1 gap-10 border-t border-ink/15 pt-10 md:grid-cols-3">
              {t.manifesto.points.map((p, i) => (
                <Reveal key={p.title} delay={i * 100}>
                  <p className="text-sm tabular-nums text-copper">0{i + 1}</p>
                  <h3 className="display mt-3 text-3xl">{p.title}</h3>
                  <p className="mt-3 max-w-[34ch] leading-relaxed text-ink/70">{p.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Collection {...t.collection} />

        {/* Cloth */}
        <section id="cloth" className="relative bg-ink">
          <Parallax src="/img/cloth.webp" alt={t.cloth.alt} className="h-[120svh] w-full" amount={10} />
          <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />
          <div className="shell absolute inset-x-0 bottom-0 pb-[clamp(3rem,7vw,6rem)]">
            <Reveal>
              <p className="kicker text-sand">{t.cloth.kicker}</p>
              <h2 className="display mt-5 text-[clamp(3rem,9vw,8rem)]">{t.cloth.title}</h2>
              <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-bone/80">{t.cloth.body}</p>
              <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-bone/25 pt-6">
                {t.cloth.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-sm text-bone/55">{f.label}</dt>
                    <dd className="display mt-2 text-2xl">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Looks */}
        <section id="looks" className="bg-bone py-[clamp(5rem,12vw,11rem)] text-ink">
          <div className="shell">
            <Reveal>
              <p className="kicker text-copper">{t.looks.kicker}</p>
              <h2 className="display mt-5 text-[clamp(2.75rem,8vw,7rem)]">{t.looks.title}</h2>
            </Reveal>
            <div className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
              {t.looks.items.map((item, i) => (
                <Reveal key={item.image} delay={i * 80} className={i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5 md:mt-32' : 'md:col-span-12'}>
                  <figure>
                    <Parallax
                      src={item.image}
                      alt={item.alt}
                      sizes={i === 2 ? '(min-width: 768px) 92vw, 100vw' : '(min-width: 768px) 55vw, 100vw'}
                      className={i === 2 ? 'h-[clamp(16rem,48vw,44rem)] w-full' : i === 0 ? 'h-[clamp(15rem,36vw,34rem)] w-full' : 'h-[clamp(15rem,30vw,28rem)] w-full'}
                      amount={5}
                    />
                    <figcaption className="mt-3 flex items-center gap-3 text-sm text-ink/60">
                      <span className="tabular-nums text-copper">0{i + 1}</span>
                      {item.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Night */}
        <section id="night" className="grain relative bg-night py-[clamp(5rem,12vw,11rem)]">
          <div className="shell grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <Reveal>
              <Parallax src="/img/night.webp" alt={t.night.alt} sizes="(min-width: 768px) 46vw, 92vw" className="h-[clamp(26rem,62vw,52rem)] w-full" amount={6} />
            </Reveal>
            <Reveal delay={120}>
              <p className="kicker text-sand/80">{t.night.kicker}</p>
              <h2 className="display mt-5 text-[clamp(2.75rem,7vw,6.5rem)]">{t.night.title}</h2>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-bone/75">{t.night.body}</p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-ink pt-[clamp(4rem,9vw,8rem)] text-bone">
        <div className="shell">
          <p className="display text-[clamp(2rem,5vw,4.5rem)] text-sand">{t.footer.line}</p>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-bone/15 py-8 text-sm text-bone/60">
            <p className="max-w-[60ch] leading-relaxed">{t.footer.concept}</p>
            <p>
              {t.footer.by}{' '}
              <a href={BRAND.studioUrl} className="text-bone underline-offset-4 hover:underline" dir="ltr">
                {BRAND.studio}
              </a>
            </p>
          </div>
        </div>
        <p dir="ltr" aria-hidden="true" className="font-(family-name:--f-display) select-none overflow-hidden text-center text-[27vw] leading-[0.72] tracking-[0.04em] text-bone/[0.07]">
          SARAB
        </p>
      </footer>
    </>
  );
}
