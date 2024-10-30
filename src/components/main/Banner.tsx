'use client';

import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Banner() {
  return (
    <Swiper
      slidesPerView={1.2}
      modules={[Autoplay]}
      breakpoints={{
        '820': {
          slidesPerView: 1.2,
          spaceBetween: 23,
        },
        '1024': {
          slidesPerView: 1.2,
          spaceBetween: 23,
        },
        '1280': {
          slidesPerView: 1.6,
          spaceBetween: 23,
        },
      }}
      centeredSlides
      spaceBetween={13}
      loop
      autoplay={{
        delay: 6000,
      }}
      speed={600}
    >
      {Array.from({ length: 4 }, (_, index) => index).map((item, index) => (
        <SwiperSlide key={item}>
          <div className="relative overflow-hidden rounded-lg">
            <Image
              className="hidden md:block"
              src="/asset/image/banner/banner.jpg"
              alt={`배너${index} 데스크탑`}
              width={2496}
              height={785}
              priority
            />
            <Image
              className="md:hidden"
              src="/asset/image/banner/banner_mob.jpg"
              alt={`배너${index} 모바일`}
              width={1879}
              height={851}
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
