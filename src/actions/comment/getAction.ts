'use server';

import authIntance from '@/lib/fetchInstance';
import { CmntReturn, CommentDataType } from '@/types/cmnt.type';
import { Return } from '@/types/get.type';

const getAction = async (postid: string): Promise<Return<CmntReturn>> => {
  const response = await authIntance(
    `${process.env.API_URL}/api/v1/comment/${postid}`,
    {
      next: {
        tags: ['cmnt'],
      },
    },
  );

  const data: Return<CommentDataType[]> = await response.json();

  const comments = data.data.filter((el) => !el.parentCommentId);
  const replys = data.data.filter((el) => el.parentCommentId);

  return {
    status: data.status,
    data: {
      length: data.data.length,
      comments,
      replys,
    },
    message: data.message,
  };
};

export default getAction;
