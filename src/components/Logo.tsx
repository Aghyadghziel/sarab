/** The house mark: SARAB in spaced Didone capitals, with سراب in Kufi beside it. */
export function Logo({ className = '', arabic = true }: { className?: string; arabic?: boolean }) {
  return (
    <span dir="ltr" className={`inline-flex items-center gap-3 leading-none ${className}`}>
      <span className="font-(family-name:--f-display) text-[1.35em] tracking-[0.34em] [margin-inline-end:-0.34em]">SARAB</span>
      {arabic && (
        <>
          <span aria-hidden="true" className="h-[0.9em] w-px bg-current opacity-40" />
          <span lang="ar" className="font-mark translate-y-[0.06em] text-[1.3em]">
            سراب
          </span>
        </>
      )}
    </span>
  );
}
