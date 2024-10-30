import { ErrorMessage } from '@hookform/error-message';
import React, { FormEventHandler, ReactNode } from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

interface ReplyFormProps {
  onSubmit: FormEventHandler;
  children: ReactNode;
  errors: FieldErrors;
  register: UseFormRegisterReturn;
}

const ReplyForm = ({
  onSubmit,
  children,
  errors,
  register,
}: ReplyFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="block h-[68px] w-full resize-none rounded border border-transparent bg-Surface p-3 text-sm font-semibold outline-none placeholder:text-OnBackgroundGray focus:border-primary md:h-[108px] md:rounded-xl md:px-4 md:py-5 md:text-base"
        placeholder="답글을 달아주세요"
        {...register}
      />
      <ErrorMessage
        errors={errors}
        name="content"
        render={({ message }) => (
          <p className="mt-1 text-sm text-red-500">{message}</p>
        )}
      />
      {children}
    </form>
  );
};

export default ReplyForm;
