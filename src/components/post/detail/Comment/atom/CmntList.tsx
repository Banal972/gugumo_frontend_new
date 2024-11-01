'use client';

import deleteAction from '@/actions/comment/deleteAction';
import BaseBtn from '@/components/post/detail/Button/BaseBtn';
import CmntUpdate from '@/components/post/detail/Comment/atom/CmntUpdate';
import User from '@/components/post/detail/Comment/atom/User';
import { CommentDataType, CommnetShowState } from '@/types/cmnt.type';
import moment from 'moment';
import 'moment/locale/ko';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';

interface CmntListProps {
  commnetShow: CommnetShowState;
  setCommnetShow: Dispatch<SetStateAction<CommnetShowState>>;
  comment: CommentDataType;
  isReply?: boolean;
}

const CmntList = ({
  commnetShow,
  setCommnetShow,
  comment,
  isReply,
}: CmntListProps) => {
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

export default CmntList;
