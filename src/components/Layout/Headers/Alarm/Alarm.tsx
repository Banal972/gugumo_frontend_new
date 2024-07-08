"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";

export interface AlarmT {
    id: number;
    message: string;
    notificationType: string;
    createDate: string;
    postId: number;
    read: boolean;
  }

const alarmfetchs = async (session : any,setData : Dispatch<SetStateAction<AlarmT[]>>)=>{
    if(!session) return;
    const response = await fetch('/back/api/v1/notification',{
        headers : {
            "Authorization" : session?.accessToken
        }
    });
    if(!response.ok) return;
    const {data} : {data : AlarmT[]} = await response.json();
    setData(data);
}

export default function Alarm({session} : {session : any}) {

    const router = useRouter();
    const [isAlarm,setIsAlarm] = useState(false);
    const [data,setData] = useState<AlarmT[]>([]);

    useEffect(()=>{
        alarmfetchs(session,setData);
    },[session]);

    const onReadHandler = async (e :MouseEvent<HTMLLIElement, globalThis.MouseEvent>,notiId : number,postId : number)=>{
        const response = await fetch(`/back/api/v1/notification/read/${notiId}`,{
            method : "PATCH",
            headers : {
                "Authorization" : session?.accessToken
            }
        })
        if(!response.ok) return;
        console.log('읽음 완료');
        router.push(`/detail/${postId}`);
    }

    const onDeleteHandler = async (e :MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,notiId : number)=>{
        e.stopPropagation();
        const response = await fetch(`/back/api/v1/notification/${notiId}`,{
            method : "DELETE",
            headers : {
                "Authorization" : session?.accessToken
            }
        })
        if(!response.ok) return;
        console.log('삭제 완료');
    }

    const onAllReadHandler = async ()=>{
        const response = await fetch('/back/api/v1/notification/read',{
            method : "PATCH",
            headers : {
                "Authorization" : session?.accessToken
            }
        });
        if(!response.ok) return;
        console.log('모두 읽음 완료');
    }


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
                        <button className="text-[13px] text-OnSurface font-semibold" type="button" onClick={onAllReadHandler}>모두읽음</button>
                    </div>
                    <div className="mt-[23px]">
                        <p className="ml-[3px] text-[13px] text-OnSurface">6월 3일</p>
                        <ul className="mt-2">
                            {
                                data?.map(elm=>(
                                    <li className={`flex whitespace-nowrap gap-2 bg-Surface py-[14px] px-3 rounded items-center cursor-pointer justify-between`} key={elm.id} onClick={(e)=>onReadHandler(e,elm.id,elm.postId)}>
                                        <p className="truncate text-[13px]"> <span className="text-primary bg-white text-[13px] py-[3px] px-[8.5px] rounded-full">댓글</span> {elm.message}</p>
                                        <button type="button" onClick={(e)=>onDeleteHandler(e,elm.id)}>
                                            <Image src="/asset/image/icon/remove.svg" alt="삭제 아이콘" width={13.36} height={13.36} />
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
        }
    </div>
  )
}
