'use client';

import { GAMETYPE, LOCATION, STATUS } from '@/constant/card/constant';
import { Content } from '@/types/get.type';
import Bookmark from '@/ui/Button/Bookmark/Bookmark';
import NavButton from '@/ui/layout/recommends/atom/NavButton';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

const Slide = ({ posts }: { posts: Content[] }) => {
  const router = useRouter();
  const swiperRef = useRef<SwiperRef>(null);
  const onClickHandler = (postId: number) => {
    router.push(`/detail/${postId}`);
  };

  return (
    <>
      <NavButton type="left" />
      <Swiper
        className="flex-1"
        ref={swiperRef}
        modules={[Autoplay, Navigation]}
        navigation={{
          prevEl: '.slide-prev',
          nextEl: '.slide-next',
        }}
        slidesPerView={1.2}
        breakpoints={{
          '481': {
            slidesPerView: 1.5,
          },
          '820': {
            slidesPerView: 2.5,
          },
          '1025': {
            slidesPerView: 3,
          },
        }}
        centeredSlides={false}
        spaceBetween={26}
        loop={posts.length > 3}
        speed={600}
        autoplay={{
          delay: 6000,
        }}
      >
        {posts.map((e: Content) => (
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
                      {moment(e.meetingDateTime).format('YYYY-MM-DD')}
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
      <NavButton type="right" />
    </>
  );
};

export default Slide;
