'use client';

import resetPwdAction from '@/actions/public/find/resetPwdAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().min(1, { message: 'Required' }),
});

const FindPage = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = handleSubmit(async (data) => {
    const { email } = data;
    const res = await resetPwdAction(email);
    setValue('email', '');
    if (!res.data) return window.alert('패스워드 이메일을 실패했습니다.');
    window.alert('패스워드 이메일을 보냈습니다.');
  });

  return (
    <div className="py-[158px]">
      <div className="mx-auto w-[90%] max-w-[790px] rounded-xl px-[5%] py-14 md:bg-Surface md:px-36">
        <dl className="text-center text-primary">
          <dt className="text-xl font-semibold md:text-2xl">비밀번호 찾기</dt>
          <dd className="mt-6 break-keep text-sm leading-6">
            비밀번호를 재설정할 수 있는 이메일을 보내드립니다. <br />
            발송된 이메일의 비밀번호 재설정은
            <span className="font-bold">10분 간</span> 유효합니다.
          </dd>
        </dl>
        <form onSubmit={onSubmitHandler} className="mt-12 md:mt-8">
          <input
            className="h-12 w-full rounded-lg border border-Outline px-3 text-base font-medium placeholder:text-OnBackgroundGray"
            type="text"
            placeholder="가입하신 이메일 주소를 입력해주세요."
            {...register('email')}
          />
          {errors.email?.message && <p>{errors.email?.message}</p>}
          <button
            className="mx-auto mt-5 block h-12 w-[138px] cursor-pointer rounded-lg bg-primary text-base text-OnPrimary"
            type="submit"
          >
            전송하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default FindPage;
