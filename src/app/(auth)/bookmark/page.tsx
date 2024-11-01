import getActions from '@/actions/auth/bookmark/getAction';
import Wrap from '@/ui/layout/Wrap';
import SkeletonCard from '@/ui/layout/card/skeleton/SkeletonCard';
import List from '@/ui/page/auth/List';
import { Suspense } from 'react';

const ListPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    page?: number;
  }>;
}) => {
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
        <Suspense
          fallback={Array.from({ length: 12 }, (_, index) => index).map(
            (item) => (
              <SkeletonCard key={item} />
            ),
          )}
        >
          <List label="북마크" data={res.data} />
        </Suspense>
      </Wrap>
    </main>
  );
};
export default ListPage;
