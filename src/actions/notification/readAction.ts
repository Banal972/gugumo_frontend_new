'use server';

import authIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';

const readAction = async (notiId: number): Promise<Return<string>> => {
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/notification/read/${notiId}`,
    {
      method: 'PATCH',
    },
  );

  return res.json();
};

export default readAction;
