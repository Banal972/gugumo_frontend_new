import getAction from '@/actions/comment/getAction';
import CmntForm from '@/components/page/post/detail/Comment/CmntForm';
import Cmnt from '@/components/page/post/detail/Comment/atom/Cmnt';
import { PostidType } from '@/types/cmnt.type';

interface CommentsProps {
  postid: PostidType;
}

const Comments = async ({ postid }: CommentsProps) => {
  const res = await getAction(postid);
  const { data } = res;

  return (
    <div className="mt-36">
      <div className="flex gap-1 text-xl font-bold">
        댓글
        <span className="text-OnSurface">{data.length}</span>
      </div>
      <CmntForm postId={postid} />
      <Cmnt postid={postid} data={data} />
    </div>
  );
};

export default Comments;
