const CACHE_NAME = 'tuner-v2';
const FILES_TO_CACHE = [
  '/tuner/',                  // Base path
  '/tuner/index.html',
  '/tuner/styles.css',
  '/tuner/app.js',
  '/tuner/frequency-bars.js',
  '/tuner/meter.js',
  '/tuner/notes.js',
  '/tuner/tuner.js',
  '/tuner/sw.js',
  '/tuner/manifest.json',
  '/tuner/icon-192.png',
  '/tuner/icon-512.png',
  'https://cdn.jsdelivr.net/npm/aubiojs@0.1.1/build/aubio.min.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@9/dist/sweetalert2.min.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@9/dist/sweetalert2.min.css' 
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        FILES_TO_CACHE.map(url => {
          return cache.add(url).catch(err => {
            console.error(`Failed to cache ${url}:`, err);
          });
        })
      );
    }).then(() => self.skipWaiting())
  );
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
