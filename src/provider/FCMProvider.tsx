'use client';

import { messaging } from '@/lib/firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const subscribeFetch = async (session: any, token: string) => {
  if (!session) return;
  const response = await fetch('/back/api/v1/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: session.accessToken,
    },
    body: JSON.stringify({ fcmToken: token }),
  });

  if (!response.ok) {
    return console.log('에러가 발생했습니다.');
  }

  if (response) {
    const data = await response.json();

    if (data.status === 'success') {
      // console.log("등록완료");
    } else {
      console.log('등록실패');
    }
  }
};

export default function FCMProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession() as any;
  const [token, setToken] = useState('');
  const requestPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY,
      });
      setToken(token);
    } else {
      console.log('메세지 알림 거부');
    }

    // 메세지 수신되면 출력
    onMessage(messaging, (payload) => {
      const { notification } = payload;
      if (notification) {
        const { title, body } = notification;
        if (title && body) {
          new Notification(title, {
            body,
            icon: '/icons/android-icon-48x48.png',
          });
        }
      }
    });
  };

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (status !== 'authenticated' || token === '') return;
    subscribeFetch(session, token);
  }, [status, token]);

  return <>{children}</>;
}
