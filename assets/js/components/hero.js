/**
 * ============================================================================
 * ATELIER LUXE - HERO & LOOKBOOK COMPONENT
 * ============================================================================
 */

import { store } from '../store.js';

export function initHero() {
  const shopCta = document.getElementById('hero-shop-cta');
  const exploreCta = document.getElementById('hero-explore-cta');
  const heroCard = document.getElementById('hero-featured-card');

  shopCta?.addEventListener('click', () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  });

  exploreCta?.addEventListener('click', () => {
    // Quick open the flagship item (MA-1 Bomber)
    store.openProductModal('atelier-bomber-jacket');
  });

  heroCard?.addEventListener('click', () => {
    store.openProductModal('atelier-bomber-jacket');
  });
}
