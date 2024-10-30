'use server';

import authIntance from '@/lib/fetchInstance';

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

const getAction = async (postid: string) => {
  const response = await authIntance(`/back/api/v1/comment/${postid}`);

  const data = await response.json();

  const comments: CommentDataT[] = data.data.filter(
    (el: CommentDataT) => !el.parentCommentId,
  );
  const replys: CommentDataT[] = data.data.filter(
    (el: CommentDataT) => el.parentCommentId,
  );

  return {
    status: data.status,
    length: data.data.length,
    comments,
    replys,
    message: data.message,
  };
};

export default getAction;
