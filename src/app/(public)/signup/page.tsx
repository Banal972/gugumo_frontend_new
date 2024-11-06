'use client';

import joinAction from '@/actions/public/signup/joinAction';
import kakaoAction from '@/actions/public/signup/kakaoAction';
import mailCheckAction from '@/actions/public/signup/mailCheckAction';
import mailSendAction from '@/actions/public/signup/mailSendAction';
import AgreeService from '@/components/auth/signup/AgreeService';
import {
  Title,
  Container,
  Input,
  CertificationBtn,
} from '@/components/auth/signup/Layout';
import { GAMETYPE } from '@/constant/card/constant';
import { EMAIL_REGEX } from '@/constant/regex';
import AGREE_SERVICE from '@/constant/signup';
import getImageOption from '@/lib/getImageOption';
import { useToast } from '@/provider/ToastProvider';
import GameBtn from '@/ui/Button/GameBtn';
import ErrorMessage from '@/ui/form/ErrorMessage';
import Wrap from '@/ui/layout/Wrap';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { z } from 'zod';

const schema = z
  .object({
    type: z.enum(['normal', 'oauth']),
    username: z
      .string()
      .regex(EMAIL_REGEX, {
        message: '이메일에 맞게 입력해주세요',
      })
      .optional(),
    nickname: z.string().min(1, { message: '닉네임을 입력해야합니다.' }),
    password: z
      .string()
      .min(8, { message: '8자 이상으로 입력해주세요' })
      .optional(),
    confirmPW: z.string().optional(),
    favoriteSports: z.string().optional(),
    isAgreeTermsUseisAgreeTermsUse: z.boolean(),
    isAgreeCollectingUsingPersonalInformation: z.boolean(),
    isAgreeMarketing: z.boolean(),
    emailAuthNum: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'normal') {
      if (!data.emailAuthNum || data.emailAuthNum.trim() === '') {
        ctx.addIssue({
          path: ['username'],
          message: '이메일 인증을 해야합니다.',
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.username || data.username.trim() === '') {
        ctx.addIssue({
          path: ['username'],
          message: '이메일을 입력해야 합니다.',
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.password || data.password.trim() === '') {
        ctx.addIssue({
          path: ['password'],
          message: '패스워드를 입력해야 합니다.',
          code: z.ZodIssueCode.custom,
        });
      }
      if (data.password !== data.confirmPW) {
        ctx.addIssue({
          path: ['password'],
          message: '비밀번호가 서로 다릅니다.',
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

// interface IsServiceState extends IsAgreeType {
//   [key: string]: boolean;
// }

type FieldType = z.infer<typeof schema>;

const SignupPage = () => {
  const { showToast } = useToast();
  const { data: session } = useSession() as any;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldType>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'normal',
    },
  });

  useEffect(() => {
    if (!session || session.type !== 'oauth') return;
    setValue('type', 'oauth');
  }, [session, setValue]);

  const [isSend, setIsSend] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const watchValues = watch([
    'isAgreeTermsUseisAgreeTermsUse',
    'isAgreeCollectingUsingPersonalInformation',
    'isAgreeMarketing',
  ]);
  const favoriteSportsWatch = watch('favoriteSports');

  const mailSendHandler = async () => {
    const { username } = getValues();
    if (isSend) return showToast('error', '이미 인증이 완료 되었습니다.');
    if (!username) return showToast('error', '메일을 입력해주세요.');

    const res = await mailSendAction(username);
    const { status } = res;
    if (status === 'fail') return showToast('error', '오류가 발생 했습니다.');
    setIsSend(true);
    showToast('success', '인증번호 메일을 보냈습니다.');
  };

  const mailAuthCheckHanlder = async () => {
    const { username, emailAuthNum } = getValues();
    if (!username) return;
    if (isCheck)
      return showToast('error', '이미 인증처리가 완료 되어있습니다.');
    if (!emailAuthNum) return showToast('error', '인증번호를 입력해주세요.');

    const res = await mailCheckAction({ username, emailAuthNum });
    const { status } = res;
    if (status === 'fail') return showToast('error', '오류가 발생했습니다.');
    setIsCheck(true);
    return showToast('success', '인증이 완료 되었습니다.');
  };

  const allCheckHandler = () => {
    if (watchValues.every((value) => value)) {
      setValue('isAgreeTermsUseisAgreeTermsUse', false);
      setValue('isAgreeCollectingUsingPersonalInformation', false);
      setValue('isAgreeMarketing', false);
      return;
    }

    setValue('isAgreeTermsUseisAgreeTermsUse', true);
    setValue('isAgreeCollectingUsingPersonalInformation', true);
    setValue('isAgreeMarketing', true);
  };

  const isServiceHandler = (
    key:
      | 'isAgreeTermsUseisAgreeTermsUse'
      | 'isAgreeCollectingUsingPersonalInformation'
      | 'isAgreeMarketing',
  ) => {
    setValue(key, !getValues(key));
  };

  const gameTypeClickHanlder = (type: string) => {
    const getFavoriteSport = getValues('favoriteSports')?.split(',') || [];

    if (getFavoriteSport.includes(type)) {
      const updateSport = getFavoriteSport
        .filter((el) => el !== type)
        .join(',');
      return setValue('favoriteSports', updateSport);
    }

    const updateSport = [...getFavoriteSport, type].join(',');
    setValue('favoriteSports', updateSport);
  };

  const onSubmitHandler = handleSubmit(async (event) => {
    if (!event.isAgreeTermsUseisAgreeTermsUse)
      return showToast('error', '서비스 이용약관에 동의해주세요.');
    if (!event.isAgreeCollectingUsingPersonalInformation)
      return showToast('error', '개인정보 수집 및 이용에 동의해주세요');

    // 기본 회원가입
    if (!session) {
      const res = await joinAction({
        username: event.username,
        nickname: event.nickname,
        password: event.password,
        favoriteSports: event.favoriteSports,
        isAgreeTermsUseisAgreeTermsUse: event.isAgreeTermsUseisAgreeTermsUse,
        isAgreeCollectingUsingPersonalInformation:
          event.isAgreeCollectingUsingPersonalInformation,
        isAgreeMarketing: event.isAgreeMarketing,
        emailAuthNum: event.emailAuthNum,
      });

      const { data, message } = res;
      if (!data) return showToast('error', message);

      showToast('success', '회원가입에 성공하였습니다.');
      return router.push('/');
    }

    const res = await kakaoAction({
      nickname: event.nickname,
      favoriteSports: event.favoriteSports,
      isAgreeTermsUseisAgreeTermsUse: event.isAgreeTermsUseisAgreeTermsUse,
      isAgreeCollectingUsingPersonalInformation:
        event.isAgreeCollectingUsingPersonalInformation,
      isAgreeMarketing: event.isAgreeMarketing,
    });
    const { data, message } = res;
    if (!data) return showToast('error', message);

    showToast('success', '회원가입에 성공하였습니다.');
    signIn('kakao', {
      callbackUrl: '/',
    });
  });

  return (
    <Wrap className="pb-[90px] pt-12 md:py-[150px]">
      <div className="mx-auto box-border max-w-[790px] rounded-xl md:bg-Surface md:px-32 md:py-14">
        <form onSubmit={onSubmitHandler}>
          <h1 className="mb-12 text-center text-xl font-semibold text-primary md:text-2xl">
            회원가입
          </h1>
          <div>
            <Title>정보 입력</Title>
            <div className="flex flex-col gap-4 md:gap-5">
              <Input
                type="text"
                placeholder="닉네임"
                register={register('nickname', {
                  value: session?.nickname,
                })}
                error={errors.nickname?.message}
              />
              <div>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="이메일을 입력하세요."
                    register={register('username', {
                      value: session?.username,
                      disabled: session,
                    })}
                  />
                  {!session && (
                    <CertificationBtn
                      active={!isSend}
                      onClick={mailSendHandler}
                    >
                      {!isSend ? '인증요청' : '인증요청됨'}
                    </CertificationBtn>
                  )}
                </div>
                {errors.username?.message && (
                  <ErrorMessage>{errors.username.message}</ErrorMessage>
                )}
              </div>
              {isSend && (
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="인증번호를 입력하세요"
                    register={register('emailAuthNum')}
                  />
                  <CertificationBtn
                    onClick={mailAuthCheckHanlder}
                    active={!isCheck}
                  >
                    {!isCheck ? '확인' : '확인됨'}
                  </CertificationBtn>
                </div>
              )}
              {(!session || session.type !== 'oauth') && (
                <>
                  <Input
                    type="password"
                    placeholder="비밀번호"
                    register={register('password')}
                    error={errors.password?.message}
                  />
                  <Input
                    type="password"
                    placeholder="비밀번호 확인"
                    register={register('confirmPW')}
                  />
                </>
              )}
            </div>
          </div>

          <Container>
            <Title>관심있는 종목 (중복가능)</Title>
            <div className="flex justify-between gap-2 overflow-x-auto pb-1">
              {Object.entries(GAMETYPE).map(([key, value]) => (
                <GameBtn
                  key={key}
                  option={getImageOption(key)}
                  active={
                    favoriteSportsWatch
                      ? favoriteSportsWatch.split(',').includes(key)
                      : false
                  }
                  onClick={() => gameTypeClickHanlder(key)}
                  get={key}
                  label={value}
                />
              ))}
            </div>
          </Container>

          <Container>
            <Title>서비스 정책</Title>
            <div className="rounded bg-primary">
              <div className="pb-5 pt-4 md:py-5">
                <div className="flex justify-between gap-1 px-5 md:px-6">
                  <div
                    role="none"
                    className="flex cursor-pointer items-center gap-3"
                    onClick={allCheckHandler}
                  >
                    <div className="relative size-5 flex-none rounded bg-white">
                      {watchValues.every((value) => value) && (
                        <IoCheckmarkOutline className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs" />
                      )}
                    </div>
                    <p className="text-base font-medium text-OnPrimary">
                      전체동의
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-t-white px-5 pt-6 md:mt-6 md:px-6">
                  {AGREE_SERVICE.map(({ id, label }, index) => (
                    <AgreeService
                      key={id}
                      active={watchValues[index]}
                      label={label}
                      onClick={() => isServiceHandler(id)}
                      className="first:mt-0"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Container>

          <div className="mt-8 text-center md:mt-14">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center justify-center rounded border border-[#4FAAFF] bg-OnPrimary px-4 py-2 text-sm font-medium text-primary md:text-base"
            >
              회원가입
            </button>
          </div>
        </form>

        <div>
          {Object.keys(errors).length > 0 && (
            <div>
              <h4>폼에 에러가 있습니다:</h4>
              {Object.entries(errors).map(([key, value]) => (
                <p key={key}>
                  {key}: {value.message}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </Wrap>
  );
};

export default SignupPage;
