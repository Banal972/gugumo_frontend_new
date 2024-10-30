'use server';

import authIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';

interface CommentDataT {
  commentId: number;
  author: string;
  content: string;
  createdDateTime: string;
  parentCommentId?: number;
  orderNum: number;
  notRoot: boolean;
  yours: boolean;
  authorExpired: boolean;
}

interface CmntReturn {
  length: number;
  comments: CommentDataT[];
  replys: CommentDataT[];
}

const getAction = async (postid: string): Promise<Return<CmntReturn>> => {
  const response = await authIntance(
    `${process.env.API_URL}/api/v1/comment/${postid}`,
    {
      next: {
        tags: ['cmnt'],
      },
    },
  );

  const data = await response.json();

  const comments: CommentDataT[] = data.data.filter(
    (el: CommentDataT) => !el.parentCommentId,
  );
  const replys: CommentDataT[] = data.data.filter(
    (el: CommentDataT) => el.parentCommentId,
  );

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
