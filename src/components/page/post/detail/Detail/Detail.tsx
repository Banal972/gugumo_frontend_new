import ViewSVG from '@/asset/image/view.svg';
import BtnList from '@/components/page/post/detail/BtnList';
import View from '@/components/page/post/detail/Detail/View';
import Grid from '@/components/page/post/detail/Detail/atom/Grid';
import GridText from '@/components/page/post/detail/Detail/atom/GridText';
import { GAMETYPE, LOCATION, MEETINGTYPE } from '@/constant/card/constant';
import { DetailData } from '@/types/detail.type';
import Bookmark from '@/ui/Button/Bookmark/Bookmark';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const Detail = ({ detail }: { detail: DetailData }) => {
  return (
    <>
      <Link href="/" className="inline-block">
        <Image
          src="/asset/image/icon/prev_arrow.svg"
          alt="뒤로가기"
          width={20}
          height={18}
        />
      </Link>

      <h1 className="mt-1 text-lg font-semibold leading-normal md:mt-8 md:text-2xl">
        {detail.title}
      </h1>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-1 border-b border-Outline pb-[18px] text-sm font-medium text-OnBackgroundGray md:mt-7 md:text-lg">
        <div className="flex items-center gap-[10px] md:gap-[18px]">
          <p>{detail.author !== '' ? detail.author : '탈퇴한 유저'}</p>
          <p>{moment(detail.createdDateTime).format('YYYY-MM-DD')}</p>
          <div className="flex items-center gap-[10px]">
            <ViewSVG width={24} height={24} stroke="#A5A5A5" />
            {detail.viewCount}
          </div>
        </div>
        <div className="flex items-center gap-[6px] text-primary">
          <Bookmark
            postId={Number(detail.postId)}
            bookmarked={detail.bookmarked}
          />
          <p className="text-sm font-medium md:text-xl">
            {detail.bookmarkCount > 0
              ? String(detail.bookmarkCount).padStart(2, '0')
              : detail.bookmarkCount}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 gap-x-2 max-[400px]:grid-cols-1 md:mt-8 md:gap-5">
        <Grid>
          <GridText>모집형식</GridText>
          <p>{MEETINGTYPE[detail.meetingType]}</p>
        </Grid>

        <Grid>
          <GridText>지역</GridText>
          <p>{LOCATION[detail.location]}</p>
        </Grid>

        <Grid>
          <GridText>구기종목</GridText>
          <p>{GAMETYPE[detail.gameType]}</p>
        </Grid>

        {detail.meetingTime && (
          <Grid>
            <GridText>시간대</GridText>
            <p>{detail.meetingTime}</p>
          </Grid>
        )}

        {detail.meetingDays && (
          <Grid>
            <GridText>모임 요일</GridText>
            <p>{detail.meetingDays.split(';').join(',')}</p>
          </Grid>
        )}

        {detail.meetingDateTime && (
          <Grid>
            <GridText>모임 날짜</GridText>
            <p>{moment(detail.meetingDateTime).format('YYYY-MM-DD')}</p>
          </Grid>
        )}

        <Grid>
          <GridText>모집 인원</GridText>
          <p>{detail.meetingMemberNum} 명</p>
        </Grid>

        <Grid>
          <GridText>모집 마감</GridText>
          <p>{detail.meetingDeadline}</p>
        </Grid>

        <div className="col-span-2 grid grid-cols-[104px_1fr] items-center gap-3 text-xs font-medium text-OnSurface max-[400px]:col-span-1 sm:col-auto md:grid-cols-[136px_1fr] md:text-lg">
          <h4 className="box-border flex h-8 w-full items-center justify-center text-nowrap rounded bg-Surface px-6 py-3 text-center md:h-10">
            오픈카톡 주소
          </h4>
          <a
            href={detail.openKakao}
            target="_blank"
            className="flex h-8 w-full max-w-[143px] items-center justify-center whitespace-nowrap rounded bg-primary text-white transition-colors hover:bg-[#3f92e0] md:h-10 md:w-[158px]"
            rel="noreferrer"
          >
            오픈톡 참여
            <Image
              src="/asset/image/icon/link.svg"
              width={24}
              height={24}
              alt="링크 아이콘"
            />
          </a>
        </div>
      </div>

      <div className="mt-8 box-border min-h-72 w-full border px-4 py-3 text-sm font-medium leading-8 md:mt-24 md:min-h-[848px] md:px-12 md:py-9 md:text-lg">
        <View content={detail.content} />
      </div>

      <BtnList postid={String(detail.postId)} yours={detail.yours} />
    </>
  );
};

export default Detail;
