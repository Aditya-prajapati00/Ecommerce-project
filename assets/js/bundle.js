/**
 * ============================================================================
 * ATELIER LUXE - STANDALONE UNIVERSAL BUNDLE (ZERO-DEPENDENCY & FILE:// COMPATIBLE)
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. CATALOG DATA & CONSTANTS
     -------------------------------------------------------------------------- */
  const PRODUCTS = [
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

  const CATEGORIES = [
    { id: "all", label: "All Works" },
    { id: "outerwear", label: "Outerwear" },
    { id: "tops", label: "Tops & Shirts" },
    { id: "knitwear", label: "Knitwear" },
    { id: "dresses", label: "Dresses" },
    { id: "bottoms", label: "Trousers" },
    { id: "footwear", label: "Footwear" },
    { id: "accessories", label: "Accessories" }
  ];

  const CURRENCIES = {
    USD: { symbol: "$", rate: 1.0, code: "USD" },
    EUR: { symbol: "€", rate: 0.92, code: "EUR" },
    GBP: { symbol: "£", rate: 0.79, code: "GBP" },
    JPY: { symbol: "¥", rate: 152.0, code: "JPY" }
  };

  const PROMO_CODES = {
    "LUXE10": { type: "percent", value: 10, description: "10% VIP Atelier Discount" },
    "ARCHITECT": { type: "percent", value: 20, description: "20% Architect Partner Exclusive" },
    "FREESHIP": { type: "shipping", value: 0, description: "Complimentary Express Delivery" }
  };

  /* --------------------------------------------------------------------------
     2. REACTIVE STATE STORE
     -------------------------------------------------------------------------- */
  class Store {
    constructor() {
      this.events = {};
      this.state = {
        products: this.loadStorage('atelier_products', PRODUCTS),
        cart: this.loadStorage('atelier_cart', []),
        wishlist: this.loadStorage('atelier_wishlist', []),
        currency: this.loadStorage('atelier_currency', 'USD'),
        promo: null,
        filters: { category: 'all', priceMax: 600, search: '', sortBy: 'featured' },
        ui: { isCartOpen: false, isProductModalOpen: false, activeProduct: null, isCheckoutOpen: false, checkoutStep: 1 }
      };
      this.fetchFromBackend();
    }

    async fetchFromBackend() {
      try {
        const res = await fetch('/api/v1/products');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            this.state.products = json.data;
            this.saveStorage('atelier_products', json.data);
            this.publish('filters:changed');
          }
        }
      } catch (e) {
        // Standalone/offline mode fallback active
      }
    }

    loadStorage(key, fallback) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        return fallback;
      }
    }

    saveStorage(key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (e) {}
    }

    subscribe(event, callback) {
      if (!this.events[event]) this.events[event] = [];
      this.events[event].push(callback);
      return () => {
        this.events[event] = this.events[event].filter(cb => cb !== callback);
      };
    }

    publish(event, data) {
      if (this.events[event]) {
        this.events[event].forEach(cb => cb(data, this.state));
      }
    }

    setCurrency(code) {
      if (CURRENCIES[code]) {
        this.state.currency = code;
        this.saveStorage('atelier_currency', code);
        this.publish('currency:changed', code);
      }
    }

    formatPrice(priceInUSD) {
      const cur = CURRENCIES[this.state.currency] || CURRENCIES.USD;
      const converted = priceInUSD * cur.rate;
      if (this.state.currency === 'JPY') {
        return `${cur.symbol}${Math.round(converted).toLocaleString()}`;
      }
      return `${cur.symbol}${converted.toFixed(0)}`;
    }

    addToCart(product, size = null, color = null, quantity = 1) {
      const selectedSize = size || product.sizes[0];
      const selectedColor = color ? color.name : (product.colors[0]?.name || 'Default');
      const compositeId = `${product.id}_${selectedSize}_${selectedColor}`;
      const existing = this.state.cart.find(item => item.id === compositeId);

      if (existing) {
        existing.quantity += quantity;
      } else {
        this.state.cart.push({
          id: compositeId,
          productId: product.id,
          name: product.name,
          price: product.price,
          size: selectedSize,
          color: selectedColor,
          quantity: quantity,
          image: product.image
        });
      }

      this.saveStorage('atelier_cart', this.state.cart);
      this.publish('cart:updated', this.state.cart);
      return true;
    }

    updateCartQuantity(compositeId, delta) {
      const item = this.state.cart.find(i => i.id === compositeId);
      if (!item) return;
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeFromCart(compositeId);
        return;
      }
      this.saveStorage('atelier_cart', this.state.cart);
      this.publish('cart:updated', this.state.cart);
    }

    removeFromCart(compositeId) {
      this.state.cart = this.state.cart.filter(item => item.id !== compositeId);
      this.saveStorage('atelier_cart', this.state.cart);
      this.publish('cart:updated', this.state.cart);
    }

    clearCart() {
      this.state.cart = [];
      this.state.promo = null;
      this.saveStorage('atelier_cart', this.state.cart);
      this.publish('cart:updated', this.state.cart);
    }

    getCartTotals() {
      const subtotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      let discount = 0;
      let shipping = subtotal > 200 || subtotal === 0 ? 0 : 25;

      if (this.state.promo) {
        if (this.state.promo.type === 'percent') {
          discount = (subtotal * this.state.promo.value) / 100;
        } else if (this.state.promo.type === 'shipping') {
          shipping = 0;
        }
      }

      const taxable = Math.max(0, subtotal - discount);
      const tax = taxable * 0.08;
      const total = taxable + shipping + tax;

      return {
        subtotal,
        discount,
        shipping,
        tax,
        total,
        freeShippingThreshold: 200,
        freeShippingRemaining: Math.max(0, 200 - subtotal)
      };
    }

    applyPromoCode(code) {
      const normalized = (code || '').trim().toUpperCase();
      if (PROMO_CODES[normalized]) {
        this.state.promo = { code: normalized, ...PROMO_CODES[normalized] };
        this.publish('promo:applied', this.state.promo);
        this.publish('cart:updated', this.state.cart);
        return { success: true, message: `Promo '${normalized}' applied!` };
      }
      return { success: false, message: 'Invalid or expired promotional code.' };
    }

    toggleWishlist(productId) {
      const idx = this.state.wishlist.indexOf(productId);
      let added = false;
      if (idx > -1) {
        this.state.wishlist.splice(idx, 1);
      } else {
        this.state.wishlist.push(productId);
        added = true;
      }
      this.saveStorage('atelier_wishlist', this.state.wishlist);
      this.publish('wishlist:updated', this.state.wishlist);
      return added;
    }

    isWishlisted(productId) {
      return this.state.wishlist.includes(productId);
    }

    setCategory(cat) {
      this.state.filters.category = cat;
      this.publish('filters:changed', this.state.filters);
    }

    setPriceMax(price) {
      this.state.filters.priceMax = Number(price);
      this.publish('filters:changed', this.state.filters);
    }

    setSearchQuery(q) {
      this.state.filters.search = q.toLowerCase().trim();
      this.publish('filters:changed', this.state.filters);
    }

    setSortBy(sort) {
      this.state.filters.sortBy = sort;
      this.publish('filters:changed', this.state.filters);
    }

    getFilteredProducts() {
      let list = [...this.state.products];
      const { category, priceMax, search, sortBy } = this.state.filters;

      if (category && category !== 'all') {
        list = list.filter(p => p.category === category);
      }
      if (priceMax) {
        list = list.filter(p => p.price <= priceMax);
      }
      if (search) {
        list = list.filter(p => 
          p.name.toLowerCase().includes(search) ||
          p.subtitle.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
        );
      }

      switch (sortBy) {
        case 'price-asc': list.sort((a, b) => a.price - b.price); break;
        case 'price-desc': list.sort((a, b) => b.price - a.price); break;
        case 'rating': list.sort((a, b) => b.rating - a.rating); break;
        default: break;
      }
      return list;
    }

    openCart() {
      this.state.ui.isCartOpen = true;
      this.publish('ui:cartOpen', true);
    }

    closeCart() {
      this.state.ui.isCartOpen = false;
      this.publish('ui:cartOpen', false);
    }

    openProductModal(productId) {
      const product = this.state.products.find(p => p.id === productId);
      if (product) {
        this.state.ui.activeProduct = product;
        this.state.ui.isProductModalOpen = true;
        this.publish('ui:productModal', { open: true, product });
      }
    }

    closeProductModal() {
      this.state.ui.isProductModalOpen = false;
      this.state.ui.activeProduct = null;
      this.publish('ui:productModal', { open: false, product: null });
    }

    openCheckout() {
      this.closeCart();
      this.state.ui.isCheckoutOpen = true;
      this.state.ui.checkoutStep = 1;
      this.publish('ui:checkout', { open: true, step: 1 });
    }

    closeCheckout() {
      this.state.ui.isCheckoutOpen = false;
      this.publish('ui:checkout', { open: false, step: 1 });
    }
  }

  const store = new Store();

  /* --------------------------------------------------------------------------
     3. TOAST NOTIFICATIONS
     -------------------------------------------------------------------------- */
  const toasts = {
    show(message, type = 'info', duration = 3000) {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast animate-fade-in-up';
      
      let icon = '✦';
      if (type === 'success') icon = '✓';
      if (type === 'heart') icon = '♥';
      if (type === 'warning') icon = '⚠';

      toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }
  };

  /* --------------------------------------------------------------------------
     4. COMPONENT INITIALIZERS
     -------------------------------------------------------------------------- */

  // Navbar
  function initNavbar() {
    const header = document.getElementById('site-header');
    const currencySelect = document.getElementById('currency-select');
    const searchInput = document.getElementById('global-search-input');
    const cartTrigger = document.getElementById('cart-drawer-trigger');
    const cartBadge = document.getElementById('cart-badge-count');
    const wishlistTrigger = document.getElementById('wishlist-trigger');
    const wishlistBadge = document.getElementById('wishlist-badge-count');

    window.addEventListener('scroll', () => {
      header?.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    if (currencySelect) {
      currencySelect.innerHTML = Object.keys(CURRENCIES).map(key => `
        <option value="${key}" ${store.state.currency === key ? 'selected' : ''}>
          ${key} (${CURRENCIES[key].symbol})
        </option>
      `).join('');

      currencySelect.addEventListener('change', (e) => {
        store.setCurrency(e.target.value);
      });
    }

    if (searchInput) {
      let debounce;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          store.setSearchQuery(e.target.value);
          const catSec = document.getElementById('collection');
          if (catSec && e.target.value.trim().length > 0) {
            catSec.scrollIntoView({ behavior: 'smooth' });
          }
        }, 200);
      });
    }

    cartTrigger?.addEventListener('click', () => store.openCart());
    wishlistTrigger?.addEventListener('click', () => {
      window.openWishlistDrawer?.();
    });

    document.getElementById('track-order-trigger')?.addEventListener('click', () => {
      window.openOrderTrackingModal?.();
    });

    document.getElementById('admin-studio-trigger')?.addEventListener('click', () => {
      window.openAdminStudioModal?.();
    });

    const updateBadges = () => {
      const cartCount = store.state.cart.reduce((s, i) => s + i.quantity, 0);
      if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
      }
      const wishCount = store.state.wishlist.length;
      if (wishBadge => wishBadge) {
        wishlistBadge.textContent = wishCount;
        wishlistBadge.style.display = wishCount > 0 ? 'flex' : 'none';
      }
    };

    store.subscribe('cart:updated', updateBadges);
    store.subscribe('wishlist:updated', updateBadges);
    updateBadges();
  }

  // Hero Lookbook
  function initHero() {
    document.getElementById('hero-shop-cta')?.addEventListener('click', () => {
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('hero-explore-cta')?.addEventListener('click', () => {
      store.openProductModal('atelier-bomber-jacket');
    });
    document.getElementById('hero-featured-card')?.addEventListener('click', () => {
      store.openProductModal('atelier-bomber-jacket');
    });
  }

  // Catalog & Filters
  function initCatalog() {
    const pillsContainer = document.getElementById('category-pills');
    const priceSlider = document.getElementById('price-slider');
    const priceSliderValue = document.getElementById('price-slider-value');
    const sortSelect = document.getElementById('catalog-sort-select');
    const grid = document.getElementById('product-grid');
    const resultCount = document.getElementById('result-count');

    if (pillsContainer) {
      pillsContainer.innerHTML = CATEGORIES.map(cat => `
        <button class="category-pill ${store.state.filters.category === cat.id ? 'active' : ''}" 
                data-category="${cat.id}">
          ${cat.label}
        </button>
      `).join('');

      pillsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-pill');
        if (btn) {
          pillsContainer.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          store.setCategory(btn.dataset.category);
        }
      });
    }

    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        if (priceSliderValue) priceSliderValue.textContent = store.formatPrice(e.target.value);
        store.setPriceMax(e.target.value);
      });
    }

    sortSelect?.addEventListener('change', (e) => {
      store.setSortBy(e.target.value);
    });

    function renderGrid() {
      if (!grid) return;
      const products = store.getFilteredProducts();

      if (resultCount) {
        resultCount.textContent = `${products.length} Piece${products.length === 1 ? '' : 's'}`;
      }

      if (products.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--accent-gold);">✧</div>
            <h3 style="font-family: var(--font-display); margin-bottom: 0.5rem;">No Pieces Found</h3>
            <p style="color: var(--text-secondary); max-width: 400px; margin: 0 auto 1.5rem;">
              No pieces match your active criteria. Try broadening your price ceiling or resetting categories.
            </p>
            <button id="reset-filters-btn" class="btn-secondary" style="font-size: var(--text-xs);">
              Reset All Filters
            </button>
          </div>
        `;
        document.getElementById('reset-filters-btn')?.addEventListener('click', () => {
          store.setCategory('all');
          store.setPriceMax(600);
          store.setSearchQuery('');
          if (priceSlider) priceSlider.value = 600;
          if (priceSliderValue) priceSliderValue.textContent = store.formatPrice(600);
          pillsContainer?.querySelectorAll('.category-pill').forEach(b => {
            b.classList.toggle('active', b.dataset.category === 'all');
          });
        });
        return;
      }

      grid.innerHTML = products.map(product => {
        const isFav = store.isWishlisted(product.id);
        const badgeHtml = product.badge ? `<span class="product-badge badge-${product.badge.toLowerCase()}">${product.badge}</span>` : '';
        const originalPriceHtml = product.originalPrice ? `<span class="product-price-original">${store.formatPrice(product.originalPrice)}</span>` : '';

        return `
          <article class="product-card" data-product-id="${product.id}">
            <div class="product-image-container">
              ${badgeHtml}
              <button class="wishlist-btn ${isFav ? 'active' : ''}" data-action="toggle-wishlist" title="Wishlist">
                ${isFav ? '♥' : '♡'}
              </button>
              <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" />
              <div class="product-card-overlay">
                <button class="overlay-btn-quickview" data-action="quickview">Quick View</button>
                <button class="overlay-btn-add" data-action="quickadd">+ Add to Bag</button>
              </div>
            </div>
            <div class="product-info">
              <span class="product-category-tag">${product.category}</span>
              <h3 class="product-name" data-action="open-detail">${product.name}</h3>
              <div class="product-rating">
                <span>★ ${product.rating.toFixed(1)}</span>
                <span class="product-rating-count">(${product.reviewCount})</span>
              </div>
              <div class="product-price-row">
                <span class="product-price-current">${store.formatPrice(product.price)}</span>
                ${originalPriceHtml}
              </div>
            </div>
          </article>
        `;
      }).join('');
    }

    grid?.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      const productId = card.dataset.productId;
      const product = store.state.products.find(p => p.id === productId);
      if (!product) return;

      if (e.target.closest('[data-action="toggle-wishlist"]')) {
        e.stopPropagation();
        const added = store.toggleWishlist(productId);
        const btn = card.querySelector('[data-action="toggle-wishlist"]');
        if (btn) {
          btn.classList.toggle('active', added);
          btn.innerHTML = added ? '♥' : '♡';
          btn.classList.add('animate-heart-pop');
          setTimeout(() => btn.classList.remove('animate-heart-pop'), 400);
        }
        toasts.show(added ? `Added "${product.name}" to Wishlist` : `Removed from Wishlist`, added ? 'heart' : 'info');
        return;
      }

      if (e.target.closest('[data-action="quickadd"]')) {
        e.stopPropagation();
        store.addToCart(product, product.sizes[0], product.colors[0], 1);
        toasts.show(`Added 1x ${product.name} to Bag`, 'success');
        store.openCart();
        return;
      }

      if (e.target.closest('[data-action="quickview"]') || e.target.closest('[data-action="open-detail"]') || e.target.closest('.product-image-container')) {
        store.openProductModal(productId);
      }
    });

    store.subscribe('filters:changed', renderGrid);
    store.subscribe('currency:changed', renderGrid);
    store.subscribe('wishlist:updated', renderGrid);
    renderGrid();
  }

  // Product Detail Modal
  function initProductModal() {
    const backdrop = document.getElementById('product-modal-backdrop');
    const container = document.getElementById('product-modal-container');
    let currentProduct = null;
    let selectedSize = null;
    let selectedColor = null;
    let selectedQty = 1;

    const closeModal = () => {
      backdrop?.classList.remove('active');
      store.closeProductModal();
    };

    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop?.classList.contains('active')) closeModal();
    });

    function renderModal(product) {
      if (!container || !product) return;
      currentProduct = product;
      selectedSize = product.sizes[0];
      selectedColor = product.colors[0];
      selectedQty = 1;

      const isFav = store.isWishlisted(product.id);
      const stockClass = product.stockRemaining && product.stockRemaining <= 4 ? 'stock-low' : 'stock-in';
      const stockText = product.stockRemaining && product.stockRemaining <= 4 
        ? `Only ${product.stockRemaining} pieces remaining in Atelier` 
        : `In Stock — Complimentary Dispatch`;

      container.innerHTML = `
        <div class="product-modal-dialog">
          <button id="modal-close-trigger" class="modal-close-btn" aria-label="Close dialog">×</button>
          
          <div class="modal-gallery-column">
            <img id="modal-active-img" class="modal-main-img" src="${product.image}" alt="${product.name}" />
            <div style="display: flex; gap: 0.5rem; overflow-x: auto;">
              ${product.gallery.map((imgSrc, idx) => `
                <img src="${imgSrc}" class="gallery-thumb" data-src="${imgSrc}"
                     style="width: 64px; height: 72px; object-fit: cover; border-radius: 4px; cursor: pointer; border: 2px solid ${idx === 0 ? 'var(--accent-gold)' : 'transparent'}; opacity: ${idx === 0 ? '1' : '0.7'};" 
                     alt="Angle ${idx + 1}" />
              `).join('')}
            </div>
          </div>

          <div class="modal-info-column">
            <div>
              <div class="modal-stock-indicator ${stockClass}">
                <span class="stock-dot"></span>
                <span>${stockText}</span>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <span class="product-category-tag">${product.category}</span>
                  <h2 class="modal-product-title">${product.name}</h2>
                </div>
                <button class="wishlist-btn ${isFav ? 'active' : ''}" id="modal-fav-btn" style="position: static; margin-top: 4px;" title="Wishlist">
                  ${isFav ? '♥' : '♡'}
                </button>
              </div>

              <div class="product-rating" style="margin-bottom: 0.75rem;">
                <span>★ ${product.rating.toFixed(1)}</span>
                <span class="product-rating-count">(${product.reviewCount} Verified Client Reviews)</span>
              </div>

              <div class="modal-product-price">${store.formatPrice(product.price)}</div>
              <p class="modal-product-desc">${product.description}</p>

              <div class="variant-group">
                <div class="variant-label-row">
                  <span>Select Size: <strong id="modal-size-display" style="color: var(--accent-gold);">${selectedSize}</strong></span>
                  <span class="size-guide-trigger" id="modal-size-guide-btn">Size Guide</span>
                </div>
                <div class="size-pill-group">
                  ${product.sizes.map(size => `
                    <button class="size-pill ${size === selectedSize ? 'selected' : ''}" data-size="${size}">${size}</button>
                  `).join('')}
                </div>
              </div>

              <div class="variant-group">
                <div class="variant-label-row">
                  <span>Colorway: <strong id="modal-color-display" style="color: var(--accent-gold);">${selectedColor.name}</strong></span>
                </div>
                <div class="color-swatch-group">
                  ${product.colors.map(c => `
                    <div class="color-swatch ${c.name === selectedColor.name ? 'selected' : ''}" 
                         data-color-name="${c.name}" data-color-hex="${c.hex}" 
                         style="background-color: ${c.hex};" title="${c.name}"></div>
                  `).join('')}
                </div>
              </div>

              <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.85rem 1rem; margin-top: 1rem; font-size: var(--text-xs); color: var(--text-secondary);">
                <div style="margin-bottom: 0.3rem;"><strong style="color: var(--text-primary);">Fabric:</strong> ${product.details.material}</div>
                <div style="margin-bottom: 0.3rem;"><strong style="color: var(--text-primary);">Silhouette:</strong> ${product.details.fit}</div>
                <div style="margin-bottom: 0.3rem;"><strong style="color: var(--text-primary);">Provenance:</strong> ${product.details.origin}</div>
                <div><strong style="color: var(--text-primary);">Care:</strong> ${product.details.care}</div>
              </div>
            </div>

            <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem;">
              <div class="cart-quantity-stepper" style="height: 48px;">
                <button class="stepper-btn" id="modal-qty-minus" style="width: 36px; height: 100%;">-</button>
                <span class="stepper-value" id="modal-qty-val" style="padding: 0 1rem; font-size: var(--text-sm);">1</span>
                <button class="stepper-btn" id="modal-qty-plus" style="width: 36px; height: 100%;">+</button>
              </div>
              <button class="btn-primary" id="modal-add-to-bag" style="flex-grow: 1; height: 48px;">
                + Add to Shopping Bag
              </button>
            </div>
          </div>
        </div>
      `;

      container.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
          const mainImg = container.querySelector('#modal-active-img');
          if (mainImg) mainImg.src = thumb.dataset.src;
          container.querySelectorAll('.gallery-thumb').forEach(t => {
            t.style.borderColor = 'transparent';
            t.style.opacity = '0.7';
          });
          thumb.style.borderColor = 'var(--accent-gold)';
          thumb.style.opacity = '1';
        });
      });

      container.querySelectorAll('.size-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          container.querySelectorAll('.size-pill').forEach(p => p.classList.remove('selected'));
          pill.classList.add('selected');
          selectedSize = pill.dataset.size;
          const display = container.querySelector('#modal-size-display');
          if (display) display.textContent = selectedSize;
        });
      });

      container.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
          container.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
          swatch.classList.add('selected');
          const colorName = swatch.dataset.colorName;
          selectedColor = product.colors.find(c => c.name === colorName) || { name: colorName };
          const display = container.querySelector('#modal-color-display');
          if (display) display.textContent = colorName;
        });
      });

      const qtyVal = container.querySelector('#modal-qty-val');
      container.querySelector('#modal-qty-minus')?.addEventListener('click', () => {
        if (selectedQty > 1) {
          selectedQty--;
          if (qtyVal) qtyVal.textContent = selectedQty;
        }
      });
      container.querySelector('#modal-qty-plus')?.addEventListener('click', () => {
        selectedQty++;
        if (qtyVal) qtyVal.textContent = selectedQty;
      });

      container.querySelector('#modal-fav-btn')?.addEventListener('click', (e) => {
        const added = store.toggleWishlist(product.id);
        e.target.classList.toggle('active', added);
        e.target.innerHTML = added ? '♥' : '♡';
        toasts.show(added ? `Added to Wishlist` : `Removed from Wishlist`, added ? 'heart' : 'info');
      });

      container.querySelector('#modal-size-guide-btn')?.addEventListener('click', () => {
        window.openSizeGuideModal?.();
      });

      container.querySelector('#modal-close-trigger')?.addEventListener('click', closeModal);

      container.querySelector('#modal-add-to-bag')?.addEventListener('click', () => {
        store.addToCart(currentProduct, selectedSize, selectedColor, selectedQty);
        toasts.show(`Added ${selectedQty}x ${currentProduct.name} to Bag`, 'success');
        closeModal();
        store.openCart();
      });
    }

    store.subscribe('ui:productModal', ({ open, product }) => {
      if (open && product) {
        renderModal(product);
        backdrop?.classList.add('active');
      } else {
        backdrop?.classList.remove('active');
      }
    });

    store.subscribe('currency:changed', () => {
      if (currentProduct && backdrop?.classList.contains('active')) {
        const pEl = container?.querySelector('.modal-product-price');
        if (pEl) pEl.textContent = store.formatPrice(currentProduct.price);
      }
    });
  }

  // Cart Drawer
  function initCartDrawer() {
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const drawer = document.getElementById('cart-drawer');
    const closeBtn = document.getElementById('cart-drawer-close');
    const itemsContainer = document.getElementById('cart-items-container');
    const drawerCount = document.getElementById('drawer-item-count');
    const progressText = document.getElementById('shipping-progress-text');
    const progressFill = document.getElementById('shipping-progress-fill');

    const subtotalEl = document.getElementById('cart-subtotal');
    const discountRow = document.getElementById('cart-discount-row');
    const discountEl = document.getElementById('cart-discount');
    const shippingEl = document.getElementById('cart-shipping');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');

    const promoInput = document.getElementById('cart-promo-input');
    const promoBtn = document.getElementById('cart-promo-btn');
    const checkoutBtn = document.getElementById('cart-checkout-trigger');

    const openDrawer = () => {
      backdrop?.classList.add('active');
      drawer?.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      backdrop?.classList.remove('active');
      drawer?.classList.remove('active');
      document.body.style.overflow = '';
      store.closeCart();
    };

    backdrop?.addEventListener('click', closeDrawer);
    closeBtn?.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer?.classList.contains('active')) closeDrawer();
    });

    function renderCart() {
      const cart = store.state.cart;
      const totals = store.getCartTotals();
      const totalCount = cart.reduce((s, i) => s + i.quantity, 0);

      if (drawerCount) drawerCount.textContent = `(${totalCount})`;

      if (progressText && progressFill) {
        if (totals.subtotal >= totals.freeShippingThreshold) {
          progressText.innerHTML = `✦ <strong style="color: var(--accent-emerald);">Complimentary Express Delivery Unlocked!</strong>`;
          progressFill.style.width = '100%';
          progressFill.style.background = 'var(--accent-emerald)';
        } else {
          const remaining = store.formatPrice(totals.freeShippingRemaining);
          const percent = Math.min(100, Math.round((totals.subtotal / totals.freeShippingThreshold) * 100));
          progressText.innerHTML = `Add <strong>${remaining}</strong> more for Complimentary Delivery`;
          progressFill.style.width = `${percent}%`;
          progressFill.style.background = 'linear-gradient(90deg, var(--accent-gold-dark), var(--accent-gold))';
        }
      }

      if (!itemsContainer) return;

      if (cart.length === 0) {
        itemsContainer.innerHTML = `
          <div style="text-align: center; margin: auto 0; padding: 2rem 0;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--accent-gold);">✧</div>
            <h4 style="font-family: var(--font-display); margin-bottom: 0.5rem;">Your Bag is Empty</h4>
            <p style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: 1.5rem;">
              Discover timeless tailoring and exceptional seasonal drops.
            </p>
            <button id="cart-explore-btn" class="btn-primary" style="font-size: var(--text-xs); padding: 0.6rem 1.25rem;">
              Explore Collection
            </button>
          </div>
        `;
        document.getElementById('cart-explore-btn')?.addEventListener('click', () => {
          closeDrawer();
          document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
        });
        if (checkoutBtn) checkoutBtn.disabled = true;
      } else {
        if (checkoutBtn) checkoutBtn.disabled = false;
        itemsContainer.innerHTML = cart.map(item => `
          <div class="cart-item-card" data-composite-id="${item.id}">
            <img class="cart-item-thumb" src="${item.image}" alt="${item.name}" />
            <div class="cart-item-details">
              <div>
                <h5 class="cart-item-title">${item.name}</h5>
                <div class="cart-item-meta">Size: ${item.size} | Color: ${item.color}</div>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.5rem;">
                <div class="cart-quantity-stepper">
                  <button class="stepper-btn" data-action="decrement">-</button>
                  <span class="stepper-value">${item.quantity}</span>
                  <button class="stepper-btn" data-action="increment">+</button>
                </div>
                <span class="cart-item-price">${store.formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
            <button class="cart-item-remove-btn" data-action="remove" title="Remove piece">✕</button>
          </div>
        `).join('');
      }

      if (subtotalEl) subtotalEl.textContent = store.formatPrice(totals.subtotal);
      if (discountRow && discountEl) {
        if (totals.discount > 0) {
          discountRow.style.display = 'flex';
          discountEl.textContent = `-${store.formatPrice(totals.discount)}`;
        } else {
          discountRow.style.display = 'none';
        }
      }
      if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? 'FREE' : store.formatPrice(totals.shipping);
      if (taxEl) taxEl.textContent = store.formatPrice(totals.tax);
      if (totalEl) totalEl.textContent = store.formatPrice(totals.total);
    }

    itemsContainer?.addEventListener('click', (e) => {
      const card = e.target.closest('.cart-item-card');
      if (!card) return;
      const compositeId = card.dataset.compositeId;

      if (e.target.closest('[data-action="increment"]')) {
        store.updateCartQuantity(compositeId, 1);
      } else if (e.target.closest('[data-action="decrement"]')) {
        store.updateCartQuantity(compositeId, -1);
      } else if (e.target.closest('[data-action="remove"]')) {
        store.removeFromCart(compositeId);
        toasts.show('Piece removed from bag', 'info');
      }
    });

    promoBtn?.addEventListener('click', () => {
      const code = promoInput?.value;
      if (!code) return;
      const res = store.applyPromoCode(code);
      if (res.success) {
        toasts.show(res.message, 'success');
        if (promoInput) promoInput.value = '';
      } else {
        toasts.show(res.message, 'warning');
      }
    });

    promoInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') promoBtn?.click();
    });

    checkoutBtn?.addEventListener('click', () => {
      if (store.state.cart.length === 0) return;
      store.openCheckout();
    });

    store.subscribe('ui:cartOpen', (isOpen) => {
      if (isOpen) {
        renderCart();
        openDrawer();
      } else {
        closeDrawer();
      }
    });

    store.subscribe('cart:updated', renderCart);
    store.subscribe('currency:changed', renderCart);
  }

  // Multi-Step Checkout Modal
  function initCheckoutModal() {
    const backdrop = document.getElementById('checkout-modal-backdrop');
    const container = document.getElementById('checkout-modal-container');

    let currentStep = 1;
    let customerInfo = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'United States'
    };
    let shippingTier = { name: 'Complimentary Atelier Standard', price: 0, days: '3-5 Days' };
    let completedOrder = null;

    const closeCheckout = () => {
      backdrop?.classList.remove('active');
      store.closeCheckout();
      currentStep = 1;
      document.body.style.overflow = '';
    };

    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) closeCheckout();
    });

    function renderStep() {
      if (!container) return;
      const totals = store.getCartTotals();

      if (currentStep === 1) {
        container.innerHTML = `
          <div class="checkout-modal-dialog animate-scale-up">
            <button id="checkout-close-btn" class="modal-close-btn">×</button>
            
            <div class="checkout-steps-tracker">
              <div class="step-node active"><span class="step-circle">1</span><span>Destination</span></div>
              <div style="flex-grow: 1; height: 1px; background: var(--border-subtle); margin: 0 0.5rem;"></div>
              <div class="step-node"><span class="step-circle">2</span><span>Shipping</span></div>
              <div style="flex-grow: 1; height: 1px; background: var(--border-subtle); margin: 0 0.5rem;"></div>
              <div class="step-node"><span class="step-circle">3</span><span>Payment</span></div>
            </div>

            <h3 style="margin-bottom: 0.5rem;">Shipping Destination</h3>
            <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: 1.5rem;">
              Please provide your delivery address for secure courier transport.
            </p>

            <form id="step1-form">
              <div class="form-grid-2">
                <div class="form-group">
                  <label>First Name</label>
                  <input type="text" id="cust-first" required placeholder="Elena" value="${customerInfo.firstName}" />
                </div>
                <div class="form-group">
                  <label>Last Name</label>
                  <input type="text" id="cust-last" required placeholder="Vance" value="${customerInfo.lastName}" />
                </div>
              </div>

              <div class="form-group">
                <label>Email for Order Tracking</label>
                <input type="email" id="cust-email" required placeholder="elena.vance@example.com" value="${customerInfo.email}" />
              </div>

              <div class="form-group">
                <label>Street Address</label>
                <input type="text" id="cust-address" required placeholder="742 Evergreen Terrace, Suite 4B" value="${customerInfo.address}" />
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label>City</label>
                  <input type="text" id="cust-city" required placeholder="New York" value="${customerInfo.city}" />
                </div>
                <div class="form-group">
                  <label>Postal / ZIP Code</label>
                  <input type="text" id="cust-zip" required placeholder="10001" value="${customerInfo.postalCode}" />
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                <span style="font-size: var(--text-sm); font-weight: 600;">Subtotal: <strong style="color: var(--accent-gold);">${store.formatPrice(totals.total)}</strong></span>
                <button type="submit" class="btn-primary" style="font-size: var(--text-xs); padding: 0.75rem 1.75rem;">
                  Continue to Shipping Tier →
                </button>
              </div>
            </form>
          </div>
        `;

        container.querySelector('#checkout-close-btn')?.addEventListener('click', closeCheckout);
        container.querySelector('#step1-form')?.addEventListener('submit', (e) => {
          e.preventDefault();
          customerInfo.firstName = container.querySelector('#cust-first').value;
          customerInfo.lastName = container.querySelector('#cust-last').value;
          customerInfo.email = container.querySelector('#cust-email').value;
          customerInfo.address = container.querySelector('#cust-address').value;
          customerInfo.city = container.querySelector('#cust-city').value;
          customerInfo.postalCode = container.querySelector('#cust-zip').value;
          currentStep = 2;
          renderStep();
        });

      } else if (currentStep === 2) {
        container.innerHTML = `
          <div class="checkout-modal-dialog animate-scale-up">
            <button id="checkout-close-btn" class="modal-close-btn">×</button>
            
            <div class="checkout-steps-tracker">
              <div class="step-node active"><span class="step-circle">✓</span><span>Destination</span></div>
              <div style="flex-grow: 1; height: 1px; background: var(--accent-gold); margin: 0 0.5rem;"></div>
              <div class="step-node active"><span class="step-circle">2</span><span>Shipping</span></div>
              <div style="flex-grow: 1; height: 1px; background: var(--border-subtle); margin: 0 0.5rem;"></div>
              <div class="step-node"><span class="step-circle">3</span><span>Payment</span></div>
            </div>

            <h3 style="margin-bottom: 0.5rem;">Courier Dispatch Tier</h3>
            <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: 1.5rem;">
              Select your preferred method of insured delivery to ${customerInfo.city || 'your address'}.
            </p>

            <div class="shipping-tier-card ${shippingTier.price === 0 ? 'selected' : ''}" data-tier="standard" data-price="0">
              <div>
                <div style="font-size: var(--text-sm); font-weight: 600; color: var(--text-primary);">Atelier Standard Delivery</div>
                <div style="font-size: var(--text-xs); color: var(--text-muted);">Carbon-neutral ground transit (3-5 Business Days)</div>
              </div>
              <span style="font-size: var(--text-sm); font-weight: 700; color: var(--accent-emerald);">FREE</span>
            </div>

            <div class="shipping-tier-card ${shippingTier.price === 15 ? 'selected' : ''}" data-tier="express" data-price="15">
              <div>
                <div style="font-size: var(--text-sm); font-weight: 600; color: var(--text-primary);">White Glove Air Express</div>
                <div style="font-size: var(--text-xs); color: var(--text-muted);">Signature tracked delivery in bespoke garment bags (1-2 Days)</div>
              </div>
              <span style="font-size: var(--text-sm); font-weight: 700; color: var(--accent-gold);">${store.formatPrice(15)}</span>
            </div>

            <div class="shipping-tier-card ${shippingTier.price === 35 ? 'selected' : ''}" data-tier="overnight" data-price="35">
              <div>
                <div style="font-size: var(--text-sm); font-weight: 600; color: var(--text-primary);">VIP Priority Overnight</div>
                <div style="font-size: var(--text-xs); color: var(--text-muted);">Guaranteed morning delivery with dedicated courier service</div>
              </div>
              <span style="font-size: var(--text-sm); font-weight: 700; color: var(--accent-gold);">${store.formatPrice(35)}</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem;">
              <button id="step2-back-btn" class="btn-secondary" style="font-size: var(--text-xs);">
                ← Back to Details
              </button>
              <button id="step2-next-btn" class="btn-primary" style="font-size: var(--text-xs); padding: 0.75rem 1.75rem;">
                Proceed to Payment →
              </button>
            </div>
          </div>
        `;

        container.querySelector('#checkout-close-btn')?.addEventListener('click', closeCheckout);
        container.querySelector('#step2-back-btn')?.addEventListener('click', () => {
          currentStep = 1;
          renderStep();
        });

        container.querySelectorAll('.shipping-tier-card').forEach(card => {
          card.addEventListener('click', () => {
            container.querySelectorAll('.shipping-tier-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            const tier = card.dataset.tier;
            if (tier === 'standard') {
              shippingTier = { name: 'Atelier Standard Delivery', price: 0, days: '3-5 Days' };
            } else if (tier === 'express') {
              shippingTier = { name: 'White Glove Air Express', price: 15, days: '1-2 Days' };
            } else {
              shippingTier = { name: 'VIP Priority Overnight', price: 35, days: 'Next Day Morning' };
            }
          });
        });

        container.querySelector('#step2-next-btn')?.addEventListener('click', () => {
          currentStep = 3;
          renderStep();
        });

      } else if (currentStep === 3) {
        const finalTotal = totals.total + shippingTier.price;

        container.innerHTML = `
          <div class="checkout-modal-dialog animate-scale-up">
            <button id="checkout-close-btn" class="modal-close-btn">×</button>
            
            <div class="checkout-steps-tracker">
              <div class="step-node active"><span class="step-circle">✓</span><span>Destination</span></div>
              <div style="flex-grow: 1; height: 1px; background: var(--accent-gold); margin: 0 0.5rem;"></div>
              <div class="step-node active"><span class="step-circle">✓</span><span>Shipping</span></div>
              <div style="flex-grow: 1; height: 1px; background: var(--accent-gold); margin: 0 0.5rem;"></div>
              <div class="step-node active"><span class="step-circle">3</span><span>Payment</span></div>
            </div>

            <h3 style="margin-bottom: 0.5rem;">Payment Authorization</h3>
            <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: 1.5rem;">
              Encrypted with 256-bit SSL transaction security.
            </p>

            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem; font-size: var(--text-xs);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                <span>Deliver To:</span>
                <strong style="color: var(--text-primary);">${customerInfo.firstName} ${customerInfo.lastName}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                <span>Dispatch Method:</span>
                <span>${shippingTier.name} (${shippingTier.price === 0 ? 'FREE' : store.formatPrice(shippingTier.price)})</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--accent-gold); border-top: 1px solid var(--border-subtle); padding-top: 0.5rem; margin-top: 0.5rem;">
                <span>Total Chargeable:</span>
                <span style="font-size: var(--text-base);">${store.formatPrice(finalTotal)}</span>
              </div>
            </div>

            <form id="step3-form">
              <div class="form-group">
                <label>Cardholder Name</label>
                <input type="text" id="card-name" required value="${customerInfo.firstName} ${customerInfo.lastName}" />
              </div>

              <div class="form-group">
                <label>Card Number</label>
                <input type="text" id="card-num" required maxlength="19" placeholder="4242 •••• •••• 4242" value="4242 •••• •••• 4242" />
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label>Expiration</label>
                  <input type="text" id="card-exp" required maxlength="5" placeholder="12/28" value="12/28" />
                </div>
                <div class="form-group">
                  <label>Security Code (CVV)</label>
                  <input type="password" id="card-cvv" required maxlength="4" placeholder="888" value="888" />
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                <button type="button" id="step3-back-btn" class="btn-secondary" style="font-size: var(--text-xs);">
                  ← Back
                </button>
                <button type="submit" class="btn-primary animate-pulse-gold" style="font-size: var(--text-xs); padding: 0.75rem 2rem;">
                  Authorize ${store.formatPrice(finalTotal)} & Complete Order
                </button>
              </div>
            </form>
          </div>
        `;

        container.querySelector('#checkout-close-btn')?.addEventListener('click', closeCheckout);
        container.querySelector('#step3-back-btn')?.addEventListener('click', () => {
          currentStep = 2;
          renderStep();
        });

        container.querySelector('#step3-form')?.addEventListener('submit', (e) => {
          e.preventDefault();
          const orderId = `ATL-${Math.floor(100000 + Math.random() * 900000)}`;
          const trackingNum = `TRK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

          completedOrder = {
            orderId,
            trackingNum,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            customer: { ...customerInfo },
            shippingTier: { ...shippingTier },
            items: [...store.state.cart],
            totals: {
              ...totals,
              shipping: shippingTier.price,
              total: finalTotal
            }
          };

          store.clearCart();
          toasts.show(`Order ${orderId} confirmed!`, 'success', 5000);
          currentStep = 4;
          renderStep();
        });

      } else if (currentStep === 4) {
        container.innerHTML = `
          <div class="checkout-modal-dialog animate-scale-up" style="max-width: 640px;">
            <button id="checkout-close-btn" class="modal-close-btn">×</button>

            <div class="receipt-container">
              <div class="receipt-crest">✓</div>
              <h2 style="font-family: var(--font-display); margin-bottom: 0.25rem;">Order Confirmed</h2>
              <p style="font-size: var(--text-xs); color: var(--accent-gold); letter-spacing: 0.1em; text-transform: uppercase;">
                Thank you for shopping with Atelier Luxe
              </p>
              <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-top: 0.5rem;">
                A formal receipt and dispatch dispatch has been transmitted to <strong>${completedOrder.customer.email}</strong>.
              </p>

              <div class="receipt-card">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 0.75rem; font-size: var(--text-xs);">
                  <div>
                    <span style="color: var(--text-muted);">Order Reference:</span>
                    <strong style="color: var(--accent-gold); display: block; font-size: var(--text-sm);">${completedOrder.orderId}</strong>
                  </div>
                  <div style="text-align: right;">
                    <span style="color: var(--text-muted);">Tracking Number:</span>
                    <strong style="color: var(--text-primary); display: block; font-family: var(--font-mono);">${completedOrder.trackingNum}</strong>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
                  ${completedOrder.items.map(item => `
                    <div style="display: flex; justify-content: space-between; font-size: var(--text-xs);">
                      <span>${item.quantity}x ${item.name} (${item.size} / ${item.color})</span>
                      <strong style="color: var(--text-primary);">${store.formatPrice(item.price * item.quantity)}</strong>
                    </div>
                  `).join('')}
                </div>

                <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem; font-size: var(--text-xs);">
                  <div style="display: flex; justify-content: space-between; color: var(--text-secondary); margin-bottom: 0.25rem;">
                    <span>Subtotal</span>
                    <span>${store.formatPrice(completedOrder.totals.subtotal)}</span>
                  </div>
                  ${completedOrder.totals.discount > 0 ? `
                    <div style="display: flex; justify-content: space-between; color: var(--accent-emerald); margin-bottom: 0.25rem;">
                      <span>Promotional Discount</span>
                      <span>-${store.formatPrice(completedOrder.totals.discount)}</span>
                    </div>
                  ` : ''}
                  <div style="display: flex; justify-content: space-between; color: var(--text-secondary); margin-bottom: 0.25rem;">
                    <span>Shipping (${completedOrder.shippingTier.name})</span>
                    <span>${completedOrder.totals.shipping === 0 ? 'FREE' : store.formatPrice(completedOrder.totals.shipping)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; color: var(--text-secondary); margin-bottom: 0.25rem;">
                    <span>Luxury Tax (8%)</span>
                    <span>${store.formatPrice(completedOrder.totals.tax)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: var(--text-base); font-weight: 700; color: var(--accent-gold); border-top: 1px solid var(--border-subtle); padding-top: 0.5rem; margin-top: 0.5rem;">
                    <span>Paid Total</span>
                    <span>${store.formatPrice(completedOrder.totals.total)}</span>
                  </div>
                </div>

                <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px dashed var(--border-subtle); font-size: 11px; color: var(--text-muted);">
                  Destination: ${completedOrder.customer.address}, ${completedOrder.customer.city} ${completedOrder.customer.postalCode}
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; justify-content: center;">
                <button id="print-invoice-btn" class="btn-secondary" style="font-size: var(--text-xs);">
                  ⎙ Print Tax Invoice
                </button>
                <button id="receipt-done-btn" class="btn-primary" style="font-size: var(--text-xs);">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        `;

        container.querySelector('#checkout-close-btn')?.addEventListener('click', closeCheckout);
        container.querySelector('#receipt-done-btn')?.addEventListener('click', closeCheckout);
        container.querySelector('#print-invoice-btn')?.addEventListener('click', () => window.print());
      }
    }

    store.subscribe('ui:checkout', ({ open, step }) => {
      if (open) {
        currentStep = step || 1;
        renderStep();
        backdrop?.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        backdrop?.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 7. Wishlist Offcanvas Drawer
  function initWishlistDrawer() {
    const backdrop = document.getElementById('wishlist-drawer-backdrop');
    const drawer = document.getElementById('wishlist-drawer');
    const closeBtn = document.getElementById('wishlist-drawer-close');
    const container = document.getElementById('wishlist-items-container');
    const countEl = document.getElementById('wishlist-drawer-count');

    function openWishlist() {
      renderWishlist();
      backdrop?.classList.add('active');
      drawer?.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeWishlist() {
      backdrop?.classList.remove('active');
      drawer?.classList.remove('open');
      document.body.style.overflow = '';
    }

    function renderWishlist() {
      if (!container) return;
      const wishIds = store.state.wishlist;
      const products = store.state.products.filter(p => wishIds.includes(p.id));
      if (countEl) countEl.textContent = `(${products.length})`;

      if (products.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
            <div style="font-size: 2.5rem; color: var(--accent-gold); margin-bottom: 1rem;">♡</div>
            <h4 style="font-family: var(--font-display); color: var(--text-primary); margin-bottom: 0.5rem;">Your Wishlist is Empty</h4>
            <p style="font-size: var(--text-xs); line-height: 1.6; margin-bottom: 1.5rem;">
              Save your cherished silhouettes by clicking the heart on any piece in our collection.
            </p>
            <button class="btn-primary" id="wishlist-browse-btn" style="font-size: var(--text-xs); padding: 0.6rem 1.4rem;">
              Explore Collection
            </button>
          </div>
        `;
        container.querySelector('#wishlist-browse-btn')?.addEventListener('click', () => {
          closeWishlist();
          document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
        });
        return;
      }

      container.innerHTML = products.map(product => `
        <div class="wishlist-card" data-product-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" />
          <div class="wishlist-info">
            <h4 class="wishlist-title">${product.name}</h4>
            <div class="wishlist-price">${store.formatPrice(product.price)}</div>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
              <button class="btn-gold" data-action="wishlist-move" style="font-size: 11px; padding: 4px 12px;">
                Move to Bag
              </button>
              <button class="btn-secondary" data-action="wishlist-remove" style="font-size: 11px; padding: 4px 8px; border: none; background: transparent; color: var(--text-muted);">
                ✕
              </button>
            </div>
          </div>
        </div>
      `).join('');

      container.querySelectorAll('[data-action="wishlist-move"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const card = e.target.closest('.wishlist-card');
          const p = products.find(prod => prod.id === card.dataset.productId);
          if (p) {
            store.addToCart(p, p.sizes[0], p.colors[0], 1);
            store.toggleWishlist(p.id);
            toasts.show(`Moved "${p.name}" to Bag`, 'success');
            renderWishlist();
            closeWishlist();
            store.openCart();
          }
        });
      });

      container.querySelectorAll('[data-action="wishlist-remove"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const card = e.target.closest('.wishlist-card');
          const p = products.find(prod => prod.id === card.dataset.productId);
          if (p) {
            store.toggleWishlist(p.id);
            toasts.show(`Removed from Wishlist`, 'info');
            renderWishlist();
          }
        });
      });
    }

    closeBtn?.addEventListener('click', closeWishlist);
    backdrop?.addEventListener('click', closeWishlist);
    window.openWishlistDrawer = openWishlist;
  }

  // 8. Size & Fit Guide Modal
  function initSizeGuideModal() {
    const backdrop = document.getElementById('size-guide-modal-backdrop');
    const container = document.getElementById('size-guide-modal-container');
    let unit = 'in';

    const SIZE_DATA = {
      in: [
        { size: 'XS', chest: '34 - 36', waist: '28 - 30', hips: '35 - 37', sleeve: '32.5', length: '39' },
        { size: 'S',  chest: '36 - 38', waist: '30 - 32', hips: '37 - 39', sleeve: '33.5', length: '40' },
        { size: 'M',  chest: '38 - 40', waist: '32 - 34', hips: '39 - 41', sleeve: '34.5', length: '41' },
        { size: 'L',  chest: '41 - 43', waist: '34 - 36', hips: '42 - 44', sleeve: '35.5', length: '42' },
        { size: 'XL', chest: '44 - 46', waist: '37 - 39', hips: '45 - 47', sleeve: '36.5', length: '43' },
        { size: 'XXL',chest: '47 - 49', waist: '40 - 42', hips: '48 - 50', sleeve: '37.0', length: '44' }
      ],
      cm: [
        { size: 'XS', chest: '86 - 91',  waist: '71 - 76',  hips: '89 - 94',  sleeve: '82', length: '99' },
        { size: 'S',  chest: '91 - 96',  waist: '76 - 81',  hips: '94 - 99',  sleeve: '85', length: '101' },
        { size: 'M',  chest: '96 - 102', waist: '81 - 86',  hips: '99 - 104', sleeve: '88', length: '104' },
        { size: 'L',  chest: '104 - 109',waist: '86 - 91',  hips: '106 - 112',sleeve: '90', length: '106' },
        { size: 'XL', chest: '112 - 117',waist: '94 - 99',  hips: '114 - 119',sleeve: '93', length: '109' },
        { size: 'XXL',chest: '119 - 124',waist: '101 - 107',hips: '122 - 127',sleeve: '94', length: '111' }
      ]
    };

    function renderGuide() {
      if (!container) return;
      const rows = SIZE_DATA[unit];

      container.innerHTML = `
        <div class="size-guide-dialog">
          <button id="size-guide-close" class="modal-close-btn" aria-label="Close size guide">×</button>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span style="font-size: 11px; text-transform: uppercase; color: var(--accent-gold); letter-spacing: 0.1em; font-weight: 700;">Atelier Matrix</span>
              <h3 style="font-family: var(--font-display); margin: 0; font-size: 1.5rem;">Garment Size & Fit Specifications</h3>
            </div>
            
            <div class="size-unit-toggle">
              <button class="size-unit-btn ${unit === 'in' ? 'active' : ''}" data-unit="in">Inches</button>
              <button class="size-unit-btn ${unit === 'cm' ? 'active' : ''}" data-unit="cm">Centimeters</button>
            </div>
          </div>

          <div style="overflow-x: auto;">
            <table class="size-matrix-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest (${unit})</th>
                  <th>Waist (${unit})</th>
                  <th>Hips (${unit})</th>
                  <th>Sleeve (${unit})</th>
                  <th>Length (${unit})</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map(r => `
                  <tr>
                    <td><strong style="color: var(--accent-gold);">${r.size}</strong></td>
                    <td>${r.chest}</td>
                    <td>${r.waist}</td>
                    <td>${r.hips}</td>
                    <td>${r.sleeve}</td>
                    <td>${r.length}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div style="margin-top: 1.5rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md); font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.6;">
            <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">Tailoring & Fit Advisory:</div>
            • <strong>True to Sartorial Scale:</strong> All outerwear and shirts follow relaxed architectural drape. If between sizes, choose your normal size for layered drape or one size down for a slender silhouette.<br />
            • <strong>Model Reference:</strong> Model in editorial lookbook is 6'1" (185cm) with a 38" chest, wearing size M.<br />
            • <strong>Complimentary Exchange:</strong> Every order includes prepaid worldwide courier return slips for effortless size exchanges within 30 days.
          </div>
        </div>
      `;

      container.querySelector('#size-guide-close')?.addEventListener('click', closeGuide);
      container.querySelectorAll('.size-unit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          unit = e.target.dataset.unit;
          renderGuide();
        });
      });
    }

    function openGuide() {
      renderGuide();
      backdrop?.classList.add('active');
    }

    function closeGuide() {
      backdrop?.classList.remove('active');
    }

    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) closeGuide();
    });

    window.openSizeGuideModal = openGuide;
  }

  // 9. Order Tracking Timeline Modal
  function initOrderTrackingModal() {
    const backdrop = document.getElementById('order-track-modal-backdrop');
    const container = document.getElementById('order-track-modal-container');

    function renderModal(searchOrderNumber = '') {
      if (!container) return;
      const recentOrders = JSON.parse(localStorage.getItem('atelier_orders') || '[]');
      const defaultId = searchOrderNumber || (recentOrders.length > 0 ? recentOrders[0].orderNumber : 'ATL-2026-88421');

      let foundOrder = recentOrders.find(o => o.orderNumber.toUpperCase() === defaultId.toUpperCase());
      if (!foundOrder && defaultId === 'ATL-2026-88421') {
        foundOrder = {
          orderNumber: 'ATL-2026-88421',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          customer: { name: 'Sophia Vance', city: 'Milan', address: 'Via Montenapoleone 14' },
          shippingTier: { name: 'Complimentary Insured Courier', eta: 'Tomorrow by 5:00 PM' },
          items: [
            { name: 'Obsidian Tech MA-1 Bomber', size: 'M', color: 'Midnight Obsidian', quantity: 1, price: 380, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=900&auto=format&fit=crop' }
          ],
          totals: { total: 380 }
        };
      }

      container.innerHTML = `
        <div class="order-track-dialog">
          <button id="track-modal-close" class="modal-close-btn" aria-label="Close tracking">×</button>
          
          <span style="font-size: 11px; text-transform: uppercase; color: var(--accent-gold); letter-spacing: 0.1em; font-weight: 700;">Global Logistics Concierge</span>
          <h3 style="font-family: var(--font-display); margin: 0 0 1rem; font-size: 1.5rem;">Track Your Consignment</h3>

          <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
            <input type="text" id="track-input-id" value="${defaultId}" 
                   placeholder="Enter Order ID (e.g. ATL-2026-XXXXX)" 
                   style="flex-grow: 1; font-family: var(--font-mono); font-size: var(--text-sm);" />
            <button class="btn-gold" id="track-search-btn" style="padding: 0 1.2rem; font-size: var(--text-xs);">
              Track
            </button>
          </div>

          ${foundOrder ? `
            <div style="background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <div>
                  <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Consignment ID</div>
                  <div style="font-family: var(--font-mono); color: var(--accent-gold); font-weight: 700;">${foundOrder.orderNumber}</div>
                </div>
                <span class="badge-gold">IN TRANSIT</span>
              </div>
              <div style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.5;">
                Carrier: <strong>DHL Express Priority Air</strong> (Tracking: <code>EXP-US-891230</code>)<br />
                Destination: ${foundOrder.customer?.address || 'Worldwide Client'}, ${foundOrder.customer?.city || ''}<br />
                ETA: <strong style="color: var(--accent-emerald);">${foundOrder.shippingTier?.eta || 'Within 48 Hours'}</strong>
              </div>
            </div>

            <!-- Visual 4-Step Stepper -->
            <div class="order-timeline">
              <div class="timeline-step completed">
                <div class="timeline-dot">✓</div>
                <div class="timeline-info">
                  <div class="timeline-title">Order Confirmed & Payment Verified</div>
                  <div class="timeline-time">${new Date(foundOrder.createdAt).toLocaleDateString()} • Authorized via 256-Bit SSL</div>
                </div>
              </div>

              <div class="timeline-step completed">
                <div class="timeline-dot">✓</div>
                <div class="timeline-info">
                  <div class="timeline-title">Atelier Inspection & Bespoke Packaging</div>
                  <div class="timeline-time">Hand-inspected in Milan Studio with certification seal</div>
                </div>
              </div>

              <div class="timeline-step active">
                <div class="timeline-dot">✦</div>
                <div class="timeline-info">
                  <div class="timeline-title" style="color: var(--accent-gold);">Customs Cleared & Dispatched</div>
                  <div class="timeline-time">En route via insured international courier flight</div>
                </div>
              </div>

              <div class="timeline-step">
                <div class="timeline-dot">○</div>
                <div class="timeline-info">
                  <div class="timeline-title" style="color: var(--text-muted);">White-Glove Doorstep Delivery</div>
                  <div class="timeline-time">Recipient signature required upon handover</div>
                </div>
              </div>
            </div>

            <!-- Ordered Pieces -->
            <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
              <span style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Items in Parcel (${foundOrder.items.length})</span>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
                ${foundOrder.items.map(item => `
                  <div style="display: flex; gap: 0.75rem; align-items: center; background: var(--bg-card); padding: 0.5rem; border-radius: var(--radius-sm);">
                    <img src="${item.image}" style="width: 40px; height: 50px; object-fit: cover; border-radius: 4px;" />
                    <div style="flex: 1; font-size: var(--text-xs);">
                      <div style="font-weight: 600; color: var(--text-primary);">${item.name}</div>
                      <div style="color: var(--text-muted); font-size: 11px;">Size: ${item.size} • Color: ${item.color} • Qty: ${item.quantity}</div>
                    </div>
                    <div style="font-weight: 700; color: var(--accent-gold); font-size: var(--text-xs);">${store.formatPrice(item.price * item.quantity)}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : `
            <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
              <p>No active order found with identifier <strong>${defaultId}</strong>.</p>
              <button class="btn-secondary" id="track-demo-btn" style="font-size: 11px; margin-top: 0.5rem;">
                Load Demo Order (ATL-2026-88421)
              </button>
            </div>
          `}
        </div>
      `;

      container.querySelector('#track-modal-close')?.addEventListener('click', closeTracking);
      container.querySelector('#track-search-btn')?.addEventListener('click', () => {
        const val = container.querySelector('#track-input-id')?.value;
        renderModal(val);
      });
      container.querySelector('#track-demo-btn')?.addEventListener('click', () => {
        renderModal('ATL-2026-88421');
      });
    }

    function openTracking(orderNumber = '') {
      renderModal(orderNumber);
      backdrop?.classList.add('active');
    }

    function closeTracking() {
      backdrop?.classList.remove('active');
    }

    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) closeTracking();
    });

    window.openOrderTrackingModal = openTracking;
  }

  // 10. Admin Garment Studio & Local Image Upload Modal
  function initAdminStudio() {
    const backdrop = document.getElementById('admin-modal-backdrop');
    const container = document.getElementById('admin-modal-container');
    let uploadedImageSrc = null;

    function renderStudio() {
      if (!container) return;

      container.innerHTML = `
        <div class="admin-dialog">
          <button id="admin-modal-close" class="modal-close-btn" aria-label="Close studio">×</button>
          
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
            <div>
              <span class="badge-gold">ATELIER CMS</span>
              <h3 style="font-family: var(--font-display); margin: 0.4rem 0 0.2rem; font-size: 1.5rem;">Garment Studio & Local Image Upload</h3>
              <p style="font-size: var(--text-xs); color: var(--text-secondary); margin: 0;">
                Add new bespoke silhouettes to the live catalog. Upload images directly from your local folder.
              </p>
            </div>
          </div>

          <form id="admin-garment-form">
            <!-- Image Dropzone & Preview -->
            <div style="margin-bottom: 1.5rem;">
              <label style="display: block; font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; color: var(--accent-gold); margin-bottom: 0.5rem;">
                Garment Photography (Local Folder Upload)
              </label>
              <div class="upload-dropzone" id="admin-dropzone">
                <input type="file" id="admin-file-input" accept="image/*" style="display: none;" />
                <div style="font-size: 2rem; color: var(--accent-gold); margin-bottom: 0.5rem;">📷</div>
                <div style="font-weight: 600; font-size: var(--text-sm); margin-bottom: 0.25rem;">Click or Drag & Drop Garment Photo</div>
                <div style="font-size: var(--text-xs); color: var(--text-muted);">Accepts PNG, JPG, WebP from your local computer</div>
              </div>

              <div id="admin-preview-box" style="display: none;" class="upload-preview-container">
                <img id="admin-preview-img" class="upload-preview-thumb" src="" alt="Garment Preview" />
                <div style="flex: 1;">
                  <div id="admin-file-name" style="font-weight: 600; font-size: var(--text-sm); color: var(--text-primary);">garment.jpg</div>
                  <div style="font-size: 11px; color: var(--accent-emerald);">Ready to publish into catalog</div>
                </div>
                <button type="button" id="admin-remove-img" class="btn-secondary" style="font-size: 11px; padding: 4px 8px;">Change</button>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.3rem;">Piece Name *</label>
                <input type="text" id="admin-name" required placeholder="e.g. Lanificio Double-Faced Peacoat" style="width: 100%; font-size: var(--text-xs);" />
              </div>
              <div>
                <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.3rem;">Category *</label>
                <select id="admin-category" style="width: 100%; font-size: var(--text-xs); background: var(--bg-card); color: var(--text-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.6rem;">
                  <option value="outerwear">Outerwear</option>
                  <option value="knitwear">Knitwear</option>
                  <option value="tops">Tops & Shirts</option>
                  <option value="dresses">Dresses</option>
                  <option value="bottoms">Trousers</option>
                  <option value="footwear">Footwear</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
            </div>

            <div style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.3rem;">Subtitle / Headline *</label>
              <input type="text" id="admin-subtitle" required placeholder="e.g. Heavyweight virgin wool with horn buttons" style="width: 100%; font-size: var(--text-xs);" />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.3rem;">Price (USD) *</label>
                <input type="number" id="admin-price" required min="1" step="5" placeholder="420" style="width: 100%; font-size: var(--text-xs);" />
              </div>
              <div>
                <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.3rem;">Original / Compare ($)</label>
                <input type="number" id="admin-compare-price" placeholder="490" style="width: 100%; font-size: var(--text-xs);" />
              </div>
              <div>
                <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.3rem;">Stock Count *</label>
                <input type="number" id="admin-stock" required min="1" value="6" style="width: 100%; font-size: var(--text-xs);" />
              </div>
            </div>

            <div style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.3rem;">Available Sizes</label>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="admin-sizes-group">
                ${['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => `
                  <label style="display: flex; align-items: center; gap: 4px; font-size: var(--text-xs); background: var(--bg-elevated); padding: 4px 10px; border-radius: var(--radius-sm); cursor: pointer; border: 1px solid var(--border-subtle);">
                    <input type="checkbox" name="sizes" value="${s}" ${['S','M','L'].includes(s) ? 'checked' : ''} /> ${s}
                  </label>
                `).join('')}
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.3rem;">Color Name *</label>
                <input type="text" id="admin-color-name" required value="Obsidian Noir" style="width: 100%; font-size: var(--text-xs);" />
              </div>
              <div>
                <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.3rem;">Color Swatch</label>
                <input type="color" id="admin-color-hex" value="#16181d" style="width: 100%; height: 38px; border: 1px solid var(--border-subtle); border-radius: 4px; background: transparent; cursor: pointer;" />
              </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.3rem;">Detailed Garment Narrative *</label>
              <textarea id="admin-desc" rows="3" required placeholder="Describe silhouette, drape, lining, and craftsmanship details..." style="width: 100%; font-size: var(--text-xs); background: var(--bg-card); color: var(--text-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.6rem;"></textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
              <button type="button" id="admin-reset-demo" class="btn-secondary" style="font-size: var(--text-xs);">
                Reset to Default Seeds
              </button>
              <button type="submit" class="btn-gold" style="font-size: var(--text-xs); padding: 0.7rem 1.6rem;">
                ✦ Publish to Collection
              </button>
            </div>
          </form>
        </div>
      `;

      const dropzone = container.querySelector('#admin-dropzone');
      const fileInput = container.querySelector('#admin-file-input');
      const previewBox = container.querySelector('#admin-preview-box');
      const previewImg = container.querySelector('#admin-preview-img');
      const fileNameEl = container.querySelector('#admin-file-name');
      const removeBtn = container.querySelector('#admin-remove-img');

      dropzone?.addEventListener('click', () => fileInput?.click());
      dropzone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone?.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
      dropzone?.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files?.length > 0) {
          handleFile(e.dataTransfer.files[0]);
        }
      });

      fileInput?.addEventListener('change', (e) => {
        if (e.target.files?.length > 0) {
          handleFile(e.target.files[0]);
        }
      });

      function handleFile(file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          uploadedImageSrc = ev.target.result;
          if (previewImg) previewImg.src = uploadedImageSrc;
          if (fileNameEl) fileNameEl.textContent = file.name;
          if (previewBox) previewBox.style.display = 'flex';
          if (dropzone) dropzone.style.display = 'none';
        };
        reader.readAsDataURL(file);
      }

      removeBtn?.addEventListener('click', () => {
        uploadedImageSrc = null;
        if (fileInput) fileInput.value = '';
        if (previewBox) previewBox.style.display = 'none';
        if (dropzone) dropzone.style.display = 'block';
      });

      container.querySelector('#admin-modal-close')?.addEventListener('click', closeStudio);

      container.querySelector('#admin-reset-demo')?.addEventListener('click', () => {
        if (confirm('Reset store catalog to initial high-luxury seeds?')) {
          localStorage.removeItem('atelier_products');
          location.reload();
        }
      });

      container.querySelector('#admin-garment-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedSizes = Array.from(container.querySelectorAll('input[name="sizes"]:checked')).map(cb => cb.value);
        if (selectedSizes.length === 0) {
          alert('Please select at least one garment size.');
          return;
        }

        const fallbackImg = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=900&auto=format&fit=crop";
        const finalImage = uploadedImageSrc || fallbackImg;

        const newPiece = {
          id: `atelier-${Date.now()}`,
          name: container.querySelector('#admin-name').value.trim(),
          subtitle: container.querySelector('#admin-subtitle').value.trim(),
          category: container.querySelector('#admin-category').value,
          price: Number(container.querySelector('#admin-price').value),
          originalPrice: container.querySelector('#admin-compare-price').value ? Number(container.querySelector('#admin-compare-price').value) : null,
          rating: 5.0,
          reviewCount: 1,
          badge: "NEW ARRIVAL",
          inStock: true,
          stockRemaining: Number(container.querySelector('#admin-stock').value) || 5,
          sizes: selectedSizes,
          colors: [
            {
              name: container.querySelector('#admin-color-name').value.trim(),
              hex: container.querySelector('#admin-color-hex').value
            }
          ],
          image: finalImage,
          gallery: [finalImage],
          description: container.querySelector('#admin-desc').value.trim(),
          details: {
            material: "Artisanal Luxury Fabric (Tailored Standard)",
            fit: "Sartorial tailored fit",
            origin: "Milan Atelier Studio",
            care: "Specialist dry clean only."
          }
        };

        const existing = JSON.parse(localStorage.getItem('atelier_products') || JSON.stringify(store.state.products));
        existing.unshift(newPiece);
        localStorage.setItem('atelier_products', JSON.stringify(existing));
        store.state.products = existing;
        store.publish('filters:changed');

        toasts.show(`Garment "${newPiece.name}" successfully added to catalog!`, 'success', 4000);
        closeStudio();

        setTimeout(() => {
          document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      });
    }

    function openStudio() {
      renderStudio();
      backdrop?.classList.add('active');
    }

    function closeStudio() {
      backdrop?.classList.remove('active');
    }

    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) closeStudio();
    });

    window.openAdminStudioModal = openStudio;
  }

  // App Initialization
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHero();
    initCatalog();
    initProductModal();
    initCartDrawer();
    initCheckoutModal();
    initWishlistDrawer();
    initSizeGuideModal();
    initOrderTrackingModal();
    initAdminStudio();

    setTimeout(() => {
      toasts.show('Welcome to Atelier Luxe. Use code "LUXE10" for 10% off your first drop.', 'info', 4500);
    }, 800);
  });

})();
