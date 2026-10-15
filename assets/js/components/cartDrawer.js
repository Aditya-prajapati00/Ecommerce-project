/**
 * ============================================================================
 * ATELIER LUXE - SHOPPING BAG DRAWER COMPONENT
 * ============================================================================
 */

import { store } from '../store.js';
import { toasts } from './toasts.js';

export function initCartDrawer() {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const drawer = document.getElementById('cart-drawer');
  const closeBtn = document.getElementById('cart-drawer-close');
  const itemsContainer = document.getElementById('cart-items-container');
  const drawerCount = document.getElementById('drawer-item-count');
  
  // Progress Bar Elements
  const progressText = document.getElementById('shipping-progress-text');
  const progressFill = document.getElementById('shipping-progress-fill');

  // Summary Elements
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountRow = document.getElementById('cart-discount-row');
  const discountEl = document.getElementById('cart-discount');
  const shippingEl = document.getElementById('cart-shipping');
  const taxEl = document.getElementById('cart-tax');
  const totalEl = document.getElementById('cart-total');

  // Promo Elements
  const promoInput = document.getElementById('cart-promo-input');
  const promoBtn = document.getElementById('cart-promo-btn');
  const checkoutBtn = document.getElementById('cart-checkout-trigger');

  function openDrawer() {
    backdrop?.classList.add('active');
    drawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    backdrop?.classList.remove('active');
    drawer?.classList.remove('active');
    document.body.style.overflow = '';
    store.closeCart();
  }

  backdrop?.addEventListener('click', closeDrawer);
  closeBtn?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Render Cart Contents
  function renderCart() {
    const cart = store.state.cart;
    const totals = store.getCartTotals();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (drawerCount) {
      drawerCount.textContent = `(${totalCount})`;
    }

    // 1. Free Shipping Threshold
    if (progressText && progressFill) {
      if (totals.subtotal >= totals.freeShippingThreshold) {
        progressText.innerHTML = `✦ <strong style="color: var(--accent-emerald);">Complimentary Express Delivery Unlocked!</strong>`;
        progressFill.style.width = '100%';
        progressFill.style.background = 'var(--accent-emerald)';
      } else {
        const remainingFormatted = store.formatPrice(totals.freeShippingRemaining);
        const percent = Math.min(100, Math.round((totals.subtotal / totals.freeShippingThreshold) * 100));
        progressText.innerHTML = `Add <strong>${remainingFormatted}</strong> more for Complimentary Delivery`;
        progressFill.style.width = `${percent}%`;
        progressFill.style.background = 'linear-gradient(90deg, var(--accent-gold-dark), var(--accent-gold))';
      }
    }

    // 2. Cart Items
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

    // 3. Totals Summary
    if (subtotalEl) subtotalEl.textContent = store.formatPrice(totals.subtotal);
    
    if (discountRow && discountEl) {
      if (totals.discount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-${store.formatPrice(totals.discount)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (shippingEl) {
      shippingEl.textContent = totals.shipping === 0 ? 'FREE' : store.formatPrice(totals.shipping);
    }

    if (taxEl) taxEl.textContent = store.formatPrice(totals.tax);
    if (totalEl) totalEl.textContent = store.formatPrice(totals.total);
  }

  // Event Delegation for Steppers & Removal
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

  // Promo Code Form
  promoBtn?.addEventListener('click', () => {
    const code = promoInput?.value;
    if (!code) return;
    const result = store.applyPromoCode(code);
    if (result.success) {
      toasts.show(result.message, 'success');
      if (promoInput) promoInput.value = '';
    } else {
      toasts.show(result.message, 'warning');
    }
  });

  promoInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      promoBtn?.click();
    }
  });

  // Proceed to Checkout
  checkoutBtn?.addEventListener('click', () => {
    if (store.state.cart.length === 0) return;
    store.openCheckout();
  });

  // Subscriptions
  store.subscribe('ui:cartOpen', (isOpen) => {
    if (isOpen) {
      renderCart();
      openDrawer();
    } else {
      closeDrawer();
    }
  });

  store.subscribe('cart:updated', () => renderCart());
  store.subscribe('currency:changed', () => renderCart());
}
