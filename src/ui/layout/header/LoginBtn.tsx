'use client';

import Login from '@/components/page/auth/Login/Login';
import useModal from '@/hooks/useModal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginBtn = () => {
  const { openHandler } = useModal();

  const { data: session } = useSession() as any;
  const router = useRouter();

  const onLoginHandler = () => {
    if (session && !session.accessToken) {
      return router.push('/signup');
    }
    openHandler(Login, {});
  };

  return (
    <button
      type="button"
      className="flex h-[35px] w-[74px] cursor-pointer items-center justify-center rounded bg-primary text-base font-semibold text-white transition-colors hover:bg-[#3f92e0]"
      onClick={onLoginHandler}
    >
      로그인
    </button>
  );
};

export default LoginBtn;
