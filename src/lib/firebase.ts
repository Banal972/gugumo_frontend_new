// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// eslint-disable-next-line import/no-mutable-exports
let messaging: Messaging;

if (typeof window !== 'undefined') {
  messaging = getMessaging(app);
}

export { messaging };

export const getFCMToken = async () => {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 실행하지 않음
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'denied') return null;
    const fcmToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY,
    });
    // console.log(fcmToken);
    return fcmToken;
  } catch (err) {
    // console.error('FCM Token 오류:', err);
    return null;
  }
};
