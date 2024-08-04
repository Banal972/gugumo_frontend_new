"use client";
import BookmarkSVG from "@/asset/image/bookmark.svg";
import Alert from "@/components/Modal/Alert";
import Confirm from "@/components/Modal/Confirm";
import { useBookMutation } from "@/hooks/useBookmark";
import { open } from "@/lib/store/features/modals/modal";
import { useAppDispatch } from "@/lib/store/hook";
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
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { addBookmarkMutation, deleteBookmarkMutation } = useBookMutation();

  const bookmarkHandler = async (e: any, postId: number) => {
    e.stopPropagation();

    if (!session) {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "로그인을 해야합니다." },
        }),
      );
    }

    if (!bookmarked) {
      addBookmarkMutation.mutate({ session, postId });

      if (setBookCount) {
        setBookCount((prev: any) => prev + 1);
      }
    } else {
      dispatch(
        open({
          Component: Confirm,
          props: {
            message: "정말 삭제 하시겠습니까?",
            onClick: () => {
              deleteBookmarkMutation.mutate({ session, postId });
              if (setBookCount) {
                setBookCount((prev: any) => prev - 1);
              }
            },
          },
        }),
      );
    }
  };

  return (
    <button
      type="button"
      onClick={(e) => bookmarkHandler(e, postId)}
      className="cursor-pointer"
    >
      <BookmarkSVG
        className={`stroke-[#4FAAFF] group-hover:stroke-white ${bookmarked ? "fill-[#4FAAFF]" : "fill-none"}`}
        width={24}
        height={24}
        alt="북마크 아이콘"
      />
    </button>
  );
}
