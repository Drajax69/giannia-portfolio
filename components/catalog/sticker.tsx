"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { scatter } from "@/lib/scatter";
import { cn } from "@/lib/utils";
import type { CatalogItem } from "@/lib/catalog-data";

type Props = {
  item: CatalogItem;
  index: number;
  visible: boolean;
};

// A single scattered sticker. The outer motion.div handles the fade/scale/blur
// on filter changes; the inner .sticker-card holds the rotation (via --rot) and
// straightens + lifts on hover.
export function Sticker({ item, index, visible }: Props) {
  const s = scatter(item.slug);

  return (
    <motion.div
      className={cn("relative shrink-0", s.size, !visible && "pointer-events-none")}
      style={{
        marginTop: s.marginTop,
        marginBottom: s.marginBottom,
        zIndex: visible ? s.zIndex + 1 : 0,
      }}
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{
        opacity: visible ? 1 : 0.06,
        scale: visible ? 1 : 0.88,
        y: 0,
        filter: visible ? "blur(0px)" : "blur(2.5px)",
      }}
      transition={{
        opacity: { duration: 0.4 },
        scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        filter: { duration: 0.4 },
        y: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: Math.min(index * 0.03, 0.45),
        },
      }}
      aria-hidden={!visible}
    >
      <Link
        href={`/items/${item.slug}`}
        aria-label={`${item.name} — ${item.jp}`}
        tabIndex={visible ? 0 : -1}
        className="sticker-card group block rounded-[1.4rem] border border-foreground/10 bg-card p-3 shadow-[0_22px_44px_-28px_rgba(42,32,18,0.55)] hover:shadow-[0_34px_64px_-28px_rgba(42,32,18,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-seal/60"
        style={{ ["--rot" as string]: `${s.rotate}deg` } as React.CSSProperties}
      >
        <div className="mb-1 flex items-center justify-between px-1">
          <span className="font-mono text-[9px] tracking-[0.2em] text-foreground/40">
            {item.no}
          </span>
          <span className="seal-mark h-1.5 w-1.5 rotate-45 rounded-[1px]" aria-hidden />
        </div>

        <Image
          src={item.image}
          alt={`${item.name} — ${item.jp}`}
          width={360}
          height={360}
          unoptimized
          draggable={false}
          className="h-auto w-full select-none"
        />

        <div className="mt-1 px-1">
          <div
            className="font-serif text-[14px] leading-tight text-foreground"
            style={{ fontVariationSettings: '"opsz" 14' }}
          >
            {item.name}
          </div>
          <div className="mt-0.5 flex items-baseline gap-1.5 text-[10.5px] text-foreground/45">
            <span className="font-sans">{item.jp}</span>
            <span className="text-foreground/20">/</span>
            <span className="font-mono lowercase">{item.romaji}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
