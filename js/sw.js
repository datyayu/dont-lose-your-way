importScripts('./cache-polyfill.js');


self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('dont-lose-your-way').then(function(cache) {
      return cache.addAll([
        '/dont-lose-your-way/',
        '/dont-lose-your-way/index.html',
        '/dont-lose-your-way/css/styles.css',
        '/dont-lose-your-way/js/player.js',
        '/dont-lose-your-way/dont.mp3',
      ]).then(function() {
        return self.skipWaiting();
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
