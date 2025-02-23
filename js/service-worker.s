// Enhanced Service Worker with dynamic caching and offline support
const CACHE_NAME = 'healing-minds-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/css/styles.css',
    '/js/main.js',
    '/offline.html',
    '/images/logo.png'
];

// Cache strategies
const CACHE_STRATEGIES = {
    CACHE_FIRST: async (request) => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);
        if (cached) return cached;
        
        try {
            const response = await fetch(request);
            cache.put(request, response.clone());
            return response;
        } catch (error) {
            return cache.match('/offline.html');
        }
    },
    
    NETWORK_FIRST: async (request) => {
        try {
            const response = await fetch(request);
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, response.clone());
            return response;
        } catch (error) {
            return caches.match(request);
        }
    }
};

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
    );
});

self.addEventListener('fetch', event => {
    const strategy = event.request.mode === 'navigate' 
        ? CACHE_STRATEGIES.NETWORK_FIRST 
        : CACHE_STRATEGIES.CACHE_FIRST;
        
    event.respondWith(strategy(event.request));
}); 
