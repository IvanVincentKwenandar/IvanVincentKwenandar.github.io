var CACHE_NAME = 'first-app';
var urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/blog.html',
  '/contact.html',
  '/portfolio-example01.html',
  '/styles.css',
  '/app.js',
  '/images/logo.png',
  '/images/example-work01.jpg',
  '/images/example-work07.jpg',
  '/images/example-work02.jpg',
  '/images/example-work03.jpg',
  '/images/example-work04.jpg',
  '/images/example-work05.jpg',
  '/images/example-work06.jpg',
  '/images/example-work08.jpg',
  '/images/example-work09.jpg',
  '/Tutorial/*'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});