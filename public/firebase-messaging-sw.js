importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyDC6Nr_2ZHT334rHIF7pd5qKJzzR-p5C7g",
  projectId: "gugumo-6ae1a",
  messagingSenderId: "1047696378835",
  appId: "1:1047696378835:web:ec176b1034c1fb4b153d26",
});

const messaging = firebase.messaging();

self.addEventListener("push", function (event) {
  // 받은 푸시 데이터를 처리해 알림으로 띄우는 내용
});

self.addEventListener("notificationclick", function () {
  // 띄운 알림창을 클릭했을 때 처리할 내용
});

// 백그라운드
messaging.onBackgroundMessage(function (payload) {
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./icons/android-icon-48x48.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
