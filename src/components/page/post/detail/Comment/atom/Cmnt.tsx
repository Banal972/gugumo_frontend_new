'use client';

import CmntList from '@/components/page/post/detail/Comment/atom/CmntList';
import Reply from '@/components/page/post/detail/Comment/atom/Reply';
import { CmntReturn, CommnetShowState, PostidType } from '@/types/cmnt.type';
import { Fragment, useState } from 'react';

interface CmntProps {
  postid: PostidType;
  data: CmntReturn;
}

const Cmnt = ({ postid, data }: CmntProps) => {
  const [commnetShow, setCommnetShow] = useState<CommnetShowState>({
    commentId: 0,
    type: 'edit',
  });

  return (
    <div className="mt-7 border-t-[6px] border-Surface pt-12 md:mt-12 md:pt-14">
      {data.comments.map((el, index) => (
        <Fragment key={el.commentId}>
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
        </Fragment>
      ))}
    </div>
  );
};

export default Cmnt;
