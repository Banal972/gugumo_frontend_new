'use client';

import deleteAction from '@/actions/comment/deleteAction';
import BaseBtn from '@/components/post/detail/Button/BaseBtn';
import CmntUpdate from '@/components/post/detail/Comment/atom/CmntUpdate';
import Reply from '@/components/post/detail/Comment/atom/Reply';
import User from '@/components/post/detail/Comment/atom/User';
import moment from 'moment';
import 'moment/locale/ko';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

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

interface CmntProps {
  postid: string;
  data: { length: number; comments: CommentDataT[]; replys: CommentDataT[] };
}

const Cmnt = ({ postid, data }: CmntProps) => {
  const [commnetShow, setCommnetShow] = useState({
    commentId: 0,
    type: 'edit',
  });

  return (
    <div className="mt-7 border-t-[6px] border-Surface pt-12 md:mt-12 md:pt-14">
      {data.comments.map((el, index) => (
        <React.Fragment key={el.commentId}>
          <div
            className={`flex gap-5 ${index > 0 ? 'mt-5' : ''}`}
            key={el.commentId}
          >
            <CmntList
              commnetShow={commnetShow}
              setCommnetShow={setCommnetShow}
              comment={el}
            />
          </div>

          {commnetShow.commentId === el.commentId &&
            commnetShow.type === 'reply' && (
              <Reply
                postId={postid}
                parentId={el.commentId}
                setCommnetShow={setCommnetShow}
              />
            )}

          {data.replys.map((reply) => {
            if (reply.parentCommentId === el.commentId) {
              return (
                <div
                  key={reply.commentId}
                  className="ml-[15%] mt-5 flex gap-5 md:ml-[120px]"
                >
                  <CmntList
                    commnetShow={commnetShow}
                    setCommnetShow={setCommnetShow}
                    comment={reply}
                    isReply
                  />
                </div>
              );
            }
            return null;
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Cmnt;

const CmntList = ({ commnetShow, setCommnetShow, comment, isReply }: any) => {
  const { data: session } = useSession() as any;

  const onReplyShowHandler = (commentId: number) => {
    if (!session || !session.accessToken) return alert('로그인을 해야합니다.');

    if (commnetShow.commentId === commentId && commnetShow.type === 'reply') {
      return setCommnetShow({
        commentId: 0,
        type: 'reply',
      });
    }

    setCommnetShow({
      commentId,
      type: 'reply',
    });
  };

  const deleteHandler = async (commentId: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const res = await deleteAction(commentId);
      if (res.status === 'success') {
        alert('삭제가 완료 되었습니다.');
      }
    }
  };

  const onEditShowHandler = (commentId: number) => {
    if (commnetShow.commentId === commentId && commnetShow.type === 'edit') {
      return setCommnetShow({
        commentId: 0,
        type: 'edit',
      });
    }

    setCommnetShow({
      commentId,
      type: 'edit',
    });
  };

  return (
    <>
      <User />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <dl className="flex items-center gap-[10px]">
            <dt className="text-lg font-bold text-primary">{comment.author}</dt>
            <dd className="text-[13px] font-normal text-OnBackgroundGray">
              {moment(comment.createdDateTime).startOf('second').fromNow()}
            </dd>
          </dl>
          <div className="ml-auto flex gap-[10px] md:gap-5">
            {!isReply && (
              <BaseBtn onClick={() => onReplyShowHandler(comment.commentId)}>
                답글
              </BaseBtn>
            )}
            {comment.yours && (
              <>
                <BaseBtn onClick={() => onEditShowHandler(comment.commentId)}>
                  수정
                </BaseBtn>
                <BaseBtn onClick={() => deleteHandler(comment.commentId)}>
                  삭제
                </BaseBtn>
              </>
            )}
          </div>
        </div>
        <div className="mt-[14px] md:mt-4">
          {commnetShow.commentId === comment.commentId &&
          commnetShow.type === 'edit' ? (
            <CmntUpdate
              setCommnetShow={setCommnetShow}
              value={comment.content}
              commentId={comment.commentId}
            />
          ) : (
            <p className="mt-[14px] min-h-[44px] text-sm md:mt-0 md:min-h-[66px] md:text-lg md:font-medium">
              {comment.content}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
