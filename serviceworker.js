console.log("This is service worker talking");
var cacheName = 'blazor-pwa-sample';
var filesToCache = [
    '/',
    //Html and css files
    '/index.html',

    //Rust WA
    'minimal.wasm',

    //Our additional files
    '/manifest.json',
    '/serviceworker.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, {
            ignoreSearch: true
        }).then(response => {
            return response || fetch(event.request);
        })
    );
});