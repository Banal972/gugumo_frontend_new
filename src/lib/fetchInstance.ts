'use server';

import authOptions from '@/lib/authOptions';
import baseIntance from '@/lib/baseInstnace';
import { getServerSession } from 'next-auth';

const authIntance = async (url: string, options: RequestInit = {}) => {
  const session = (await getServerSession(authOptions)) as any;

  const { headers, ...restOptions } = options;

  const AuthorizationOptions: RequestInit = {
    headers: {
      ...headers,
      Authorization: session?.accessToken,
    },
    ...restOptions,
  };
  return baseIntance(url, AuthorizationOptions);
};

export default authIntance;
