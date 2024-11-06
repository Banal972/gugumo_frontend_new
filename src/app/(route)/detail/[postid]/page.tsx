import get from '@/actions/meeting/detailActions';
import Comments from '@/components/page/post/detail/Comment/Comments';
import Detail from '@/components/page/post/detail/Detail/Detail';
import Skeleton from '@/components/page/post/detail/SkeletonUI/Skeleton';
import { PostidType } from '@/types/cmnt.type';
import Wrap from '@/ui/layout/Wrap';
import Recommends from '@/ui/layout/recommends/Recommends';
import { Suspense } from 'react';

interface DetailProps {
  params: { postid: PostidType };
}

export const generateMetadata = async ({ params }: DetailProps) => {
  const detail = await get(params.postid);
  return {
    title: `구구모 - ${detail.data.title}`,
  };
};

const DetailPage = async ({ params }: DetailProps) => {
  const detail = await get(params.postid);

  return (
    <main className="pb-36 pt-10 md:pb-40 md:pt-[108px]">
      <Wrap>
        <Suspense fallback={<Skeleton />}>
          <Detail detail={detail.data} />
          <Recommends />
          <Comments postid={params.postid} />
        </Suspense>
      </Wrap>
    </main>
  );
};

export default DetailPage;
