const CACHE_NAME = 'tuner-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js', 
  '/frequency-bars.js', 
  '/meter.js',
  '/notes.js', 
  '/tuner.js', 
  '/sw.js',
  'https://cdn.jsdelivr.net/npm/aubiojs@0.1.1/build/aubio.min.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@9',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
