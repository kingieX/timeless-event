self.addEventListener('push', function (event) {
  const options = {
    body: event.data.text(),
    icon: '/icon.png',
    badge: '/badge.png',
  };

  event.waitUntil(
    self.registration.showNotification('New Push Notification', options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  // Optionally, handle the click event (e.g., open a page, etc.)
});
