/**
 * ============================================================================
 * ATELIER LUXE - CATALOG & FILTERING ENGINE COMPONENT
 * ============================================================================
 */

import { store } from '../store.js';
import { CATEGORIES } from '../data.js';
import { toasts } from './toasts.js';

export function initCatalog() {
  const categoryPillsContainer = document.getElementById('category-pills');
  const priceSlider = document.getElementById('price-slider');
  const priceSliderValue = document.getElementById('price-slider-value');
  const sortSelect = document.getElementById('catalog-sort-select');
  const productGrid = document.getElementById('product-grid');
  const resultCount = document.getElementById('result-count');

  // 1. Render Category Pills
  if (categoryPillsContainer) {
    categoryPillsContainer.innerHTML = CATEGORIES.map(cat => `
      <button class="category-pill ${store.state.filters.category === cat.id ? 'active' : ''}" 
              data-category="${cat.id}">
        ${cat.label}
      </button>
    `).join('');

    categoryPillsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.category-pill');
      if (btn) {
        document.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        store.setCategory(btn.dataset.category);
      }
    });
  }

  // 2. Price Slider
  if (priceSlider) {
    const updateSliderDisplay = (val) => {
      if (priceSliderValue) {
        priceSliderValue.textContent = store.formatPrice(val);
      }
    };

    updateSliderDisplay(priceSlider.value);

    priceSlider.addEventListener('input', (e) => {
      updateSliderDisplay(e.target.value);
      store.setPriceMax(e.target.value);
    });
  }

  // 3. Sort Select
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      store.setSortBy(e.target.value);
    });
  }

  // 4. Render Product Grid
  function renderProducts() {
    if (!productGrid) return;

    const products = store.getFilteredProducts();

    if (resultCount) {
      resultCount.textContent = `${products.length} Piece${products.length === 1 ? '' : 's'}`;
    }

    if (products.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--accent-gold);">✧</div>
          <h3 style="font-family: var(--font-display); margin-bottom: 0.5rem;">No Pieces Found</h3>
          <p style="color: var(--text-secondary); max-width: 400px; margin: 0 auto 1.5rem;">
            No items match your active filters. Try adjusting the price range or resetting categories.
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
        document.querySelectorAll('.category-pill').forEach(b => {
          b.classList.toggle('active', b.dataset.category === 'all');
        });
      });
      return;
    }

    productGrid.innerHTML = products.map(product => {
      const isFav = store.isWishlisted(product.id);
      const badgeHtml = product.badge 
        ? `<span class="product-badge badge-${product.badge.toLowerCase()}">${product.badge}</span>`
        : '';
      const originalPriceHtml = product.originalPrice 
        ? `<span class="product-price-original">${store.formatPrice(product.originalPrice)}</span>`
        : '';

      return `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-image-container">
            ${badgeHtml}
            <button class="wishlist-btn ${isFav ? 'active' : ''}" 
                    data-action="toggle-wishlist" 
                    title="${isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}">
              ${isFav ? '♥' : '♡'}
            </button>
            <img class="product-image" 
                 src="${product.image}" 
                 alt="${product.name}" 
                 loading="lazy" />
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

  // 5. Grid Event Delegation
  productGrid?.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;
    const productId = card.dataset.productId;
    const product = store.state.products.find(p => p.id === productId);
    if (!product) return;

    // Toggle Wishlist
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
      toasts.show(added ? `Added "${product.name}" to Wishlist` : `Removed "${product.name}" from Wishlist`, added ? 'heart' : 'info');
      return;
    }

    // Quick Add
    if (e.target.closest('[data-action="quickadd"]')) {
      e.stopPropagation();
      store.addToCart(product, product.sizes[0], product.colors[0], 1);
      toasts.show(`Added 1x ${product.name} (${product.sizes[0]}) to Bag`, 'success');
      store.openCart();
      return;
    }

    // Quick View or Card Click
    if (e.target.closest('[data-action="quickview"]') || e.target.closest('[data-action="open-detail"]') || e.target.closest('.product-image-container')) {
      store.openProductModal(productId);
    }
  });

  // 6. Subscriptions
  store.subscribe('filters:changed', () => renderProducts());
  store.subscribe('currency:changed', () => renderProducts());
  store.subscribe('wishlist:updated', () => renderProducts());

  // Initial render
  renderProducts();
}
