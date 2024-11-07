'use server';

import authIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';
import { revalidateTag } from 'next/cache';

const deleteAction = async (commentId: number): Promise<Return<string>> => {
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/comment/${commentId}`,
    {
      method: 'DELETE',
    },
  );
  revalidateTag('cmnt');
  return res.json();
};

export default deleteAction;
