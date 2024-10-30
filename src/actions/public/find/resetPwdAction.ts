'use server';

import { authIntance } from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';

const resetPwdAction = async (email: string): Promise<Return<boolean>> => {
  const res = await authIntance(`${process.env.API_URL}/api/v1/resetPassword`, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return res.json();
};

export default resetPwdAction;
