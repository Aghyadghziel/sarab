'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/** A full image that drifts a little slower than the page. */
export function Parallax({ src, alt, sizes = '100vw', className = '', amount = 8 }: { src: string; alt: string; sizes?: string; className?: string; amount?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current;
    const img = inner.current;
    if (!el || !img || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);
    const tick = () => {
      if (visible) {
        const r = el.getBoundingClientRect();
        const t = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        img.style.transform = `translate3d(0, ${(-t * amount).toFixed(2)}%, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [amount]);
  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      <div ref={inner} className="absolute inset-x-0 -inset-y-[12%] will-change-transform">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
