"use client";
import Alert from "@/components/Modal/Alert";
import Success from "@/components/Modal/Success";
import { open } from "@/lib/store/features/modals/modal";
import { useAppDispatch } from "@/lib/store/hook";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Nickname({ setNickname }: { setNickname: any }) {
  const dispatch = useAppDispatch();
  const { data: session } = useSession() as any;

  const { register, handleSubmit, setValue, getValues } = useForm();

  const [isCheck, setIsCheck] = useState(false);

  const confirmHanlder = async () => {
    const { nickname } = getValues();

    if (nickname === "") {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "닉네임을 입력해주세요." },
        }),
      );
    }

    try {
      const res = await fetch(
        `/back/api/v1/member/checkDuplicateNickname?nickname=${nickname}`,
      );

      if (res.ok) {
        const data = await res.json();

        if (data.status === "success") {
          if (data.data) {
            dispatch(
              open({
                Component: Alert,
                props: { message: "중복된 닉네임이 있습니다." },
              }),
            );
            return setIsCheck(false);
          } else {
            dispatch(
              open({
                Component: Success,
                props: { message: "사용가능한 닉네임 입니다." },
              }),
            );
            return setIsCheck(true);
          }
        } else {
          dispatch(
            open({
              Component: Alert,
              props: { message: "에러가 발생했습니다." },
            }),
          );
          return setIsCheck(false);
        }
      } else {
        dispatch(
          open({
            Component: Alert,
            props: { message: "오류가 발생했습니다." },
          }),
        );
        return setIsCheck(false);
      }
    } catch (err) {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "오류가 발생했습니다." },
        }),
      );
    }
  };

  const onSubmitHanlder = async (event: any) => {
    const { nickname } = event;

    if (!isCheck) {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "닉네임 중복 체크를 해주세요." },
        }),
      );
    }

    try {
      const res = await fetch("/back/api/v1/member/updateNickname", {
        method: "PATCH",
        headers: {
          Authorization: session?.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname: nickname }),
      });

      if (res.ok) {
        const data = await res.json();

        if (data.status === "success") {
          dispatch(
            open({
              Component: Success,
              props: { message: "닉네임 수정이 완료 되었습니다." },
            }),
          );
          return setNickname(nickname);
        } else {
          return dispatch(
            open({
              Component: Alert,
              props: { message: "닉네임 수정에 실패 하였습니다." },
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
      console.error(err);
      return dispatch(
        open({
          Component: Alert,
          props: { message: "에러가 발생 했습니다." },
        }),
      );
    } finally {
      setValue("nickname", "");
      setIsCheck(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHanlder)}>
      <div className="block items-center gap-10 rounded bg-white pt-11 md:flex md:bg-Surface md:px-[5%] md:py-[59px] lg:px-[4.4%]">
        <h4 className="text-nowrap text-base font-semibold">개인정보 변경</h4>
        <div className="mt-6 min-w-0 flex-1 md:mt-0">
          <label htmlFor="nickname" className="text-sm text-black md:text-base">
            닉네임
          </label>
          <div className="flex gap-2 md:mt-3 md:max-w-[630px] md:gap-4">
            <input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력하세요."
              className="h-12 w-full rounded-lg border border-transparent bg-Surface px-4 text-sm outline-none placeholder:text-OnSurface focus:border-primary md:h-14 md:bg-background md:text-base"
              {...register("nickname")}
            />
            <button
              type="button"
              onClick={confirmHanlder}
              className="flex flex-none cursor-pointer items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-OnPrimary md:w-[109px] md:text-base"
            >
              중복확인
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center md:justify-end">
        <button
          type="submit"
          className={`inline-flex h-[38px] cursor-pointer items-center justify-center rounded border border-primary bg-OnPrimary px-4 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-OnPrimary md:text-base`}
        >
          개인정보 수정
        </button>
      </div>
    </form>
  );
}
