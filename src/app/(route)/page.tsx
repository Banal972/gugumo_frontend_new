import Headers from "@/components/Layout/Headers/Headers";
import Wrap from "@/components/Common/Wrap";
import Banner from "@/components/page/main/Banner";
import Footers from "@/components/Layout/Footers/Footers";
import Recommends from "@/components/Layout/Recommends/Recommends";
import List from "@/components/page/main/List";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchMeeting } from "@/hooks/useMeeting";
import { getServerSession } from "next-auth";

export default async function Home() {

  const session = await getServerSession() as any;
  const queryClient = new QueryClient();
  const q = '';
  const meetingstatus = 'RECRUIT';
  const location = '';
  const gametype = '';
  const sort = 'NEW';
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey : ['meeting', session, q, meetingstatus, location, gametype, sort, page],
    queryFn : fetchMeeting
  });

  return (
    <>
      <Headers/>
      <main className="md:pt-[50px] md:pb-[170px] pt-6 pb-[121px]">
        <Banner/>
        <Wrap>
          <Recommends/>
        </Wrap>
        <Wrap className="pt-8 mt-8 md:mt-[100px] md:pt-0 border-t-[6px] border-Surface md:border-none">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <List session={session}/>
          </HydrationBoundary>
        </Wrap>
      </main>
      <Footers/>
    </>
  )
}