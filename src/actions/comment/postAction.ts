'use server';

import authIntance from '@/lib/fetchInstance';
import { CommentDataType } from '@/types/cmnt.type';
import { Return } from '@/types/get.type';
import { revalidateTag } from 'next/cache';

interface PostActionBody
  extends Pick<CommentDataType, 'content' | 'parentCommentId'> {
  postId: string;
}

const postAction = async (body: PostActionBody): Promise<Return<string>> => {
  const res = await authIntance(`${process.env.API_URL}/api/v1/comment/new`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  revalidateTag('cmnt');
  return res.json();
};

export default postAction;
