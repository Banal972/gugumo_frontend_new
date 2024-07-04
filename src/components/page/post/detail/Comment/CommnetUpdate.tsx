import { usePatchCommnet } from "@/hooks/useComment";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form"

export default function CommnetUpdate({setCommnetShow,commentId,content} : {setCommnetShow:any,commentId : number,content : string}) {

    const {data : session} = useSession();
    const {register,handleSubmit,setValue} = useForm();
    const {mutate : patchCommnet} = usePatchCommnet();

    const onSubmitHandler = async (data : any)=>{
        const {content} = data;

        try {
            patchCommnet({
                comment_id : commentId,
                session,
                body : {content}
            });
            alert('수정이 완료 되었습니다.');
            setCommnetShow({
                commentId : 0,
                type : "edit"
            });
        }
        catch(err){
            console.log(err);
            setValue('content','');
        }
        finally {
            setValue('content','');
        }

    }

  return (
    <div className="flex-1 text-right">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <textarea 
                className="w-full resize-none block h-[68px] md:h-[108px] rounded md:rounded-xl bg-Surface p-3 md:px-4 md:py-5 text-sm md:text-base font-semibold placeholder:text-OnBackgroundGray border border-transparent outline-none focus:border-primary" 
                placeholder="댓글을 입력해주세요."
                {...register('content',{value : content})}
            ></textarea>
            <button 
                type="submit" 
                className="mt-2 md:mt-6 text-sm md:text-base font-semibold text-OnPrimary bg-primary py-2 px-4 rounded cursor-pointer"
            >댓글 수정하기</button>
        </form>
    </div>
  )
}
