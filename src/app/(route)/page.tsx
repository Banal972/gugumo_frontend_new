import Headers from "@/components/Layout/Headers/Headers";
import Wrap from "@/components/Common/Wrap";
import Banner from "@/components/page/main/Banner";
import Footers from "@/components/Layout/Footers/Footers";
import Recommends from "@/components/Layout/Recommends/Recommends";
import List from "@/components/page/main/List";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { meetingOptions } from "@/hooks/useMeeting";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = (await getServerSession()) as any;
  const queryClient = new QueryClient();
  const q = "";
  const meetingstatus = "RECRUIT";
  const location = "";
  const gametype = "";
  const sort = "NEW";
  const page = 1;

  await queryClient.prefetchQuery(
    meetingOptions({
      session,
      q,
      meetingstatus,
      location,
      gametype,
      sort,
      page,
    }),
  );

  return (
    <>
      <Headers />
      <main className="pb-[121px] pt-6 md:pb-[170px] md:pt-[50px]">
        <Banner />
        <Wrap>
          <Recommends />
          {/* <HydrationBoundary state={dehydrate(queryClient)}>
            <Recommends />
          </HydrationBoundary> */}
        </Wrap>
        <Wrap className="mt-8 border-t-[6px] border-Surface pt-8 md:mt-[100px] md:border-none md:pt-0">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <List />
          </HydrationBoundary>
        </Wrap>
      </main>
      <Footers />
    </>
  );
}
