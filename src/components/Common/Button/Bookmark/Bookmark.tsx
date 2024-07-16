"use client";
import BookmarkSVG from "@/asset/image/bookmark.svg";
import { useBookMutation } from "@/hooks/useBookmark";
// import { useBookmark } from "@/hooks/useBookmark";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Bookmark({
  postId,
  bookmarked,
  setBookCount,
}: {
  postId: number;
  bookmarked: boolean;
  setBookCount?: any;
}) {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const { addBookmarkMutation, deleteBookmarkMutation } = useBookMutation();

  const bookmarkHandler = async (e: any, postId: number) => {
    e.stopPropagation();

    if (!session) {
      return alert("로그인을 해야합니다.");
    }

    if (!isBookmarked) {
      addBookmarkMutation.mutate({ session, postId });
      setIsBookmarked(true);

      if (setBookCount) {
        setBookCount((prev: any) => prev + 1);
      }
    } else {
      if (confirm("정말 삭제 하시겠습니까?")) {
        deleteBookmarkMutation.mutate({ session, postId });
        setIsBookmarked(false);
        if (setBookCount) {
          setBookCount((prev: any) => prev - 1);
        }
      }
    }
  };

  return (
    <button
      type="button"
      onClick={(e) => bookmarkHandler(e, postId)}
      className="cursor-pointer"
    >
      <BookmarkSVG
        className={`stroke-[#4FAAFF] group-hover:stroke-white ${isBookmarked ? "fill-[#4FAAFF]" : "fill-none"}`}
        width={24}
        height={24}
        alt="북마크 아이콘"
      />
    </button>
  );
}
