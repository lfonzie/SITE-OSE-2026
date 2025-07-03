import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import compression from "compression";

const app = express();

// Configurar CORS para produção
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Enable compression for all responses
app.use(compression({
  threshold: 1024, // Only compress if response is larger than 1KB
  level: 6, // Compression level (1-9, 6 is balanced)
  filter: (req, res) => {
    // Always compress images and text
    const contentType = res.getHeader('content-type');
    if (typeof contentType === 'string') {
      return contentType.includes('image/') || contentType.includes('text/') || contentType.includes('application/json');
    }
    return compression.filter(req, res);
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cache middleware for static assets (especially images)
app.use('/images', (req, res, next) => {
  // Set aggressive caching headers for images
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
  res.setHeader('ETag', `"${Date.now()}"`);
  res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
  
  // Enable compression
  res.setHeader('Vary', 'Accept-Encoding');
  
  next();
});

// Cache middleware for API images
app.use('/api/images', (req, res, next) => {
  // Shorter cache for dynamic API images but still cache
  res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
  res.setHeader('Vary', 'Accept-Encoding');
  next();
});



app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Serve static images in all environments FIRST
  app.use('/images', express.static(path.join(process.cwd(), 'client/public/images')));
  
  // Register API routes
  registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Create HTTP server
  const server = createServer(app);



  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // Serve static files from client/public in production
    app.use(express.static(path.join(process.cwd(), 'client/public')));
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
