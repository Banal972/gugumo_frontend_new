"use client";
import Wrap from "@/components/Common/Wrap";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginBtn from "@/components/Layout/Headers/LoginBtn";
import Alarm from "@/components/Layout/Headers/Alarm/Alarm";
import User from "@/components/Layout/Headers/User";
import Image from "next/image";

export default function Headers() {
  const { data: session } = useSession() as any;

  return (
    <header className="relative z-20 mt-6 w-full md:mt-10">
      <Wrap className="flex items-center justify-between">
        <Link href={"/"} className="w-[91px] md:w-[172px]">
          <img src="/asset/image/logo.svg" alt="로고" />
        </Link>
        {!session?.accessToken ? (
          <LoginBtn />
        ) : (
          <div className="flex items-center gap-3 md:gap-[26px]">
            <Alarm session={session} />
            <Link className="w-4 md:w-auto" href={"/bookmark"}>
              <Image
                src={"/asset/image/icon/bookmark.png"}
                width={24}
                height={29}
                alt="북마크"
              />
            </Link>
            <User />
          </div>
        )}
      </Wrap>
    </header>
  );
}
