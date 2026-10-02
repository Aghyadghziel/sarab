/**
 * The house symbol: a sun on the horizon and its mirage below, the same sun
 * upside down and broken into strips by the heat. With `shimmer`, the strips drift.
 */
export function Mark({ className = '', shimmer = false, tile = false }: { className?: string; shimmer?: boolean; tile?: boolean }) {
  const strips = [
    { x: 17, y: 36, w: 30, h: 3.4, o: 0.72 },
    { x: 22, y: 42.2, w: 18, h: 2.6, o: 0.48 },
    { x: 28.5, y: 47.6, w: 7, h: 2, o: 0.3 },
  ];
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      {tile && <rect width="64" height="64" rx="14" fill="var(--color-ink)" />}
      <path d="M15 32a17 17 0 0 1 34 0z" fill="currentColor" />
      {strips.map((s, i) => (
        <rect
          key={i}
          x={s.x}
          y={s.y}
          width={s.w}
          height={s.h}
          rx={s.h / 2}
          fill="currentColor"
          opacity={s.o}
          className={shimmer ? 'mirage-strip' : undefined}
          style={shimmer ? { animationDelay: `${i * -1.3}s`, animationDuration: `${3.2 + i * 0.9}s` } : undefined}
        />
      ))}
    </svg>
  );
}
