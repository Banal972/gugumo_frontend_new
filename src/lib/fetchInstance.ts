'use server';

import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

const baseIntance = async (url: string, options: RequestInit = {}) => {
  const { headers, ...restOptions } = options;

  try {
    const defaultOptions: RequestInit = {
      headers: {
        ...headers,
        'Content-Type': 'Application/json',
      },
      ...restOptions,
    };

    const res = await fetch(url, defaultOptions);
    if (!res.ok) {
      throw new Error('서버 에러가 발생했습니다.');
    }
    return res;
  } catch (err) {
    throw new Error(err as string);
  }
};

const authIntance = async (url: string, options: RequestInit = {}) => {
  const session = (await getServerSession(authOptions)) as any;

  const { headers, ...restOptions } = options;

  const AuthorizationOptions: RequestInit = {
    headers: {
      ...headers,
      Authorization: session.accessToken,
    },
    ...restOptions,
  };
  return baseIntance(url, AuthorizationOptions);
};

export { baseIntance, authIntance };
