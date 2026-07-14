"use client";

import { useMemo, useState } from "react";

import {
  facets,
  items,
  type ActiveFilters,
  type FacetKey,
} from "@/lib/catalog-data";
import { Sticker } from "./sticker";
import { FilterRail } from "./filter-rail";

export function Catalog() {
  const [active, setActive] = useState<ActiveFilters>({});

  const toggle = (facet: FacetKey, value: string) => {
    setActive((prev) => {
      const current = new Set(prev[facet] ?? []);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      const next: ActiveFilters = { ...prev };
      if (current.size) next[facet] = current;
      else delete next[facet];
      return next;
    });
  };

  const clear = () => setActive({});

  const rows = useMemo(
    () =>
      items.map((item) => ({
        item,
        // AND across facets that have a selection, OR within a facet.
        visible: (Object.keys(active) as FacetKey[]).every(
          (facet) =>
            !active[facet] ||
            active[facet]!.size === 0 ||
            active[facet]!.has(item[facet]),
        ),
      })),
    [active],
  );

  const visibleCount = rows.filter((r) => r.visible).length;
  const anyActive = (Object.keys(active) as FacetKey[]).some(
    (f) => !!active[f] && active[f]!.size > 0,
  );

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-5 pb-28 sm:px-8 lg:flex-row lg:items-start lg:gap-14 lg:px-10">
      <FilterRail
        facets={facets}
        active={active}
        onToggle={toggle}
        onClear={clear}
        count={visibleCount}
        total={items.length}
        anyActive={anyActive}
      />

      <section className="relative min-h-[60vh] flex-1">
        <div className="flex flex-wrap items-start justify-center gap-x-1 gap-y-2 sm:gap-x-2">
          {rows.map(({ item, visible }, i) => (
            <Sticker key={item.slug} item={item} index={i} visible={visible} />
          ))}
        </div>

        {visibleCount === 0 && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <div
              className="font-serif text-2xl text-foreground/40"
              style={{ fontVariationSettings: '"opsz" 60' }}
            >
              該当なし
            </div>
            <div className="mt-1 font-mono text-[11px] tracking-[0.3em] text-foreground/35">
              NOTHING MATCHES — CLEAR TO RESET
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
