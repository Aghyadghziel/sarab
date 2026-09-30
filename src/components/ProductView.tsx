'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { colourOf, type Product } from '@/lib/catalog';
import { COPY } from '@/lib/copy';
import { href, price, type Locale } from '@/lib/i18n';
import { useBag } from './Bag';

const GUIDE = [
  ['XS', '80', '62', '88'],
  ['S', '84', '66', '92'],
  ['M', '88', '70', '96'],
  ['L', '94', '76', '102'],
  ['XL', '100', '82', '108'],
];

export function ProductView({ product, lang, initialColour }: { product: Product; lang: Locale; initialColour?: string }) {
  const t = COPY[lang].product;
  const g = COPY[lang].sizeGuide;
  const { add } = useBag();
  const [colour, setColour] = useState(colourOf(product, initialColour));
  const single = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(single ? product.sizes[0] : null);
  const [warn, setWarn] = useState(false);
  const [added, setAdded] = useState(false);
  const guide = useRef<HTMLDialogElement>(null);
  const apparel = product.category !== 'accessories';

  const pick = (id: string) => {
    const c = colourOf(product, id);
    setColour(c);
    const url = new URL(window.location.href);
    if (c.id === product.colours[0].id) url.searchParams.delete('colour');
    else url.searchParams.set('colour', c.id);
    window.history.replaceState(null, '', url);
  };

  const onAdd = () => {
    if (!size) {
      setWarn(true);
      return;
    }
    add({ slug: product.slug, colour: colour.id, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const media: ({ kind: 'img'; src: string } | { kind: 'video'; src: string; poster: string })[] = [
    { kind: 'img', src: colour.images.studio },
    colour.loop ? { kind: 'video', src: colour.loop, poster: colour.images.campaign } : { kind: 'img', src: colour.images.campaign },
    ...(colour.images.detail ? [{ kind: 'img' as const, src: colour.images.detail }] : []),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
      {/* Gallery: a swipe row on phones, a two-column stack on desktop. */}
      <div className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] lg:grid lg:grid-cols-2 lg:gap-1 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        {media.map((m, i) => (
          <figure
            key={`${colour.id}-${i}`}
            className={`relative aspect-[3/4] w-[88vw] shrink-0 snap-start bg-paper sm:w-[60vw] lg:w-auto ${i === 0 ? 'lg:col-span-2 lg:aspect-[4/5]' : ''}`}
          >
            {m.kind === 'img' ? (
              <Image
                src={m.src}
                alt={t.gallery(`${product.name[lang]}, ${colour.name[lang]}`, i + 1)}
                fill
                priority={i === 0}
                sizes={i === 0 ? '(min-width: 1024px) 58vw, 88vw' : '(min-width: 1024px) 29vw, 88vw'}
                className="object-cover"
              />
            ) : (
              <video src={m.src} poster={m.poster} muted loop autoPlay playsInline className="absolute inset-0 h-full w-full object-cover" />
            )}
          </figure>
        ))}
      </div>

      {/* Purchase panel */}
      <div className="px-[clamp(1rem,3.2vw,3rem)] pb-16 pt-8 lg:pt-12">
        <div className="lg:sticky lg:top-24">
          <nav className="text-[13px] text-ash" aria-label="breadcrumb">
            <Link href={href(lang)} className="hover:text-ink">
              {t.home}
            </Link>
            <span className="mx-2">/</span>
            <Link href={href(lang, `/shop/${product.category}`)} className="hover:text-ink">
              {COPY[lang].category[product.category]}
            </Link>
          </nav>
          <h1 className="display mt-5 text-[clamp(2.2rem,3.4vw,3.3rem)]">{product.name[lang]}</h1>
          <p className="mt-2 text-ash">{product.summary[lang]}</p>
          <p className="mt-5 text-[17px] tabular-nums">{price(lang, product.price)}</p>

          <div className="mt-8">
            <p className="label">
              {t.colour}: <span className="text-ash">{colour.name[lang]}</span>
            </p>
            <div className="mt-3 flex gap-3">
              {product.colours.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => pick(c.id)}
                  aria-label={c.name[lang]}
                  aria-pressed={c.id === colour.id}
                  className={`h-7 w-7 rounded-full border ${c.id === colour.id ? 'border-ink shadow-[0_0_0_3px_var(--color-bone),0_0_0_4px_var(--color-ink)]' : 'border-ink/20'}`}
                  style={{ background: c.swatch }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8" id="size">
            <div className="flex items-baseline justify-between">
              <p className="label">{t.size}</p>
              {apparel && (
                <button type="button" onClick={() => guide.current?.showModal()} className="text-[13px] text-ash underline underline-offset-4 hover:text-ink">
                  {t.sizeGuide}
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={t.size}>
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={size === s}
                  onClick={() => {
                    setSize(s);
                    setWarn(false);
                  }}
                  className={`h-11 min-w-12 border px-3 text-[13px] tabular-nums transition-colors ${size === s ? 'border-ink bg-ink text-bone' : 'hairline hover:border-ink'}`}
                >
                  {s === 'One size' ? t.oneSize : s}
                </button>
              ))}
            </div>
            <p aria-live="polite" className={`mt-2 h-5 text-[13px] text-copper ${warn ? '' : 'invisible'}`}>
              {t.selectSize}
            </p>
          </div>

          <button
            type="button"
            onClick={onAdd}
            className="label mt-2 flex h-13 w-full items-center justify-center bg-ink text-bone transition-opacity hover:opacity-85"
          >
            <span aria-live="polite">{added ? t.added : t.add}</span>
          </button>

          <div className="mt-10 border-t hairline">
            {[
              { title: t.details, body: product.description[lang], open: true },
              { title: t.fit, body: product.fit[lang] },
              { title: t.fabric, body: product.fabric[lang] },
              { title: t.delivery, body: t.deliveryText },
            ].map((s) => (
              <details key={s.title} open={s.open} className="border-b hairline">
                <summary className="flex cursor-pointer items-center justify-between py-4">
                  <span className="label">{s.title}</span>
                  <span className="acc-sign text-lg leading-none transition-transform duration-300" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="max-w-[52ch] pb-5 leading-relaxed text-ink/80">{s.body}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <dialog ref={guide} className="m-auto w-[min(92vw,520px)] bg-bone p-0 text-ink" onClick={(e) => e.target === guide.current && guide.current?.close()}>
        <div className="p-7">
          <div className="flex items-baseline justify-between">
            <p className="display text-3xl">{g.title}</p>
            <button type="button" onClick={() => guide.current?.close()} className="label">
              {COPY[lang].nav.close}
            </button>
          </div>
          <table className="mt-6 w-full text-[14px] tabular-nums">
            <thead>
              <tr className="border-b hairline text-start text-ash">
                {g.head.map((h) => (
                  <th key={h} className="py-2 text-start font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GUIDE.map((r) => (
                <tr key={r[0]} className="border-b hairline">
                  {r.map((c, i) => (
                    <td key={i} className="py-2.5">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[13px] text-ash">{g.note}</p>
        </div>
      </dialog>
    </div>
  );
}
