'use server';

import authIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';

const deleteAction = async (postid: string): Promise<Return<string>> => {
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/meeting/${postid}`,
    {
      method: 'DELETE',
    },
  );
  return res.json();
};

export default deleteAction;
