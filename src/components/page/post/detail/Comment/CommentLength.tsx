"use client";
import { commentOptions } from "@/hooks/useComment";
import { useQuery } from "@tanstack/react-query";

const CommentLength = ({
  session,
  postid,
}: {
  session: any;
  postid: string;
}) => {
  const { data: comment } = useQuery(commentOptions({ session, postid }));

  return (
    <div className="flex gap-1 text-xl font-bold">
      댓글
      <span className="text-OnSurface">
        {comment?.length ? comment?.length : 0}
      </span>
    </div>
  );
};

export default CommentLength;
