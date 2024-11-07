'use client';

import patchAction from '@/actions/comment/patchAction';
import EditBtn from '@/components/page/post/detail/Button/EditBtn';
import ReplyForm from '@/components/page/post/detail/Comment/form/ReplyForm';
import { CmntFormValue, SetCommnetShowType } from '@/types/cmnt.type';
import { useForm } from 'react-hook-form';

interface CmntUpdateProps {
  setCommnetShow: SetCommnetShowType;
  commentId: number;
  value: string;
}

const CmntUpdate = ({ value, commentId, setCommnetShow }: CmntUpdateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CmntFormValue>();

  const onSubmitHandler = handleSubmit(async (data) => {
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
