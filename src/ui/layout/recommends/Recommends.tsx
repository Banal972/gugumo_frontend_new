import getRecommend from '@/actions/meeting/recommendAction';
import SkeletonCard from '@/ui/layout/card/skeleton/SkeletonCard';
import Slide from '@/ui/layout/recommends/atom/Slide';
import { Suspense } from 'react';

const Recommends = async () => {
  const posts = await getRecommend();

  return (
    <div className="mt-16">
      <h3 className="text-lg font-bold text-primary md:text-2xl">
        추천 게시물 🎯
      </h3>
      <div className="mt-[22px] flex items-center gap-6 md:mt-11 xl:gap-11">
        <Suspense
          fallback={Array.from({ length: 8 }, (_, index) => index).map(
            (item) => (
              <SkeletonCard key={item} />
            ),
          )}
        >
          <Slide posts={posts.data} />
        </Suspense>
      </div>
    </div>
  );
};
export default Recommends;
