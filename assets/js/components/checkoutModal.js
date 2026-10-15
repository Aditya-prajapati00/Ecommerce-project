/**
 * ============================================================================
 * ATELIER LUXE - MULTI-STEP CHECKOUT & ORDER RECEIPT COMPONENT
 * ============================================================================
 */

import { store } from '../store.js';
import { toasts } from './toasts.js';

export function initCheckoutModal() {
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
  let shippingTier = { name: 'Complimentary Atelier Standard', price: 0, days: '3-5 Business Days' };
  let paymentInfo = { cardNum: '', expiry: '', cvv: '' };
  let completedOrder = null;

  function closeCheckout() {
    backdrop?.classList.remove('active');
    store.closeCheckout();
    currentStep = 1;
  }

  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeCheckout();
    }
  });

  function renderStep() {
    if (!container) return;
    const totals = store.getCartTotals();
    const activeCurrency = store.state.currency;

    if (currentStep === 1) {
      // Step 1: Client & Shipping Destination
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
              <span style="font-size: var(--text-sm); font-weight: 600;">Total: <strong style="color: var(--accent-gold);">${store.formatPrice(totals.total)}</strong></span>
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
      // Step 2: Shipping Method
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
          const price = Number(card.dataset.price);
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
      // Step 3: Payment Simulation
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
        
        // Process mock order
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

        // Clear bag
        store.clearCart();
        toasts.show(`Order ${orderId} confirmed!`, 'success', 5000);

        currentStep = 4;
        renderStep();
      });

    } else if (currentStep === 4) {
      // Step 4: Digital Receipt & Invoice
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
              A formal confirmation and dispatch dispatch has been transmitted to <strong>${completedOrder.customer.email}</strong>.
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

              <!-- Item Breakdown -->
              <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
                ${completedOrder.items.map(item => `
                  <div style="display: flex; justify-content: space-between; font-size: var(--text-xs);">
                    <span>${item.quantity}x ${item.name} (${item.size} / ${item.color})</span>
                    <strong style="color: var(--text-primary);">${store.formatPrice(item.price * item.quantity)}</strong>
                  </div>
                `).join('')}
              </div>

              <!-- Cost breakdown -->
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
      container.querySelector('#print-invoice-btn')?.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // Subscriptions
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
