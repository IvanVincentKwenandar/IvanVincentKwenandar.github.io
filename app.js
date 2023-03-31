// navigator.serviceWorker.register('service-workers.js');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('service-workers.js')
        .then(function(registration) {
          console.log('Service worker registered successfully');
        })
        .catch(function(err) {
          console.error('Failed to register service worker', err);
        });
    });
  }