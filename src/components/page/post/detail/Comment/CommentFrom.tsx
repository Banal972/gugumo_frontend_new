"use client"
import User from "@/components/page/post/detail/Comment/User";
import { usePostCommnet } from "@/hooks/useComment";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form"

export default function CommentFrom({postid} : {postid : string}) {

    const {register,handleSubmit,setValue} = useForm();
    const {data : session} = useSession() as any;
    const {mutate : postComment}  = usePostCommnet();

    const onSubmitHandler = async (event : any)=>{

        if(!session || !session.accessToken){ return alert('로그인을 해야합니다.')};

        const {content} = event;

        if(content === ""){
            return alert('댓글을 입력해야 합니다.');
        }

        try {
            await postComment({session : session,body : {postId : postid,content}});
            setValue('content','');
        }
        catch(err){
            console.log(err);
        }
        finally{
            setValue('content','');
        }

    }

  return (
    <div className="flex gap-3 md:gap-8 mt-[28px] md:mt-[52px]">
        <User/>
        <div className="flex-1 text-right">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <textarea 
                    className="w-full resize-none block h-[68px] md:h-[108px] rounded md:rounded-xl bg-Surface p-3 md:px-4 md:py-5 text-sm md:text-base font-semibold placeholder:text-OnBackgroundGray border border-transparent outline-none focus:border-primary" 
                    placeholder="댓글을 입력해주세요."
                    {...register("content")}
                ></textarea>
                <button 
                    type="submit" 
                    className="mt-2 md:mt-6 text-sm md:text-base font-semibold text-OnPrimary bg-primary py-2 px-4 rounded cursor-pointer"
                >댓글 등록하기</button>
            </form>
        </div>
    </div>
  )
}