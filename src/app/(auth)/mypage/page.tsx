"use client";
import Wrap from "@/components/Common/Wrap";
import Confirm from "@/components/Modal/Confirm";
import Success from "@/components/Modal/Success";
import Nickname from "@/components/page/auth/mypage/Nickname";
import Password from "@/components/page/auth/mypage/Password";
import SkeletonNickname from "@/components/page/auth/mypage/SkeletonUI/SkeletonNickname";
import SkeletonPassword from "@/components/page/auth/mypage/SkeletonUI/SkeletonPassword";
import SkeletonUser from "@/components/page/auth/mypage/SkeletonUI/SkeletonUser";
import { GAMETYPE } from "@/constant/card/constant";
import { open } from "@/lib/store/features/modals/modal";
import { useAppDispatch } from "@/lib/store/hook";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Mypage() {
  const [nickname, setNickname] = useState("");
  const [favoriteSports, setFavoriteSports] = useState([]);
  const { data: session } = useSession() as any;
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const fetchs = async () => {
    try {
      const res = await fetch(`/back/api/v1/member`, {
        headers: {
          Authorization: session?.accessToken,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setNickname(data.data.nickname);
        setFavoriteSports(data.data.favoriteSports.split(","));
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const delUserHandler = async () => {
    const onClick = async () => {
      const response = await fetch("/back/api/v1/member", {
        method: "DELETE",
        headers: {
          Authorization: session?.accessToken,
        },
      });

      if (response.ok) {
        dispatch(
          open({
            Component: Success,
            props: { message: "회원 탈퇴가 완료 되었습니다." },
          }),
        );
        setTimeout(() => {
          signOut({
            callbackUrl: "/",
          });
        }, 500);
      }
    };

    dispatch(
      open({
        Component: Confirm,
        props: { message: "정말 탈퇴하시겠습니까?", onClick: onClick },
      }),
    );
  };

  useEffect(() => {
    fetchs();
  }, [session]);

  return (
    <main className="py-24 md:pb-[93px] md:pt-[120px]">
      <Wrap className="box-border">
        <button type="button" className="cursor-pointer md:hidden">
          <Image
            src="/asset/image/icon/prev_arrow.svg"
            alt="뒤로가기"
            width={20}
            height={18}
          />
        </button>
        <h1 className="mt-[10px] text-lg font-medium text-OnBackground md:text-2xl">
          마이페이지
        </h1>

        <div className="mt-4 flex flex-col items-center gap-6 md:mt-[60px] md:flex-row md:gap-7">
          {isLoading ? (
            <SkeletonUser />
          ) : (
            <>
              <div className="size-[78px] rounded-full border bg-[url(/asset/image/user/user.png)] bg-[length:95%_95%] bg-center bg-no-repeat md:size-[104px]"></div>
              <div className="flex flex-wrap items-center justify-center gap-[7px] text-base font-medium md:justify-start">
                <div className="flex flex-none gap-[7px]">
                  닉네임
                  <p className="rounded-full border border-OnSurface px-2 py-1 text-[13px] font-medium leading-none text-OnSurface">
                    {nickname}
                  </p>
                </div>
                <div className="flex gap-[7px]">
                  {favoriteSports.map((el, index) => (
                    <p
                      key={index}
                      className="rounded-full border border-OnSurface px-2 py-1 text-[13px] font-medium leading-none text-OnSurface"
                    >
                      {GAMETYPE[el]}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </Wrap>

      <Wrap className="mt-10 border-t-[6px] border-Surface md:border-0">
        {isLoading ? (
          <SkeletonNickname />
        ) : (
          <Nickname setNickname={setNickname} />
        )}
        {session?.type !== "oauth" ? (
          isLoading ? (
            <SkeletonPassword />
          ) : (
            <Password />
          )
        ) : null}
        {!isLoading && (
          <div className="mt-[88px] text-center md:mt-20">
            <button
              onClick={delUserHandler}
              className="cursor-pointer border-b border-OnBackgroundGray px-1 pb-[2px] text-xs font-medium text-OnBackgroundGray md:text-base"
            >
              회원탈퇴
            </button>
          </div>
        )}
      </Wrap>
    </main>
  );
}
