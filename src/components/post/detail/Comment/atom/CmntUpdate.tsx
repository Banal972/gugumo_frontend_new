'use client';

import patchAction from '@/actions/comment/patchAction';
import EditBtn from '@/components/post/detail/Button/EditBtn';
import ReplyForm from '@/components/post/detail/Comment/form/ReplyForm';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

interface CmntUpdateProps {
  setCommnetShow: Dispatch<
    SetStateAction<{
      commentId: number;
      type: string;
    }>
  >;
  commentId: number;
  value: string;
}

type FormValue = {
  content: string;
};

const CmntUpdate = ({ value, commentId, setCommnetShow }: CmntUpdateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmitHandler = handleSubmit(async (data: any) => {
    const { content } = data;

    const res = await patchAction({
      content,
      commentId,
    });

    if (res.status === 'success') {
      setCommnetShow({
        commentId: 0,
        type: 'edit',
      });
    }
  });

  const contentRegister = register('content', {
    value,
    maxLength: 1000,
    minLength: 1,
    required: { value: true, message: '내용을 입력해주세요' },
  });

  return (
    <div className="flex-1 text-right">
      <ReplyForm
        onSubmit={onSubmitHandler}
        errors={errors}
        register={contentRegister}
      >
        <EditBtn>수정하기</EditBtn>
      </ReplyForm>
    </div>
  );
};
export default CmntUpdate;
