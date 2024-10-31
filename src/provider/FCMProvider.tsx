'use client';

import fcmGetTokenAction from '@/actions/fcm/fcmGetTokenAction';
import { messaging } from '@/lib/firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';

type FCMProviderProps = { children: ReactNode };

const createNotification = (title: string, body: string) => {
  if (Notification.permission === 'granted') {
    return new Notification(title, {
      body,
      icon: '/icons/android-icon-48x48.png',
    });
  }
  console.error('Notification permission not granted.');
};

const subscribeHandler = async (token: string) => {
  if (!token) return;
  // token
  const res = await fcmGetTokenAction(token);
  if (res.status === 'fail') return alert('등록에 실패하였습니다.');
};

const FCMProvider = ({ children }: FCMProviderProps) => {
  const { status } = useSession() as any;

  const [token, setToken] = useState('');

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission === 'denied') {
      return console.error('메세지 알림 거부');
    }

    const fcmToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY,
    });
    setToken(fcmToken);

    // 메세지 수신되면 출력
    onMessage(messaging, (payload) => {
      const { notification } = payload;
      if (!notification) return;
      const { title, body } = notification;
      if (title && body) createNotification(title, body);
    });
  };

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (status !== 'authenticated' || token === '') return;
    subscribeHandler(token);
  }, [status, token]);

  return children;
};

export default FCMProvider;
