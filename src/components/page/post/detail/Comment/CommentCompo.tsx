"use client";
import { commentOptions } from "@/hooks/useComment";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CommnetUpdate from "@/components/page/post/detail/Comment/CommnetUpdate";
import ReplyForm from "@/components/page/post/detail/Comment/ReplyForm";
import User from "@/components/page/post/detail/Comment/User";
import moment from "moment";
import "moment/locale/ko";
import { useAppDispatch } from "@/lib/store/hook";
import { close, open } from "@/lib/store/features/modals/modal";
import Alert from "@/components/Modal/Alert";
import Confirm from "@/components/Modal/Confirm";
import Success from "@/components/Modal/Success";

const CommentCompo = ({
  session,
  postid,
}: {
  session: any;
  postid: string;
}) => {
  const dispatch = useAppDispatch();

  const { data: comment } = useQuery(commentOptions({ session, postid }));

  const [commnetShow, setCommnetShow] = useState({
    commentId: 0,
    type: "edit",
  });

  const onReplyShowHandler = (commentId: number) => {
    if (!session || !session.accessToken) {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "로그인을 해야합니다." },
        }),
      );
    }

    if (commnetShow.commentId === commentId && commnetShow.type === "reply") {
      return setCommnetShow({
        commentId: 0,
        type: "reply",
      });
    }

    setCommnetShow({
      commentId,
      type: "reply",
    });
  };

  const deleteHandler = async (commentId: number) => {
    const onClick = () => {
      try {
        // deleteComment({ session, comment_id: commentId });
        dispatch(
          open({
            Component: Success,
            props: { message: "삭제가 완료 되었습니다." },
          }),
        );
      } catch (err) {
        console.log(err);
      }
    };
    dispatch(open({ Component: Confirm, props: { onClick: onClick } }));
  };

  const onEditShowHandler = (commentId: number) => {
    if (commnetShow.commentId === commentId && commnetShow.type === "edit") {
      return setCommnetShow({
        commentId: 0,
        type: "edit",
      });
    }

    setCommnetShow({
      commentId,
      type: "edit",
    });
  };

  return (
    <div className="mt-7 border-t-[6px] border-Surface pt-12 md:mt-12 md:pt-14">
      {comment?.comments.map((el, index) => (
        <React.Fragment key={el.commentId}>
          <div
            className={`flex gap-5 ${index > 0 ? "mt-5" : ""}`}
            key={el.commentId}
          >
            <User />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <dl className="flex items-center gap-[10px]">
                  <dt className="text-lg font-bold text-primary">
                    {el.author}
                  </dt>
                  <dd className="text-[13px] font-normal text-OnBackgroundGray">
                    {moment(el.createdDateTime).startOf("second").fromNow()}
                  </dd>
                </dl>
                <div className="ml-auto flex gap-[10px] md:gap-5">
                  <button
                    onClick={() => onReplyShowHandler(el.commentId)}
                    className="cursor-pointer text-[13px] text-OnBackgroundGray"
                  >
                    답글
                  </button>
                  {el.yours && (
                    <>
                      <button
                        onClick={() => onEditShowHandler(el.commentId)}
                        className="cursor-pointer text-[13px] text-OnBackgroundGray"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => deleteHandler(el.commentId)}
                        className="cursor-pointer text-[13px] text-OnBackgroundGray"
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-[14px] md:mt-4">
                {commnetShow.commentId === el.commentId &&
                commnetShow.type === "edit" ? (
                  <CommnetUpdate
                    setCommnetShow={setCommnetShow}
                    content={el.content}
                    commentId={el.commentId}
                  />
                ) : (
                  <p className="mt-[14px] min-h-[44px] text-sm md:mt-0 md:min-h-[66px] md:text-lg md:font-medium">
                    {el.content}
                  </p>
                )}
              </div>
            </div>
          </div>

          {commnetShow.commentId === el.commentId &&
            commnetShow.type === "reply" && (
              <ReplyForm
                session={session}
                postId={postid}
                parentId={el.commentId}
                setCommnetShow={setCommnetShow}
              />
            )}

          {comment?.replys.map((reply) => {
            if (reply.parentCommentId === el.commentId) {
              return (
                <div
                  key={reply.commentId}
                  className="ml-[15%] mt-5 flex gap-5 md:ml-[120px]"
                >
                  <User />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <dl className="flex items-center gap-[10px]">
                        <dt className="text-lg font-bold text-primary">
                          {reply.author}
                        </dt>
                        <dd className="text-[13px] font-normal text-OnBackgroundGray">
                          {moment(reply.createdDateTime)
                            .startOf("second")
                            .fromNow()}
                        </dd>
                      </dl>
                      <div className="ml-auto flex gap-[10px] md:gap-5">
                        {reply.yours && (
                          <>
                            <button
                              onClick={() => onEditShowHandler(reply.commentId)}
                              className="cursor-pointer text-[13px] text-OnBackgroundGray"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => deleteHandler(reply.commentId)}
                              className="cursor-pointer text-[13px] text-OnBackgroundGray"
                            >
                              삭제
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-[14px] md:mt-4">
                      {commnetShow.commentId === reply.commentId &&
                      commnetShow.type === "edit" ? (
                        <CommnetUpdate
                          setCommnetShow={setCommnetShow}
                          content={reply.content}
                          commentId={reply.commentId}
                        />
                      ) : (
                        <p className="mt-[14px] min-h-[44px] text-sm md:mt-0 md:min-h-[66px] md:text-lg md:font-medium">
                          {reply.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CommentCompo;
