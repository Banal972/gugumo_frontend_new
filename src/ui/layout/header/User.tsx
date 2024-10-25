"use client";

import LogoutBtn from "@/ui/layout/header/LogoutBtn";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const User = () => {
  const [isUser, setIsUser] = useState(false);

  return (
    <div className="relative">
      <div className="w-6 cursor-pointer md:w-auto">
        <Image
          onClick={() => setIsUser(!isUser)}
          src="/asset/image/icon/user.svg"
          alt="유저 아이콘"
          width={36}
          height={36}
        />
      </div>
      {isUser && (
        <ul className="absolute right-0 top-full mt-[10px] whitespace-nowrap rounded border border-primary bg-background px-[30px] py-5 text-center text-[13px] font-medium">
          <li>
            <Link href={"/post/list"} className="text-OnSurface">
              작성글
            </Link>
          </li>
          <li className="mt-3">
            <Link href={"/mypage"} className="text-OnSurface">
              회원정보
            </Link>
          </li>
          <li className="mt-3">
            <LogoutBtn />
          </li>
        </ul>
      )}
    </div>
  );
};

export default User;
