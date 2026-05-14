// Service worker desactivado — se auto-destruye
self.addEventListener('install', function() { self.skipWaiting(); });
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() { self.clients.claim(); })
  );
});
self.addEventListener('fetch', function(e) {
  // Sin interceptar nada — todo pasa directo a la red
});
