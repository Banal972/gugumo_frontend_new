'use server';

import authIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';

const fcmGetTokenAction = async (fcmToken: string): Promise<Return<string>> => {
  const res = await authIntance(`${process.env.API_URL}/api/v1/subscribe`, {
    method: 'POST',
    body: JSON.stringify({ fcmToken }),
  });
  const json = await res.json();
  return json;
};

export default fcmGetTokenAction;
