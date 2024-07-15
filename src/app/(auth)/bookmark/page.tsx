import Wrap from "@/components/Common/Wrap";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import List from "@/app/(auth)/bookmark/List";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { bookMarkOptions, fetchBookmarks } from "@/hooks/useBookmark";

export default async function Bookmark() {
  const session = (await getServerSession(authOptions)) as any;
  const queryClient = new QueryClient();
  const q = "";
  const page = 1;

  await queryClient.prefetchQuery(bookMarkOptions({ session, q, page }));

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
