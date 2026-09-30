'use client';

import Image from 'next/image';
import { useRef, type PointerEvent } from 'react';
import type { Piece } from '@/lib/content';
import { Reveal } from './Reveal';

/** The image leans a little toward the pointer, like cloth catching a gust. */
function Card({ piece, index }: { piece: Piece; index: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !frame.current) return;
    const r = frame.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    frame.current.style.setProperty('--x', `${x * -14}px`);
    frame.current.style.setProperty('--y', `${y * -14}px`);
  };
  const leave = () => {
    frame.current?.style.setProperty('--x', '0px');
    frame.current?.style.setProperty('--y', '0px');
  };
  return (
    <Reveal delay={(index % 3) * 90} className={index % 3 === 1 ? 'lg:mt-24' : ''}>
      <article className="group">
        <div ref={frame} onPointerMove={move} onPointerLeave={leave} className="relative aspect-[3/4] overflow-hidden bg-night/40">
          <Image
            src={piece.image}
            alt={piece.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
            className="scale-[1.06] object-cover transition-transform duration-[1200ms] ease-out-soft [transform:translate3d(var(--x,0),var(--y,0),0)_scale(1.06)] group-hover:[transform:translate3d(var(--x,0),var(--y,0),0)_scale(1.1)]"
          />
          <span className="absolute start-4 top-4 text-sm tabular-nums text-bone/90 mix-blend-difference">{piece.no}</span>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="display text-[clamp(1.6rem,2.4vw,2.25rem)]">{piece.name}</h3>
          <p className="shrink-0 text-sm text-sand/80">{piece.fabric}</p>
        </div>
        <p className="mt-2 max-w-[38ch] text-[0.95rem] leading-relaxed text-bone/65">{piece.note}</p>
      </article>
    </Reveal>
  );
}

export function Collection({ kicker, title, lead, pieces }: { kicker: string; title: string; lead: string; pieces: Piece[] }) {
  return (
    <section id="collection" className="bg-ink py-[clamp(5rem,12vw,11rem)]">
      <div className="shell">
        <Reveal>
          <p className="kicker text-sand/80">{kicker}</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-[clamp(3rem,9vw,8rem)]">{title}</h2>
            <p className="max-w-[30ch] pb-3 text-lg leading-relaxed text-bone/70">{lead}</p>
          </div>
        </Reveal>
        <div className="mt-[clamp(3rem,7vw,6rem)] grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {pieces.map((p, i) => (
            <Card key={p.id} piece={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
