'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface BtnListProps {
  postid: string;
  yours: boolean;
}

const BUTTONSTYLE =
  'inline-flex items-center bg-OnPrimary text-sm md:text-base font-medium border rounded py-[9.5px] px-4 justify-center cursor-pointer';

const BtnList = ({ postid, yours }: BtnListProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession() as any;

  const editHandler = () => {
    router.push(`/post/edit/${postid}`);
  };

  const removeMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`/back/api/v1/meeting/${postid}`, {
          method: 'DELETE',
          headers: {
            Authorization: session.accessToken,
          },
        });
        if (response.ok) {
          const data = await response.json();

          if (data.status === 'success') {
            alert('게시글을 삭제 하였습니다.');
            router.push('/');
          } else {
            alert('삭제하는데 실패 하였습니다.');
          }
        } else {
          alert('삭제하는데 실패 하였습니다.');
        }
      } catch (err) {
        alert('오류가 발생 했습니다.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['meeting'],
      });
    },
  });

  return (
    <div className="mt-7 flex justify-center gap-5 md:mt-8">
      {yours && (
        <button
          type="button"
          onClick={() => removeMutation.mutate()}
          className={`${BUTTONSTYLE} border-Error text-Error transition-all hover:bg-Error hover:text-white`}
        >
          삭제 하기
        </button>
      )}
      <button
        type="button"
        onClick={() => router.push('/')}
        className={`${BUTTONSTYLE} border-primary text-primary transition-all hover:bg-primary hover:text-white`}
      >
        목록 보기
      </button>
      {yours && (
        <button
          type="button"
          onClick={editHandler}
          className={`${BUTTONSTYLE} border-SubColor4 text-SubColor4 transition-all hover:bg-SubColor4 hover:text-white`}
        >
          수정 하기
        </button>
      )}
    </div>
  );
};

export default BtnList;
