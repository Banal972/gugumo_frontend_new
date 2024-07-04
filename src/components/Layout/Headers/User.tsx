"use client"
import LogoutBtn from '@/components/Layout/Headers/LogoutBtn'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function User() {

    const [isUser,setIsUser] = useState(false);

  return (
    <div className="relative">
        <div className="cursor-pointer w-6 md:w-auto" >
            <Image 
                onClick={()=>setIsUser(!isUser)} 
                src="/asset/image/icon/user.svg" 
                alt="유저 아이콘" 
                width={36} 
                height={36}
            />
        </div>
        {
            isUser &&
            <ul className="absolute right-0 top-full py-5 px-[30px] border border-primary text-[13px] font-medium rounded whitespace-nowrap text-center bg-background mt-[10px]">
                <li>
                    <Link href={"/post/list"} className="text-OnSurface">작성글</Link>
                </li>
                <li className="mt-3">
                    <Link href={"/mypage"} className="text-OnSurface">회원정보</Link>
                </li>
                <li className="mt-3">
                    <LogoutBtn/>
                </li>
            </ul>
        }
    </div>
  )
}
