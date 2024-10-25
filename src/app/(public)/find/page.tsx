"use client";
import Success from "@/components/Modal/Success";
import { open } from "@/lib/store/features/modals/modal";
import { useAppDispatch } from "@/lib/store/hook";
import { useForm } from "react-hook-form";

const FindPage = () => {
  const dispatch = useAppDispatch();

  const { handleSubmit, register, setValue } = useForm();

  const onSubmitHandler = async (event: any) => {
    const { email } = event;

    if (email === "") {
      return alert("이메일을 입력해주세요.");
    }

    try {
      const res = await fetch("/back/api/v1/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        return dispatch(
          open({
            Component: Success,
            props: { message: "입력된 이메일로 임시 비밀번호를 보냈습닙다." },
          }),
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setValue("email", "");
    }
  };

  return (
    <div className="py-[158px]">
      <div className="mx-auto w-[90%] max-w-[790px] rounded-xl px-[5%] py-14 md:bg-Surface md:px-36">
        <dl className="text-center text-primary">
          <dt className="text-xl font-semibold md:text-2xl">비밀번호 찾기</dt>
          <dd className="mt-6 break-keep text-sm leading-6">
            비밀번호를 재설정할 수 있는 이메일을 보내드립니다. <br />
            발송된 이메일의 비밀번호 재설정은{" "}
            <span className="font-bold">10분 간</span> 유효합니다.
          </dd>
        </dl>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="mt-12 md:mt-8"
        >
          <input
            className="h-12 w-full rounded-lg border border-Outline px-3 text-base font-medium placeholder:text-OnBackgroundGray"
            type="text"
            placeholder="가입하신 이메일 주소를 입력해주세요."
            {...register("email")}
          />
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
