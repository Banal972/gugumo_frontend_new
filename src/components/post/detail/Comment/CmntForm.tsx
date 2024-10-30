'use client';

import postAction from '@/actions/comment/postAction';
import EditBtn from '@/components/post/detail/Button/EditBtn';
import User from '@/components/post/detail/Comment/atom/User';
import ReplyForm from '@/components/post/detail/Comment/form/ReplyForm';
import { CmntFormValue, PostidType } from '@/types/cmnt.type';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';

const CmntForm = ({ postId }: { postId: PostidType }) => {
  const { data: session } = useSession() as any;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CmntFormValue>();

  const onSubmitHandler = handleSubmit(async (data) => {
    const { content } = data;

    if (!session || !session.accessToken) return alert('로그인을 해야합니다.');

    const res = await postAction({
      postId,
      content,
    });

    if (res.status === 'success') {
      reset();
    }
  });

  const contentRegister = register('content', {
    maxLength: 1000,
    minLength: 1,
    required: { value: true, message: '내용을 입력해주세요' },
  });

  return (
    <div className="mt-[28px] flex gap-3 md:mt-[52px] md:gap-8">
      <User />
      <div className="flex-1">
        <ReplyForm
          onSubmit={onSubmitHandler}
          errors={errors}
          register={contentRegister}
        >
          <EditBtn>등록하기</EditBtn>
        </ReplyForm>
      </div>
    </div>
  );
};

export default CmntForm;
