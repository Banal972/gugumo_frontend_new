import Alert from "@/components/Modal/Alert";
import { usePostCommnet } from "@/hooks/useComment";
import { open } from "@/lib/store/features/modals/modal";
import { useAppDispatch } from "@/lib/store/hook";
import { useForm } from "react-hook-form";

export default function ReplyForm({
  session,
  parentId,
  postId,
  setCommnetShow,
}: {
  session: any;
  parentId: number;
  postId: string;
  setCommnetShow: any;
}) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const { mutate: postCommnet } = usePostCommnet();

  const onSubmitHandler = (data: any) => {
    const { content } = data;

    if (content === "") {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "답글을 입력해야 합니다." },
        }),
      );
    }

    try {
      postCommnet({
        session,
        body: {
          postId,
          content,
          parentCommentId: parentId,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setCommnetShow({
        commentId: 0,
        type: "reply",
      });
    }
  };

  return (
    <div className="ml-[15%] mt-5 md:ml-[120px]">
      <div className="flex-1 text-right">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <textarea
            className="block h-[68px] w-full resize-none rounded border border-transparent bg-Surface p-3 text-sm font-semibold outline-none placeholder:text-OnBackgroundGray focus:border-primary md:h-[108px] md:rounded-xl md:px-4 md:py-5 md:text-base"
            placeholder="답글을 달아주세요"
            {...register("content", { maxLength: 1000, minLength: 1 })}
          />
          <button
            type="submit"
            className="mt-2 cursor-pointer rounded bg-primary px-4 py-2 text-sm font-semibold text-OnPrimary md:mt-6 md:text-base"
          >
            답글 등록하기
          </button>
        </form>
      </div>
    </div>
  );
}
