'use client';

import get from '@/actions/meeting/listAction';
import Gametype from '@/components/page/main/Gametype';
import Location from '@/components/page/main/Location';
import Sort from '@/components/page/main/Sort';
import Status from '@/components/page/main/Status';
import Search from '@/ui/form/Search';
import Paging from '@/ui/layout/Paging';
import Card from '@/ui/layout/card/Card';
import SkeletonCard from '@/ui/layout/card/SkeletonCard';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type FormValues = {
  search: string;
};

const ListContainer = () => {
  const [query, setQuery] = useState({
    q: '',
    meetingstatus: 'RECRUIT',
    location: '',
    gametype: '',
    sort: 'NEW',
    page: 1,
  });

  const { data, isPending } = useQuery({
    queryKey: ['meeting', query],
    queryFn: () => get({ query }),
  });

  const searchHandler = (event: FormValues) => {
    const { search } = event;
    setQuery((prev) => ({
      ...prev,
      q: search,
    }));
  };

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-6 md:flex-row md:items-center md:justify-between md:gap-5">
        <Status status={query.meetingstatus} setQuery={setQuery} />
        <Search searchHandler={searchHandler} />
      </div>

      <div className="mt-[25px] md:mt-9">
        <Location location={query.location} setQuery={setQuery} />
      </div>

      <div className="mt-[18px] md:mt-[15px]">
        <Gametype gametype={query.gametype} setQuery={setQuery} />
      </div>

      <div className="mt-[38px] md:mt-[53px] md:rounded-xl md:bg-[#F4F5F8] md:px-[5%] md:pb-[49px] md:pt-[39px] lg:px-[70px]">
        <Sort sort={query.sort} setQuery={setQuery} />

        <div className="mt-[10px] grid grid-cols-1 gap-[13px] md:mt-7 md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 xl:grid-cols-4">
          {isPending &&
            Array.from({ length: 12 }, (_, index) => index).map((item) => (
              <SkeletonCard key={item} />
            ))}

          {!isPending &&
            data?.data.content.map((el) => <Card key={el.postId} el={el} />)}
        </div>

        {!data ||
          (data.data.content.length <= 0 && (
            <p className="text-center">게시물이 존재하지 않습니다.</p>
          ))}

        <div className="mt-[13px] text-right md:mt-7">
          <WriteButton />
        </div>

        {data?.data.pageable && <Paging pageable={data.data.pageable} />}
      </div>
    </>
  );
};

export default ListContainer;

const WriteButton = () => {
  const router = useRouter();

  const writeHandler = () => {
    router.push('/post/write');
  };

  return (
    <button
      type="button"
      onClick={writeHandler}
      className="group inline-flex cursor-pointer items-center gap-1 rounded border border-primary bg-OnPrimary px-4 py-[0.4em] text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-OnPrimary md:text-base"
    >
      <Image
        className="group-hover:brightness-0 group-hover:invert"
        src="/asset/image/icon/write.svg"
        alt="작성 아이콘"
        width={24}
        height={24}
      />
      새글 작성
    </button>
  );
};
