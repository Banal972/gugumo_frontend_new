'use server';

import authIntance from '@/lib/fetchInstance';
import { CommentDataType } from '@/types/cmnt.type';
import { Return } from '@/types/get.type';
import { revalidateTag } from 'next/cache';

type PatchActionBody = Pick<CommentDataType, 'commentId' | 'content'>;

const patchAction = async (body: PatchActionBody): Promise<Return<string>> => {
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/comment/${body.commentId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
    },
  );
  revalidateTag('cmnt');
  return res.json();
};

export default patchAction;
