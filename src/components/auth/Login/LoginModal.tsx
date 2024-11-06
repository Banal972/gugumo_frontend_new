'use client';

import Kakao from '@/components/auth/Login/oauth/Kakao';
import { useToast } from '@/provider/ToastProvider';
import ErrorMessage from '@/ui/form/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = z.object({
  username: z.string().min(1, { message: '이메일을 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
});

type FieldType = z.infer<typeof schema>;

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldType>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (res?.ok) {
      onClose();
      return router.push('/');
    }

    showToast('error', '로그인에 실패 하였습니다.');
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed left-0 top-0 z-50 h-full w-full">
          <motion.div
            className="absolute left-0 top-0 h-full w-full cursor-pointer"
            onClick={onClose}
            initial={{
              backgroundColor: 'rgba(000,000,000,0)',
            }}
            animate={{
              backgroundColor: 'rgba(000,000,000,0.6)',
            }}
            exit={{
              backgroundColor: 'rgba(000,000,000,0)',
            }}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 box-border w-[90%] max-w-[422px] overflow-visible rounded-xl bg-white px-8 py-9 md:px-16"
            initial={{
              y: '-35%',
              x: '-50%',
              opacity: 0,
            }}
            animate={{
              y: '-50%',
              x: '-50%',
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <button
              type="button"
              className="absolute right-4 top-5 cursor-pointer"
              onClick={onClose}
            >
              <Image
                src="/asset/image/icon/close.svg"
                alt="취소버튼"
                width={24}
                height={24}
              />
            </button>
            <div className="mx-auto w-[115.66px]">
              <Image
                src="/asset/image/modal/login-simbol.png"
                alt="로고 아이콘"
                width={523}
                height={458}
              />
            </div>
            <h5 className="mt-10 text-center text-lg font-semibold text-primary">
              로그인
            </h5>
            <form className="mt-5" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="이메일을 입력해주세요."
                className="h-9 w-full rounded-lg border border-Outline px-3 text-sm font-medium outline-none focus:border-primary md:h-11 md:text-base"
                {...register('username')}
              />
              {errors.username?.message && (
                <ErrorMessage>{errors.username.message}</ErrorMessage>
              )}
              <input
                type="password"
                placeholder="비밀번호를 입력하세요."
                className="mt-2 h-9 w-full rounded-lg border border-Outline px-3 text-sm font-medium outline-none focus:border-primary md:h-11 md:text-base"
                {...register('password')}
              />
              {errors.password?.message && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
              <div className="mt-5 text-center">
                <button
                  type="submit"
                  className="h-9 rounded bg-primary px-4 text-sm font-semibold leading-none text-OnPrimary transition-colors hover:bg-[#3f92e0] md:text-base"
                >
                  로그인 하기
                </button>
              </div>
            </form>

            <div className="mt-5 text-center">
              <p className="text-[13px] font-medium text-[#A5A5A5]">
                간편 회원가입
              </p>
              <div className="mt-2 flex justify-center">
                <Kakao />
              </div>
            </div>
            <div className="mt-[34px] text-center text-[13px] font-medium text-primary">
              <Link href="/find">비밀번호 찾기</Link>
              <Link
                href="/signup"
                className="relative ml-[10px] pl-[10px] before:absolute before:left-0 before:top-0 before:block before:h-full before:w-[1px] before:bg-primary"
              >
                회원가입 하기
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
