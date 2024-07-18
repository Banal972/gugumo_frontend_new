"use client";
import * as C from "@/constant/card/constant";
import moment from "moment";
import Bookmark from "@/components/Common/Button/Bookmark/Bookmark";
import { useRouter } from "next/navigation";

interface CardT {
  postId: number;
  meetingStatus: string;
  gameType: string;
  location: string;
  title: string;
  meetingMemberNum: number;
  meetingDeadline: string;
  meetingDateTime: string;
  meetingDays: string;
  bookmarked: boolean;
}

const TAGSTYLE =
  "py-1 px-[6px] whitespace-nowrap rounded text-[13px] leading-none";

export default function Card({ el }: { el: CardT }) {
  const router = useRouter();

  const clickHandler = (postid: number) => {
    router.push(`/detail/${postid}`);
  };

  return (
    <div
      onClick={() => clickHandler(el.postId)}
      className="bg-Surface md:bg-white py-5 px-4 rounded-lg cursor-pointer border md:border-none"
    >
      <div className="flex flex-wrap gap-[5px] leading-none">
        <div className={`${TAGSTYLE} text-[#4378FF] bg-[#BFE0FF]`}>
          {C.STATUS[el.meetingStatus]}
        </div>
        <div className={`${TAGSTYLE} text-[#54A900] bg-[#D2FFAE]`}>
          {C.GAMETYPE[el.gameType]}
        </div>
        <div className={`${TAGSTYLE} text-[#FF6414] bg-[#FDC9AF]`}>
          {C.LOCATION[el.location]}
        </div>
      </div>

      <h4 className="font-medium text-base leading-[1.3] mt-[11px] break-keep text-ellipsis line-clamp-2 h-10">
        {el.title}
      </h4>

      <ul className="md:block mt-12 text-[13px] leading-none">
        {el.meetingDateTime && (
          <li className="flex text-OnBackgroundGray">
            <p className="pr-[9px]">시간</p>
            <p className="border-l border-OnBackgroundGray pl-[9px]">
              {moment(el.meetingDateTime).format("YYYY-MM-DD")}
            </p>
          </li>
        )}
        {el.meetingDays && (
          <li className="flex text-OnBackgroundGray mt-1">
            <p className="pr-[9px]">요일</p>
            <p className="border-l border-OnBackgroundGray pl-[9px]">
              {el.meetingDays.split(";").join(",")}
            </p>
          </li>
        )}
        <li className="flex text-OnBackgroundGray mt-1">
          <p className="pr-[9px]">인원</p>
          <p className="border-l border-OnBackgroundGray pl-[9px]">
            {el.meetingMemberNum}명
          </p>
        </li>
      </ul>

      <div className="flex flex-wrap items-center justify-between pt-[9.5px] mt-[9.5px] border-t border-Outline gap-[7px]">
        <span className="whitespace-nowrap text-[13px] font-medium text-OnBackgroundGray">
          모집 마감일 {moment(el.meetingDeadline).format("YY.MM.DD")}
        </span>
        <Bookmark postId={el.postId} bookmarked={el.bookmarked} />
      </div>
    </div>
  );
}
