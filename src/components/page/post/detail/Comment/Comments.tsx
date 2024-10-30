import CommentCompo from '@/components/page/post/detail/Comment/CommentCompo';
import CommentFrom from '@/components/page/post/detail/Comment/CommentFrom';
import CommentLength from '@/components/page/post/detail/Comment/CommentLength';
import { commentOptions } from '@/hooks/useComment';
import authOptions from '@/lib/authOptions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

const Comments = async ({ postid }: CommentsProps) => {
  const session = (await getServerSession(authOptions)) as any;

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
};

export default Comments;

interface CommentsProps {
  postid: string;
}
