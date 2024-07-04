"use client"
import Image from "next/image";
import Link from "next/link";
import ViewSVG from "@/asset/image/view.svg";
import BtnList from "@/components/page/post/detail/BtnList";
import Bookmark from "@/components/Common/Button/Bookmark/Bookmark";
import moment from "moment";
import dynamic from "next/dynamic";
import { useState } from "react";

const ViewerComponent = dynamic(()=>import("@/components/page/post/detail/ViewerComponent"),{ssr : false});

const MEETINGTYPE : {[key : string] : string} = {
    "SHORT" : "단기모집",
    "LONG" : "장기모집"
}

const GAMETYPE : {[key : string] : string } = {
    "BADMINTON" : "배드민턴",
    "FUTSAL" : "풋살",
    "BASKETBALL" : "농구",
    "TENNIS" : "테니스",
    "TABLETENNIS" : "탁구",
    "BASEBALL" : "야구"
};

const LOCATION : {[key : string] : string } = {
    "SEOUL" : "서울",
    "GYEONGGI" : "경기",
    "INCHEON" : "인천",
    "DAEGU" : "대구",
    "BUSAN" : "부산",
    "GYEONGNAM" : "경남",
    "GYEONGBUK" : "경북",
    "GANGWON" : "강원",
    "JEONNAM" : "전남",
    "JEONBUK" : "전북",
    "OTHER" : "그외"
};

const gridClass = 'grid items-center text-OnSurface text-xs md:text-lg font-medium gap-3 grid-cols-[62px_1fr] md:grid-cols-[102px_1fr]';
const gridTitle = 'md:py-3 md:px-6 bg-Surface text-center box-border text-nowrap w-full h-8 md:h-10 flex items-center justify-center rounded'

export default function DetailUI({detail,postid} : {detail : any, postid : string}) {

    const [bookCount,setBookCount] = useState(detail.data.bookmarkCount);

  return (
    <>
        <Link href={'/'} className="inline-block">
            <Image src="/asset/image/icon/prev_arrow.svg" alt="뒤로가기" width={20} height={18}/>
        </Link>
        
        <h1 className="text-lg md:text-2xl mt-1 md:mt-8 font-semibold leading-normal">{detail.data.title}</h1>
        
        <div className="flex items-center mt-2 md:mt-7 pb-[18px] text-sm md:text-lg font-medium text-OnBackgroundGray border-b border-Outline justify-between flex-wrap gap-1">
            <div className="flex items-center gap-[10px] md:gap-[18px]">
                <p>{detail.data.author !=="" ? detail.data.author : "탈퇴한 유저"}</p>
                <p>{moment(detail.data.createdDateTime).format('YYYY-MM-DD')}</p>
                <div className="flex items-center gap-[10px]">
                    <ViewSVG width={24} height={24} stroke="#A5A5A5"/>
                    {detail.data.viewCount}
                </div>
            </div>
            <div className="flex items-center gap-[6px] text-primary">
                <Bookmark postId={Number(postid)} bookmarked={detail.data.bookmarked} setBookCount={setBookCount}/>
                <p className="text-sm md:text-xl font-medium">
                    {bookCount > 0 ? String(bookCount).padStart(2,'0') : bookCount}
                </p>
            </div>
        </div>
        
        <div className="grid grid-cols-1 min-[400px]:grid-cols-[1fr_1.5fr] md:grid-cols-2 mt-4 md:mt-8 gap-4 gap-x-2 md:gap-5">

            <div className={gridClass}>
                <h4 className={gridTitle}>모집형식</h4>
                <p>{MEETINGTYPE[detail.data.meetingType]}</p>
            </div>

            <div className={gridClass}>
                <h4 className={gridTitle}>지역</h4>
                <p>{LOCATION[detail.data.location]}</p>
            </div>

            <div className={gridClass}>
                <h4 className={gridTitle}>구기종목</h4>
                <p>{GAMETYPE[detail.data.gameType]}</p>
            </div>

            {
                detail.data.meetingTime &&
                <div className={gridClass}>
                    <h4 className={gridTitle}>시간대</h4>
                    <p>{detail.data.meetingTime}</p>
                </div>
            }

            {
                detail.data.meetingDays &&
                <div className={gridClass}>
                    <h4 className={gridTitle}>모임 요일</h4>
                    <p>{detail.data.meetingDays.split(';').join(',')}</p>
                </div>
            }

            {
                detail.data.meetingDateTime &&
                <div className={gridClass}>
                    <h4 className={gridTitle}>모임 날짜</h4>
                    <p>{moment(detail.data.meetingDateTime).format('YYYY-MM-DD')}</p>
                </div>
            }
            
            <div className={gridClass}>
                <h4 className={gridTitle}>모집 인원</h4>
                <p>{detail.data.meetingMemberNum} 명</p>
            </div>

            <div className={gridClass}>
                <h4 className={gridTitle}>모집 마감</h4>
                <p>{detail.data.meetingDeadline}</p>
            </div>

            <div className="grid items-center text-OnSurface text-xs md:text-lg font-medium gap-3 grid-cols-[104px_1fr] md:grid-cols-[136px_1fr]">
                <h4 className="py-3 px-6 bg-Surface text-center box-border text-nowrap w-full h-8 md:h-10 flex items-center justify-center rounded">오픈카톡 주소</h4>
                <a href={detail.data.openKakao} target="_blank" className="w-full md:w-[158px] h-8 md:h-10 flex items-center justify-center bg-primary text-white rounded whitespace-nowrap ">
                    오픈톡 참여 <Image src="/asset/image/icon/link.svg" width={24} height={24} alt="링크 아이콘" />
                </a>
            </div>

        </div>

        <div className="mt-8 md:mt-24 min-h-72 md:min-h-[848px] w-full py-3 md:py-9 px-4 md:px-12 box-border text-sm md:text-lg font-medium leading-8 border">
            <ViewerComponent content={detail.data.content}/>
        </div>

        <BtnList postid={postid} yours={detail.data.yours} />

    </>
  )
}
