/**
 * ============================================================================
 * ATELIER LUXE - REST API ROUTER (EXPRESS.JS + SQLITE3)
 * ============================================================================
 */

const express = require('express');
const router = express.Router();
const db = require('../../database/db');
const upload = require('../middleware/upload');

// ----------------------------------------------------------------------------
// 1. Image Upload to Local Folder
// ----------------------------------------------------------------------------
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file uploaded.' });
    }
    const relativePath = `/uploads/${req.file.filename}`;
    res.status(201).json({
      success: true,
      message: 'Garment image stored successfully in local folder.',
      filePath: relativePath,
      fileName: req.file.filename,
      size: req.file.size
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------------------------------
// 2. Categories
// ----------------------------------------------------------------------------
router.get('/categories', async (req, res) => {
  try {
    const categories = await db.all('SELECT * FROM categories ORDER BY id ASC');
    res.json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------------------------------
// 3. Products (Catalog & Filtering)
// ----------------------------------------------------------------------------
router.get('/products', async (req, res) => {
  try {
    const { category, search, maxPrice, size, sort, inStockOnly } = req.query;

    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_slug = c.slug 
      WHERE p.is_active = 1
    `;
    const params = [];

    if (category && category !== 'all') {
      query += ` AND p.category_slug = ?`;
      params.push(category);
    }

    if (search && search.trim()) {
      query += ` AND (p.title LIKE ? OR p.subtitle LIKE ? OR p.description LIKE ? OR p.material LIKE ?)`;
      const term = `%${search.trim()}%`;
      params.push(term, term, term, term);
    }

    if (maxPrice) {
      query += ` AND p.price <= ?`;
      params.push(Number(maxPrice));
    }

    if (sort) {
      if (sort === 'price-asc') query += ` ORDER BY p.price ASC`;
      else if (sort === 'price-desc') query += ` ORDER BY p.price DESC`;
      else if (sort === 'rating') query += ` ORDER BY p.rating DESC`;
      else query += ` ORDER BY p.id ASC`;
    } else {
      query += ` ORDER BY p.id ASC`;
    }

    const rows = await db.all(query, params);

    // Populate images and variants for each product
    const products = await Promise.all(rows.map(async (row) => {
      const images = await db.all('SELECT image_url, is_primary FROM product_images WHERE product_id = ? ORDER BY sort_order ASC', [row.id]);
      const variants = await db.all('SELECT * FROM product_variants WHERE product_id = ?', [row.id]);

      const primaryImg = images.find(img => img.is_primary) || images[0];
      const imageUrl = primaryImg ? primaryImg.image_url : '/assets/images/placeholder.jpg';
      const gallery = images.map(img => img.image_url);

      const sizes = [...new Set(variants.map(v => v.size))];
      const colorMap = new Map();
      variants.forEach(v => {
        if (!colorMap.has(v.color_name)) {
          colorMap.set(v.color_name, { name: v.color_name, hex: v.color_hex });
        }
      });
      const colors = Array.from(colorMap.values());
      const totalStock = variants.reduce((sum, v) => sum + v.stock_quantity, 0);

      return {
        id: row.slug || String(row.id),
        dbId: row.id,
        name: row.title,
        subtitle: row.subtitle,
        category: row.category_slug,
        price: row.price,
        originalPrice: row.compare_price,
        rating: row.rating,
        reviewCount: row.review_count,
        badge: row.badge,
        inStock: totalStock > 0,
        stockRemaining: totalStock,
        sizes: sizes.length ? sizes : ['S', 'M', 'L'],
        colors: colors.length ? colors : [{ name: 'Obsidian', hex: '#16181d' }],
        image: imageUrl,
        gallery: gallery.length ? gallery : [imageUrl],
        description: row.description,
        details: {
          material: row.material,
          fit: row.fit,
          origin: row.origin,
          care: row.care
        }
      };
    }));

    // Filter by size if requested
    let filtered = products;
    if (size) {
      filtered = filtered.filter(p => p.sizes.includes(size));
    }
    if (inStockOnly === 'true' || inStockOnly === true) {
      filtered = filtered.filter(p => p.inStock && p.stockRemaining > 0);
    }

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------------------------------
// 4. Product Detail by Slug or ID
// ----------------------------------------------------------------------------
router.get('/products/:idOrSlug', async (req, res) => {
  try {
    const param = req.params.idOrSlug;
    let productRow = await db.get('SELECT * FROM products WHERE slug = ? OR id = ?', [param, param]);
    if (!productRow) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }

    const images = await db.all('SELECT image_url, is_primary FROM product_images WHERE product_id = ? ORDER BY sort_order ASC', [productRow.id]);
    const variants = await db.all('SELECT * FROM product_variants WHERE product_id = ?', [productRow.id]);

    const primaryImg = images.find(img => img.is_primary) || images[0];
    const imageUrl = primaryImg ? primaryImg.image_url : '/assets/images/placeholder.jpg';

    const sizes = [...new Set(variants.map(v => v.size))];
    const colorMap = new Map();
    variants.forEach(v => {
      if (!colorMap.has(v.color_name)) {
        colorMap.set(v.color_name, { name: v.color_name, hex: v.color_hex });
      }
    });

    const totalStock = variants.reduce((sum, v) => sum + v.stock_quantity, 0);

    const payload = {
      id: productRow.slug || String(productRow.id),
      dbId: productRow.id,
      name: productRow.title,
      subtitle: productRow.subtitle,
      category: productRow.category_slug,
      price: productRow.price,
      originalPrice: productRow.compare_price,
      rating: productRow.rating,
      reviewCount: productRow.review_count,
      badge: productRow.badge,
      inStock: totalStock > 0,
      stockRemaining: totalStock,
      sizes: sizes.length ? sizes : ['S', 'M', 'L'],
      colors: Array.from(colorMap.values()),
      image: imageUrl,
      gallery: images.map(img => img.image_url),
      description: productRow.description,
      details: {
        material: productRow.material,
        fit: productRow.fit,
        origin: productRow.origin,
        care: productRow.care
      },
      rawVariants: variants
    };

    res.json({ success: true, data: payload });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------------------------------
// 5. Create Product (Admin / Studio)
// ----------------------------------------------------------------------------
router.post('/products', async (req, res) => {
  try {
    const {
      name, subtitle, category, price, originalPrice, badge,
      sizes = ['S', 'M', 'L'],
      colors = [{ name: 'Obsidian Noir', hex: '#16181d' }],
      stockRemaining = 8,
      image,
      gallery = [],
      description,
      details = {}
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, error: 'Product name, price, and category are required.' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

    const insertResult = await db.run(`
      INSERT INTO products (category_slug, title, slug, subtitle, description, material, fit, origin, care, price, compare_price, badge, stock_quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      category,
      name,
      slug,
      subtitle || '',
      description || '',
      details.material || 'Artisanal Luxury Fabric',
      details.fit || 'Sartorial tailored fit',
      details.origin || 'Milan Studio',
      details.care || 'Specialist dry clean only.',
      Number(price),
      originalPrice ? Number(originalPrice) : null,
      badge || 'NEW ARRIVAL',
      Number(stockRemaining)
    ]);

    const newProductId = insertResult.lastID;

    // Add Image
    const finalImage = image || '/uploads/default-garment.jpg';
    await db.run('INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES (?, ?, 1, 0)', [newProductId, finalImage]);

    if (Array.isArray(gallery) && gallery.length > 0) {
      for (let i = 0; i < gallery.length; i++) {
        if (gallery[i] !== finalImage) {
          await db.run('INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES (?, ?, 0, ?)', [newProductId, gallery[i], i + 1]);
        }
      }
    }

    // Add Variants for each size & color
    for (const size of sizes) {
      for (const color of colors) {
        const sku = `${slug.substring(0, 6).toUpperCase()}-${size}-${color.name.substring(0, 3).toUpperCase()}`;
        await db.run(`
          INSERT INTO product_variants (product_id, sku, size, color_name, color_hex, stock_quantity)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [newProductId, sku, size, color.name, color.hex, Math.ceil(Number(stockRemaining) / sizes.length)]);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Garment piece successfully published to SQLite3 database.',
      productId: newProductId,
      slug
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------------------------------
// 6. Cart Calculation & Stock Verification
// ----------------------------------------------------------------------------
router.post('/cart/calculate', async (req, res) => {
  try {
    const { items = [], promoCode = '' } = req.body;

    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await db.get('SELECT id, title, price, compare_price FROM products WHERE slug = ? OR id = ?', [item.productId || item.id, item.productId || item.id]);
      const unitPrice = product ? product.price : (item.price || 0);
      const lineTotal = unitPrice * (item.quantity || 1);
      subtotal += lineTotal;

      validatedItems.push({
        ...item,
        unitPrice,
        lineTotal
      });
    }

    let discount = 0;
    const cleanCode = (promoCode || '').toUpperCase().trim();
    if (cleanCode) {
      const coupon = await db.get('SELECT * FROM coupons WHERE code = ? AND is_active = 1', [cleanCode]);
      if (coupon) {
        if (coupon.discount_type === 'percent') {
          discount = subtotal * (coupon.discount_value / 100);
        } else if (coupon.discount_type === 'flat') {
          discount = Math.min(subtotal, coupon.discount_value);
        }
      }
    }

    const freeShippingThreshold = 200;
    const isFreeShipping = subtotal >= freeShippingThreshold || cleanCode === 'FREESHIP';
    const shipping = (isFreeShipping || subtotal === 0) ? 0 : 25;
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = Math.round(taxableAmount * 0.08); // 8% Luxury Tax
    const total = Math.max(0, taxableAmount + shipping + tax);

    res.json({
      success: true,
      subtotal,
      discount,
      shipping,
      tax,
      total,
      freeShippingEligible: isFreeShipping,
      amountNeededForFreeShipping: Math.max(0, freeShippingThreshold - subtotal),
      items: validatedItems
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------------------------------
// 7. Order Placement (Atomic Transaction)
// ----------------------------------------------------------------------------
router.post('/orders', async (req, res) => {
  try {
    const { customer = {}, shippingTier = {}, items = [], totals = {}, paymentMethod = 'CARD' } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cannot place an empty order.' });
    }

    const orderNumber = `ATL-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `EXP-US-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderResult = await db.run(`
      INSERT INTO orders (
        order_number, customer_name, customer_email, customer_phone,
        shipping_address, shipping_city, shipping_postal, shipping_country,
        subtotal, discount, shipping_fee, tax_amount, total_amount,
        status, tracking_number, payment_method
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      orderNumber,
      customer.name || 'Discerning Client',
      customer.email || 'client@atelier.com',
      customer.phone || '',
      customer.address || '',
      customer.city || '',
      customer.postalCode || '',
      customer.country || 'US',
      Number(totals.subtotal) || 0,
      Number(totals.discount) || 0,
      Number(totals.shipping) || 0,
      Number(totals.tax) || 0,
      Number(totals.total) || 0,
      'CONFIRMED',
      trackingNumber,
      paymentMethod
    ]);

    const orderId = orderResult.lastID;

    // Insert Order Items and decrement stock
    for (const item of items) {
      await db.run(`
        INSERT INTO order_items (order_id, product_title, selected_size, selected_color, quantity, unit_price, line_total, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        orderId,
        item.name || 'Garment Piece',
        item.size || 'M',
        item.color || 'Obsidian',
        item.quantity || 1,
        Number(item.price) || 0,
        (Number(item.price) || 0) * (item.quantity || 1),
        item.image || ''
      ]);

      // Decrement stock in product_variants if matching variant exists
      await db.run(`
        UPDATE product_variants 
        SET stock_quantity = MAX(0, stock_quantity - ?) 
        WHERE size = ? AND color_name = ?
      `, [item.quantity || 1, item.size || 'M', item.color || 'Obsidian']);
    }

    res.status(201).json({
      success: true,
      message: 'Order verified and recorded in SQLite3 database.',
      orderNumber,
      trackingNumber,
      estimatedDelivery: '3-5 Business Days (Insured Courier)',
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------------------------------
// 8. Order Tracking by Order Number
// ----------------------------------------------------------------------------
router.get('/orders/:orderNumber', async (req, res) => {
  try {
    const cleanNumber = (req.params.orderNumber || '').trim().toUpperCase();
    const order = await db.get('SELECT * FROM orders WHERE order_number = ?', [cleanNumber]);

    if (!order) {
      return res.status(404).json({ success: false, error: `Order ${cleanNumber} not found in database.` });
    }

    const items = await db.all('SELECT * FROM order_items WHERE order_id = ?', [order.id]);

    const formattedOrder = {
      orderNumber: order.order_number,
      createdAt: order.created_at,
      status: order.status,
      trackingNumber: order.tracking_number,
      customer: {
        name: order.customer_name,
        email: order.customer_email,
        address: order.shipping_address,
        city: order.shipping_city,
        postalCode: order.shipping_postal,
        country: order.shipping_country
      },
      shippingTier: {
        name: 'Complimentary Insured Courier',
        eta: '3-5 Business Days'
      },
      totals: {
        subtotal: order.subtotal,
        discount: order.discount,
        shipping: order.shipping_fee,
        tax: order.tax_amount,
        total: order.total_amount
      },
      items: items.map(i => ({
        name: i.product_title,
        size: i.selected_size,
        color: i.selected_color,
        quantity: i.quantity,
        price: i.unit_price,
        image: i.image_url || '/assets/images/placeholder.jpg'
      }))
    };

    res.json({ success: true, data: formattedOrder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
