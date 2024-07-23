import List from "@/app/(auth)/post/list/List";
import Wrap from "@/components/Common/Wrap";
import { postOptions } from "@/hooks/usePost";
import { authOptions } from "@/lib/authOptions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";

export default async function PostList() {
  const session = (await getServerSession(authOptions)) as any;
  const queryClient = new QueryClient();
  const q = "";
  const page = 1;

  await queryClient.prefetchQuery(postOptions({ session, q, page }));

  return (
    <main className="mt-14 pb-[121px] md:pb-[170px]">
      <Wrap>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <List session={session} />
        </HydrationBoundary>
      </Wrap>
    </main>
  );
}
