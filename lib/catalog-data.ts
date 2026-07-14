// The mock catalogue. Every "image" is an item with properties that the
// left-hand filter facets read from. Swap `image` for a real asset path later.

export type FacetKey = "kind" | "material" | "season"

// facet key -> set of selected values. Empty/missing = no constraint on that facet.
export type ActiveFilters = Partial<Record<FacetKey, Set<string>>>

export type FacetValue = {
  value: string
  label: string
  jp: string
}

export type Facet = {
  key: FacetKey
  label: string
  jp: string
  values: FacetValue[]
}

export type CatalogItem = {
  slug: string
  name: string
  jp: string
  romaji: string
  no: string
  image: string
  kind: string
  material: string
  season: string
  origin: string
  year: string
  note: string
}

export const facets: Facet[] = [
  {
    key: "kind",
    label: "Category",
    jp: "種類",
    values: [
      { value: "vessel", label: "Vessels", jp: "器" },
      { value: "object", label: "Objects", jp: "物" },
      { value: "flora", label: "Flora", jp: "草花" },
      { value: "tool", label: "Tools", jp: "道具" },
    ],
  },
  {
    key: "material",
    label: "Material",
    jp: "素材",
    values: [
      { value: "ceramic", label: "Ceramic", jp: "陶" },
      { value: "paper", label: "Paper", jp: "紙" },
      { value: "wood", label: "Wood", jp: "木" },
      { value: "stone", label: "Stone", jp: "石" },
      { value: "organic", label: "Organic", jp: "自然" },
    ],
  },
  {
    key: "season",
    label: "Season",
    jp: "季節",
    values: [
      { value: "spring", label: "Spring", jp: "春" },
      { value: "summer", label: "Summer", jp: "夏" },
      { value: "autumn", label: "Autumn", jp: "秋" },
      { value: "winter", label: "Winter", jp: "冬" },
    ],
  },
]

export const items: CatalogItem[] = [
  {
    slug: "kyusu",
    name: "Side-Handled Teapot",
    jp: "急須",
    romaji: "kyūsu",
    no: "№ 001",
    image: "/stickers/teapot.svg",
    kind: "vessel",
    material: "ceramic",
    season: "winter",
    origin: "Banko-yake, Mie",
    year: "c. 1962",
    note: "A side-handled teapot of banko ware, its clay left unglazed to soften the taste of sencha. Holds the heat of a long winter afternoon.",
  },
  {
    slug: "hanaike",
    name: "Flower Vase",
    jp: "花瓶",
    romaji: "hanaike",
    no: "№ 002",
    image: "/stickers/vase.svg",
    kind: "vessel",
    material: "ceramic",
    season: "spring",
    origin: "Shigaraki, Shiga",
    year: "c. 1971",
    note: "A tall shouldered vase of shigaraki stoneware, scorched pale by the kiln. Built for a single branch of early plum.",
  },
  {
    slug: "chawan",
    name: "Tea Bowl",
    jp: "茶碗",
    romaji: "chawan",
    no: "№ 003",
    image: "/stickers/bowl.svg",
    kind: "vessel",
    material: "ceramic",
    season: "summer",
    origin: "Hagi, Yamaguchi",
    year: "c. 1958",
    note: "A hagi-yaki chawan, its crackled glaze drinking tea until the bowl itself darkens with use. Meant for cool summer water, too.",
  },
  {
    slug: "tokkuri",
    name: "Sake Flask",
    jp: "徳利",
    romaji: "tokkuri",
    no: "№ 004",
    image: "/stickers/flask.svg",
    kind: "vessel",
    material: "ceramic",
    season: "autumn",
    origin: "Bizen, Okayama",
    year: "c. 1966",
    note: "A bizen tokkuri, fired without glaze until the ash settles into a natural sheen. Warmed and refilled through autumn evenings.",
  },
  {
    slug: "chochin",
    name: "Paper Lantern",
    jp: "提灯",
    romaji: "chōchin",
    no: "№ 005",
    image: "/stickers/lantern.svg",
    kind: "object",
    material: "paper",
    season: "summer",
    origin: "Gifu",
    year: "c. 1974",
    note: "A collapsible lantern of mulberry paper over a bamboo frame. Lit for the festival nights of high summer.",
  },
  {
    slug: "wagasa",
    name: "Paper Umbrella",
    jp: "和傘",
    romaji: "wagasa",
    no: "№ 006",
    image: "/stickers/umbrella.svg",
    kind: "object",
    material: "paper",
    season: "spring",
    origin: "Kyoto",
    year: "c. 1969",
    note: "A wagasa of oiled washi stretched across thin bamboo ribs. Opened against the long rains of late spring.",
  },
  {
    slug: "toro",
    name: "Stone Lantern",
    jp: "灯籠",
    romaji: "tōrō",
    no: "№ 007",
    image: "/stickers/stone-lantern.svg",
    kind: "object",
    material: "stone",
    season: "summer",
    origin: "Kamakura",
    year: "—",
    note: "A granite tōrō set at a temple gate, its light box hollowed to hold a single flame. Still warm to the touch after dusk.",
  },
  {
    slug: "sensu",
    name: "Folding Fan",
    jp: "扇子",
    romaji: "sensu",
    no: "№ 008",
    image: "/stickers/fan.svg",
    kind: "object",
    material: "paper",
    season: "autumn",
    origin: "Kyoto",
    year: "c. 1977",
    note: "A folding sensu of cedar ribs and painted paper. Snapped open for a breeze, then slipped quietly into a sleeve.",
  },
  {
    slug: "kaki",
    name: "Persimmon",
    jp: "柿",
    romaji: "kaki",
    no: "№ 009",
    image: "/stickers/persimmon.svg",
    kind: "flora",
    material: "organic",
    season: "autumn",
    origin: "Nara",
    year: "—",
    note: "A single ripe kaki, its calyx folded back like a star. The first clear colour against the grey of late autumn.",
  },
  {
    slug: "ume",
    name: "Plum Blossom",
    jp: "梅",
    romaji: "ume",
    no: "№ 010",
    image: "/stickers/plum.svg",
    kind: "flora",
    material: "organic",
    season: "spring",
    origin: "Kyoto",
    year: "—",
    note: "A cutting of ume forced into flower before the snow has gone. Its scent carries further than the cold should allow.",
  },
  {
    slug: "fude",
    name: "Calligraphy Brush",
    jp: "筆",
    romaji: "fude",
    no: "№ 011",
    image: "/stickers/brush.svg",
    kind: "tool",
    material: "wood",
    season: "winter",
    origin: "Nara",
    year: "c. 1960",
    note: "A fude of bamboo and sheep hair, its tip dressed to a fine point. The instrument of long winter letters.",
  },
  {
    slug: "kushi",
    name: "Wooden Comb",
    jp: "櫛",
    romaji: "kushi",
    no: "№ 012",
    image: "/stickers/comb.svg",
    kind: "tool",
    material: "wood",
    season: "spring",
    origin: "Yanagi",
    year: "c. 1973",
    note: "A hand-cut kushi of pale boxwood, polished smooth by years of use. Small enough to forget in a pocket.",
  },
]

export function getItem(slug: string): CatalogItem | undefined {
  return items.find((item) => item.slug === slug)
}
