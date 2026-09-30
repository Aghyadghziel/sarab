'use client';

import Image from 'next/image';
import Link from 'next/link';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { bySlug, colourOf } from '@/lib/catalog';
import { COPY } from '@/lib/copy';
import { href, price, type Locale } from '@/lib/i18n';

export type Line = { slug: string; colour: string; size: string; qty: number };

type Bag = {
  lines: Line[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (l: Omit<Line, 'qty'>) => void;
  setQty: (i: number, qty: number) => void;
  remove: (i: number) => void;
};

const KEY = 'sarab:bag:v1';
const BagContext = createContext<Bag | null>(null);

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error('useBag outside BagProvider');
  return ctx;
}

export function BagProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  // Saving waits until the saved bag has been read back, or the first (empty)
  // render would overwrite it.
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? '[]') as Line[];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring browser storage after hydration
      if (Array.isArray(saved)) setLines(saved.filter((l) => bySlug(l.slug)));
    } catch {}
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, restored]);

  const add = useCallback((l: Omit<Line, 'qty'>) => {
    setLines((cur) => {
      const i = cur.findIndex((x) => x.slug === l.slug && x.colour === l.colour && x.size === l.size);
      if (i === -1) return [...cur, { ...l, qty: 1 }];
      return cur.map((x, j) => (j === i ? { ...x, qty: Math.min(9, x.qty + 1) } : x));
    });
    setOpen(true);
  }, []);
  const setQty = useCallback((i: number, qty: number) => {
    setLines((cur) => cur.map((x, j) => (j === i ? { ...x, qty: Math.max(1, Math.min(9, qty)) } : x)));
  }, []);
  const remove = useCallback((i: number) => setLines((cur) => cur.filter((_, j) => j !== i)), []);

  const value = useMemo<Bag>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + (bySlug(l.slug)?.price ?? 0) * l.qty, 0);
    return { lines, count, subtotal, open, setOpen, add, setQty, remove };
  }, [lines, open, add, setQty, remove]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function BagLines({ lang, compact = false }: { lang: Locale; compact?: boolean }) {
  const { lines, setQty, remove, setOpen } = useBag();
  const t = COPY[lang].bag;
  return (
    <ul className="divide-y divide-ink/15">
      {lines.map((l, i) => {
        const p = bySlug(l.slug);
        if (!p) return null;
        const c = colourOf(p, l.colour);
        return (
          <li key={`${l.slug}-${l.colour}-${l.size}`} className="flex gap-4 py-5">
            <Link href={href(lang, `/product/${p.slug}?colour=${c.id}`)} onClick={() => setOpen(false)} className="relative block aspect-[3/4] w-20 shrink-0 overflow-hidden bg-paper">
              <Image src={c.images.studio} alt={p.name[lang]} fill sizes="80px" className="object-cover" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate">{p.name[lang]}</p>
                <p className="shrink-0 tabular-nums">{price(lang, p.price * l.qty)}</p>
              </div>
              <p className="mt-1 text-[13px] text-ash">
                {c.name[lang]} · {t.size} {l.size}
              </p>
              <div className="mt-auto flex items-center justify-between pt-3">
                {compact ? (
                  <span className="text-[13px] text-ash">
                    {t.qty} {l.qty}
                  </span>
                ) : (
                  <div className="flex items-center border hairline" role="group" aria-label={t.qty}>
                    <button type="button" className="grid h-8 w-8 place-items-center" aria-label="−" onClick={() => setQty(i, l.qty - 1)}>
                      −
                    </button>
                    <span className="w-6 text-center text-[13px] tabular-nums">{l.qty}</span>
                    <button type="button" className="grid h-8 w-8 place-items-center" aria-label="+" onClick={() => setQty(i, l.qty + 1)}>
                      +
                    </button>
                  </div>
                )}
                {!compact && (
                  <button type="button" onClick={() => remove(i)} className="text-[13px] text-ash underline underline-offset-4 hover:text-ink">
                    {t.remove}
                  </button>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function BagDrawer({ lang }: { lang: Locale }) {
  const { open, setOpen, count, subtotal } = useBag();
  const t = COPY[lang].bag;
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    panel.current?.focus();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`} inert={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-ink/40 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} />
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        className={`absolute inset-y-0 end-0 flex w-full max-w-[440px] flex-col bg-bone outline-none transition-transform duration-500 ease-out-soft ${
          open ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b hairline px-6">
          <p className="label">
            {t.title} ({count})
          </p>
          <button type="button" onClick={() => setOpen(false)} className="label -me-2 p-2">
            {COPY[lang].nav.close}
          </button>
        </div>
        {count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="display text-3xl">{t.empty}</p>
            <Link href={href(lang, '/shop')} onClick={() => setOpen(false)} className="label border-b border-ink pb-1">
              {t.emptyCta}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto overscroll-contain px-6" data-lenis-prevent>
              <BagLines lang={lang} />
            </div>
            <div className="border-t hairline px-6 py-6">
              <div className="flex items-baseline justify-between">
                <p>{t.subtotal}</p>
                <p className="tabular-nums">{price(lang, subtotal)}</p>
              </div>
              <p className="mt-1 text-[13px] text-ash">{t.shippingNote}</p>
              <Link
                href={href(lang, '/checkout')}
                onClick={() => setOpen(false)}
                className="label mt-5 flex h-13 items-center justify-center bg-ink text-bone transition-opacity hover:opacity-85"
              >
                {t.checkout}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
