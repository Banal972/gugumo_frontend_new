'use server';

import authIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';
import { revalidateTag } from 'next/cache';

interface PostActionBody {
  postId: string;
  content: string;
  parentCommentId?: number;
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
