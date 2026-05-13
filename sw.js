const CACHE = 'dixipixie8-v1';
const FILES = [
  '/dixiepixie8/',
  '/dixiepixie8/index.html',
  '/dixiepixie8/banco_misiones_real.html',
  '/dixiepixie8/manifest.json',
  '/dixiepixie8/icon-192.png',
  '/dixiepixie8/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/dixiepixie8/index.html')))
  );
});
