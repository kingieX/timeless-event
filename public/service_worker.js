'use strict';

// Cache name for resources
const CACHE_NAME = 'timelessplanner-v1';

// Service Worker Install Event
self.addEventListener('install', function (event) {
  console.log('Service Worker installing.');
  // Optionally cache resources
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/', // Add other critical resources here if needed
      ]);
    })
  );
});

// Activate Event for Cleanup
self.addEventListener('activate', function (event) {
  console.log('Service Worker activating.');
  // Delete old caches
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Handle Push Event
self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');

  let data;
  try {
    data = event.data.json();
  } catch (error) {
    console.error('[Service Worker] Push data is not JSON:', error);
    data = { title: 'New Notification', body: event.data.text() };
  }

  const { title, body, icon, media } = data;

  const options = {
    body: body || 'Default body',
    icon: icon || '/default-icon.png',
    image: media || '',
    badge: '/badge-icon.png' || '',
    vibrate: [200, 100, 200],
    requireInteraction: true, // Keeps the notification until the user dismisses it
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle Notification Click Event
self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification clicked.');
  event.notification.close();

  // Open or focus a specific URL
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/'); // Change to desired URL
      }
    })
  );
});
