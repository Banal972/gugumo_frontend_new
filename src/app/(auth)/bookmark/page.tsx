import getActions from '@/actions/auth/bookmark/getAction';
import { DefaultSearchParams } from '@/types/get.type';
import Search from '@/ui/form/Search';
import Wrap from '@/ui/layout/Wrap';
import SkeletonCard from '@/ui/layout/card/skeleton/SkeletonCard';
import List from '@/ui/page/auth/List';
import { Suspense } from 'react';

const ListPage = async ({ searchParams }: DefaultSearchParams) => {
  const params = await searchParams;
  const q = params?.q || '';
  const page = params?.page || 1;

  const res = await getActions({
    query: {
      q,
      page,
    },
  });

  return (
    <main className="mt-14 pb-[121px] md:pb-[170px]">
      <Wrap>
        <div className="flex flex-col items-start justify-start gap-6 text-lg font-medium md:flex-row md:items-center md:justify-between md:gap-5 md:text-2xl">
          <h4>북마크</h4>
          <Search />
        </div>
        <div className="mt-5 rounded-xl md:mt-[46px] md:bg-Surface md:p-[70px] md:px-[5%]">
          <Suspense fallback={<SkeletonCard />}>
            <List data={res.data} />
          </Suspense>
        </div>
      </Wrap>
    </main>
  );
};
export default ListPage;
