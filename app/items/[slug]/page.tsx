import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { facets, getItem, items } from "@/lib/catalog-data";

export function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) return {};
  return {
    title: `${item.jp} — ${item.name}`,
    description: item.note,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();

  const index = items.findIndex((i) => i.slug === slug);
  const prev = items[(index - 1 + items.length) % items.length]!;
  const next = items[(index + 1) % items.length]!;

  const propRows = facets.map((f) => {
    const value = item[f.key];
    const meta = f.values.find((v) => v.value === value);
    return {
      key: f.key,
      label: f.label,
      jp: f.jp,
      vLabel: meta?.label ?? value,
      vJp: meta?.jp ?? "",
    };
  });

  const extraRows = [
    { label: "Origin", jp: "出処", vLabel: item.origin, vJp: "" },
    { label: "Period", jp: "年代", vLabel: item.year, vJp: "" },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-8 sm:px-10 lg:pt-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-foreground/50 transition-colors hover:text-seal"
      >
        <span aria-hidden>&larr;</span> INDEX
      </Link>

      <div className="mt-7 flex items-center gap-4">
        <span className="font-mono text-[11px] tracking-[0.3em] text-seal">
          {item.no}
        </span>
        <span className="seal-mark h-2 w-2 rotate-45" aria-hidden />
      </div>

      <h1
        className="mt-3 font-serif font-medium leading-[0.85] text-foreground"
        lang="ja"
        style={{
          fontSize: "clamp(2.75rem, 11vw, 6rem)",
          fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
        }}
      >
        {item.jp}
      </h1>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span
          className="font-serif text-2xl text-foreground/85"
          style={{ fontVariationSettings: '"opsz" 30' }}
        >
          {item.name}
        </span>
        <span className="font-mono text-sm lowercase tracking-wide text-foreground/40">
          {item.romaji}
        </span>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <div>
          <div className="mx-auto max-w-[480px] rounded-[1.6rem] border border-foreground/10 bg-card p-6 shadow-[0_34px_80px_-44px_rgba(42,32,18,0.65)]">
            <Image
              src={item.image}
              alt={`${item.name} — ${item.jp}`}
              width={520}
              height={520}
              unoptimized
              className="h-auto w-full"
            />
          </div>
        </div>

        <div>
          <p
            className="font-serif text-lg leading-relaxed text-foreground/75"
            style={{ fontVariationSettings: '"opsz" 24' }}
          >
            {item.note}
          </p>

          <Separator className="my-7 bg-foreground/15" />

          <dl className="space-y-2.5">
            {[...propRows, ...extraRows].map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b border-dashed border-foreground/12 pb-2"
              >
                <dt className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
                    {row.label}
                  </span>
                  <span className="text-[11px] text-foreground/35">{row.jp}</span>
                </dt>
                <dd className="flex items-baseline gap-2">
                  {row.vJp && (
                    <span className="text-[13px] text-foreground/40">{row.vJp}</span>
                  )}
                  <span
                    className="font-serif text-[15px] text-foreground"
                    style={{ fontVariationSettings: '"opsz" 18' }}
                  >
                    {row.vLabel}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* prev / next */}
      <nav className="mt-14 flex items-center justify-between border-t border-foreground/12 pt-6">
        <Link
          href={`/items/${prev.slug}`}
          className="group flex max-w-[45%] items-center gap-3"
        >
          <span aria-hidden className="font-mono text-lg text-foreground/40 transition-colors group-hover:text-seal">
            &larr;
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="font-mono text-[10px] tracking-[0.25em] text-foreground/35">
              PREV
            </span>
            <span className="truncate font-serif text-sm text-foreground/75 transition-colors group-hover:text-foreground">
              {prev.jp} &middot; {prev.name}
            </span>
          </span>
        </Link>

        <Link
          href={`/items/${next.slug}`}
          className="group flex max-w-[45%] items-center gap-3"
        >
          <span className="flex min-w-0 flex-col items-end">
            <span className="font-mono text-[10px] tracking-[0.25em] text-foreground/35">
              NEXT
            </span>
            <span className="truncate font-serif text-sm text-foreground/75 transition-colors group-hover:text-foreground">
              {next.name} &middot; {next.jp}
            </span>
          </span>
          <span aria-hidden className="font-mono text-lg text-foreground/40 transition-colors group-hover:text-seal">
            &rarr;
          </span>
        </Link>
      </nav>
    </div>
  );
}
