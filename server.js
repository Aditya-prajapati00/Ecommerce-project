/**
 * ============================================================================
 * ATELIER LUXE - SERVER ENTRYPOINT
 * ============================================================================
 * Decoupled E-Commerce Backend & Static Asset Server
 */

const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure local uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Attempt to load Express; fallback to native http if not installed yet
let express;
try {
  express = require('express');
} catch (e) {
  express = null;
}

if (express) {
  const app = express();
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
  });

  // Static Local Uploads Folder
  app.use('/uploads', express.static(UPLOADS_DIR));

  // Serve Frontend Static Files
  app.use(express.static(__dirname));

  // Health / Status endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'online',
      platform: 'Atelier Luxe Haute Couture',
      architecture: 'Decoupled Node.js Express REST API',
      timestamp: new Date().toISOString()
    });
  });

  // Fallback to index.html for client-side navigation
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`\n=======================================================`);
    console.log(`✦ ATELIER LUXE HAUTE COUTURE PLATFORM RUNNING`);
    console.log(`  Local URL:   http://localhost:${PORT}`);
    console.log(`  Uploads Dir: ${UPLOADS_DIR}`);
    console.log(`  Status:      Decoupled Express Server Ready`);
    console.log(`=======================================================\n`);
  });

} else {
  // Built-in Native Node HTTP Server (Zero Dependencies Fallback)
  const http = require('http');

  const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      return res.end();
    }

    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

    const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
    let filePath = path.join(__dirname, safePath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // Fallback to index.html
        filePath = path.join(__dirname, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (readErr, content) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Internal Server Error');
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      });
    });
  });

  const startListen = (p) => {
    const s = server.listen(p, () => {
      console.log(`\n=======================================================`);
      console.log(`✦ ATELIER LUXE HAUTE COUTURE PLATFORM RUNNING`);
      console.log(`  Local URL:   http://localhost:${p}`);
      console.log(`  Uploads Dir: ${UPLOADS_DIR}`);
      console.log(`  Status:      Node.js Server Active`);
      console.log(`=======================================================\n`);
    });

    s.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${p} is in use, attempting port ${p + 1}...`);
        startListen(p + 1);
      } else {
        console.error('Server error:', err);
      }
    });
  };

  startListen(PORT);
}
