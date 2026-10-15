/**
 * ============================================================================
 * ATELIER LUXE - NAVIGATION BAR COMPONENT
 * ============================================================================
 */

import { store } from '../store.js';
import { CURRENCIES } from '../data.js';

export function initNavbar() {
  const header = document.querySelector('.site-header');
  const currencySelect = document.getElementById('currency-select');
  const searchInput = document.getElementById('global-search-input');
  const cartTrigger = document.getElementById('cart-drawer-trigger');
  const cartBadge = document.getElementById('cart-badge-count');
  const wishlistTrigger = document.getElementById('wishlist-trigger');
  const wishlistBadge = document.getElementById('wishlist-badge-count');

  // 1. Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Populate and Bind Currency Selector
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

  // 3. Search with Debounce
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        store.setSearchQuery(e.target.value);
        // If not already in catalog section, smooth scroll to it
        const catalogSec = document.getElementById('collection');
        if (catalogSec && e.target.value.trim().length > 0) {
          catalogSec.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    });
  }

  // 4. Cart Trigger
  cartTrigger?.addEventListener('click', () => {
    store.openCart();
  });

  // 5. Wishlist Filter Trigger
  wishlistTrigger?.addEventListener('click', () => {
    // If wishlist items exist, filter by wishlist
    if (store.state.wishlist.length === 0) {
      alert("Your wishlist is currently empty. Click the heart icon on any piece to save it.");
      return;
    }
    // Set search or filter to show wishlisted items
    const catalogSec = document.getElementById('collection');
    catalogSec?.scrollIntoView({ behavior: 'smooth' });
  });

  // 6. Subscriptions to update badges
  store.subscribe('cart:updated', (cart) => {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
      cartBadge.textContent = totalCount;
      cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
      cartBadge.classList.add('animate-scale-up');
      setTimeout(() => cartBadge.classList.remove('animate-scale-up'), 300);
    }
  });

  store.subscribe('wishlist:updated', (wishlist) => {
    const totalCount = wishlist.length;
    if (wishlistBadge) {
      wishlistBadge.textContent = totalCount;
      wishlistBadge.style.display = totalCount > 0 ? 'flex' : 'none';
      wishlistBadge.classList.add('animate-scale-up');
      setTimeout(() => wishlistBadge.classList.remove('animate-scale-up'), 300);
    }
  });

  // Initial badge update
  const initialCartCount = store.state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) {
    cartBadge.textContent = initialCartCount;
    cartBadge.style.display = initialCartCount > 0 ? 'flex' : 'none';
  }

  const initialWishlistCount = store.state.wishlist.length;
  if (wishlistBadge) {
    wishlistBadge.textContent = initialWishlistCount;
    wishlistBadge.style.display = initialWishlistCount > 0 ? 'flex' : 'none';
  }
}
