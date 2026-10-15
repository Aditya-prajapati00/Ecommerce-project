/**
 * ============================================================================
 * ATELIER LUXE - MAIN APPLICATION BOOTSTRAPPER
 * ============================================================================
 */

import { initNavbar } from './components/navbar.js';
import { initHero } from './components/hero.js';
import { initCatalog } from './components/catalog.js';
import { initProductModal } from './components/productModal.js';
import { initCartDrawer } from './components/cartDrawer.js';
import { initCheckoutModal } from './components/checkoutModal.js';
import { toasts } from './components/toasts.js';
import { store } from './store.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Atelier Luxe E-Commerce Platform initialized successfully.');

  // Initialize UI Components
  initNavbar();
  initHero();
  initCatalog();
  initProductModal();
  initCartDrawer();
  initCheckoutModal();

  // Welcome Toast
  setTimeout(() => {
    toasts.show('Welcome to Atelier Luxe. Use code "LUXE10" for 10% off your first drop.', 'info', 4500);
  }, 1000);
});
