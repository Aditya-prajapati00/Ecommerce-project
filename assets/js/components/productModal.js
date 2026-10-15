/**
 * ============================================================================
 * ATELIER LUXE - PRODUCT DETAILS & QUICK-VIEW MODAL COMPONENT
 * ============================================================================
 */

import { store } from '../store.js';
import { toasts } from './toasts.js';

export function initProductModal() {
  const modalBackdrop = document.getElementById('product-modal-backdrop');
  const modalContainer = document.getElementById('product-modal-container');

  let currentProduct = null;
  let selectedSize = null;
  let selectedColor = null;
  let selectedQuantity = 1;

  function closeModal() {
    modalBackdrop?.classList.remove('active');
    store.closeProductModal();
  }

  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Listen to Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('active')) {
      closeModal();
    }
  });

  function renderModal(product) {
    if (!modalContainer || !product) return;

    currentProduct = product;
    selectedSize = product.sizes[0];
    selectedColor = product.colors[0];
    selectedQuantity = 1;

    const isFav = store.isWishlisted(product.id);
    const stockClass = product.stockRemaining && product.stockRemaining <= 4 ? 'stock-low' : 'stock-in';
    const stockText = product.stockRemaining && product.stockRemaining <= 4 
      ? `Only ${product.stockRemaining} pieces remaining in Atelier` 
      : `In Stock — Complimentary Dispatch`;

    modalContainer.innerHTML = `
      <div class="product-modal-dialog">
        <button id="modal-close-trigger" class="modal-close-btn" aria-label="Close dialog">×</button>

        <!-- Left Column: Gallery -->
        <div class="modal-gallery-column">
          <img id="modal-active-img" 
               class="modal-main-img" 
               src="${product.image}" 
               alt="${product.name}" />
          
          <div style="display: flex; gap: 0.5rem; overflow-x: auto;">
            ${product.gallery.map((imgSrc, idx) => `
              <img src="${imgSrc}" 
                   class="gallery-thumb" 
                   data-src="${imgSrc}"
                   style="width: 64px; height: 72px; object-fit: cover; border-radius: 4px; cursor: pointer; border: 2px solid ${idx === 0 ? 'var(--accent-gold)' : 'transparent'}; opacity: ${idx === 0 ? '1' : '0.7'};" 
                   alt="Angle ${idx + 1}" />
            `).join('')}
          </div>
        </div>

        <!-- Right Column: Specs & Actions -->
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
              <button class="wishlist-btn ${isFav ? 'active' : ''}" 
                      id="modal-fav-btn" 
                      style="position: static; margin-top: 4px;"
                      title="Wishlist">
                ${isFav ? '♥' : '♡'}
              </button>
            </div>

            <div class="product-rating" style="margin-bottom: 0.75rem;">
              <span>★ ${product.rating.toFixed(1)}</span>
              <span class="product-rating-count">(${product.reviewCount} Verified Client Reviews)</span>
            </div>

            <div class="modal-product-price">${store.formatPrice(product.price)}</div>
            <p class="modal-product-desc">${product.description}</p>

            <!-- Size Selector -->
            <div class="variant-group">
              <div class="variant-label-row">
                <span>Select Size: <strong id="modal-size-display" style="color: var(--accent-gold);">${selectedSize}</strong></span>
                <span class="size-guide-trigger" id="modal-size-guide-btn">Size Guide</span>
              </div>
              <div class="size-pill-group">
                ${product.sizes.map(size => `
                  <button class="size-pill ${size === selectedSize ? 'selected' : ''}" 
                          data-size="${size}">
                    ${size}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Color Swatches -->
            <div class="variant-group">
              <div class="variant-label-row">
                <span>Atelier Colorway: <strong id="modal-color-display" style="color: var(--accent-gold);">${selectedColor.name}</strong></span>
              </div>
              <div class="color-swatch-group">
                ${product.colors.map(color => `
                  <div class="color-swatch ${color.name === selectedColor.name ? 'selected' : ''}" 
                       data-color-name="${color.name}"
                       data-color-hex="${color.hex}"
                       style="background-color: ${color.hex};" 
                       title="${color.name}">
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Material & Fit Accordion -->
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.85rem 1rem; margin-top: 1rem; font-size: var(--text-xs); color: var(--text-secondary);">
              <div style="margin-bottom: 0.35rem;"><strong style="color: var(--text-primary);">Composition:</strong> ${product.details.material}</div>
              <div style="margin-bottom: 0.35rem;"><strong style="color: var(--text-primary);">Silhouette:</strong> ${product.details.fit}</div>
              <div style="margin-bottom: 0.35rem;"><strong style="color: var(--text-primary);">Provenance:</strong> ${product.details.origin}</div>
              <div><strong style="color: var(--text-primary);">Care:</strong> ${product.details.care}</div>
            </div>
          </div>

          <!-- Add to Bag CTA -->
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

    // Bind Gallery clicks
    modalContainer.querySelectorAll('.gallery-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const mainImg = modalContainer.querySelector('#modal-active-img');
        if (mainImg) mainImg.src = thumb.dataset.src;
        modalContainer.querySelectorAll('.gallery-thumb').forEach(t => {
          t.style.borderColor = 'transparent';
          t.style.opacity = '0.7';
        });
        thumb.style.borderColor = 'var(--accent-gold)';
        thumb.style.opacity = '1';
      });
    });

    // Bind Size Pills
    modalContainer.querySelectorAll('.size-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        modalContainer.querySelectorAll('.size-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        selectedSize = pill.dataset.size;
        const display = modalContainer.querySelector('#modal-size-display');
        if (display) display.textContent = selectedSize;
      });
    });

    // Bind Color Swatches
    modalContainer.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        modalContainer.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
        const colorName = swatch.dataset.colorName;
        selectedColor = product.colors.find(c => c.name === colorName) || { name: colorName };
        const display = modalContainer.querySelector('#modal-color-display');
        if (display) display.textContent = colorName;
      });
    });

    // Bind Quantity Steppers
    const qtyVal = modalContainer.querySelector('#modal-qty-val');
    modalContainer.querySelector('#modal-qty-minus')?.addEventListener('click', () => {
      if (selectedQuantity > 1) {
        selectedQuantity--;
        if (qtyVal) qtyVal.textContent = selectedQuantity;
      }
    });

    modalContainer.querySelector('#modal-qty-plus')?.addEventListener('click', () => {
      selectedQuantity++;
      if (qtyVal) qtyVal.textContent = selectedQuantity;
    });

    // Bind Wishlist Button
    modalContainer.querySelector('#modal-fav-btn')?.addEventListener('click', (e) => {
      const added = store.toggleWishlist(product.id);
      e.target.classList.toggle('active', added);
      e.target.innerHTML = added ? '♥' : '♡';
      toasts.show(added ? `Added to Wishlist` : `Removed from Wishlist`, added ? 'heart' : 'info');
    });

    // Bind Size Guide
    modalContainer.querySelector('#modal-size-guide-btn')?.addEventListener('click', () => {
      alert(`ATELIER SIZE CONVERSION GUIDE:\n\n• S  (Chest: 36-38" / 92-96cm | Waist: 30-32")\n• M  (Chest: 38-40" / 96-102cm | Waist: 32-34")\n• L  (Chest: 41-43" / 104-109cm | Waist: 34-36")\n• XL (Chest: 44-46" / 112-117cm | Waist: 38-40")\n\nAll Atelier pieces follow true European sartorial measurements.`);
    });

    // Bind Close Button
    modalContainer.querySelector('#modal-close-trigger')?.addEventListener('click', closeModal);

    // Bind Add to Bag
    modalContainer.querySelector('#modal-add-to-bag')?.addEventListener('click', () => {
      store.addToCart(currentProduct, selectedSize, selectedColor, selectedQuantity);
      toasts.show(`Added ${selectedQuantity}x ${currentProduct.name} (${selectedSize} / ${selectedColor.name}) to Bag`, 'success');
      closeModal();
      store.openCart();
    });
  }

  // Subscribe to store events
  store.subscribe('ui:productModal', ({ open, product }) => {
    if (open && product) {
      renderModal(product);
      modalBackdrop?.classList.add('active');
    } else {
      modalBackdrop?.classList.remove('active');
    }
  });

  store.subscribe('currency:changed', () => {
    if (currentProduct && modalBackdrop?.classList.contains('active')) {
      const priceEl = modalContainer?.querySelector('.modal-product-price');
      if (priceEl) priceEl.textContent = store.formatPrice(currentProduct.price);
    }
  });
}
