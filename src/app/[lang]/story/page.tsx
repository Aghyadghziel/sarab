import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Reveal } from '@/components/Reveal';
import { COPY } from '@/lib/copy';
import { href, isLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/story'>): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: COPY[lang].story.kicker } : {};
}

export default async function StoryPage({ params }: PageProps<'/[lang]/story'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = COPY[lang];
  const s = t.story;
  return (
    <>
      <Header lang={lang} />
      <main>
        <section className="relative h-[88svh] overflow-hidden bg-ink">
          <Image src="/img/p/dahna-sand-campaign.webp" alt="" fill priority sizes="100vw" className="object-cover object-[50%_30%] opacity-90" />
          <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-ink/10 to-ink/30" />
          <div className="shell absolute inset-x-0 bottom-14 text-bone">
            <p className="label opacity-85">{s.kicker}</p>
            <h1 className="display mt-4 text-[clamp(3rem,8vw,7.5rem)]">{s.title}</h1>
          </div>
        </section>

        <section className="shell grid grid-cols-1 gap-10 py-24 md:grid-cols-[1fr_1.4fr]">
          <div />
          <div className="max-w-[40rem] space-y-6 text-[17px] leading-[1.8] text-ink/85">
            {s.paragraphs.map((p) => (
              <Reveal key={p}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-y hairline bg-paper">
          <div className="shell grid grid-cols-1 gap-10 py-16 md:grid-cols-3">
            {s.principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <p className="text-[13px] tabular-nums text-ash">0{i + 1}</p>
                <h2 className="display mt-3 text-3xl">{p.title}</h2>
                <p className="mt-3 max-w-[34ch] leading-relaxed text-ink/75">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="shell grid grid-cols-2 gap-3 py-24 md:grid-cols-4 md:gap-4">
          {['/img/p/fajr-bone-detail.webp', '/img/p/layl-ink-detail.webp', '/img/p/najd-bone-detail.webp', '/img/p/nafud-tan-campaign.webp'].map((src) => (
            <div key={src} className="relative aspect-[3/4] overflow-hidden bg-paper">
              <Image src={src} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </div>
          ))}
        </section>

        <section className="shell grid grid-cols-1 gap-12 pb-24 md:grid-cols-3">
          {[
            { id: 'delivery', title: t.service[0].title, text: t.service[0].text },
            { id: 'returns', title: t.service[1].title, text: t.service[1].text },
            { id: 'care', title: s.care.title, text: s.care.text },
          ].map((b) => (
            <div key={b.id} id={b.id} className="scroll-mt-28">
              <h2 className="label">{b.title}</h2>
              <p className="mt-4 max-w-[46ch] leading-relaxed text-ink/80">{b.text}</p>
            </div>
          ))}
        </section>

        <section className="border-t hairline py-20 text-center">
          <Link href={href(lang, '/shop')} className="label inline-flex bg-ink px-8 py-4 text-bone transition-opacity hover:opacity-85">
            {s.cta}
          </Link>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
