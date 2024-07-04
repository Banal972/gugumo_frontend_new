"use client"
import CommentFrom from "@/components/page/post/detail/Comment/CommentFrom"
import CommnetUpdate from "@/components/page/post/detail/Comment/CommnetUpdate";
import ReplyForm from "@/components/page/post/detail/Comment/ReplyForm";
import User from "@/components/page/post/detail/Comment/User";
import { useCommnets, useDeleteComment } from "@/hooks/useComment";
import moment from "moment";
import React, { useState } from "react";
import 'moment/locale/ko';

export default function Comments({session,postid} : {session : any,postid : string}) {
    
    const {comment} = useCommnets(session,postid);
    const {mutate : deleteComment} = useDeleteComment();
    const [commnetShow,setCommnetShow] = useState({
        commentId : 0,
        type : "edit"
    });

    const onReplyShowHandler = (commentId : number)=>{

        if(!session || !session.accessToken){ return alert('로그인을 해야합니다.')};

        if(commnetShow.commentId === commentId && commnetShow.type === "reply"){
            return setCommnetShow({
                commentId : 0,
                type : "reply"
            });    
        }

        setCommnetShow({
            commentId,
            type : "reply"
        });

    };

    const deleteHandler = async (commentId : number)=>{
        if(confirm('댓글을 삭제하시겠습니까?')){
            try {
                deleteComment({session,comment_id : commentId});
                alert('삭제가 완료 되었습니다.');
            }
            catch(err){
                console.log(err);
            }
        }
    }

    const onEditShowHandler = (commentId : number)=>{

        if(commnetShow.commentId === commentId && commnetShow.type === "edit"){
            return setCommnetShow({
                commentId : 0,
                type : "edit"
            });    
        }

        setCommnetShow({
            commentId,
            type : "edit"
        });

    };

  return (
    <div className="mt-36">
      <div className="flex gap-1 text-xl font-bold">
          댓글<span className="text-OnSurface">{comment?.length ? comment?.length : 0}</span>
      </div>

      {/* 댓글 등록하기 */}
      <CommentFrom postid={postid}/>

      <div className="border-t-[6px] border-Surface mt-7 md:mt-12 pt-12 md:pt-14">
        {
            comment?.comments.map((el,index)=>(
                <React.Fragment key={el.commentId}>
                    <div className={`flex gap-5 ${index > 0 ? "mt-5" : ""}`} key={el.commentId}>
                        <User/>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <dl className="flex gap-[10px] items-center">
                                    <dt className="text-lg text-primary font-bold">{el.author}</dt>
                                    <dd className="text-[13px] text-OnBackgroundGray font-normal">{ moment(el.createdDateTime).startOf('second').fromNow()}</dd>
                                </dl>
                                <div className="ml-auto flex gap-[10px] md:gap-5">
                                    <button 
                                        onClick={()=>onReplyShowHandler(el.commentId)}
                                        className="text-[13px] text-OnBackgroundGray cursor-pointer"
                                    >답글</button>
                                    {
                                        el.yours &&
                                        <>
                                            <button 
                                                onClick={()=>onEditShowHandler(el.commentId)}
                                                className="text-[13px] text-OnBackgroundGray cursor-pointer"
                                            >수정</button>
                                            <button 
                                                onClick={()=>deleteHandler(el.commentId)} 
                                                className="text-[13px] text-OnBackgroundGray cursor-pointer"
                                            >삭제</button>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="mt-[14px] md:mt-4">
                                {
                                    (commnetShow.commentId === el.commentId && commnetShow.type === "edit") 
                                    ?
                                        <CommnetUpdate setCommnetShow={setCommnetShow} content={el.content} commentId={el.commentId}/>
                                    :
                                        <p className="text-sm md:text-lg mt-[14px] md:mt-0 md:font-medium min-h-[44px] md:min-h-[66px]">{el.content}</p>
                                }
                            </div>
                        </div>
                    </div>

                    {
                        (commnetShow.commentId === el.commentId && commnetShow.type === "reply") && 
                        <ReplyForm 
                            session={session} 
                            postId={postid} 
                            parentId={el.commentId} 
                            setCommnetShow={setCommnetShow}
                        />
                    }

                    {
                        comment?.replys.map((reply)=>{
                            if(reply.parentCommentId === el.commentId){
                                return (
                                    <div key={reply.commentId} className="ml-[15%] md:ml-[120px] mt-5 flex gap-5">
                                        <User/>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <dl className="flex gap-[10px] items-center">
                                                    <dt className="text-lg text-primary font-bold">{reply.author}</dt>
                                                    <dd className="text-[13px] text-OnBackgroundGray font-normal">{ moment(reply.createdDateTime).startOf('second').fromNow()}</dd>
                                                </dl>
                                                <div className="ml-auto flex gap-[10px] md:gap-5">
                                                    {
                                                        reply.yours && 
                                                        <>
                                                            <button 
                                                                onClick={()=>onEditShowHandler(reply.commentId)}
                                                                className="text-[13px] text-OnBackgroundGray cursor-pointer"
                                                            >수정</button>
                                                            <button 
                                                                onClick={()=>deleteHandler(reply.commentId)} 
                                                                className="text-[13px] text-OnBackgroundGray cursor-pointer"
                                                            >삭제</button>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div className="mt-[14px] md:mt-4">
                                                {
                                                    (commnetShow.commentId === reply.commentId && commnetShow.type === "edit")
                                                    ?
                                                        <CommnetUpdate 
                                                            setCommnetShow={setCommnetShow} 
                                                            content={reply.content} 
                                                            commentId={reply.commentId}
                                                        />
                                                    :
                                                        <p className="text-sm md:text-lg mt-[14px] md:mt-0 md:font-medium min-h-[44px] md:min-h-[66px]">{reply.content}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }

                </React.Fragment>
            ))
        }

      </div>

  </div>
  )
}
