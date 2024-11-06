import get from '@/actions/meeting/listAction';
import Gametype from '@/components/page/main/Gametype';
import Location from '@/components/page/main/Location';
import Sort from '@/components/page/main/Sort';
import Status from '@/components/page/main/Status';
import { DefaultSearchParams } from '@/types/get.type';
import WriteButton from '@/ui/Button/WriteButton';
import Search from '@/ui/form/Search';
import Paging from '@/ui/layout/Paging';
import Card from '@/ui/layout/card/Card';
import SkeletonCard from '@/ui/layout/card/skeleton/SkeletonCard';
import { Suspense } from 'react';

const ListContainer = async ({ searchParams }: DefaultSearchParams) => {
  const params = await searchParams;
  const q = params?.q || '';
  const page = params?.page || 1;
  const status = params?.status || 'RECRUIT';
  const location = params?.location || '';
  const sort = params?.sort || 'NEW';
  const gametype = params?.gametype || '';

  const res = await get({
    query: {
      q,
      meetingstatus: status,
      location,
      gametype,
      sort,
      page,
    },
  });

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-6 md:flex-row md:items-center md:justify-between md:gap-5">
        <Status status={status} />
        <Search />
      </div>

      <div className="mt-[25px] md:mt-9">
        <Location location={location} />
      </div>

      <div className="mt-[18px] md:mt-[15px]">
        <Gametype gametype={gametype} />
      </div>

      <div className="mt-[38px] md:mt-[53px] md:rounded-xl md:bg-[#F4F5F8] md:px-[5%] md:pb-[49px] md:pt-[39px] lg:px-[70px]">
        <Sort sort={sort} />

        <div className="mt-[10px] grid grid-cols-1 gap-[13px] md:mt-7 md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 xl:grid-cols-4">
          <Suspense
            fallback={Array.from({ length: 12 }, (_, index) => index).map(
              (item) => (
                <SkeletonCard key={item} />
              ),
            )}
          >
            {res.data.content.map((el) => (
              <Card key={el.postId} el={el} />
            ))}
          </Suspense>
        </div>

        {res.data.content.length <= 0 && (
          <p className="text-center text-sm text-gray-500">
            게시물이 존재하지 않습니다.
          </p>
        )}

        <div className="mt-[13px] text-right md:mt-7">
          <WriteButton />
        </div>

        <Paging pageable={res.data.pageable} />
      </div>
    </>
  );
};

export default ListContainer;
