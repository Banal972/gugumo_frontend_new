"use client";
import Bookmark from "@/components/Common/Button/Bookmark/Bookmark";
import SkeletonCard from "@/components/Common/Card/SkeletonCard";
import { GAMETYPE, LOCATION, STATUS } from "@/constant/card/constant";
import { recommendOptions } from "@/hooks/useRecommend";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

const BUTTONSTYLE =
  "w-8 h-8 xl:w-10 xl:h-10 rounded-full flex-none border border-primary cursor-pointer text-primary relative hidden md:block disabled:hidden";

export default function Recommend() {
  const { data: session } = useSession();

  const {
    data: recommends,
    isLoading,
    isError,
  } = useQuery(recommendOptions({ session }));
  const router = useRouter();
  const swiperRef = useRef<SwiperRef>(null);
  const onClickHandler = (postId: number) => {
    router.push(`/detail/${postId}`);
  };

  return (
    <>
      <button className={`${BUTTONSTYLE} slide-prev`}>
        <Image
          className="absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2 md:w-auto"
          src={"/asset/image/icon/slide-arrow.png"}
          width={22}
          height={20}
          alt="왼쪽 버튼"
        />
      </button>
      <Swiper
        className="flex-1"
        ref={swiperRef}
        modules={[Autoplay, Navigation]}
        navigation={{
          prevEl: ".slide-prev",
          nextEl: ".slide-next",
        }}
        slidesPerView={1.2}
        breakpoints={{
          "481": {
            slidesPerView: 1.5,
          },
          "820": {
            slidesPerView: 2.5,
          },
          "1025": {
            slidesPerView: 3,
          },
        }}
        centeredSlides={false}
        spaceBetween={26}
        loop={recommends?.data.length > 3 ? true : false}
        speed={600}
        autoplay={{
          delay: 6000,
        }}
      >
        {isLoading || isError
          ? new Array(8).fill(0).map((_, index) => (
              <SwiperSlide key={index} className="rounded border">
                <SkeletonCard />
              </SwiperSlide>
            ))
          : recommends?.data.map((e: any) => (
              <SwiperSlide
                key={e.postId}
                className="group hover:shadow-xl"
                onClick={() => onClickHandler(e.postId)}
              >
                <div className="cursor-pointer rounded-lg border border-SubColor4 bg-[#DBEBFF] px-4 py-5 transition-all group-hover:bg-primary">
                  <div className="flex flex-wrap gap-[5px] leading-none">
                    <div className="whitespace-nowrap rounded bg-[#BFE0FF] px-[6px] py-1 text-[13px] text-[#4378FF]">
                      {STATUS[e.meetingStatus]}
                    </div>
                    <div className="whitespace-nowrap rounded bg-[#D2FFAE] px-[6px] py-1 text-[13px] text-[#54A900]">
                      {GAMETYPE[e.gameType]}
                    </div>
                    <div className="whitespace-nowrap rounded bg-[#FDC9AF] px-[6px] py-1 text-[13px] text-[#FF6414]">
                      {LOCATION[e.location]}
                    </div>
                  </div>
                  <h4 className="mt-[11px] line-clamp-2 h-10 text-ellipsis break-keep text-base font-medium leading-[1.3] group-hover:text-white">
                    {e.title}
                  </h4>
                  <ul className="mt-8 hidden text-[13px] md:block">
                    {e.meetingDateTime && (
                      <li className="flex text-primary group-hover:text-white">
                        <p className="pr-[9px]">시간</p>
                        <p className="border-l border-primary pl-[9px] group-hover:border-white">
                          {moment(e.meetingDateTime).format("YYYY-MM-DD")}
                        </p>
                      </li>
                    )}
                    {e.meetingDays && (
                      <li className="mt-1 flex text-primary group-hover:text-white">
                        <p className="pr-[9px]">요일</p>
                        <p className="border-l border-primary pl-[9px] group-hover:border-white">
                          {e.meetingDays}
                        </p>
                      </li>
                    )}
                    <li className="mt-1 flex text-primary group-hover:text-white">
                      <p className="pr-[9px]">인원</p>
                      <p className="border-l border-primary pl-[9px] group-hover:border-white">
                        {e.meetingMemberNum}명
                      </p>
                    </li>
                  </ul>
                  <div className="mt-[9.5px] flex flex-wrap items-center justify-between gap-[7px] border-t border-primary pt-[9.5px] group-hover:border-white">
                    <span className="whitespace-nowrap text-[13px] font-medium text-primary group-hover:text-white">
                      모집 마감일 {e.meetingDeadline}
                    </span>
                    <Bookmark postId={e.postId} bookmarked={e.bookmarked} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      <button className={`${BUTTONSTYLE} slide-next`}>
        <Image
          className="absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2 -scale-x-100 md:w-auto"
          src={"/asset/image/icon/slide-arrow.png"}
          width={22}
          height={20}
          alt="오른쪽 버튼"
        />
      </button>
    </>
  );
}
