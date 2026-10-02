import type { CSSProperties } from 'react';

const BANDS = 6;

/**
 * The wordmark standing on the horizon, with its mirage below: the same word
 * upside down, cut into strips that drift apart like air over hot sand.
 */
export function Mirage({ className = '' }: { className?: string }) {
  const word = (
    <span className="block font-(family-name:--f-display) leading-[0.8] tracking-[0.14em] [margin-inline-end:-0.14em]">SARAB</span>
  );
  return (
    <div dir="ltr" aria-hidden="true" className={`select-none overflow-hidden text-center ${className}`}>
      {word}
      <div className="relative mt-[0.04em] h-[0.42em] [mask-image:linear-gradient(to_bottom,black,transparent)]">
        {Array.from({ length: BANDS }, (_, i) => (
          <div
            key={i}
            className="mirage-band absolute inset-x-0 overflow-hidden"
            style={{ top: `${i * 0.07}em`, height: '0.058em', opacity: 0.34 - i * 0.04, '--i': i } as CSSProperties}
          >
            <div className="-scale-y-100" style={{ marginTop: `${-i * 0.07}em` }}>
              {word}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
