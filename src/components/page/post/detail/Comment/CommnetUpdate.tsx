import Success from "@/components/Modal/Success";
import { usePatchCommnet } from "@/hooks/useComment";
import { open } from "@/lib/store/features/modals/modal";
import { useAppDispatch } from "@/lib/store/hook";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function CommnetUpdate({
  setCommnetShow,
  commentId,
  content,
}: {
  setCommnetShow: any;
  commentId: number;
  content: string;
}) {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { register, handleSubmit, setValue } = useForm();
  const { mutate: patchCommnet } = usePatchCommnet();

  const onSubmitHandler = async (data: any) => {
    const { content } = data;

    try {
      patchCommnet({
        comment_id: commentId,
        session,
        body: { content },
      });
      dispatch(
        open({
          Component: Success,
          props: { message: "수정이 완료 되었습니다." },
        }),
      );
      setCommnetShow({
        commentId: 0,
        type: "edit",
      });
    } catch (err) {
      console.log(err);
      setValue("content", "");
    } finally {
      setValue("content", "");
    }
  };

  return (
    <div className="flex-1 text-right">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <textarea
          className="block h-[68px] w-full resize-none rounded border border-transparent bg-Surface p-3 text-sm font-semibold outline-none placeholder:text-OnBackgroundGray focus:border-primary md:h-[108px] md:rounded-xl md:px-4 md:py-5 md:text-base"
          placeholder="댓글을 입력해주세요."
          {...register("content", { value: content })}
        ></textarea>
        <button
          type="submit"
          className="mt-2 cursor-pointer rounded bg-primary px-4 py-2 text-sm font-semibold text-OnPrimary md:mt-6 md:text-base"
        >
          댓글 수정하기
        </button>
      </form>
    </div>
  );
}
