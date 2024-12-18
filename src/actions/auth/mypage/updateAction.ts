'use server';

import authIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';
import { revalidatePath } from 'next/cache';

const updateAction = async (nickname: string): Promise<Return<string>> => {
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/member/updateNickname`,
    {
      method: 'PATCH',
      body: JSON.stringify({ nickname }),
    },
  );
  revalidatePath('/mypage');
  return res.json();
};

export default updateAction;
