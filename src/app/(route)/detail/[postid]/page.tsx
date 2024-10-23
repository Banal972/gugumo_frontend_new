import Headers from "@/components/Layout/Headers/Headers";
import Wrap from "@/components/Common/Wrap";
import Footers from "@/components/Layout/Footers/Footers";
import DetailUI from "@/components/page/post/detail/DetailUI";
import Recommends from "@/components/Layout/Recommends/Recommends";
import Comments from "@/components/page/post/detail/Comment/Comments";
import { Suspense } from "react";
import Skeleton from "@/components/page/post/detail/SkeletonUI/Skeleton";
import getDetail from "@/actions/getDetail";

const Detail = async ({ params }: DetailProps) => {
  const detail = await getDetail(params.postid);

  return (
    <>
      <Headers />
      <main className="pb-36 pt-10 md:pb-40 md:pt-[108px]">
        <Wrap>
          <Suspense fallback={<Skeleton />}>
            <DetailUI detail={detail.data} />
            <Recommends />
            <Comments postid={params.postid} />
          </Suspense>
        </Wrap>
      </main>
      <Footers />
    </>
  );
};

export default Detail;

interface DetailProps {
  params: { postid: string };
}
