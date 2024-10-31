'use server';

import authIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';

interface PatchActionProps {
  body: any;
  postId: number;
}

const patchAction = async ({
  body,
  postId,
}: PatchActionProps): Promise<Return<string>> => {
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/meeting/${postId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
    },
  );

  return res.json();
};

export default patchAction;
