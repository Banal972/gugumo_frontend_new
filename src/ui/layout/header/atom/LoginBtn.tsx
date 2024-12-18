'use client';

import LoginModal from '@/components/auth/Login/LoginModal';
import Portal from '@/ui/Portal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginBtn = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { data: session } = useSession() as any;
  const router = useRouter();

  const onLoginHandler = () => {
    if (session && !session.accessToken) {
      return router.push('/signup');
    }
    setIsOpenModal(true);
  };

  const modalCloseHandler = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <button
        type="button"
        className="flex h-[35px] w-[74px] cursor-pointer items-center justify-center rounded bg-primary text-base font-semibold text-white transition-colors hover:bg-[#3f92e0]"
        onClick={onLoginHandler}
      >
        로그인
      </button>
      <Portal>
        <LoginModal isOpen={isOpenModal} onClose={modalCloseHandler} />
      </Portal>
    </>
  );
};

export default LoginBtn;
