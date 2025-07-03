const CACHE_NAME = 'ose-images-v1';
const IMAGE_CACHE_NAME = 'ose-images-cache-v1';

// URLs to cache on install
const STATIC_URLS = [
  '/images/LogoOSE100anos.png',
  '/images/horizontal_13.png',
  '/images/9.png',
  '/images/10.png',
  '/images/11.png',
  '/images/12.png',
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching critical images');
        return cache.addAll(STATIC_URLS.map(url => new Request(url, { mode: 'no-cors' })));
      })
      .catch((error) => {
        console.warn('Failed to cache some images:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache with fallback
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only handle image requests and same-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Handle image requests with caching strategy
  if (event.request.url.includes('/images/') || 
      event.request.url.includes('/api/images/') ||
      event.request.destination === 'image') {
    
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // Serve from cache
            return cachedResponse;
          }

          // Fetch from network and cache
          return fetch(event.request)
            .then((response) => {
              // Only cache successful responses
              if (response.status === 200) {
                const responseClone = response.clone();
                cache.put(event.request, responseClone);
              }
              return response;
            })
            .catch(() => {
              // Return placeholder if network fails
              return new Response(
                '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#f5f5f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14px" fill="#999">Image unavailable</text></svg>',
                {
                  headers: {
                    'Content-Type': 'image/svg+xml',
                    'Cache-Control': 'no-cache'
                  }
                }
              );
            });
        });
      })
    );
  }
});

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PRELOAD_IMAGES') {
    const urls = event.data.urls;
    
    caches.open(IMAGE_CACHE_NAME).then((cache) => {
      const promises = urls.map((url) => {
        return fetch(url).then((response) => {
          if (response.status === 200) {
            return cache.put(url, response.clone());
          }
        }).catch((error) => {
          console.warn('Failed to preload image:', url, error);
        });
      });
      
      Promise.allSettled(promises).then(() => {
        event.ports[0].postMessage({ type: 'PRELOAD_COMPLETE' });
      });
    });
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(IMAGE_CACHE_NAME).then(() => {
      event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
    });
  }
});