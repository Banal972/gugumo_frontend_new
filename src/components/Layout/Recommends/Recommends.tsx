import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Recommend from "./Recommend/Recommend";
import { getServerSession } from "next-auth";
import { recommendOptions } from "@/hooks/useRecommend";

export default async function Recommends() {
  const session = getServerSession();
  const queryClinet = new QueryClient();

  await queryClinet.prefetchQuery(recommendOptions({ session }));

  return (
    <div className="mt-16">
      <h3 className="text-lg font-bold text-primary md:text-2xl">
        추천 게시물 🎯
      </h3>
      <div className="flex mt-[22px] gap-6 items-center xl:gap-11 md:mt-11">
        <HydrationBoundary state={dehydrate(queryClinet)}>
          <Recommend session={session} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
