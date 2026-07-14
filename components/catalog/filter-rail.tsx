"use client";

import { cn } from "@/lib/utils";
import type { ActiveFilters, Facet, FacetKey } from "@/lib/catalog-data";

type Props = {
  facets: Facet[];
  active: ActiveFilters;
  onToggle: (facet: FacetKey, value: string) => void;
  onClear: () => void;
  count: number;
  total: number;
  anyActive: boolean;
};

export function FilterRail({
  facets,
  active,
  onToggle,
  onClear,
  count,
  total,
  anyActive,
}: Props) {
  return (
    <aside className="w-full lg:sticky lg:top-6 lg:w-[228px] lg:shrink-0 lg:self-start">
      {/* index counter */}
      <div className="mb-6 border-b border-foreground/12 pb-5">
        <div className="font-mono text-[10px] tracking-[0.4em] text-foreground/40">
          索引 ・ INDEX
        </div>
        <div className="mt-2 flex items-baseline gap-1 font-serif text-foreground">
          <span
            className="text-3xl tabular-nums"
            style={{ fontVariationSettings: '"opsz" 80' }}
          >
            {String(count).padStart(2, "0")}
          </span>
          <span className="text-foreground/30">/ {String(total).padStart(2, "0")}</span>
        </div>
        <p className="mt-1 text-[11px] text-foreground/45">objects on the shelf</p>
      </div>

      {/* facets — wrap on mobile, stack on desktop */}
      <div className="flex flex-row flex-wrap gap-x-7 gap-y-6 lg:flex-col lg:gap-7">
        {facets.map((facet, fi) => (
          <div key={facet.key} className="min-w-[150px]">
            <div className="mb-2.5 flex items-baseline gap-2">
              <span className="font-mono text-[10px] text-seal">
                {String(fi + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-serif text-sm text-foreground"
                style={{ fontVariationSettings: '"opsz" 14' }}
              >
                {facet.label}
              </h3>
              <span className="text-[11px] text-foreground/40">{facet.jp}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {facet.values.map((v) => {
                const on = !!active[facet.key]?.has(v.value);
                return (
                  <button
                    key={v.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onToggle(facet.key, v.value)}
                    className={cn(
                      "group inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] tracking-wide transition-all duration-200",
                      on
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full transition-colors",
                        on
                          ? "bg-background/70"
                          : "bg-foreground/25 group-hover:bg-seal",
                      )}
                      aria-hidden
                    />
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* clear control */}
      <div className="mt-6 flex items-center justify-between border-t border-foreground/12 pt-4">
        <span className="font-mono text-[10px] tracking-[0.3em] text-foreground/35">
          FILTER
        </span>
        {anyActive ? (
          <button
            type="button"
            onClick={onClear}
            className="font-mono text-[10px] tracking-[0.2em] text-seal underline-offset-4 transition-opacity hover:underline"
          >
            CLEAR ×
          </button>
        ) : (
          <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/30">
            ALL
          </span>
        )}
      </div>
    </aside>
  );
}
