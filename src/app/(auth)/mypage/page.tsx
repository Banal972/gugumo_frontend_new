import getAction from "@/actions/auth/mypage/getAction";
import Wrap from "@/components/Common/Wrap";
import DeleteUser from "@/components/page/auth/mypage/DeleteUser";
import Nickname from "@/components/page/auth/mypage/Nickname";
import Password from "@/components/page/auth/mypage/Password";
import SkeletonNickname from "@/components/page/auth/mypage/SkeletonUI/SkeletonNickname";
import SkeletonPassword from "@/components/page/auth/mypage/SkeletonUI/SkeletonPassword";
import SkeletonUser from "@/components/page/auth/mypage/SkeletonUI/SkeletonUser";
import { GAMETYPE } from "@/constant/card/constant";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Suspense } from "react";

const Mypage = async () => {
  const session = (await getServerSession(authOptions)) as any;
  const res = await getAction();

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
          <Suspense fallback={<SkeletonUser />}>
            <div className="size-[78px] rounded-full border bg-[url(/asset/image/user/user.png)] bg-[length:95%_95%] bg-center bg-no-repeat md:size-[104px]"></div>
            <div className="flex flex-wrap items-center justify-center gap-[7px] text-base font-medium md:justify-start">
              <div className="flex flex-none gap-[7px]">
                닉네임
                <p className="rounded-full border border-OnSurface px-2 py-1 text-[13px] font-medium leading-none text-OnSurface">
                  {res.data.nickname}
                </p>
              </div>
              <div className="flex gap-[7px]">
                {res.data.favoriteSports.split(",").map((el) => (
                  <p
                    key={el}
                    className="rounded-full border border-OnSurface px-2 py-1 text-[13px] font-medium leading-none text-OnSurface"
                  >
                    {GAMETYPE[el]}
                  </p>
                ))}
              </div>
            </div>
          </Suspense>
        </div>
      </Wrap>

      <Wrap className="mt-10 border-t-[6px] border-Surface md:border-0">
        <Suspense fallback={<SkeletonNickname />}>
          <Nickname />
        </Suspense>

        {session?.type !== "oauth" && (
          <Suspense fallback={<SkeletonPassword />}>
            <Password />
          </Suspense>
        )}

        <DeleteUser />
      </Wrap>
    </main>
  );
};

export default Mypage;
