/**
 * ============================================================================
 * ATELIER LUXE - DECOUPLED API SERVICE CLIENT (VANILLA JS)
 * ============================================================================
 * This service abstracts all network communication between the frontend
 * and the Express.js / SQLite3 backend.
 * 
 * In this Frontend Iteration Phase:
 * - Operates in Autonomous Decoupled Mode (persisting to LocalStorage / seed data).
 * - Implements the exact same request/response contracts as the upcoming Express REST API.
 * - Switching to the live Express server only requires flipping `USE_BACKEND_SERVER = true`.
 */

export const API_CONFIG = {
  USE_BACKEND_SERVER: true, // Live Decoupled Express.js & SQLite3 Backend Active
  BASE_URL: '/api/v1',
  LOCAL_UPLOADS_URL: '/uploads'
};

// Initial Seed Garment Database for Frontend Decoupled Mode
const INITIAL_GARMENTS = [
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
    description: "Engineered from high-density Japanese technical memory satin with a water-resistant finish. Features matte titanium double-ended zippers, insulating diamond-quilted cupro lining, and ergonomic sleeve articulation.",
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
    description: "Spun from 100% long-staple Normandy flax, washed with artisanal volcanic pumice for exceptional handfeel. Cut in an architectural relaxed drape suited for layered Mediterranean styling.",
    details: {
      material: "100% Normandy Certified Flax Linen (240 GSM)",
      fit: "Oversized utility silhouette with straight hem",
      origin: "Woven in Biella, Italy",
      care: "Machine wash cold on delicate cycle. Line dry in shade."
    }
  },
  {
    id: "cashmere-overcoat-camel",
    name: "Imperial Double-Breasted Cashmere Coat",
    subtitle: "Pure Mongolian double-faced cashmere with horn buttons",
    category: "outerwear",
    price: 590,
    originalPrice: 680,
    rating: 5.0,
    reviewCount: 29,
    badge: "EXCLUSIVE",
    inStock: true,
    stockRemaining: 2,
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Rich Camel", hex: "#c49a6c" },
      { name: "Obsidian", hex: "#111215" }
    ],
    image: "https://images.unsplash.com/photo-1539533018447-63fcce667883?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1539533018447-63fcce667883?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=900&auto=format&fit=crop"
    ],
    description: "The pinnacle of winter outerwear. Tailored from hand-combed Mongolian cashmere brushed to a ripple finish. Features unconstructed floating canvas chest piece for natural drape.",
    details: {
      material: "100% Grade-A Mongolian Cashmere (520 GSM)",
      fit: "Full-length tailored overcoat with high back vent",
      origin: "Tailored in Naples, Italy",
      care: "Specialist dry clean only. Steam gently."
    }
  },
  {
    id: "silk-slip-dress",
    name: "Mulberry Silk Bias-Cut Column Gown",
    subtitle: "Heavyweight 22-Momme silk charmeuse in deep emerald",
    category: "dresses",
    price: 320,
    originalPrice: 380,
    rating: 4.9,
    reviewCount: 47,
    badge: "POPULAR",
    inStock: true,
    stockRemaining: 6,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Deep Emerald", hex: "#0e3d2f" },
      { name: "Champagne Pearl", hex: "#e7dec9" },
      { name: "Midnight Black", hex: "#121214" }
    ],
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Cut entirely on the true 45-degree grain to gently skim body contours without clinging. Features delicate rolled baby-hems and adjustable gossamer silk rouleau straps.",
    details: {
      material: "100% Mulberry Silk Charmeuse (22 Momme)",
      fit: "Bias-cut fluid silhouette grazing ankle length",
      origin: "Atelier Silk Studio, Lyon, France",
      care: "Hand wash cold with PH-neutral silk detergent or dry clean."
    }
  },
  {
    id: "pleated-wool-trousers",
    name: "Sartorial Double-Pleated Wool Trousers",
    subtitle: "High-rise virgin wool gabardine with side adjusters",
    category: "bottoms",
    price: 240,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 31,
    badge: "CORE",
    inStock: true,
    stockRemaining: 9,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal Mélange", hex: "#32353d" },
      { name: "Espresso Brown", hex: "#2e211a" }
    ],
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Crafted from Italian virgin wool gabardine with natural crease recovery. Built with classic extended waistband, Hollywood waistband construction, and brass side adjusters eliminating belt loops.",
    details: {
      material: "100% Super 130s Italian Virgin Wool",
      fit: "High rise with wide relaxed leg tapering gently at hem",
      origin: "Biella Mills, Italy",
      care: "Dry clean only."
    }
  },
  {
    id: "cashmere-crewneck",
    name: "Seamless Featherlight Cashmere Knit",
    subtitle: "Ultra-fine gauge Scottish yarn with ribbed trims",
    category: "knitwear",
    price: 260,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 64,
    badge: "ESSENTIAL",
    inStock: true,
    stockRemaining: 15,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Raw Ecru", hex: "#f0ede6" },
      { name: "Slate Heather", hex: "#616875" },
      { name: "Black Sapphire", hex: "#151821" }
    ],
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Knit on Japanese whole-garment 3D knitting machines for a 100% seamless structure. Incredibly soft against bare skin, providing optimal thermal regulation from 5°C to 20°C.",
    details: {
      material: "100% Inner Mongolian 2-Ply Cashmere (14 Gauge)",
      fit: "Tailored regular fit with subtle stretch recovery",
      origin: "Hawick, Scotland",
      care: "Hand wash lukewarm with cashmere shampoo; dry flat."
    }
  },
  {
    id: "leather-chelsea-boot",
    name: "Goodyear-Welted Vitello Chelsea Boot",
    subtitle: "Full-grain calfskin leather with Dainite studded rubber sole",
    category: "footwear",
    price: 420,
    originalPrice: 480,
    rating: 4.8,
    reviewCount: 22,
    badge: "HANDCRAFTED",
    inStock: true,
    stockRemaining: 5,
    sizes: ["S", "M", "L", "XL"], // Equivalent to EU 40, 41, 42, 43
    colors: [
      { name: "Polished Noir", hex: "#0d0e11" },
      { name: "Antiqued Cognac", hex: "#5a341a" }
    ],
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Constructed with traditional Goodyear welted technique allowing repeated resoling over decades. Built on our bespoke almond-toe last with double-sided Italian elastic gores.",
    details: {
      material: "Full-grain French Box Calf Leather; British Dainite Sole",
      fit: "True to size standard D-width",
      origin: "Handcrafted in Northamptonshire, England",
      care: "Condition regularly with organic beeswax balm."
    }
  },
  {
    id: "silk-twill-scarf",
    name: "Architectural Geometry Silk Twill Scarf",
    subtitle: "Heavyweight 16-Momme silk with hand-rolled contrasting edges",
    category: "accessories",
    price: 140,
    originalPrice: null,
    rating: 5.0,
    reviewCount: 19,
    badge: "NEW",
    inStock: true,
    stockRemaining: 8,
    sizes: ["ONE SIZE"],
    colors: [
      { name: "Gold & Obsidian", hex: "#cfa645" },
      { name: "Monochrome Grid", hex: "#222329" }
    ],
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=900&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=900&auto=format&fit=crop"
    ],
    description: "Screen-printed by hand using 14 distinct archival screens onto pure silk twill. Generously sized at 90x90cm with hand-rolled French hems sewn by master artisans.",
    details: {
      material: "100% Pure Mulberry Silk Twill (90cm x 90cm)",
      fit: "Versatile square drape",
      origin: "Como, Italy",
      care: "Dry clean only."
    }
  }
];

