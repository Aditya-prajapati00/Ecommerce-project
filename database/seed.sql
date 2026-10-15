-- Initial Categories
INSERT OR IGNORE INTO categories (slug, name, description) VALUES
('outerwear', 'Outerwear', 'Tailored coats, memory satin bombers, and double-breasted trenches.'),
('tops', 'Tops & Shirts', 'Normandy flax linen shirts, silk overshirts, and poplin blouses.'),
('knitwear', 'Knitwear', 'Scottish cashmere crewnecks and 3D seamless knits.'),
('dresses', 'Dresses', 'Mulberry silk slip dresses and architectural column gowns.'),
('bottoms', 'Trousers', 'Sartorial gabardine trousers with Hollywood waistbands.'),
('footwear', 'Footwear', 'Goodyear-welted Chelsea boots and artisanal leather shoes.'),
('accessories', 'Accessories', 'Hand-rolled silk twill scarves and minimal leather goods.');

-- Initial Coupons
INSERT OR IGNORE INTO coupons (code, discount_type, discount_value, description) VALUES
('LUXE10', 'percent', 10, '10% VIP Atelier Discount'),
('ARCHITECT', 'percent', 20, '20% Architect Partner Exclusive'),
('FREESHIP', 'shipping', 0, 'Complimentary Worldwide Courier Delivery');

-- Products
INSERT OR IGNORE INTO products (id, category_slug, title, slug, subtitle, description, material, fit, origin, care, price, compare_price, badge, rating, review_count, is_active) VALUES
(1, 'outerwear', 'Obsidian Tech MA-1 Bomber', 'obsidian-tech-ma1-bomber', 'Iridescent technical satin with titanium hardware', 'Engineered from high-density Japanese technical memory satin with a water-resistant finish. Features matte titanium double-ended zippers, insulating diamond-quilted cupro lining, and ergonomic sleeve articulation.', '100% High-Density Technical Nylon Satin; Lining: 100% Bemberg Cupro', 'Relaxed boxy silhouette with dropped shoulders and ribbed cuffs', 'Crafted in Okayama, Japan', 'Specialist dry clean only. Do not iron hardware directly.', 380, 440, 'LIMITED', 4.9, 38, 1),
(2, 'tops', 'Venetian Raw Linen Overshirt', 'venetian-raw-linen-overshirt', 'Artisanal textured linen with mother of pearl buttons', 'Spun from 100% long-staple Normandy flax, washed with artisanal volcanic pumice for exceptional handfeel. Cut in an architectural relaxed drape suited for layered Mediterranean styling.', '100% Normandy Certified Flax Linen (240 GSM)', 'Oversized utility silhouette with straight hem', 'Woven in Biella, Italy', 'Machine wash cold on delicate cycle. Line dry in shade.', 195, NULL, 'BESTSELLER', 4.8, 52, 1),
(3, 'outerwear', 'Imperial Double-Breasted Cashmere Coat', 'imperial-double-breasted-cashmere-coat', 'Pure Mongolian double-faced cashmere with horn buttons', 'The pinnacle of winter outerwear. Tailored from hand-combed Mongolian cashmere brushed to a ripple finish. Features unconstructed floating canvas chest piece for natural drape.', '100% Grade-A Mongolian Cashmere (520 GSM)', 'Full-length tailored overcoat with high back vent', 'Tailored in Naples, Italy', 'Specialist dry clean only. Steam gently.', 590, 680, 'EXCLUSIVE', 5.0, 29, 1),
(4, 'dresses', 'Mulberry Silk Bias-Cut Column Gown', 'mulberry-silk-bias-cut-gown', 'Heavyweight 22-Momme silk charmeuse in deep emerald', 'Cut entirely on the true 45-degree grain to gently skim body contours without clinging. Features delicate rolled baby-hems and adjustable gossamer silk rouleau straps.', '100% Mulberry Silk Charmeuse (22 Momme)', 'Bias-cut fluid silhouette grazing ankle length', 'Atelier Silk Studio, Lyon, France', 'Hand wash cold with PH-neutral silk detergent or dry clean.', 320, 380, 'POPULAR', 4.9, 47, 1),
(5, 'bottoms', 'Sartorial Double-Pleated Wool Trousers', 'sartorial-double-pleated-wool-trousers', 'High-rise virgin wool gabardine with side adjusters', 'Crafted from Italian virgin wool gabardine with natural crease recovery. Built with classic extended waistband, Hollywood waistband construction, and brass side adjusters eliminating belt loops.', '100% Super 130s Italian Virgin Wool', 'High rise with wide relaxed leg tapering gently at hem', 'Biella Mills, Italy', 'Dry clean only.', 240, NULL, 'CORE', 4.7, 31, 1),
(6, 'knitwear', 'Seamless Featherlight Cashmere Knit', 'seamless-featherlight-cashmere-knit', 'Ultra-fine gauge Scottish yarn with ribbed trims', 'Knit on Japanese whole-garment 3D knitting machines for a 100% seamless structure. Incredibly soft against bare skin, providing optimal thermal regulation from 5°C to 20°C.', '100% Inner Mongolian 2-Ply Cashmere (14 Gauge)', 'Tailored regular fit with subtle stretch recovery', 'Hawick, Scotland', 'Hand wash lukewarm with cashmere shampoo; dry flat.', 260, NULL, 'ESSENTIAL', 4.9, 64, 1),
(7, 'footwear', 'Goodyear-Welted Vitello Chelsea Boot', 'goodyear-welted-vitello-chelsea-boot', 'Full-grain calfskin leather with Dainite studded rubber sole', 'Constructed with traditional Goodyear welted technique allowing repeated resoling over decades. Built on our bespoke almond-toe last with double-sided Italian elastic gores.', 'Full-grain French Box Calf Leather; British Dainite Sole', 'True to size standard D-width', 'Handcrafted in Northamptonshire, England', 'Condition regularly with organic beeswax balm.', 420, 480, 'HANDCRAFTED', 4.8, 22, 1),
(8, 'accessories', 'Architectural Geometry Silk Twill Scarf', 'architectural-geometry-silk-twill-scarf', 'Heavyweight 16-Momme silk with hand-rolled contrasting edges', 'Screen-printed by hand using 14 distinct archival screens onto pure silk twill. Generously sized at 90x90cm with hand-rolled French hems sewn by master artisans.', '100% Pure Mulberry Silk Twill (90cm x 90cm)', 'Versatile square drape', 'Como, Italy', 'Dry clean only.', 140, NULL, 'NEW', 5.0, 19, 1);

