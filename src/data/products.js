// Every product ships with a built-in illustration (an inline SVG), so no image is ever broken.
// To use real photos later, replace `image` with your own URL for any product.

const wrap = (bg1, bg2, body) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/>
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#c9a27e"/><stop offset="0.5" stop-color="#f6e0c8"/><stop offset="1" stop-color="#c9a27e"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#g)"/>
      <ellipse cx="200" cy="350" rx="110" ry="14" fill="#000" opacity="0.18"/>
      ${body}
    </svg>`
  );

const lipstick = (c, bg1, bg2) =>
  wrap(bg1, bg2, `
    <rect x="165" y="215" width="70" height="125" rx="8" fill="url(#gold)"/>
    <rect x="165" y="205" width="70" height="22" fill="#1b1b2a"/>
    <rect x="172" y="120" width="56" height="90" fill="${c}"/>
    <path d="M172 120 L228 100 L228 124 L172 124 Z" fill="${c}"/>
    <path d="M172 120 L228 98 Q228 90 214 92 L180 108 Z" fill="#fff" opacity="0.18"/>`);

const bottle = (c, bg1, bg2) =>
  wrap(bg1, bg2, `
    <rect x="178" y="80" width="44" height="50" rx="6" fill="url(#gold)"/>
    <rect x="188" y="125" width="24" height="26" fill="#d8d8e6" opacity="0.9"/>
    <rect x="140" y="148" width="120" height="192" rx="22" fill="${c}"/>
    <rect x="152" y="160" width="20" height="160" rx="10" fill="#fff" opacity="0.22"/>
    <rect x="170" y="215" width="80" height="50" rx="4" fill="#fff" opacity="0.85"/>
    <rect x="182" y="229" width="56" height="5" fill="#888"/><rect x="182" y="242" width="38" height="5" fill="#bbb"/>`);

const compact = (c, bg1, bg2) =>
  wrap(bg1, bg2, `
    <circle cx="200" cy="205" r="125" fill="url(#gold)"/>
    <circle cx="200" cy="205" r="108" fill="#2a2a3d"/>
    <circle cx="200" cy="205" r="92" fill="${c}"/>
    <circle cx="165" cy="170" r="30" fill="#fff" opacity="0.2"/>
    <rect x="150" y="320" width="100" height="10" rx="5" fill="#c9a27e"/>`);

const mascara = (c, bg1, bg2) =>
  wrap(bg1, bg2, `
    <rect x="188" y="60" width="24" height="120" rx="12" fill="#1b1b2a"/>
    <rect x="182" y="170" width="36" height="14" fill="url(#gold)"/>
    <rect x="170" y="182" width="60" height="160" rx="12" fill="${c}"/>
    <rect x="178" y="195" width="10" height="130" rx="5" fill="#fff" opacity="0.25"/>
    <rect x="170" y="250" width="60" height="30" fill="url(#gold)" opacity="0.9"/>`);

const palette = (colors, bg1, bg2) =>
  wrap(bg1, bg2, `
    <rect x="70" y="110" width="260" height="190" rx="18" fill="#2a2a3d"/>
    <rect x="70" y="110" width="260" height="190" rx="18" fill="none" stroke="url(#gold)" stroke-width="5"/>
    ${colors
      .map((col, i) => `<circle cx="${112 + (i % 3) * 88}" cy="${158 + Math.floor(i / 3) * 92}" r="34" fill="${col}"/>`)
      .join("")}`);

export const products = [
  {
    id: "velvet-rose-lipstick",
    name: "Velvet Rose Lipstick",
    brand: "Maison Velour",
    category: "Lips",
    price: 24,
    badge: "Bestseller",
    shades: ["#b5395b", "#d9677d", "#8a2a3f"],
    description: "A creamy, full-coverage lipstick with a soft matte finish that lasts through dinner.",
    image: lipstick("#b5395b", "#f2c9d1", "#cf8fa0"),
  },
  {
    id: "petal-nude-lipstick",
    name: "Petal Nude Lipstick",
    brand: "Aurelle",
    category: "Lips",
    price: 22,
    badge: "New",
    shades: ["#c98f7e", "#b97867", "#d6a595"],
    description: "Your-lips-but-better nude tones with a satin finish and a comfortable, hydrating feel.",
    image: lipstick("#c98f7e", "#f6e3d8", "#d9b3a2"),
  },
  {
    id: "berry-gloss-bottle",
    name: "Berry Glass Lip Oil",
    brand: "Noor Atelier",
    category: "Lips",
    price: 18,
    badge: null,
    shades: ["#8e2f5e", "#c24c7e"],
    description: "A plumping, high-shine lip oil that feels light and never sticky.",
    image: bottle("#8e2f5e", "#e8c3dc", "#b97fa6"),
  },
  {
    id: "silk-foundation",
    name: "Silk Skin Foundation",
    brand: "Rosé & Co",
    category: "Face",
    price: 38,
    badge: "Bestseller",
    shades: ["#f0cfb4", "#deb393", "#c18f6c", "#8f5f43"],
    description: "Buildable, medium coverage with a natural skin-like finish. Available in 24 shades.",
    image: bottle("#e4be9f", "#f8ebe0", "#e0c1a8"),
  },
  {
    id: "glow-serum-bottle",
    name: "Dewy Glow Serum",
    brand: "Aurelle",
    category: "Skincare",
    price: 46,
    badge: "New",
    shades: [],
    description: "Hyaluronic acid and vitamin C in a lightweight serum that brightens and hydrates.",
    image: bottle("#e9b8a6", "#f4ddd2", "#d9a894"),
  },
  {
    id: "rosewater-mist",
    name: "Rosewater Setting Mist",
    brand: "Maison Velour",
    category: "Skincare",
    price: 20,
    badge: null,
    shades: [],
    description: "A fine mist that sets makeup and refreshes skin any time of day.",
    image: bottle("#e7a9b7", "#fbe6ea", "#d8a0ae"),
  },
  {
    id: "peach-blush-compact",
    name: "Peach Bloom Blush",
    brand: "Noor Atelier",
    category: "Face",
    price: 26,
    badge: null,
    shades: ["#f0a58f", "#e98ba0", "#d46a6a"],
    description: "A silky powder blush that blends easily for a soft, natural flush.",
    image: compact("#f0a58f", "#fbe3da", "#e8b3a3"),
  },
  {
    id: "golden-highlighter",
    name: "Golden Hour Highlighter",
    brand: "Rosé & Co",
    category: "Face",
    price: 28,
    badge: "New",
    shades: ["#f3d9a8", "#f0c4b0"],
    description: "A finely milled highlighter that catches the light without any glitter.",
    image: compact("#f3d9a8", "#fbf0d8", "#e6cf9f"),
  },
  {
    id: "noir-mascara",
    name: "Noir Lash Mascara",
    brand: "Maison Velour",
    category: "Eyes",
    price: 21,
    badge: "Bestseller",
    shades: ["#1b1b2a"],
    description: "Volume and length that lasts all day, without clumps or smudging.",
    image: mascara("#33334d", "#e4e0f2", "#b5aed2"),
  },
  {
    id: "dusk-eyeshadow-palette",
    name: "Dusk Eyeshadow Palette",
    brand: "Noor Atelier",
    category: "Eyes",
    price: 42,
    badge: "New",
    shades: [],
    description: "Six warm mauve, rose, and bronze shades in matte and shimmer finishes.",
    image: palette(["#c98f9e", "#8e5b73", "#e5b9a0", "#6d4a63", "#d6a46f", "#3f2c45"], "#e8dcef", "#bfa9d0"),
  },
  {
    id: "sunrise-eyeshadow-palette",
    name: "Sunrise Eyeshadow Palette",
    brand: "Aurelle",
    category: "Eyes",
    price: 40,
    badge: null,
    shades: [],
    description: "Six golden peach and terracotta shades for easy everyday eye looks.",
    image: palette(["#f3c49a", "#e59a6c", "#c1673f", "#f0dcb5", "#a24b2c", "#7a3a24"], "#fbe8d6", "#e8b78f"),
  },
  {
    id: "rose-perfume",
    name: "Rose Absolu Eau de Parfum",
    brand: "Maison Velour",
    category: "Fragrance",
    price: 68,
    badge: null,
    shades: [],
    description: "Bulgarian rose, soft musk, and warm amber in a long-lasting eau de parfum.",
    image: bottle("#d99aa8", "#f9e4e9", "#d3a2af"),
  },
];

export const categories = ["All", "Lips", "Face", "Eyes", "Skincare", "Fragrance"];
