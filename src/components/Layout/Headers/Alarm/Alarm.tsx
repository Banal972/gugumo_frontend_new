"use client"
import Image from "next/image";
import { useState } from "react";
const LIST = "flex whitespace-nowrap gap-2 bg-Surface py-[14px] px-3 rounded items-center cursor-pointer"
export default function Alarm() {

    const [isAlarm,setIsAlarm] = useState(false);

  return (
    <div className="relative">
        <div className="cursor-pointer w-6 md:w-auto">
            <Image 
                onClick={()=>setIsAlarm(!isAlarm)} 
                src="/asset/image/icon/bell.svg" 
                alt="알림창" 
                width={36}
                height={36}
            />
        </div>
        {
            isAlarm &&
                <div className="absolute top-full right-0 md:w-[342px] w-[272px] rounded-lg bg-white py-[22px] px-[30px] box-border md:max-h-[334px] max-h-[264px] translate-x-1/4 md:translate-x-0 overflow-y-hidden">
                    <div className="flex justify-between">
                        <h4 className="text-primary text-base font-semibold">알림</h4>
                        <button className="text-[13px] text-OnSurface font-semibold">모두읽음</button>
                    </div>
                    <div className="mt-[23px]">
                        <p className="ml-[3px] text-[13px] text-OnSurface">6월 3일</p>
                        <ul className="mt-2">
                            <li className={`${LIST}`}>
                                <span className="text-primary bg-white text-[13px] py-[3px] px-[8.5px] rounded-full">댓글</span>
                                <p className="truncate text-[13px]">내용입니다...내용입니다...내용입니다...</p>
                                <button type="button">
                                    <Image src="/asset/image/icon/remove.svg" alt="삭제 아이콘" width={13.36} height={13.36} />
                                </button>
                            </li>
                            <li className={`${LIST} mt-2`}>
                                <span className="text-primary bg-white text-[13px] py-[3px] px-[8.5px] rounded-full">댓글</span>
                                <p className="truncate text-[13px]">내용입니다...내용입니다...내용입니다...</p>
                                <button type="button">
                                    <Image src="/asset/image/icon/remove.svg" alt="삭제 아이콘" width={13.36} height={13.36} />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
        }
    </div>
  )
}
