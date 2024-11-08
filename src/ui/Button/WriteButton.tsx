'use client';

import { useToast } from '@/provider/ToastProvider';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const WriteButton = () => {
  const { showToast } = useToast();
  const { data: session } = useSession() as any;
  const router = useRouter();

  const writeHandler = () => {
    if (!session || !session.accessToken)
      return showToast('error', '로그인을 해야합니다.');
    router.push('/post/write');
  };

  return (
    <button
      type="button"
      onClick={writeHandler}
      className="group inline-flex cursor-pointer items-center gap-1 rounded border border-primary bg-OnPrimary px-4 py-[0.4em] text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-OnPrimary md:text-base"
    >
      <Image
        className="group-hover:brightness-0 group-hover:invert"
        src="/asset/image/icon/write.svg"
        alt="작성 아이콘"
        width={24}
        height={24}
      />
      새글 작성
    </button>
  );
};

export default WriteButton;
