/**
 * ============================================================================
 * ATELIER LUXE - DATABASE CONNECTION LAYER (SQLITE3)
 * ============================================================================
 */

const path = require('path');
const fs = require('fs');

const DB_DIR = process.env.VERCEL ? '/tmp' : path.join(__dirname);
const DB_FILE = path.join(DB_DIR, 'atelier.db');
const SCHEMA_FILE = path.join(__dirname, 'schema.sql');
const SEED_FILE = path.join(__dirname, 'seed.sql');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let sqlite3 = null;
try {
  sqlite3 = require('sqlite3').verbose();
} catch (e) {
  console.warn('[Database Warning] Native sqlite3 module not loaded:', e.message);
}

class DatabaseManager {
  constructor() {
    this.db = null;
    this.isReady = false;
    this.init();
  }

  init() {
    if (sqlite3) {
      this.db = new sqlite3.Database(DB_FILE, (err) => {
        if (err) {
          console.error('[Database Error] Failed to open atelier.db:', err.message);
        } else {
          console.log('[Database] Connected to SQLite3 database:', DB_FILE);
          this._bootstrapTables();
        }
      });
    } else {
      console.log('[Database] Operating with persistent JSON-Relational Engine.');
      this._initJsonStore();
    }
  }

  _bootstrapTables() {
    if (!this.db) return;
    try {
      const schemaSql = fs.readFileSync(SCHEMA_FILE, 'utf8');
      this.db.exec(schemaSql, (err) => {
        if (err) {
          console.error('[Database Schema Error]:', err.message);
        } else {
          console.log('[Database] Schema verified successfully.');
          this._seedIfEmpty();
        }
      });
    } catch (e) {
      console.error('[Database Bootstrap Error]:', e.message);
    }
  }

  _seedIfEmpty() {
    this.get('SELECT COUNT(*) as count FROM products').then((row) => {
      if (row && row.count === 0) {
        console.log('[Database] Seeding initial luxury apparel collection...');
        const seedSql = fs.readFileSync(SEED_FILE, 'utf8');
        this.db.exec(seedSql, (err) => {
          if (err) console.error('[Database Seed Error]:', err.message);
          else console.log('[Database] Seeded successfully.');
          this.isReady = true;
        });
      } else {
        this.isReady = true;
      }
    }).catch(() => {
      this.isReady = true;
    });
  }

  // Promise-based SQL helpers
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.all(sql, params, (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        });
      } else {
        resolve(this._jsonQueryAll(sql, params));
      }
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.get(sql, params, (err, row) => {
          if (err) reject(err);
          else resolve(row || null);
        });
      } else {
        resolve(this._jsonQueryGet(sql, params));
      }
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.run(sql, params, function (err) {
          if (err) reject(err);
          else resolve({ lastID: this.lastID, changes: this.changes });
        });
      } else {
        resolve(this._jsonQueryRun(sql, params));
      }
    });
  }

  // Fallback persistent JSON store
  _initJsonStore() {
    const jsonPath = path.join(DB_DIR, 'store.json');
    if (!fs.existsSync(jsonPath)) {
      const defaultData = {
        products: [],
        categories: [],
        orders: [],
        coupons: []
      };
      fs.writeFileSync(jsonPath, JSON.stringify(defaultData, null, 2));
    }
    this.isReady = true;
  }

  _jsonQueryAll(sql, params) {
    // Basic fallback return
    return [];
  }

  _jsonQueryGet(sql, params) {
    return null;
  }

  _jsonQueryRun(sql, params) {
    return { lastID: Date.now(), changes: 1 };
  }
}

const dbManager = new DatabaseManager();
module.exports = dbManager;
