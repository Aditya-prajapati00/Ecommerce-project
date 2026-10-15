/**
 * ============================================================================
 * ATELIER LUXE - REACTIVE STATE STORE (PUB/SUB ARCHITECTURE)
 * ============================================================================
 */

import { PRODUCTS, CURRENCIES, PROMO_CODES } from './data.js';

class Store {
  constructor() {
    this.events = {};
    
    // Initial State with LocalStorage Hydration
    this.state = {
      products: PRODUCTS,
      cart: this.loadStorage('atelier_cart', []),
      wishlist: this.loadStorage('atelier_wishlist', []),
      currency: this.loadStorage('atelier_currency', 'USD'),
      promo: null,
      filters: {
        category: 'all',
        priceMax: 600,
        search: '',
        sortBy: 'featured'
      },
      ui: {
        isCartOpen: false,
        isProductModalOpen: false,
        activeProduct: null,
        isCheckoutOpen: false,
        checkoutStep: 1,
        activeSizeGuide: false
      }
    };
  }

  // --- Storage Helpers ---
  loadStorage(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn(`LocalStorage read failed for ${key}:`, e);
      return fallback;
    }
  }

  saveStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn(`LocalStorage write failed for ${key}:`, e);
    }
  }

  // --- Pub/Sub Event System ---
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }

  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data, this.state));
    }
    // Also publish generic change event
    if (this.events['*']) {
      this.events['*'].forEach(callback => callback({ event, data }, this.state));
    }
  }

  // --- Currency & Formatting ---
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

  // --- Cart Actions ---
  addToCart(product, size = null, color = null, quantity = 1) {
    const selectedSize = size || product.sizes[0];
    const selectedColor = color ? color.name : (product.colors[0]?.name || 'Default');
    const compositeId = `${product.id}_${selectedSize}_${selectedColor}`;

    const existingIndex = this.state.cart.findIndex(item => item.id === compositeId);

    if (existingIndex > -1) {
      this.state.cart[existingIndex].quantity += quantity;
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
    let shipping = subtotal > 200 || subtotal === 0 ? 0 : 25; // Free over $200

    if (this.state.promo) {
      if (this.state.promo.type === 'percent') {
        discount = (subtotal * this.state.promo.value) / 100;
      } else if (this.state.promo.type === 'shipping') {
        shipping = 0;
      }
    }

    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = taxableAmount * 0.08; // 8% estimated luxury tax
    const total = taxableAmount + shipping + tax;

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
      this.state.promo = {
        code: normalized,
        ...PROMO_CODES[normalized]
      };
      this.publish('promo:applied', this.state.promo);
      this.publish('cart:updated', this.state.cart);
      return { success: true, message: `Promo '${normalized}' applied!` };
    }
    return { success: false, message: 'Invalid or expired promotional code.' };
  }

  // --- Wishlist Actions ---
  toggleWishlist(productId) {
    const exists = this.state.wishlist.includes(productId);
    if (exists) {
      this.state.wishlist = this.state.wishlist.filter(id => id !== productId);
    } else {
      this.state.wishlist.push(productId);
    }
    this.saveStorage('atelier_wishlist', this.state.wishlist);
    this.publish('wishlist:updated', this.state.wishlist);
    return !exists; // true if added, false if removed
  }

  isWishlisted(productId) {
    return this.state.wishlist.includes(productId);
  }

  // --- Filtering & Sorting ---
  setCategory(category) {
    this.state.filters.category = category;
    this.publish('filters:changed', this.state.filters);
  }

  setPriceMax(price) {
    this.state.filters.priceMax = Number(price);
    this.publish('filters:changed', this.state.filters);
  }

  setSearchQuery(query) {
    this.state.filters.search = query.toLowerCase().trim();
    this.publish('filters:changed', this.state.filters);
  }

  setSortBy(sortKey) {
    this.state.filters.sortBy = sortKey;
    this.publish('filters:changed', this.state.filters);
  }

  getFilteredProducts() {
    let result = [...this.state.products];
    const { category, priceMax, search, sortBy } = this.state.filters;

    // 1. Category Filter
    if (category && category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    // 2. Max Price Filter
    if (priceMax) {
      result = result.filter(p => p.price <= priceMax);
    }

    // 3. Search Query Filter
    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.subtitle.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    // 4. Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Keep catalog order
        break;
    }

    return result;
  }

  // --- UI Modals & Drawers ---
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

  setCheckoutStep(step) {
    this.state.ui.checkoutStep = step;
    this.publish('ui:checkout', { open: true, step });
  }
}

// Singleton export
export const store = new Store();
