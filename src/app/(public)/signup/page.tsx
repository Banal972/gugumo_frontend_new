"use client";
import Wrap from "@/components/Common/Wrap";
import Alert from "@/components/Modal/Alert";
import Success from "@/components/Modal/Success";
import Gametype from "@/components/page/auth/signup/Gametype";
import { open } from "@/lib/store/features/modals/modal";
import { useAppDispatch } from "@/lib/store/hook";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCheckmarkOutline } from "react-icons/io5";

const Signup = () => {
  const { data: session } = useSession() as any;

  const router = useRouter();
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [isSend, setIsSend] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isService, setIsService] = useState<isServiceT>({
    isAgreeTermsUse: false,
    isAgreeCollectingUsingPersonalInformation: false,
    isAgreeMarketing: false,
  });
  const [likeGame, setLikeGame] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const mailSendHandler = async () => {
    if (isSend) return;

    const { username } = getValues();

    try {
      const res = await fetch("/back/api/v1/mailSend", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ email: username }),
      });

      if (res.ok) {
        const data = await res.json();

        if (data.status === "success") {
          setIsSend(true);
          return dispatch(
            open({
              Component: Success,
              props: { message: data.data },
            }),
          );
        } else {
          setIsSend(false);
        }
      } else {
        setIsSend(false);
        return dispatch(
          open({
            Component: Alert,
            props: { message: "인증요청에 에러가 발생했습니다." },
          }),
        );
      }
    } catch (err) {
      console.log(err);
      setIsSend(false);
    }
  };

  const mailAuthCheckHanlder = async () => {
    if (isCheck) return;

    const { username, emailAuthNum } = getValues();

    try {
      const res = await fetch("/back/api/v1/mailAuthCheck", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ email: username, emailAuthNum }),
      });

      if (res.ok) {
        const data = await res.json();

        if (data.status === "success") {
          setIsCheck(true);
          return dispatch(
            open({
              Component: Success,
              props: { message: "인증이 완료 되었습니다." },
            }),
          );
        } else {
          return dispatch(
            open({
              Component: Alert,
              props: { message: "인증에 실패 하였습니다." },
            }),
          );
        }
      } else {
        setIsCheck(false);
        return dispatch(
          open({
            Component: Alert,
            props: { message: "인증에 실패 하였습니다." },
          }),
        );
      }
    } catch (err) {
      setIsCheck(false);
      return dispatch(
        open({
          Component: Alert,
          props: { message: "오류가 발생했습니다." },
        }),
      );
    }
  };

  const allCheckHandler = () => {
    if (Object.values(isService).every((value) => value)) {
      setIsService((prev) => ({
        ...prev,
        isAgreeTermsUse: false,
        isAgreeCollectingUsingPersonalInformation: false,
        isAgreeMarketing: false,
      }));
    } else {
      setIsService((prev) => ({
        ...prev,
        isAgreeTermsUse: true,
        isAgreeCollectingUsingPersonalInformation: true,
        isAgreeMarketing: true,
      }));
    }
  };

  const isServiceHandler = (key: string, value: boolean) => {
    setIsService((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmitHandler = async (event: any) => {
    const { nickname, username, emailAuthNum, password, confirmPW } = event;

    if (!nickname) {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "닉네임을 입력해주세요" },
        }),
      );
    }

    if (!isService.isAgreeTermsUse) {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "서비스 이용약관에 동의해주세요." },
        }),
      );
    }

    if (!isService.isAgreeCollectingUsingPersonalInformation) {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "개인정보 수집 및 이용에 동의해주세요" },
        }),
      );
    }

    if (!session) {
      // 기본 회원가입

      if (!username) {
        return dispatch(
          open({
            Component: Alert,
            props: { message: "이메일을 입력해주세요" },
          }),
        );
      }

      if (!isCheck) {
        return dispatch(
          open({
            Component: Alert,
            props: { message: "이메일 인증이 필요합니다." },
          }),
        );
      }

      if (!emailAuthNum) {
        return dispatch(
          open({
            Component: Alert,
            props: { message: "인증번호를 입력해주세요" },
          }),
        );
      }

      if (!password) {
        return dispatch(
          open({
            Component: Alert,
            props: { message: "비밀번호를 입력해주세요" },
          }),
        );
      }

      if (password !== confirmPW) {
        return dispatch(
          open({
            Component: Alert,
            props: { message: "비밀번호가 서로 다릅니다." },
          }),
        );
      }

      try {
        const res = await fetch("/back/api/v2/member", {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            username,
            nickname,
            password,
            favoriteSports: likeGame.join(","),
            isAgreeTermsUse: isService.isAgreeTermsUse,
            isAgreeCollectingUsingPersonalInformation:
              isService.isAgreeCollectingUsingPersonalInformation,
            isAgreeMarketing: isService.isAgreeMarketing,
            emailAuthNum,
          }),
        });

        if (res.ok) {
          const data = await res.json();

          if (data.status === "success") {
            dispatch(
              open({
                Component: Success,
                props: { message: "회원가입이 완료 되었습니다." },
              }),
            );
            return router.push("/");
          } else {
            return dispatch(
              open({
                Component: Alert,
                props: { message: data.message },
              }),
            );
          }
        } else {
          if (res.status === 409) {
            return dispatch(
              open({
                Component: Alert,
                props: { message: "이미 존재하는 회원입니다." },
              }),
            );
          }
          return dispatch(
            open({
              Component: Alert,
              props: { message: "서버와 통신이 원할하지 않습니다." },
            }),
          );
        }
      } catch (err) {
        dispatch(
          open({
            Component: Alert,
            props: { message: "오류가 발생했습니다." },
          }),
        );
      }
    } else {
      try {
        const res = await fetch("/back/api/v1/kakao/member", {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            username: session?.username,
            nickname,
            favoriteSports: likeGame.join(","),
            kakaoId: session?.id,
            isAgreeTermsUse: isService.isAgreeTermsUse,
            isAgreeCollectingUsingPersonalInformation:
              isService.isAgreeCollectingUsingPersonalInformation,
            isAgreeMarketing: isService.isAgreeMarketing,
          }),
        });

        if (res.ok) {
          const data = await res.json();

          if (data.status === "success") {
            dispatch(
              open({
                Component: Success,
                props: { message: "회원가입이 완료 되었습니다." },
              }),
            );
            signIn("kakao", {
              callbackUrl: "/",
            });
          } else {
            return dispatch(
              open({
                Component: Alert,
                props: { message: data.message },
              }),
            );
          }
        } else {
          if (res.status === 409) {
            return dispatch(
              open({
                Component: Alert,
                props: { message: "이미 존재하는 회원입니다." },
              }),
            );
          }
          return dispatch(
            open({
              Component: Alert,
              props: { message: "서버와 통신이 원할하지 않습니다." },
            }),
          );
        }
      } catch (err) {
        dispatch(
          open({
            Component: Alert,
            props: { message: "오류가 발생했습니다." },
          }),
        );
      }
    }
  };

  useEffect(() => {
    setValue("nickname", session?.nickname);
    setValue("username", session?.username);
  }, [session]);

  return (
    <Wrap className="pb-[90px] pt-12 md:py-[150px]">
      <div className="mx-auto box-border max-w-[790px] rounded-xl md:bg-Surface md:px-32 md:py-14">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <h1 className="mb-12 text-center text-xl font-semibold text-primary md:text-2xl">
            회원가입
          </h1>
          <div>
            <p className="mb-5 text-base font-semibold text-primary">
              정보 입력
            </p>
            <div className="flex flex-col gap-4 md:gap-5">
              <input
                type="text"
                placeholder="닉네임"
                className="sign-input"
                {...register("nickname")}
              />
              <div className="relative">
                <input
                  type="text"
                  placeholder="이메일을 입력하세요."
                  className="sign-input"
                  {...register("username", {
                    disabled: session ? true : false,
                  })}
                />
                {!session && (
                  <button
                    type="button"
                    onClick={mailSendHandler}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-md border border-primary px-2 py-1 text-[13px] font-normal ${!isSend ? "bg-OnPrimary text-primary" : "bg-primary text-OnPrimary"}`}
                  >
                    {!isSend ? "인증요청" : "인증요청됨"}
                  </button>
                )}
              </div>
              {isSend && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="인증번호를 입력하세요"
                    className="sign-input"
                    {...register("emailAuthNum")}
                  />
                  <button
                    type="button"
                    onClick={mailAuthCheckHanlder}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-md border border-primary px-2 py-1 text-[13px] font-normal ${!isCheck ? "bg-OnPrimary text-primary" : "bg-primary text-OnPrimary"}`}
                  >
                    {!isCheck ? "확인" : "확인됨"}
                  </button>
                </div>
              )}
              {(!session || session.type !== "oauth") && (
                <>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    className="sign-input"
                    {...register("password")}
                  />
                  <input
                    type="password"
                    placeholder="비밀번호 확인"
                    className="sign-input"
                    {...register("confirmPW")}
                  />
                </>
              )}
            </div>
          </div>

          <div className="mt-[46px] md:mt-[58px]">
            <p className="mb-5 text-base font-semibold text-primary">
              관심있는 종목 (중복가능)
            </p>
            <div className="flex justify-between gap-2 overflow-x-auto pb-1">
              <Gametype likeGame={likeGame} setLikeGame={setLikeGame} />
            </div>
          </div>

          <div className="mt-[46px] md:mt-[58px]">
            <p className="text-base font-semibold text-primary">서비스 정책</p>
            <div className="mt-5 rounded bg-primary">
              <div className="pb-5 pt-4 md:py-5">
                <div className="flex justify-between gap-1 px-5 md:px-6">
                  <div
                    className="flex cursor-pointer items-center gap-3"
                    onClick={allCheckHandler}
                  >
                    <div className="relative size-5 flex-none rounded bg-white">
                      {
                        // Object.values로 배열로 만든후에 every()로 검사
                        Object.values(isService).every((value) => value) && (
                          <IoCheckmarkOutline className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs" />
                        )
                      }
                    </div>
                    <p className="text-base font-medium text-OnPrimary">
                      전체동의
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-t-white px-5 pt-6 md:mt-6 md:px-6">
                  {[
                    {
                      id: "isAgreeTermsUse",
                      label: "서비스 이용약관 동의 (필수)",
                    },
                    {
                      id: "isAgreeCollectingUsingPersonalInformation",
                      label: "개인정보 수집 및 이용 동의 (필수)",
                    },
                    {
                      id: "isAgreeMarketing",
                      label: "마케팅 수신 동의 (선택)",
                    },
                  ].map(({ id, label }, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${index !== 0 ? "mt-4" : ""}`}
                    >
                      <div
                        className="flex cursor-pointer gap-3"
                        onClick={() => isServiceHandler(id, !isService[id])}
                      >
                        <div className="relative size-5 flex-none rounded bg-white">
                          {isService[id] && (
                            <IoCheckmarkOutline className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs" />
                          )}
                        </div>
                        <p className="text-base font-medium text-OnPrimary">
                          {label}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="ml-auto text-xs text-white underline underline-offset-4"
                      >
                        내용보기
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center md:mt-14">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center justify-center rounded border border-[#4FAAFF] bg-OnPrimary px-4 py-2 text-sm font-medium text-primary md:text-base"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </Wrap>
  );
};

export default Signup;

interface isServiceT {
  [key: string]: boolean;
  isAgreeTermsUse: boolean;
  isAgreeCollectingUsingPersonalInformation: boolean;
  isAgreeMarketing: boolean;
}
