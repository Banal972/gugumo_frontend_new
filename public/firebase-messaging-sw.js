importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
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
