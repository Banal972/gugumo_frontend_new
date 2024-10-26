"use client";

import updatePasswordAction from "@/actions/auth/mypage/updatePasswordAction";
import { HTMLInputTypeAttribute } from "react";
import { SubmitHandler, useForm, UseFormRegisterReturn } from "react-hook-form";

type FormValues = {
  password: string;
  pwConfirm: string;
};

interface InputProps {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  register: UseFormRegisterReturn;
}

export default function Password() {
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  const onSubmitHanlder: SubmitHandler<FormValues> = async (data) => {
    const { password, pwConfirm } = data;

    if (password === "" || pwConfirm === "")
      return window.alert("비밀번호를 입력하지 않았습니다.");
    if (password !== pwConfirm)
      return window.alert("비밀번호가 동일하지 않습니다.");

    const res = await updatePasswordAction(password);

    if (!res.data) {
      window.alert("비밀번호 변경에 실패하였습니다.");
      return;
    }

    window.alert("비밀번호가 변경 되었습니다.");
    setValue("password", "");
    setValue("pwConfirm", "");
  };

  return (
    <form className="mt-7 md:mt-10" onSubmit={handleSubmit(onSubmitHanlder)}>
      <div className="block items-center gap-10 rounded bg-white md:flex md:bg-Surface md:px-[5%] md:py-[78px] lg:px-[4.4%]">
        <h4 className="text-nowrap text-base font-semibold">비밀번호 설정</h4>
        <div className="mt-6 flex flex-1 flex-col gap-5 md:mt-0 md:gap-10">
          <div className="min-w-0 flex-1">
            <label htmlFor="" className="text-sm text-black md:text-base">
              새 비밀번호
            </label>
            <div className="flex gap-2 md:mt-3 md:max-w-[630px] md:gap-4">
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                register={register("password")}
              />
            </div>
          </div>
          <div className="mt-6 min-w-0 flex-1 md:mt-0">
            <label htmlFor="" className="text-sm text-black md:text-base">
              새 비밀번호 확인
            </label>
            <div className="flex gap-2 md:mt-3 md:max-w-[630px] md:gap-4">
              <Input
                type="password"
                placeholder="입력한 비밀번호를 입력해주세요."
                register={register("pwConfirm")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center md:justify-end">
        <Button />
      </div>
    </form>
  );
}

const Input = ({ type, placeholder, register }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="h-12 w-full rounded-lg border border-transparent bg-Surface px-4 text-sm outline-none placeholder:text-OnSurface focus:border-primary md:h-14 md:bg-background md:text-base"
      {...register}
    />
  );
};

const Button = () => {
  return (
    <button
      type="submit"
      className="inline-flex h-[38px] cursor-pointer items-center justify-center rounded border border-primary bg-OnPrimary px-4 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-OnPrimary md:text-base"
    >
      비밀번호 수정
    </button>
  );
};
