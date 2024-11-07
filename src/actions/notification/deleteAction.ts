'use server';

import authIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';

const deleteAction = async (notiId: number): Promise<Return<string>> => {
  const res = await authIntance(`/back/api/v1/notification/${notiId}`, {
    method: 'DELETE',
  });
  return res.json();
};

export default deleteAction;
