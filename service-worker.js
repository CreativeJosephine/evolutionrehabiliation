// Enhanced Service Worker with background sync and improved caching
const CACHE_NAME = 'healing-minds-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const OFFLINE_QUEUE = 'offline-queue';

// Assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/css/styles.css',
    '/js/main.js',
    '/offline.html',
    '/images/logo.png',
    '/fonts/inter-var.woff2'
];

// Cache expiration settings
const CACHE_EXPIRATION = {
    images: 30 * 24 * 60 * 60 * 1000, // 30 days
    static: 7 * 24 * 60 * 60 * 1000,  // 7 days
    dynamic: 24 * 60 * 60 * 1000      // 1 day
};

// Enhanced cache strategies
const CACHE_STRATEGIES = {
    CACHE_FIRST: async (request) => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);
        
        if (cached) {
            // Check cache expiration
            const cachedDate = new Date(cached.headers.get('date'));
            const now = new Date();
            const isExpired = (now - cachedDate) > CACHE_EXPIRATION.static;
            
            if (!isExpired) return cached;
        }
        
        try {
            const response = await fetch(request);
            cache.put(request, response.clone());
            return response;
        } catch (error) {
            return cached || cache.match('/offline.html');
        }
    },
    
    NETWORK_FIRST: async (request) => {
        try {
            const response = await fetch(request);
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, response.clone());
            return response;
        } catch (error) {
            const cached = await caches.match(request);
            return cached || caches.match('/offline.html');
        }
    }
};

// Background sync for form submissions
class BackgroundSync {
    static async queueFormData(formData) {
        const queue = await this.getQueue();
        queue.push({
            url: formData.url,
            method: formData.method,
            body: formData.body,
            timestamp: Date.now()
        });
        await this.saveQueue(queue);
    }

    static async processQueue() {
        const queue = await this.getQueue();
        const failedItems = [];

        for (const item of queue) {
            try {
                await fetch(item.url, {
                    method: item.method,
                    body: item.body,
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (error) {
                if (Date.now() - item.timestamp < 24 * 60 * 60 * 1000) {
                    failedItems.push(item);
                }
            }
        }

        await this.saveQueue(failedItems);
    }

    static async getQueue() {
        const data = await idb.get('offline-queue') || [];
        return data;
    }

    static async saveQueue(queue) {
        await idb.set('offline-queue', queue);
    }
}

// Service Worker event listeners
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            caches.keys().then(keys => 
                Promise.all(
                    keys.map(key => {
                        if (key !== CACHE_NAME && key !== DYNAMIC_CACHE) {
                            return caches.delete(key);
                        }
                    })
                )
            ),
            // Clean up expired cache entries
            cleanExpiredCache()
        ])
    );
});

self.addEventListener('fetch', event => {
    // Handle form submissions
    if (event.request.method === 'POST') {
        event.respondWith(
            fetch(event.request.clone()).catch(error => {
                BackgroundSync.queueFormData({
                    url: event.request.url,
                    method: 'POST',
                    body: event.request.clone().formData()
                });
                return new Response(JSON.stringify({ 
                    status: 'offline',
                    message: 'Your request has been queued and will be processed when online.'
                }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            })
        );
        return;
    }

    // Handle navigation requests
    if (event.request.mode === 'navigate') {
        event.respondWith(CACHE_STRATEGIES.NETWORK_FIRST(event.request));
        return;
    }

    // Handle image requests
    if (event.request.destination === 'image') {
        event.respondWith(CACHE_STRATEGIES.CACHE_FIRST(event.request));
        return;
    }

    // Default strategy
    event.respondWith(CACHE_STRATEGIES.NETWORK_FIRST(event.request));
});

self.addEventListener('sync', event => {
    if (event.tag === 'sync-forms') {
        event.waitUntil(BackgroundSync.processQueue());
    }
});

// Clean expired cache entries
async function cleanExpiredCache() {
    const caches = await caches.keys();
    for (const cacheName of caches) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
            const response = await cache.match(request);
            const cachedDate = new Date(response.headers.get('date'));
            const now = new Date();
            
            let maxAge;
            if (request.url.includes('/images/')) {
                maxAge = CACHE_EXPIRATION.images;
            } else if (cacheName === DYNAMIC_CACHE) {
                maxAge = CACHE_EXPIRATION.dynamic;
            } else {
                maxAge = CACHE_EXPIRATION.static;
            }
            
            if ((now - cachedDate) > maxAge) {
                await cache.delete(request);
            }
        }
    }
} 