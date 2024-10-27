"use client";

import moment from "moment";
import { ReactNode, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import DownIcon from "@/asset/image/down.svg";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hook";
import { open } from "@/lib/store/features/modals/modal";
import Alert from "@/components/Modal/Alert";
import Success from "@/components/Modal/Success";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Toolbar from "@/ui/page/post/toolbar/Toolbar";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Form({ session, edit }: { session: any; edit?: any }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { register, handleSubmit, watch, setValue } = useForm();
  const [isMeetingDate, setIsMeetingDate] = useState(false);
  const [isMeetingDeadline, setIsMeetingDeadline] = useState(false);
  const [meetingDate, setMeetingDate] = useState<Value>(new Date());
  const [meetingDeadline, setMeetingDeadline] = useState<Value>(
    new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  );
  const [selectDays, setSelectDays] = useState<string[]>([]);
  const meetingTypeWatch = watch("meetingType", "SHORT");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (edit) {
      // editorRef.current?.getInstance().setMarkdown(edit.content);
      Object.keys(edit).forEach((key) => {
        // 가져온 데이터의 각 키와 값을 반복하여 setValue로 설정합니다.
        if (key === "meetingTime") {
          setValue(key, edit[key].split(":")[0]);
        } else if (key === "meetingDays") {
          const array: string[] = edit[key].split(";");
          setSelectDays([...array]);
        } else {
          setValue(key, edit[key]);
        }
      });
    } else {
      // editorRef.current?.getInstance().setMarkdown("");
    }
  }, [edit]);

  const meetingDateHandler = (value: Value) => {
    setMeetingDate(value);
    setIsMeetingDate(false);
  };

  const meetingDeadlineHandler = (value: Value) => {
    setMeetingDeadline(value);
    setIsMeetingDeadline(false);
  };

  const selectDayHandler = (day: string) => {
    if (selectDays.includes(day)) {
      setSelectDays(selectDays.filter((el) => el !== day));
    } else {
      setSelectDays((prev) => [...prev, day]);
    }
  };

  const createMutation = useMutation({
    mutationFn: async (body: any) => {
      try {
        const response = await fetch("/back/api/v1/meeting/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: session.accessToken,
          },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const data = await response.json();

          if (data.status === "success") {
            dispatch(
              open({
                Component: Success,
                props: {
                  message: "등록이 완료 되었습니다.",
                  onClick: () => {
                    router.push("/");
                  },
                },
              }),
            );
          } else {
            return dispatch(
              open({
                Component: Alert,
                props: { message: "등록에 실패 했습니다." },
              }),
            );
          }
        }
      } catch (err) {
        console.log(err);
        dispatch(
          open({
            Component: Alert,
            props: { message: "오류가 발생 했습니다." },
          }),
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meeting"],
      });
    },
  });

  const editMutataion = useMutation({
    mutationFn: async (body: any) => {
      try {
        const response = await fetch(`/back/api/v1/meeting/${edit.postId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: session.accessToken,
          },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const data = await response.json();

          if (data.status === "success") {
            dispatch(
              open({
                Component: Success,
                props: { message: "수정이 완료 되었습니다." },
              }),
            );
          } else {
            return dispatch(
              open({
                Component: Alert,
                props: { message: "수정에 실패 했습니다." },
              }),
            );
          }
        } else {
          console.log(response);
          return dispatch(
            open({
              Component: Alert,
              props: { message: "수정에 실패 했습니다." },
            }),
          );
        }
      } catch (err) {
        console.log(err);
        dispatch(
          open({
            Component: Alert,
            props: { message: "오류가 발생 했습니다." },
          }),
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meeting"],
      });
      router.push("/");
    },
  });

  const onSubmitHandler = async (event: any) => {
    const {
      meetingStatus,
      meetingType,
      location,
      gameType,
      meetingMemberNum,
      meetingTime,
      openKakao,
      title,
    } = event;
    // const content = editorRef.current?.getInstance().getHTML();

    if (gameType === "") {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "구기종목을 선택해주세요." },
        }),
      );
    }

    if (location === "") {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "지역 선택을 해야합니다." },
        }),
      );
    }

    if (meetingType === "LONG") {
      if (meetingTime === "") {
        return dispatch(
          open({
            Component: Alert,
            props: { message: "시간대을 선택해주세요." },
          }),
        );
      }
      if (selectDays.length <= 0) {
        return dispatch(
          open({
            Component: Alert,
            props: { message: "요일을 선택해주세요." },
          }),
        );
      }
    }

    if (meetingMemberNum === "") {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "모집인원을 선택해주세요." },
        }),
      );
    }

    if (openKakao === "") {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "오픈카톡을 입력해주세요.." },
        }),
      );
    }

    if (title === "") {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "제목을 입력해주세요." },
        }),
      );
    }

    /* if (content === "") {
      return dispatch(
        open({
          Component: Alert,
          props: { message: "내용을 입력해주세요." },
        }),
      );
    } */

    if (!edit) {
      const body = {
        meetingType,
        gameType,
        meetingMemberNum,
        meetingDate: moment(meetingDate as Date).format("YYYY-MM-DD"),
        meetingDays: selectDays.join(";"),
        meetingTime,
        meetingDeadline: moment(meetingDeadline as Date).format("YYYY-MM-DD"),
        openKakao,
        title,
        // content,
        location,
      };
      createMutation.mutate(body);
    } else {
      const body = {
        meetingType,
        gameType,
        meetingMemberNum,
        meetingDate: moment(meetingDate as Date).format("YYYY-MM-DD"),
        meetingDays: selectDays.join(";"),
        meetingTime,
        meetingDeadline: moment(meetingDeadline as Date).format("YYYY-MM-DD"),
        openKakao,
        title,
        // content,
        location,
        meetingStatus,
      };

      editMutataion.mutate(body);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "내용을 입력해주세요...",
        emptyEditorClass:
          "before:h-0 before:pointer-events-none before:float-left before:text-[#adb5bd] before:content-[attr(data-placeholder)]",
        emptyNodeClass:
          "before:h-0 before:pointer-events-none before:float-left before:text-[#adb5bd] before:content-[attr(data-placeholder)]",
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="flex items-center gap-2 md:gap-3">
        <p className="flex size-[23px] flex-none items-center justify-center rounded-full bg-primary text-lg font-semibold text-white md:size-[34px] md:text-2xl">
          1
        </p>
        <h3 className="text-lg font-medium md:text-2xl">
          모임 정보를 입력해주세요
        </h3>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:mt-8 md:grid-cols-2 md:gap-7">
        {edit && (
          <div className="flex min-w-0 flex-col gap-[10px]">
            <label
              htmlFor="meetingStatus"
              className="px-2 text-sm font-medium md:text-base"
            >
              모집상태
            </label>
            <div className="relative">
              <select
                id="meetingStatus"
                className="box-border h-11 w-full appearance-none rounded-lg border border-transparent bg-Surface px-4 text-sm font-medium outline-none focus:border-primary md:h-16 md:text-base"
                {...register("meetingStatus")}
              >
                <option value="RECRUIT">모집중</option>
                <option value="END">모집완료</option>
              </select>
              <DownIcon
                className={
                  "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                }
                stroke={"#878787"}
              />
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-col gap-[10px]">
          <label
            htmlFor="meetingType"
            className="px-2 text-sm font-medium md:text-base"
          >
            모집형식
          </label>
          <div className="relative">
            <select
              id="meetingType"
              className="box-border h-11 w-full appearance-none rounded-lg border border-transparent bg-Surface px-4 text-sm font-medium outline-none focus:border-primary md:h-16 md:text-base"
              {...register("meetingType")}
            >
              <option value="SHORT">단기모집</option>
              <option value="LONG">장기모집</option>
            </select>
            <DownIcon
              className={
                "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              }
              stroke={"#878787"}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-[10px]">
          <label
            htmlFor="location"
            className="px-2 text-sm font-medium md:text-base"
          >
            지역 선택
          </label>
          <div className="relative">
            <select
              id="location"
              className={`box-border h-11 w-full appearance-none rounded-lg border border-transparent bg-Surface px-4 text-sm font-medium outline-none focus:border-primary md:h-16 md:text-base ${!watch("location") ? "text-gray-400" : ""}`}
              {...register("location")}
            >
              <option value="">지역 선택을 선택해주세요.</option>
              <option value="SEOUL" className="text-black">
                서울
              </option>
              <option value="INCHEON" className="text-black">
                인천
              </option>
              <option value="GYEONGGI" className="text-black">
                경기
              </option>
              <option value="DAEGU" className="text-black">
                대구
              </option>
              <option value="BUSAN" className="text-black">
                부산
              </option>
              <option value="GYEONGNAM" className="text-black">
                경남
              </option>
              <option value="GYEONGBUK" className="text-black">
                경북
              </option>
              <option value="GANGWON" className="text-black">
                경원
              </option>
              <option value="JEONNAM" className="text-black">
                전남
              </option>
              <option value="JEONBUK" className="text-black">
                전북
              </option>
              <option value="OTHER" className="text-black">
                그외
              </option>
            </select>
            <DownIcon
              className={
                "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              }
              stroke={"#878787"}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-[10px]">
          <label
            htmlFor="gameType"
            className="px-2 text-sm font-medium md:text-base"
          >
            구기종목
          </label>
          <div className="relative">
            <select
              id="gameType"
              className={`box-border h-11 w-full appearance-none rounded-lg border border-transparent bg-Surface px-4 text-sm font-medium outline-none focus:border-primary md:h-16 md:text-base ${!watch("gameType") ? "text-gray-400" : ""}`}
              {...register("gameType")}
            >
              <option value="">구기종목을 선택해주세요.</option>
              <option value="BADMINTON" className="text-black">
                배드민턴
              </option>
              <option value="BASKETBALL" className="text-black">
                농구
              </option>
              <option value="FUTSAL" className="text-black">
                풋살
              </option>
              <option value="TENNIS" className="text-black">
                테니스
              </option>
              <option value="TABLETENNIS" className="text-black">
                탁구
              </option>
              <option value="BASEBALL" className="text-black">
                야구
              </option>
            </select>
            <DownIcon
              className={
                "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              }
              stroke={"#878787"}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-[10px]">
          <label
            htmlFor="meetingMemberNum"
            className="px-2 text-sm font-medium md:text-base"
          >
            모집 인원
          </label>
          <div className="relative">
            <select
              id="meetingMemberNum"
              className={`box-border h-11 w-full appearance-none rounded-lg border border-transparent bg-Surface px-4 text-sm font-medium outline-none focus:border-primary md:h-16 md:text-base ${!watch("meetingMemberNum") ? "text-gray-400" : ""}`}
              {...register("meetingMemberNum")}
            >
              <option value="">모집인원을 선택해주세요.</option>
              <option value="1" className="text-black">
                1명
              </option>
              <option value="2" className="text-black">
                2명
              </option>
              <option value="3" className="text-black">
                3명
              </option>
              <option value="4" className="text-black">
                4명
              </option>
              <option value="5" className="text-black">
                5명 이상
              </option>
            </select>
            <DownIcon
              className={
                "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              }
              stroke={"#878787"}
            />
          </div>
        </div>

        {meetingTypeWatch === "SHORT" && (
          <div className="flex min-w-0 flex-col gap-[10px]">
            <label htmlFor="" className="px-2 text-sm font-medium md:text-base">
              모임 날짜
            </label>
            <div className="relative">
              <div
                onClick={() => setIsMeetingDate(!isMeetingDate)}
                className="box-border flex h-11 w-full cursor-pointer items-center rounded-lg bg-Surface px-4 text-sm font-medium md:h-16 md:text-base"
              >
                {moment(meetingDate as Date).format("YYYY-MM-DD")}
              </div>
              {isMeetingDate && (
                <Calendar
                  value={meetingDate}
                  minDate={new Date()}
                  onChange={meetingDateHandler}
                  className="absolute top-full z-10"
                />
              )}
              <DownIcon
                className={
                  "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                }
                stroke={"#878787"}
              />
            </div>
          </div>
        )}

        {meetingTypeWatch === "LONG" && (
          <div className="flex min-w-0 flex-col gap-[10px]">
            <label
              htmlFor="meetingTime"
              className="px-2 text-sm font-medium md:text-base"
            >
              시간대
            </label>
            <div className="relative">
              <select
                id="meetingTime"
                className={`box-border h-11 w-full appearance-none rounded-lg border border-transparent bg-Surface px-4 text-sm font-medium outline-none focus:border-primary md:h-16 md:text-base ${!watch("meetingTime") ? "text-gray-400" : ""}`}
                {...register("meetingTime")}
              >
                <option value="">시간대을 선택해주세요.</option>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i + 1} className="text-black">
                    {i + 1}시
                  </option>
                ))}
              </select>
              <DownIcon
                className={
                  "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                }
                stroke={"#878787"}
              />
            </div>
          </div>
        )}

        {meetingTypeWatch === "LONG" && (
          <div className="flex min-w-0 flex-col gap-[10px]">
            <label htmlFor="" className="px-2 text-sm font-medium md:text-base">
              모임 요일
            </label>
            <div className="flex min-w-0 flex-wrap justify-start gap-[10px]">
              {["월", "화", "수", "목", "금", "토", "일"].map((el, index) => (
                <div
                  onClick={() => selectDayHandler(el)}
                  key={index}
                  className={`relative flex h-14 w-16 flex-none cursor-pointer items-center justify-center rounded-lg text-sm font-medium md:text-base ${selectDays.includes(el) ? "bg-primary text-white" : "bg-Surface text-OnSurface"}`}
                >
                  {el}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-col gap-[10px]">
          <label htmlFor="" className="px-2 text-sm font-medium md:text-base">
            모집 마감
          </label>
          <div className="relative">
            <div
              onClick={() => setIsMeetingDeadline(!isMeetingDeadline)}
              className="box-border flex h-11 w-full cursor-pointer items-center rounded-lg bg-Surface px-4 text-sm font-medium md:h-16 md:text-base"
            >
              {moment(meetingDeadline as Date).format("YYYY-MM-DD")}
            </div>
            {isMeetingDeadline && (
              <Calendar
                value={meetingDeadline}
                minDate={new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)}
                onChange={meetingDeadlineHandler}
                className="absolute top-full z-10"
              />
            )}
            <DownIcon
              className={
                "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              }
              stroke={"#878787"}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-[10px]">
          <label htmlFor="" className="px-2 text-sm font-medium md:text-base">
            오픈카톡 주소
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="오픈카톡 주소를 입력해주세요."
              className="box-border h-11 w-full appearance-none rounded-lg border border-transparent bg-Surface px-4 text-sm font-medium outline-none focus:border-primary md:h-16 md:text-base"
              {...register("openKakao")}
            />
          </div>
        </div>
      </div>

      <div className="mt-14 md:mt-[87px]">
        <div className="flex items-center gap-2 md:gap-3">
          <p className="flex size-[23px] flex-none items-center justify-center rounded-full bg-primary text-lg font-semibold text-white md:size-[34px] md:text-2xl">
            2
          </p>
          <h3 className="text-lg font-medium md:text-2xl">
            모임에 대해 소개해주세요
          </h3>
        </div>

        <div className="mt-8">
          <label
            className="px-[6px] text-sm font-medium md:text-lg"
            htmlFor="title"
          >
            제목
          </label>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className="mt-3 h-11 w-full rounded-lg border border-transparent bg-Surface px-4 text-sm font-medium outline-none focus:border-primary md:h-14 md:text-base"
            {...register("title")}
          />
        </div>

        <div className="mt-7">
          <label className="px-[6px] text-sm font-medium md:text-lg">
            내용
          </label>
          <div className="mt-3 rounded-xl border p-5">
            <Toolbar editor={editor} />
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <Toolbar editor={editor} type="bubble" />
            </BubbleMenu>
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <SubmitButton>{!edit ? "새글 작성" : "수정 하기"}</SubmitButton>
      </div>
    </form>
  );
}

const SubmitButton = ({ children }: { children: ReactNode }) => {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center rounded border border-[#4FAAFF] bg-OnPrimary px-4 py-[9.5px] text-sm font-medium text-primary transition-all hover:bg-primary hover:text-OnPrimary md:text-base`}
    >
      {children}
    </button>
  );
};
