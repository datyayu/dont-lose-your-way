const CACHE_VERSION = 1.0
const CACHE_NAME = `dont-lose-your-way-v${CACHE_VERSION}`
const CACHED_ASSETS = [
  '/dont-lose-your-way/',
  '/dont-lose-your-way/index.html',
  '/dont-lose-your-way/css/styles.css',
  '/dont-lose-your-way/js/player.js',
  '/dont-lose-your-way/dont.mp3',
]

/*
** Install SW
*/
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache
          .addAll(CACHED_ASSETS)
          .then(_ => self.skipWaiting())
      })
  )
})

/*
** ACTIVATE SW
*/
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

/*
** Intercept fetch
*/
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  )
})
