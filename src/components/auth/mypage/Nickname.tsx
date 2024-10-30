'use client';

import checkAction from '@/actions/auth/mypage/checkAction';
import updateAction from '@/actions/auth/mypage/updateAction';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Nickname = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const [isCheck, setIsCheck] = useState(false);

  const confirmHanlder = async () => {
    const { nickname } = getValues();
    const res = await checkAction(nickname);
    const { data } = res;
    if (data) return window.alert('중복 입니다.');
    if (!data) {
      setIsCheck(true);
      return window.alert('사용할 수 있는 닉네임 입니다.');
    }
  };

  const onSubmitHanlder = async (event: any) => {
    if (!isCheck) return window.alert('중복 체크를 해야합니다.');
    const { nickname } = event;
    const res = await updateAction(nickname);
    const { status } = res;
    if (status === 'success') {
      setValue('nickname', '');
      setIsCheck(false);
      window.alert('변경 완료');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHanlder)}>
      <div className="block items-center gap-10 rounded bg-white pt-11 md:flex md:bg-Surface md:px-[5%] md:py-[59px] lg:px-[4.4%]">
        <h4 className="text-nowrap text-base font-semibold">개인정보 변경</h4>
        <div className="mt-6 min-w-0 flex-1 md:mt-0">
          <label htmlFor="nickname" className="text-sm text-black md:text-base">
            닉네임 수정
          </label>
          <div className="flex gap-2 md:mt-3 md:max-w-[630px] md:gap-4">
            <input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력하세요."
              className="h-12 w-full rounded-lg border border-transparent bg-Surface px-4 text-sm outline-none placeholder:text-OnSurface focus:border-primary md:h-14 md:bg-background md:text-base"
              {...register('nickname')}
            />
            <button
              type="button"
              onClick={confirmHanlder}
              className="flex flex-none cursor-pointer items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-OnPrimary transition-colors hover:bg-[#3f92e0] md:w-[109px] md:text-base"
            >
              중복확인
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center md:justify-end">
        <button
          type="submit"
          className="inline-flex h-[38px] cursor-pointer items-center justify-center rounded border border-primary bg-OnPrimary px-4 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-OnPrimary md:text-base"
        >
          개인정보 수정
        </button>
      </div>
    </form>
  );
};

export default Nickname;
