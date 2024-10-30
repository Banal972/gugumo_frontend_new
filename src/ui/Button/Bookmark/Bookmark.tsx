'use client';

import addAction from '@/actions/auth/bookmark/addAction';
import deleteAction from '@/actions/auth/bookmark/deleteAction';
import BookmarkSVG from '@/asset/image/bookmark.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { MouseEvent } from 'react';

interface BookmarkProps {
  bookmarked: boolean;
  postId: number;
}

const Bookmark = ({ bookmarked, postId }: BookmarkProps) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const addMutation = useMutation({
    mutationFn: addAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['meeting'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['meeting'] });
    },
  });

  const bookmarkHandler = async (e: MouseEvent) => {
    e.stopPropagation();

    if (!session) return alert('로그인을 해야합니다.');

    if (!bookmarked) {
      addMutation.mutate(postId);
      /* if (setBookCount) {
        setBookCount((prev: any) => prev + 1);
      } */
    } else {
      if (confirm('정말 삭제하시겠습니까?')) {
        deleteMutation.mutate(postId);
      }
    }
  };

  return (
    <button type="button" onClick={bookmarkHandler} className="cursor-pointer">
      <BookmarkSVG
        className={`stroke-[#4FAAFF] group-hover:stroke-white ${bookmarked ? 'text-[#4FAAFF]' : 'text-white'}`}
        width={24}
        height={24}
        alt="북마크 아이콘"
      />
    </button>
  );
};

export default Bookmark;
