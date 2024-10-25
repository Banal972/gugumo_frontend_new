"use client";
import { useRouter } from "next/navigation";
import { MouseEventHandler, ReactNode } from "react";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-center">
      <img src="/asset/image/notfound.png" alt="에러로고" />
      <h1 className="mt-7 text-5xl font-medium text-primary">404 ERROR</h1>
      <dl className="mt-10 w-[442px]">
        <dt className="text-2xl font-medium">
          죄송합니다. 현재 페이지를 찾을 수 없습니다.
        </dt>
        <dd className="mt-6 text-lg leading-normal text-OnBackgroundGray">
          존재하지 않는 주소를 입력하셨거나 요청하신 페이지의 주소가 변경,
          삭제되어 찾을 수 없습니다.
        </dd>
      </dl>
      <div className="mt-[100px] flex gap-[18px]">
        <Button onClick={() => router.back()}>이전으로</Button>
        <Button onClick={() => router.push("/")}>메인으로</Button>
      </div>
    </div>
  );
};

export default NotFound;

const Button = ({ onClick, children }: Button) => {
  return (
    <button
      className="h-12 w-[88px] cursor-pointer rounded border border-primary text-base font-semibold text-primary transition-all hover:bg-primary hover:text-background"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface Button {
  onClick: MouseEventHandler;
  children: ReactNode;
}
