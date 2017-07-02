importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '415567270724'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  // Customize notification here
    const notificationTitle = payload.data.title;
    const notBody = 	payload.data.body;
    const sound = payload.data.sound;
    const badge = payload.data.badge;
    const clickAction = payload.data.click_action;

		
 // const notificationTitle = 'Projectagram Not Title';
  const notificationOptions = {
    body: notBody,
    icon: '/images/shop-icon-192.png',
    data: { url: clickAction }
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    event.notification.close();
    var url = /note-app-firebase-5320d.firebaseapp.com/;
    var newurl = "/#/home";
    if (event.notification.data.url) {
        newurl = event.notification.data.url;
    }

    function endsWith(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (url.test(client.url) && 'focus' in client) {
                    if (endsWith(client.url, newurl)) {
                      return client.focus();
                    }
                    return client.navigate(newurl)
                      .then(client => client.focus());
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(newurl);
            }
        })
    );

  });