'use client';

import Alert from '@/components/Modal/Alert';
import User from '@/components/page/post/detail/Comment/User';
import { usePostCommnet } from '@/hooks/useComment';
import { open } from '@/lib/store/features/modals/modal';
import { useAppDispatch } from '@/lib/store/hook';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

export default function CommentFrom({ postid }: { postid: string }) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const { data: session } = useSession() as any;
  const { mutate: postComment } = usePostCommnet();

  const onSubmitHandler = async (event: any) => {
    if (!session || !session.accessToken) {
      return dispatch(
        open({
          Component: Alert,
          props: { message: '로그인을 해야합니다.' },
        }),
      );
    }

    const { content } = event;

    if (content === '') {
      return dispatch(
        open({
          Component: Alert,
          props: { message: '댓글을 입력해야 합니다.' },
        }),
      );
    }

    try {
      await postComment({
        session: session,
        body: { postId: postid, content },
      });
      setValue('content', '');
    } catch (err) {
      console.log(err);
    } finally {
      setValue('content', '');
    }
  };

  return (
    <div className="mt-[28px] flex gap-3 md:mt-[52px] md:gap-8">
      <User />
      <div className="flex-1 text-right">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <textarea
            className="block h-[68px] w-full resize-none rounded border border-transparent bg-Surface p-3 text-sm font-semibold outline-none placeholder:text-OnBackgroundGray focus:border-primary md:h-[108px] md:rounded-xl md:px-4 md:py-5 md:text-base"
            placeholder="댓글을 입력해주세요."
            {...register('content')}
          ></textarea>
          <button
            type="submit"
            className="mt-2 cursor-pointer rounded bg-primary px-4 py-2 text-sm font-semibold text-OnPrimary md:mt-6 md:text-base"
          >
            댓글 등록하기
          </button>
        </form>
      </div>
    </div>
  );
}
