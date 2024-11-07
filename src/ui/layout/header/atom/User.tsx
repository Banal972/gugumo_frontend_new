'use client';

import useOutsideClick from '@/hooks/useOutsideClick';
import LogoutBtn from '@/ui/layout/header/atom/LogoutBtn';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const User = () => {
  const params = useParams();
  const ref = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [params]);

  useOutsideClick({ ref, isOpen, setIsOpen });

  return (
    <div className="relative">
      <div className="w-6 cursor-pointer md:w-auto">
        <Image
          onClick={() => setIsOpen(!isOpen)}
          src="/asset/image/icon/user.svg"
          alt="유저 아이콘"
          width={36}
          height={36}
        />
      </div>
      {isOpen && (
        <ul
          ref={ref}
          className="absolute right-0 top-full mt-[10px] whitespace-nowrap rounded border border-primary bg-background px-[30px] py-5 text-center text-[13px] font-medium"
        >
          <li>
            <Link href="/post/list" className="text-OnSurface">
              작성글
            </Link>
          </li>
          <li className="mt-3">
            <Link href="/mypage" className="text-OnSurface">
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
