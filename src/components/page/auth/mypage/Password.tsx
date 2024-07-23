"use client";
import Alert from "@/components/Modal/Alert";
import Success from "@/components/Modal/Success";
import { open } from "@/lib/store/features/modals/modal";
import { useAppDispatch } from "@/lib/store/hook";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function Password() {
  const dispatch = useAppDispatch();

  const { data: session } = useSession() as any;

  const { register, handleSubmit, setValue } = useForm();

  const onSubmitHanlder = async (event: any) => {
    const { password, pwConfirm } = event;

    if (password === "" || pwConfirm === "") {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "비밀번호를 입력하지 않았습니다." },
        }),
      );
    }

    if (password !== pwConfirm) {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "비밀번호가 동일하지 않습니다." },
        }),
      );
    }

    try {
      const res = await fetch(`/back/api/v1/member/updatePassword`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: session?.accessToken,
        },
        body: JSON.stringify({
          password,
        }),
      });

      if (res.ok) {
        const data = await res.json();

        if (data.status === "success") {
          return dispatch(
            open({
              Component: Success,
              props: { message: "비밀번호가 수정 되었습니다." },
            }),
          );
        } else {
          return dispatch(
            open({
              Component: Alert,
              props: { message: "비밀번호 수정에 실패 하였습니다." },
            }),
          );
        }
      } else {
        return dispatch(
          open({
            Component: Alert,
            props: { message: "에러가 발생 했습니다." },
          }),
        );
      }
    } catch (err) {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "에러가 발생 했습니다." },
        }),
      );
    } finally {
      setValue("password", "");
      setValue("pwConfirm", "");
    }
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
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                className="h-12 w-full rounded-lg border border-transparent bg-Surface px-4 text-sm outline-none placeholder:text-OnSurface focus:border-primary md:h-14 md:bg-background md:text-base"
                {...register("password")}
              />
            </div>
          </div>
          <div className="mt-6 min-w-0 flex-1 md:mt-0">
            <label htmlFor="" className="text-sm text-black md:text-base">
              새 비밀번호 확인
            </label>
            <div className="flex gap-2 md:mt-3 md:max-w-[630px] md:gap-4">
              <input
                type="password"
                placeholder="입력한 비밀번호를 입력해주세요."
                className="h-12 w-full rounded-lg border border-transparent bg-Surface px-4 text-sm outline-none placeholder:text-OnSurface focus:border-primary md:h-14 md:bg-background md:text-base"
                {...register("pwConfirm")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center md:justify-end">
        <button
          type="submit"
          className={`inline-flex h-[38px] cursor-pointer items-center justify-center rounded border border-primary bg-OnPrimary px-4 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-OnPrimary md:text-base`}
        >
          비밀번호 수정
        </button>
      </div>
    </form>
  );
}
