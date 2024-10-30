'use client';

import deleteUserAction from '@/actions/auth/mypage/deleteAction';
import { signOut } from 'next-auth/react';

const DeleteUser = () => {
  const delUserHandler = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      const res = await deleteUserAction();
      if (res.data) {
        window.alert('회원탈퇴 완료');
        signOut({
          redirect: true,
          callbackUrl: '/',
        });
      }
    }
  };

  return (
    <div className="mt-[88px] text-center md:mt-20">
      <button
        onClick={delUserHandler}
        className="cursor-pointer border-b border-OnBackgroundGray px-1 pb-[2px] text-xs font-medium text-OnBackgroundGray transition-colors hover:border-[#676767] hover:text-[#676767] md:text-base"
      >
        회원탈퇴
      </button>
    </div>
  );
};

export default DeleteUser;
