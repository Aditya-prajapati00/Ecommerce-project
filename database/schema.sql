PRAGMA foreign_keys = ON;

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  description TEXT,
  material TEXT,
  fit TEXT,
  origin TEXT,
  care TEXT,
  price REAL NOT NULL,
  compare_price REAL,
  badge TEXT,
  rating REAL DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Product Variants (Sizes, Colors, Stock)
CREATE TABLE IF NOT EXISTS product_variants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE NOT NULL,
  size TEXT NOT NULL,          -- 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'ONE SIZE'
  color_name TEXT NOT NULL,
  color_hex TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  price_modifier REAL DEFAULT 0.0
);

-- Product Images
CREATE TABLE IF NOT EXISTS product_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_postal TEXT NOT NULL,
  shipping_country TEXT NOT NULL,
  subtotal REAL NOT NULL,
  discount REAL DEFAULT 0.0,
  shipping_fee REAL DEFAULT 0.0,
  tax_amount REAL DEFAULT 0.0,
  total_amount REAL NOT NULL,
  status TEXT DEFAULT 'CONFIRMED', -- CONFIRMED, PROCESSING, SHIPPED, DELIVERED
  tracking_number TEXT,
  payment_method TEXT DEFAULT 'CARD',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER,
  product_title TEXT NOT NULL,
  selected_size TEXT NOT NULL,
  selected_color TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  line_total REAL NOT NULL,
  image_url TEXT
);

-- Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL, -- 'percent' or 'shipping' or 'flat'
  discount_value REAL NOT NULL,
  description TEXT,
  is_active INTEGER DEFAULT 1
);