-- Product Images
INSERT OR IGNORE INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
(1, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=900&auto=format&fit=crop', 1, 0),
(1, 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=900&auto=format&fit=crop', 0, 1),
(2, 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=900&auto=format&fit=crop', 1, 0),
(2, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=900&auto=format&fit=crop', 0, 1),
(3, 'https://images.unsplash.com/photo-1539533018447-63fcce667883?q=80&w=900&auto=format&fit=crop', 1, 0),
(3, 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=900&auto=format&fit=crop', 0, 1),
(4, 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=900&auto=format&fit=crop', 1, 0),
(4, 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=900&auto=format&fit=crop', 0, 1),
(5, 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=900&auto=format&fit=crop', 1, 0),
(6, 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=900&auto=format&fit=crop', 1, 0),
(7, 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=900&auto=format&fit=crop', 1, 0),
(8, 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=900&auto=format&fit=crop', 1, 0);

-- Product Variants
INSERT OR IGNORE INTO product_variants (product_id, sku, size, color_name, color_hex, stock_quantity) VALUES
(1, 'MA1-BLK-S', 'S', 'Midnight Obsidian', '#16181d', 4),
(1, 'MA1-BLK-M', 'M', 'Midnight Obsidian', '#16181d', 6),
(1, 'MA1-BLK-L', 'L', 'Midnight Obsidian', '#16181d', 3),
(1, 'MA1-GRY-M', 'M', 'Gunmetal Slate', '#3a3e47', 5),
(2, 'LIN-DNE-S', 'S', 'Sand Dune', '#d5c8b5', 8),
(2, 'LIN-DNE-M', 'M', 'Sand Dune', '#d5c8b5', 12),
(2, 'LIN-ECR-M', 'M', 'Bleached Ecru', '#ece8de', 6),
(3, 'COAT-CAM-M', 'M', 'Rich Camel', '#c49a6c', 2),
(3, 'COAT-OBS-L', 'L', 'Obsidian', '#111215', 3),
(4, 'SILK-EMR-S', 'S', 'Deep Emerald', '#0e3d2f', 4),
(4, 'SILK-EMR-M', 'M', 'Deep Emerald', '#0e3d2f', 6),
(5, 'TRSR-CHR-M', 'M', 'Charcoal Mélange', '#32353d', 9),
(6, 'KNT-ECR-M', 'M', 'Raw Ecru', '#f0ede6', 15),
(7, 'BOOT-NOIR-41', 'M', 'Polished Noir', '#0d0e11', 5),
(8, 'SCARF-GLD-OS', 'ONE SIZE', 'Gold & Obsidian', '#cfa645', 8);
