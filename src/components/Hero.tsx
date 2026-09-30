'use client';

import { useEffect, useRef } from 'react';

const FRAMES = 121;
/** Desktop frames open with a little sky in one corner; this zoom hides it so the first screen is all cloth. */
const OPEN_ZOOM = 1.62;
const OPEN_ORIGIN = { x: 0.15, y: 0.6 };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** 0 → 1 between a and b, eased. */
const ramp = (p: number, a: number, b: number) => {
  const t = clamp((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};
/** 1 inside [a, b], fading over `f` on each side. */
const band = (p: number, a: number, b: number, f = 0.05) => Math.min(ramp(p, a - f, a), 1 - ramp(p, b, b + f));

type Props = {
  first: string;
  second: string;
  tagline: string;
  hint: string;
  label: string;
  nameAr: string;
};

/**
 * The Pull-Back. One camera move scrubbed by scroll: cloth that reads as dunes,
 * then the coat, then the woman, then the whole desert with the logotype in the sky.
 */
export function Hero({ first, second, tagline, hint, label, nameAr }: Props) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const line1 = useRef<HTMLParagraphElement>(null);
  const line2 = useRef<HTMLParagraphElement>(null);
  const hintEl = useRef<HTMLDivElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const heat = useRef<SVGFEDisplacementMapElement>(null);
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      ctx.drawImage(img, x, y, w, h);
    };

    const overlays = (p: number) => {
      if (line1.current) line1.current.style.opacity = String(band(p, 0, 0.12));
      if (hintEl.current) hintEl.current.style.opacity = String(1 - ramp(p, 0.02, 0.08));
      if (line2.current) line2.current.style.opacity = String(band(p, 0.3, 0.46));
      const e = ramp(p, 0.74, 0.9);
      if (end.current) {
        end.current.style.opacity = String(e);
        end.current.style.transform = `translateY(${(1 - e) * 24}px)`;
      }
      // Heat shimmer on the logotype: strong as it appears, gone when the move ends.
      heat.current?.setAttribute('scale', String(Math.round((1 - ramp(p, 0.78, 0.98)) * 46)));
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
    <section ref={root} className="relative h-[420svh] bg-ink" aria-label={label}>
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div className="grain absolute inset-0" aria-hidden="true" />

        <svg className="absolute h-0 w-0" aria-hidden="true">
          <filter id="heat" x="-10%" y="-30%" width="120%" height="160%">
            <feTurbulence ref={noise} type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="2" seed="3" result="n" />
            <feDisplacementMap ref={heat} in="SourceGraphic" in2="n" scale="46" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        <div className="shell absolute inset-x-0 bottom-[14svh] text-bone">
          <div className="relative">
            <p ref={line1} className="display absolute bottom-0 text-[clamp(2.5rem,7vw,6.5rem)] [text-shadow:0_2px_30px_rgb(0_0_0/0.35)]">
              {first}
            </p>
            <p ref={line2} className="display absolute bottom-0 text-[clamp(2.5rem,7vw,6.5rem)] opacity-0 [text-shadow:0_2px_30px_rgb(0_0_0/0.45)]">
              {second}
            </p>
          </div>
        </div>

        <div ref={hintEl} className="kicker absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 text-bone/80">
          <span>{hint}</span>
          <span className="block h-10 w-px bg-bone/60" />
        </div>

        <div ref={end} className="absolute inset-x-0 top-[11svh] flex flex-col items-center px-5 text-center text-ink opacity-0">
          <h1
            dir="ltr"
            className="font-(family-name:--f-display) text-[clamp(4.5rem,19vw,17rem)] leading-[0.85] tracking-[0.04em]"
            style={{ filter: 'url(#heat)' }}
          >
            SARAB
          </h1>
          <p className="mt-3 flex items-center gap-3 text-[clamp(0.95rem,1.5vw,1.25rem)]">
            <span className="font-(family-name:--f-ar-display)" lang="ar">
              {nameAr}
            </span>
            <span className="block h-px w-8 bg-ink/50" />
            <span>{tagline}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
