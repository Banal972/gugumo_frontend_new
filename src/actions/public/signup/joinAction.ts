'use server';

import baseIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';
import { JoinActionBody } from '@/types/user.type';

const joinAction = async (body: JoinActionBody): Promise<Return<boolean>> => {
  const res = await baseIntance(`${process.env.API_URL}/api/v2/member`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return res.json();
};

export default joinAction;
