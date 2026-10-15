/**
 * ============================================================================
 * ATELIER LUXE - PRODUCT CATALOG DATABASE
 * Contemporary Luxury Apparel & Tailoring
 * ============================================================================
 */

export const PRODUCTS = [
  {
    id: "atelier-bomber-jacket",
    name: "Obsidian Tech MA-1 Bomber",
    subtitle: "Iridescent technical satin with titanium hardware",
    category: "outerwear",
    price: 380,
    originalPrice: 440,
    rating: 4.9,
    reviewCount: 38,
    badge: "LIMITED",
    inStock: true,
    stockRemaining: 4,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Midnight Obsidian", hex: "#16181d" },
      { name: "Gunmetal Slate", hex: "#3a3e47" }
    ],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Engineered from high-density Japanese technical memory satin with a water-resistant finish. Features matte titanium double-ended zippers, insulating diamond-quilted cupro lining, and ergonomic articulated sleeve articulation.",
    details: {
      material: "100% High-Density Technical Nylon Satin; Lining: 100% Bemberg Cupro",
      fit: "Relaxed boxy silhouette with dropped shoulders and ribbed cuffs",
      origin: "Crafted in Okayama, Japan",
      care: "Specialist dry clean only. Do not iron hardware directly."
    }
  },
  {
    id: "minimal-linen-overshirt",
    name: "Venetian Raw Linen Overshirt",
    subtitle: "Artisanal textured linen with mother of pearl buttons",
    category: "tops",
    price: 195,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 52,
    badge: "BESTSELLER",
    inStock: true,
    stockRemaining: 12,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sand Dune", hex: "#d5c8b5" },
      { name: "Bleached Ecru", hex: "#ece8de" },
      { name: "Charcoal Ash", hex: "#2b2c30" }
    ],
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=900&auto=format&fit=crop"
    ],
    description: "An understated wardrobe pillar woven from organic Normandy flax linen. Features bespoke Australian mother of pearl buttons, twin chest patch pockets, and a soft structured camp collar.",
    details: {
      material: "100% Certified Organic Normandy Linen (190 GSM)",
      fit: "Tailored casual drape designed for layering over fine knitwear",
      origin: "Milled and sewn in Veneto, Italy",
      care: "Gentle cold machine wash on delicate cycle. Air dry flat."
    }
  },
  {
    id: "tailored-wool-blazer",
    name: "Milano Unstructured Wool Blazer",
    subtitle: "Super 130s virgin wool with fluid natural shoulder",
    category: "outerwear",
    price: 490,
    originalPrice: 560,
    rating: 5.0,
    reviewCount: 29,
    badge: "NEW",
    inStock: true,
    stockRemaining: 3,
    sizes: ["38R", "40R", "42R", "44R"],
    colors: [
      { name: "Deep Charcoal", hex: "#22252a" },
      { name: "Midnight Navy", hex: "#161b26" }
    ],
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Hand-tailored unstructured jacket crafted from Italian Super 130s virgin wool with natural stretch. Boasts soft unpadded spalla camicia shoulders, curved barchetta breast pocket, and unlined interior for effortless thermal comfort.",
    details: {
      material: "100% Italian Virgin Wool from Lanificio Cerruti",
      fit: "Contemporary Neapolitan cut with high armholes and soft chest drape",
      origin: "Sartorial workshop in Naples, Italy",
      care: "Dry clean by luxury garment specialists only."
    }
  },
  {
    id: "silk-slip-dress",
    name: "Verdant Bias-Cut Silk Slip Dress",
    subtitle: "22-Momme Mulberry liquid silk with delicate French seams",
    category: "dresses",
    price: 320,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 46,
    badge: "BESTSELLER",
    inStock: true,
    stockRemaining: 7,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Emerald Glaze", hex: "#0f5a47" },
      { name: "Champagne Pearl", hex: "#e5dbcb" },
      { name: "Noir Onyx", hex: "#111215" }
    ],
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Cut on the true 45-degree bias for a body-skimming silhouette that moves like molten glass. Featuring discreet adjustable straps, a graceful cowl neckline, and reinforced hand-rolled hems.",
    details: {
      material: "100% Grade 6A Pure Mulberry Silk (22-Momme)",
      fit: "True bias cut contours naturally over the waist and hip",
      origin: "Lyon, France",
      care: "Hand wash cold with pH-neutral silk wash or eco dry clean."
    }
  },
  {
    id: "cashmere-knit-sweater",
    name: "Nordic Ribbed Cashmere Crewneck",
    subtitle: "Grade-A Mongolian cashmere 5-gauge fisherman rib",
    category: "knitwear",
    price: 340,
    originalPrice: 395,
    rating: 4.9,
    reviewCount: 64,
    badge: null,
    inStock: true,
    stockRemaining: 8,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal Melange", hex: "#d8cfc4" },
      { name: "Dark Espresso", hex: "#2b201a" },
      { name: "Mineral Sage", hex: "#7d8b82" }
    ],
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Spun from ethically gathered Grade-A Mongolian cashmere with long staple fibres to minimize pilling. Knitted in a tactile 5-gauge half-cardigan rib that delivers extraordinary warmth with featherlight softness.",
    details: {
      material: "100% Sustainable Grade-A Mongolian Cashmere",
      fit: "Relaxed slouchy silhouette with chunky ribbed neckline",
      origin: "Crafted in Hawick, Scotland",
      care: "Hand wash inside-out in cold water; dry flat on towel."
    }
  },
  {
    id: "pleated-wide-trousers",
    name: "Kyoto Pleated Wide-Leg Trousers",
    subtitle: "Wool gabardine with deep double front pleats",
    category: "trousers",
    price: 260,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 31,
    badge: "NEW",
    inStock: true,
    stockRemaining: 6,
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Midnight Navy", hex: "#19202c" },
      { name: "Dark Olive", hex: "#2e3328" }
    ],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=900&auto=format&fit=crop"
    ],
    description: "An architectural trouser with deep reverse front pleats that create graceful motion as you walk. Features side tab adjusters eliminating the need for a belt, horn closures, and unfinished hems for tailored length customization.",
    details: {
      material: "100% High-Twist Japanese Wool Gabardine",
      fit: "High-rise, relaxed through the thigh with gentle taper to the cuff",
      origin: "Bishu Textile District, Japan",
      care: "Dry clean only. Steam press to preserve front knife pleats."
    }
  },
  {
    id: "sovereign-trench-coat",
    name: "Sovereign Double-Breasted Trench",
    subtitle: "Weatherproof storm gabardine with leather-wrapped buckles",
    category: "outerwear",
    price: 580,
    originalPrice: 650,
    rating: 5.0,
    reviewCount: 19,
    badge: "LIMITED",
    inStock: true,
    stockRemaining: 2,
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Cognac Amber", hex: "#7a482b" },
      { name: "Black Matte", hex: "#131417" }
    ],
    image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=900&auto=format&fit=crop"
    ],
    description: "A monumental outer layer engineered for dramatic weather resilience. Includes throat latch, epaulettes, deep storm shield, horn buttons, and genuine bridle leather belt buckle.",
    details: {
      material: "100% Compact Cotton Gabardine with DWR Shield",
      fit: "Calf-length commanding silhouette with generous back vent",
      origin: "Manchester, England",
      care: "Specialist dry cleaning."
    }
  },
  {
    id: "fluid-silk-tunic",
    name: "Aura Fluid Silk Button-Down",
    subtitle: "Sand-washed silk crepe with concealed placket",
    category: "tops",
    price: 240,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 22,
    badge: null,
    inStock: true,
    stockRemaining: 10,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Bone White", hex: "#f4f3ef" },
      { name: "Sage Mist", hex: "#8c9b90" }
    ],
    image: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Minimalist blouse tailored from sand-washed silk crepe de chine with a peach-skin velvet hand feel. Concealed center placket and elongated barrel cuffs with twin mother-of-pearl buttons.",
    details: {
      material: "100% Sand-Washed Silk Crepe de Chine",
      fit: "Fluid relaxed drape with subtle curved hemline",
      origin: "Como, Italy",
      care: "Delicate silk wash or dry clean."
    }
  }
];

export const CATEGORIES = [
  { id: "all", label: "All Works" },
  { id: "outerwear", label: "Outerwear" },
  { id: "tops", label: "Tops & Shirts" },
  { id: "knitwear", label: "Knitwear" },
  { id: "dresses", label: "Dresses" },
  { id: "trousers", label: "Trousers" }
];

export const CURRENCIES = {
  USD: { symbol: "$", rate: 1.0, code: "USD" },
  EUR: { symbol: "€", rate: 0.92, code: "EUR" },
  GBP: { symbol: "£", rate: 0.79, code: "GBP" },
  JPY: { symbol: "¥", rate: 152.0, code: "JPY" }
};

export const PROMO_CODES = {
  "LUXE10": { type: "percent", value: 10, description: "10% VIP Atelier Discount" },
  "ARCHITECT": { type: "percent", value: 20, description: "20% Architect Partner Exclusive" },
  "FREESHIP": { type: "shipping", value: 0, description: "Complimentary Express Delivery" }
};
