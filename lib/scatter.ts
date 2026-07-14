// Deterministic, seeded "artistic randomness" for the sticker scatter.
// Pure functions (no Math.random / Date) so server and client render identically
// and nothing shifts on hydration.

function hashSeed(input: string): number {
  let hash = 2166136261 // FNV-1a 32-bit offset basis
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

// mulberry32 PRNG — small, fast, deterministic.
function createRng(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let temp = Math.imul(state ^ (state >>> 15), 1 | state)
    temp = (temp + Math.imul(temp ^ (temp >>> 7), 61 | temp)) ^ temp
    return ((temp ^ (temp >>> 14)) >>> 0) / 4294967296
  }
}

const SIZE_CLASSES = [
  "w-[148px]",
  "w-[160px]",
  "w-[172px]",
  "w-[184px]",
  "w-[196px]",
  "w-[150px]",
  "w-[168px]",
] as const

export type Scatter = {
  rotate: number // degrees, -8..8
  size: string // tailwind width class
  marginTop: number // px
  marginBottom: number // px
  zIndex: number
}

export function scatter(slug: string): Scatter {
  const random = createRng(hashSeed(slug))
  const rotate = Math.round(random() * 16 - 8)
  const size = SIZE_CLASSES[Math.floor(random() * SIZE_CLASSES.length)]
  const marginTop = Math.round(random() * 10)
  const marginBottom = Math.round(random() * 14)
  const zIndex = Math.floor(random() * 12)
  return { rotate, size, marginTop, marginBottom, zIndex }
}
