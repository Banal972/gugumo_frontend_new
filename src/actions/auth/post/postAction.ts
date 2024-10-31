'use server';

import authIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';

const postAction = async (body: any): Promise<Return<string>> => {
  const res = await authIntance(`${process.env.API_URL}/api/v1/meeting/new`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return res.json();
};

export default postAction;