class DecoupledApiService {
  constructor() {
    this._initLocalStorage();
  }

  _initLocalStorage() {
    if (!localStorage.getItem('atelier_products')) {
      localStorage.setItem('atelier_products', JSON.stringify(INITIAL_GARMENTS));
    }
    if (!localStorage.getItem('atelier_orders')) {
      localStorage.setItem('atelier_orders', JSON.stringify([]));
    }
  }

  _getStoredProducts() {
    try {
      return JSON.parse(localStorage.getItem('atelier_products')) || INITIAL_GARMENTS;
    } catch (e) {
      return INITIAL_GARMENTS;
    }
  }

  _saveStoredProducts(products) {
    localStorage.setItem('atelier_products', JSON.stringify(products));
  }

  _getStoredOrders() {
    try {
      return JSON.parse(localStorage.getItem('atelier_orders')) || [];
    } catch (e) {
      return [];
    }
  }

  _saveStoredOrders(orders) {
    localStorage.setItem('atelier_orders', JSON.stringify(orders));
  }

  /**
   * GET /api/v1/products
   */
  async getProducts(params = {}) {
    if (API_CONFIG.USE_BACKEND_SERVER) {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_CONFIG.BASE_URL}/products?${query}`);
      return await res.json();
    }

    // Decoupled Frontend Emulation
    let products = [...this._getStoredProducts()];

    if (params.category && params.category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
    }

    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.details.material.toLowerCase().includes(q)
      );
    }

    if (params.maxPrice) {
      products = products.filter(p => p.price <= Number(params.maxPrice));
    }

    if (params.size) {
      products = products.filter(p => p.sizes.includes(params.size));
    }

    if (params.inStockOnly) {
      products = products.filter(p => p.inStock && p.stockRemaining > 0);
    }

    if (params.sort) {
      switch (params.sort) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    return {
      success: true,
      count: products.length,
      data: products
    };
  }

  /**
   * GET /api/v1/products/:id
   */
  async getProductById(id) {
    if (API_CONFIG.USE_BACKEND_SERVER) {
      const res = await fetch(`${API_CONFIG.BASE_URL}/products/${id}`);
      return await res.json();
    }

    const products = this._getStoredProducts();
    const product = products.find(p => p.id === id);
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    return { success: true, data: product };
  }

  /**
   * POST /api/v1/cart/calculate
   */
  async calculateCart(cartItems, promoCode = '') {
    if (API_CONFIG.USE_BACKEND_SERVER) {
      const res = await fetch(`${API_CONFIG.BASE_URL}/cart/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, promoCode })
      });
      return await res.json();
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discount = 0;
    const cleanPromo = (promoCode || '').toUpperCase().trim();

    if (cleanPromo === 'LUXE10') {
      discount = subtotal * 0.10;
    } else if (cleanPromo === 'ATELIER20') {
      discount = subtotal * 0.20;
    }

    const freeShippingThreshold = 200;
    const shipping = (subtotal >= freeShippingThreshold || cleanPromo === 'FREESHIP') ? 0 : 25;
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = Math.round(taxableAmount * 0.08); // 8% luxury sales tax
    const total = Math.max(0, taxableAmount + shipping + tax);

    return {
      success: true,
      subtotal,
      discount,
      shipping,
      tax,
      total,
      freeShippingEligible: subtotal >= freeShippingThreshold,
      amountNeededForFreeShipping: Math.max(0, freeShippingThreshold - subtotal)
    };
  }

  /**
   * POST /api/v1/orders
   */
  async createOrder(orderPayload) {
    if (API_CONFIG.USE_BACKEND_SERVER) {
      const res = await fetch(`${API_CONFIG.BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      return await res.json();
    }

    // Emulate server order creation
    const orderNumber = `ATL-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
      estimatedDelivery: '3-5 Business Days (Express Courier)',
      trackingNumber: `EXP-US-${Math.floor(100000 + Math.random() * 900000)}`,
      ...orderPayload
    };

    const orders = this._getStoredOrders();
    orders.unshift(newOrder);
    this._saveStoredOrders(orders);

    // Optimistically deduct stock from local garments
    const products = this._getStoredProducts();
    orderPayload.items.forEach(orderItem => {
      const p = products.find(prod => prod.id === orderItem.id);
      if (p && p.stockRemaining) {
        p.stockRemaining = Math.max(0, p.stockRemaining - orderItem.quantity);
        if (p.stockRemaining === 0) p.inStock = false;
      }
    });
    this._saveStoredProducts(products);

    return {
      success: true,
      orderNumber: newOrder.orderNumber,
      trackingNumber: newOrder.trackingNumber,
      estimatedDelivery: newOrder.estimatedDelivery,
      data: newOrder
    };
  }

  /**
   * GET /api/v1/orders/:orderNumber
   */
  async getOrder(orderNumber) {
    if (API_CONFIG.USE_BACKEND_SERVER) {
      const res = await fetch(`${API_CONFIG.BASE_URL}/orders/${orderNumber}`);
      return await res.json();
    }

    const orders = this._getStoredOrders();
    const cleanNumber = (orderNumber || '').trim().toUpperCase();
    const order = orders.find(o => o.orderNumber.toUpperCase() === cleanNumber);

    if (!order) {
      return { success: false, error: 'Order not found. Please verify your order identifier.' };
    }
    return { success: true, data: order };
  }

  /**
   * POST /api/v1/upload (Garment Local Image Upload)
   */
  async uploadGarmentImage(file) {
    if (API_CONFIG.USE_BACKEND_SERVER) {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API_CONFIG.BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      return await res.json();
    }

    // Decoupled client simulation: convert to dataURL for instant local preview & persistence
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error('No file provided'));
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          success: true,
          filePath: e.target.result,
          fileName: file.name
        });
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * POST /api/v1/products (Admin Create Garment)
   */
  async createProduct(productData) {
    if (API_CONFIG.USE_BACKEND_SERVER) {
      const res = await fetch(`${API_CONFIG.BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      return await res.json();
    }

    const products = this._getStoredProducts();
    const newProduct = {
      id: `atelier-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      badge: 'NEW ARRIVAL',
      inStock: true,
      stockRemaining: Number(productData.stockRemaining) || 10,
      ...productData
    };

    products.unshift(newProduct);
    this._saveStoredProducts(products);

    return {
      success: true,
      data: newProduct
    };
  }

  /**
   * Helper to reset to initial seed data
   */
  resetToSeed() {
    localStorage.setItem('atelier_products', JSON.stringify(INITIAL_GARMENTS));
    return INITIAL_GARMENTS;
  }
}

export const api = new DecoupledApiService();
