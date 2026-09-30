'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

const FRAMES = 121;
/**
 * The first desktop frame has sky past ~70% of its width. Anchoring a 1.42 zoom to the
 * left edge hides it, and on a 1440px retina screen that is only ~1.05x the 4K source,
 * so the opening stays sharp.
 */
const OPEN_ZOOM = 1.42;
const OPEN_ORIGIN = { x: 0, y: 0.5 };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** 0 → 1 between a and b, eased. */
const ramp = (p: number, a: number, b: number) => {
  const t = clamp((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};
/** 1 inside [a, b], fading over `f` on each side. */
const band = (p: number, a: number, b: number, f = 0.05) => Math.min(ramp(p, a - f, a), 1 - ramp(p, b, b + f));

type Props = {
  label: string;
  collection: string;
  cloth: string;
  season: string;
  shop: string;
  shopHref: string;
  hint: string;
  /** The piece in the film, tagged while the woman is on screen. */
  tag: { name: string; price: string; cta: string; href: string };
};

/**
 * The Pull-Back. One camera move scrubbed by scroll: cloth that reads as dunes,
 * then the coat, then the woman, then the whole desert with the logotype in the sky.
 */
export function Hero({ label, collection, cloth, season, shop, shopHref, hint, tag }: Props) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const line1 = useRef<HTMLParagraphElement>(null);
  const tagEl = useRef<HTMLAnchorElement>(null);
  const hintEl = useRef<HTMLDivElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const heat = useRef<SVGFEDisplacementMapElement>(null);
  const logo = useRef<HTMLHeadingElement>(null);
  const noise = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const section = root.current;
    const cv = canvas.current;
    const ctx = cv?.getContext('2d', { alpha: false });
    if (!section || !cv || !ctx) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let portrait = window.innerHeight > window.innerWidth;
    let images: (HTMLImageElement | undefined)[] = [];
    let loadId = 0;

    const load = () => {
      const id = ++loadId;
      const dir = portrait ? 'm' : 'd';
      images = new Array(FRAMES);
      // The frame on screen first, then every 8th for a rough scrub, then the rest.
      const order = [...new Set([0, FRAMES - 1, ...Array.from({ length: FRAMES }, (_, i) => i).filter((i) => i % 8 === 0), ...Array.from({ length: FRAMES }, (_, i) => i)])];
      let next = 0;
      const pump = () => {
        if (id !== loadId || next >= order.length) return;
        const i = order[next++];
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (id !== loadId) return;
          images[i] = img;
          drawn = -1;
          pump();
        };
        img.onerror = pump;
        img.src = `/hero/${dir}/${String(i + 1).padStart(3, '0')}.webp`;
      };
      for (let k = 0; k < 6; k++) pump();
    };

    const size = () => {
      // Full device resolution: the frames are native 4K, so there is detail to spend.
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      cv.width = Math.round(cv.clientWidth * dpr);
      cv.height = Math.round(cv.clientHeight * dpr);
      const nowPortrait = window.innerHeight > window.innerWidth;
      if (nowPortrait !== portrait) {
        portrait = nowPortrait;
        load();
      }
      drawn = -1;
    };

    /** Nearest frame that has arrived, so the scrub never shows a hole. */
    const nearest = (i: number) => {
      for (let d = 0; d < FRAMES; d++) {
        if (images[i - d]) return images[i - d];
        if (images[i + d]) return images[i + d];
      }
      return undefined;
    };

    let drawn = -1;
    let drawnZoom = -1;
    const draw = (p: number) => {
      const i = Math.round(p * (FRAMES - 1));
      const zoom = portrait ? 1 : 1 + (OPEN_ZOOM - 1) * (1 - ramp(p, 0, 0.16));
      if (i === drawn && zoom === drawnZoom) return;
      const img = nearest(i);
      if (!img) return;
      drawn = images[i] ? i : -1;
      drawnZoom = zoom;
      const cover = Math.max(cv.width / img.naturalWidth, cv.height / img.naturalHeight) * zoom;
      const w = img.naturalWidth * cover;
      const h = img.naturalHeight * cover;
      const ox = zoom > 1 ? OPEN_ORIGIN.x + (0.5 - OPEN_ORIGIN.x) * ramp(p, 0, 0.16) : 0.5;
      const oy = zoom > 1 ? OPEN_ORIGIN.y + (0.5 - OPEN_ORIGIN.y) * ramp(p, 0, 0.16) : 0.5;
      const x = clamp(cv.width / 2 - w * ox, cv.width - w, 0);
      const y = clamp(cv.height / 2 - h * oy, cv.height - h, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, x, y, w, h);
    };

    const overlays = (p: number) => {
      if (line1.current) line1.current.style.opacity = String(band(p, 0, 0.12));
      if (hintEl.current) hintEl.current.style.opacity = String(1 - ramp(p, 0.02, 0.08));
      if (tagEl.current) {
        const v = band(p, 0.34, 0.56, 0.04);
        tagEl.current.style.opacity = String(v);
        tagEl.current.style.transform = `translateY(${(1 - v) * 12}px)`;
        tagEl.current.style.pointerEvents = v > 0.5 ? 'auto' : 'none';
      }
      const e = ramp(p, 0.74, 0.9);
      if (end.current) {
        end.current.style.opacity = String(e);
        end.current.style.transform = `translateY(${(1 - e) * 24}px)`;
      }
      if (cta.current) {
        const c = ramp(p, 0.84, 0.94);
        cta.current.style.opacity = String(c);
        cta.current.style.pointerEvents = c > 0.5 ? 'auto' : 'none';
      }
      // Heat shimmer on the logotype: strong as it appears, and switched off
      // entirely once it settles, so the letters end perfectly sharp.
      const shimmer = Math.round((1 - ramp(p, 0.76, 0.92)) * 46);
      heat.current?.setAttribute('scale', String(shimmer));
      if (logo.current) logo.current.style.filter = shimmer > 0 ? 'url(#heat)' : 'none';
    };

    let target = 0;
    let current = 0;
    let raf = 0;
    const tick = (time: number) => {
      const rect = section.getBoundingClientRect();
      target = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
      current = still ? target : current + (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0004) current = target;
      draw(current);
      overlays(current);
      if (!still && current > 0.7 && current < 0.99) noise.current?.setAttribute('seed', String(Math.floor(time / 90) % 40));
      raf = requestAnimationFrame(tick);
    };

    load();
    size();
    window.addEventListener('resize', size);
    raf = requestAnimationFrame(tick);
    return () => {
      loadId++;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    };
  }, []);

  return (
    <section ref={root} data-film className="relative h-[420svh] bg-ink" aria-label={label}>
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div className="grain absolute inset-0" aria-hidden="true" />

        <svg className="absolute h-0 w-0" aria-hidden="true">
          <filter id="heat" x="-10%" y="-30%" width="120%" height="160%">
            <feTurbulence ref={noise} type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="2" seed="3" result="n" />
            <feDisplacementMap ref={heat} in="SourceGraphic" in2="n" scale="46" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        {/* Opening: the cloth, captioned like a lookbook. */}
        <div className="shell absolute inset-x-0 bottom-[17svh] text-bone md:bottom-[12svh]">
          <p ref={line1} className="[text-shadow:0_2px_30px_rgb(0_0_0/0.35)]">
            <span className="label block opacity-85">{collection}</span>
            <span className="display mt-4 block max-w-[11em] text-[clamp(2.4rem,5.6vw,5.4rem)]">{cloth}</span>
          </p>
        </div>

        <div ref={hintEl} className="label absolute inset-x-0 bottom-7 flex flex-col items-center gap-3 text-bone/85">
          <span>{hint}</span>
          <span className="block h-9 w-px bg-bone/60" />
        </div>

        {/* While the woman is on screen: the piece she wears, one click from its page. */}
        <Link
          ref={tagEl}
          href={tag.href}
          className="absolute bottom-[12svh] end-[clamp(1rem,6vw,7rem)] flex items-center gap-4 bg-bone/90 py-3 pe-3 ps-5 text-ink opacity-0 backdrop-blur-sm transition-colors hover:bg-bone"
          style={{ pointerEvents: 'none' }}
        >
          <span className="text-[14px]">
            {tag.name}
            <span className="block text-[13px] tabular-nums text-ash">{tag.price}</span>
          </span>
          <span className="label bg-ink px-4 py-2.5 text-bone">{tag.cta}</span>
        </Link>

        {/* Ending: the house mark in the sky, then the way in. */}
        <div ref={end} className="absolute inset-x-0 top-[12svh] flex flex-col items-center px-5 text-center text-ink opacity-0">
          <p className="label text-ink/70">
            {collection} · {season}
          </p>
          <h1
            ref={logo}
            dir="ltr"
            className="mt-4 font-(family-name:--f-display) text-[clamp(4.2rem,17vw,15rem)] leading-[0.85] tracking-[0.18em] [margin-inline-end:-0.18em]"
          >
            SARAB
          </h1>
        </div>
        <Link
          ref={cta}
          href={shopHref}
          className="label absolute inset-x-0 bottom-[9svh] mx-auto w-fit bg-ink px-7 py-4 text-bone opacity-0 transition-colors hover:bg-ink/85"
          style={{ pointerEvents: 'none' }}
        >
          {shop}
        </Link>
      </div>
    </section>
  );
}
