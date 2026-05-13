const CACHE = 'dixipixie8-v3';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // NO interceptar peticiones a Google Scripts ni externas
  var url = e.request.url;
  if (url.indexOf('script.google.com') > -1 || url.indexOf('googleapis.com') > -1) {
    return; // dejar pasar sin interceptar
  }
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request);
    })
  );
});
