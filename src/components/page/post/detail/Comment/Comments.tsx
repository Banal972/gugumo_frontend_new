import CommentFrom from "@/components/page/post/detail/Comment/CommentFrom";
import { commentOptions } from "@/hooks/useComment";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CommentCompo from "@/components/page/post/detail/Comment/CommentCompo";
import CommentLength from "@/components/page/post/detail/Comment/CommentLength";

export default async function Comments({
  session,
  postid,
}: {
  session: any;
  postid: string;
}) {
  const queryClient = new QueryClient();

  const commentsQuery = commentOptions({
    session,
    postid,
  });

  await queryClient.prefetchQuery(commentsQuery);

  return (
    <div className="mt-36">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CommentLength session={session} postid={postid} />
      </HydrationBoundary>

      {/* 댓글 등록하기 */}
      <CommentFrom postid={postid} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CommentCompo session={session} postid={postid} />
      </HydrationBoundary>
    </div>
  );
}
