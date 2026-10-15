/**
 * ============================================================================
 * ATELIER LUXE - DECOUPLED BACKEND SERVER (EXPRESS.JS + SQLITE3)
 * ============================================================================
 */

const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

let express = null;
let cors = null;
try {
  express = require('express');
  cors = require('cors');
} catch (e) {
  console.warn('[Warning] Express/CORS not loaded, falling back to native HTTP server.');
}

if (express) {
  const app = express();
  const apiRouter = require('./server/routes/api');

  // Middleware
  app.use(cors ? cors() : (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static Local Uploads Folder
  app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '1d' }));

  // Mount REST API Router
  app.use('/api/v1', apiRouter);

  // Serve Frontend Static Files
  app.use(express.static(__dirname));

  // Fallback to index.html for client-side routing
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ success: false, error: 'Endpoint not found.' });
    }
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  const startServer = (port) => {
    const s = app.listen(port, () => {
      console.log(`\n=======================================================`);
      console.log(`✦ ATELIER LUXE DECOUPLED BACKEND RUNNING (EXPRESS + SQLITE3)`);
      console.log(`  Local URL:   http://localhost:${port}`);
      console.log(`  API Base:    http://localhost:${port}/api/v1`);
      console.log(`  Uploads Dir: ${UPLOADS_DIR}`);
      console.log(`  Database:    ${path.join(__dirname, 'database', 'atelier.db')}`);
      console.log(`=======================================================\n`);
    });

    s.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} in use, trying port ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    });
  };

  startServer(PORT);

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
    '.svg': 'image/svg+xml'
  };

  const server = http.createServer((req, res) => {
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

  const startServer = (port) => {
    const s = server.listen(port, () => {
      console.log(`\n=======================================================`);
      console.log(`✦ ATELIER LUXE SERVER ACTIVE`);
      console.log(`  Local URL: http://localhost:${port}`);
      console.log(`=======================================================\n`);
    });

    s.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        startServer(port + 1);
      }
    });
  };

  startServer(PORT);
}
