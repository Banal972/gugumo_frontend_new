import { Dispatch, SetStateAction } from 'react';

export type PostidType = string;

export type CmntFormValue = {
  content: string;
};

export type SetCommnetShowType = Dispatch<SetStateAction<CommnetShowState>>;

export interface CommentDataType {
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

export interface CommnetShowState extends Pick<CommentDataType, 'commentId'> {
  type: string;
}

export interface CmntReturn {
  length: number;
  comments: CommentDataType[];
  replys: CommentDataType[];
}
