'use client';

import { signIn } from 'next-auth/react';

const Kakao = () => {
  const onSignInHandler = async () => {
    await signIn('kakao', { callbackUrl: '/oauth-callback' });
  };

  return (
    <div
      role="none"
      onClick={onSignInHandler}
      className="size-[34px] cursor-pointer rounded-full bg-[url(/asset/image/modal/kakao.png)] bg-cover bg-center"
    />
  );
};

export default Kakao;
