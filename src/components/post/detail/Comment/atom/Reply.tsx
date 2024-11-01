'use client';

import postAction from '@/actions/comment/postAction';
import EditBtn from '@/components/post/detail/Button/EditBtn';
import ReplyForm from '@/components/post/detail/Comment/form/ReplyForm';
import {
  CmntFormValue,
  PostidType,
  SetCommnetShowType,
} from '@/types/cmnt.type';
import { useForm } from 'react-hook-form';

interface ReplyFormProps {
  parentId: number;
  postId: PostidType;
  setCommnetShow: SetCommnetShowType;
}

const Reply = ({ parentId, postId, setCommnetShow }: ReplyFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CmntFormValue>();

  const onSubmitHandler = handleSubmit(async (data) => {
    const { content } = data;
    const res = await postAction({
      postId,
      content,
      parentCommentId: parentId,
    });

    if (res.status === 'success') {
      setCommnetShow({
        commentId: 0,
        type: 'edit',
      });
    }
  });

  const contentRegister = register('content', {
    maxLength: 1000,
    minLength: 1,
    required: { value: true, message: '내용을 입력해주세요' },
  });

  return (
    <div className="ml-[15%] mt-5 md:ml-[120px]">
      <div className="flex-1">
        <ReplyForm
          onSubmit={onSubmitHandler}
          register={contentRegister}
          errors={errors}
        >
          <EditBtn>등록하기</EditBtn>
        </ReplyForm>
      </div>
    </div>
  );
};

export default Reply;
