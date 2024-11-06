'use client';

import deleteAction from '@/actions/auth/post/deleteAction';
import { useToast } from '@/provider/ToastProvider';
import { useRouter } from 'next/navigation';

interface BtnListProps {
  postid: string;
  yours: boolean;
}

const BtnList = ({ postid, yours }: BtnListProps) => {
  const { showToast } = useToast();
  const router = useRouter();

  const removeMutation = async () => {
    const res = await deleteAction(postid);
    if (res.status === 'fail')
      return showToast('error', '삭제하는데 실패하였습니다.');
    showToast('success', '삭제 하였습니다.');
    router.push('/');
  };

  return (
    <div className="mt-7 flex justify-center gap-5 md:mt-8">
      {yours && (
        <button
          type="button"
          onClick={removeMutation}
          className="inline-flex cursor-pointer items-center justify-center rounded border border-Error bg-OnPrimary px-4 py-[9.5px] text-sm font-medium text-Error transition-all hover:bg-Error hover:text-white md:text-base"
        >
          삭제 하기
        </button>
      )}
      <button
        type="button"
        onClick={() => router.push('/')}
        className="inline-flex cursor-pointer items-center justify-center rounded border border-primary bg-OnPrimary px-4 py-[9.5px] text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white md:text-base"
      >
        목록 보기
      </button>
      {yours && (
        <button
          type="button"
          onClick={() => router.push(`/post/edit/${postid}`)}
          className="inline-flex cursor-pointer items-center justify-center rounded border border-SubColor4 bg-OnPrimary px-4 py-[9.5px] text-sm font-medium text-SubColor4 transition-all hover:bg-SubColor4 hover:text-white md:text-base"
        >
          수정 하기
        </button>
      )}
    </div>
  );
};

export default BtnList;
