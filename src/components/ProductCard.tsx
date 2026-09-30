'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { Product } from '@/lib/catalog';
import { COPY } from '@/lib/copy';
import { href, price, type Locale } from '@/lib/i18n';

/**
 * Studio shot first, as a real store shows it. With a mouse, the card turns to
 * the desert photograph (and its wind loop, if the piece has one).
 */
export function ProductCard({ product, lang, priority = false, sizes }: { product: Product; lang: Locale; priority?: boolean; sizes?: string }) {
  const [colour, setColour] = useState(product.colours[0]);
  const video = useRef<HTMLVideoElement>(null);
  const t = COPY[lang].shop;
  const url = href(lang, `/product/${product.slug}${colour.id !== product.colours[0].id ? `?colour=${colour.id}` : ''}`);

  return (
    <article
      className="group"
      onPointerEnter={(e) => e.pointerType === 'mouse' && video.current?.play().catch(() => {})}
      onPointerLeave={() => video.current?.pause()}
    >
      <Link href={url} className="relative block aspect-[3/4] overflow-hidden bg-paper">
        <Image
          src={colour.images.studio}
          alt={`${product.name[lang]}, ${colour.name[lang]}`}
          fill
          priority={priority}
          sizes={sizes ?? '(min-width: 1024px) 25vw, 50vw'}
          className="object-cover"
        />
        <Image
          src={colour.images.campaign}
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes ?? '(min-width: 1024px) 25vw, 50vw'}
          className="object-cover opacity-0 transition-opacity duration-700 ease-out-soft [@media(hover:hover)]:group-hover:opacity-100"
        />
        {colour.loop && (
          <video
            ref={video}
            src={colour.loop}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 [@media(hover:hover)]:group-hover:opacity-100"
          />
        )}
      </Link>
      <div className="mt-3 flex items-start justify-between gap-3 text-[14px]">
        <div className="min-w-0">
          <h3 className="truncate">
            <Link href={url}>{product.name[lang]}</Link>
          </h3>
          <p className="text-[13px] text-ash">{product.summary[lang]}</p>
        </div>
        <p className="shrink-0 tabular-nums">{price(lang, product.price)}</p>
      </div>
      {product.colours.length > 1 && (
        <div className="mt-2 flex items-center gap-2">
          {product.colours.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setColour(c)}
              aria-label={c.name[lang]}
              aria-pressed={c.id === colour.id}
              className={`h-3.5 w-3.5 rounded-full border transition-[box-shadow] ${c.id === colour.id ? 'border-ink shadow-[0_0_0_2px_var(--color-bone),0_0_0_3px_var(--color-ink)]' : 'border-ink/20'}`}
              style={{ background: c.swatch }}
            />
          ))}
          <span className="ms-1 text-[12px] text-ash">{t.colours(product.colours.length)}</span>
        </div>
      )}
    </article>
  );
}
