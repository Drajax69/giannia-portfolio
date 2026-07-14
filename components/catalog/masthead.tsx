import { items } from "@/lib/catalog-data";

// Editorial masthead — a title block, not a navbar (no navigation).
export function Masthead() {
  return (
    <header className="relative px-5 pb-7 pt-10 sm:px-10 lg:pt-16">
      {/* marginal vertical label (tategaki), desktop only */}
      <div
        aria-hidden
        className="tategaki pointer-events-none absolute left-2 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.4em] text-foreground/35 lg:block"
      >
        作品目録 ・ INDEX OF OBJECTS
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-[0.4em] text-seal uppercase">
            vol. i &middot; catalogue
          </div>
          <h1
            className="mt-3 font-serif font-medium leading-[0.82] tracking-tight text-foreground"
            style={{
              fontSize: "clamp(3rem, 13vw, 8rem)",
              fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
            }}
          >
            Giannia
          </h1>
          <p className="mt-4 max-w-md font-sans text-[13px] leading-relaxed text-foreground/55">
            An index of small, considered objects — vessels, paper, wood and
            stone. Tap a sticker to read it; narrow the shelf with the filters.
          </p>
        </div>

        <dl className="flex items-end gap-8 font-mono text-[10px] tracking-[0.25em] text-foreground/45">
          <div>
            <dt className="text-foreground/35">年</dt>
            <dd className="mt-1.5 text-foreground/75">MMXXVI</dd>
          </div>
          <div>
            <dt className="text-foreground/35">№</dt>
            <dd className="mt-1.5 text-foreground/75">
              001—{String(items.length).padStart(3, "0")}
            </dd>
          </div>
        </dl>
      </div>

      {/* hairline with a seal tick */}
      <div className="mx-auto mt-9 flex max-w-[1400px] items-center gap-3">
        <span className="h-px flex-1 bg-foreground/15" />
        <span className="seal-mark h-2 w-2 rotate-45" aria-hidden />
        <span className="h-px flex-1 bg-foreground/15" />
      </div>
    </header>
  );
}
