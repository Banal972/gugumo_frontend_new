'use client';

import fcmGetTokenAction from '@/actions/fcm/fcmGetTokenAction';
import { getFCMToken } from '@/lib/firebase';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';

type FCMProviderProps = { children: ReactNode };

const FCMProvider = ({ children }: FCMProviderProps) => {
  const { data: session } = useSession() as any;
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    if (session?.accessToken && !isToken) {
      const pushToken = async () => {
        const fcmToken = await getFCMToken();
        if (!fcmToken) return setIsToken(true);
        await fcmGetTokenAction(fcmToken);
        setIsToken(true);
      };
      pushToken();
    }
  }, [session, isToken]);

  return children;
};

export default FCMProvider;
