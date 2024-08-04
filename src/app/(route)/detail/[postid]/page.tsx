import Headers from "@/components/Layout/Headers/Headers";
import Wrap from "@/components/Common/Wrap";
import Footers from "@/components/Layout/Footers/Footers";
import DetailUI from "@/components/page/post/detail/DetailUI";
import Recommends from "@/components/Layout/Recommends/Recommends";
import Comments from "@/components/page/post/detail/Comment/Comments";
import { Suspense } from "react";
import Skeleton from "@/components/page/post/detail/SkeletonUI/Skeleton";
import getDetail from "@/actions/getDetail";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import getQueryClient from "@/lib/getQueryClient";

export default async function Detail({
  params,
}: {
  params: { postid: string };
}) {
  const session = await getServerSession();

  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["detail", params.postid],
    queryFn: () => {
      return getDetail(params.postid);
    },
  });

  return (
    <>
      <Headers />
      <main className="pb-36 pt-10 md:pb-40 md:pt-[108px]">
        <Wrap>
          <Suspense fallback={<Skeleton />}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <DetailUI postid={params.postid} />
            </HydrationBoundary>
            <Recommends />
            <Comments session={session} postid={params.postid} />
          </Suspense>
        </Wrap>
      </main>
      <Footers />
    </>
  );
}
