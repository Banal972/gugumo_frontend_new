"use client";
import Kakao from "@/components/Modal/Login/oAuth/Kakao";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Login({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [active, setActive] = useState(false);

  const onSubmit = async (event: any) => {
    const { username, password } = event;

    if (username === "") {
      return alert("이메일을 입력해주세요.");
    }

    if (password === "") {
      return alert("비밀번호을 입력해주세요.");
    }

    const res = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
      return onClose();
    } else {
      alert("로그인에 실패 하였습니다.");
    }
  };

  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return;
    if (isOpen) {
      html.style.overflowY = "hidden";
    }
    setTimeout(() => {
      setActive(true);
    }, 200);
  }, [isOpen]);

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[rgba(000,000,000,0.6)]">
      <div className="fixed left-1/2 top-1/2 z-50 box-border w-[90%] max-w-[422px] -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-xl bg-white px-8 py-9 md:px-16">
        <button
          type="button"
          className="absolute right-4 top-5 cursor-pointer"
          onClick={onClose}
        >
          <Image
            src="/asset/image/icon/close.svg"
            alt="취소버튼"
            width={24}
            height={24}
          />
        </button>
        <div className="mx-auto w-[115.66px]">
          <Image
            src="/asset/image/modal/login-simbol.png"
            alt="로고 아이콘"
            width={523}
            height={458}
          />
        </div>
        <h5 className="mt-10 text-center text-lg font-semibold text-primary">
          로그인
        </h5>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="이메일을 입력해주세요."
            className="h-9 w-full rounded-lg border border-Outline px-3 text-sm font-medium outline-none focus:border-primary md:h-11 md:text-base"
            {...register("username")}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            className="mt-2 h-9 w-full rounded-lg border border-Outline px-3 text-sm font-medium outline-none focus:border-primary md:h-11 md:text-base"
            {...register("password")}
          />
          <div className="mt-5 text-center">
            <button className="h-9 rounded bg-primary px-4 text-sm font-semibold leading-none text-OnPrimary md:text-base">
              로그인 하기
            </button>
          </div>
        </form>

        <div className="mt-5 text-center">
          <p className="text-[13px] font-medium text-[#A5A5A5]">
            간편 회원가입
          </p>
          <div className="mt-2 flex justify-center">
            <Kakao />
          </div>
        </div>
        <div className="mt-[34px] text-center text-[13px] font-medium text-primary">
          <Link href={"/find"}>비밀번호 찾기</Link>
          <Link
            href={"/signup"}
            className="relative ml-[10px] pl-[10px] before:absolute before:left-0 before:top-0 before:block before:h-full before:w-[1px] before:bg-primary"
          >
            회원가입 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
