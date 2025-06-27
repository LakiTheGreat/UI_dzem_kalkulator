/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'my-pwa-cache-v1';
const FILES_TO_CACHE = [
  '/', // Make sure this resolves to index.html
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  // Add paths to your built JS/CSS files if not hashed
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((cachedResponse) => {
        // If not in cache, return the app shell (index.html)
        return cachedResponse || caches.match('/');
      })
    )
  );
});
