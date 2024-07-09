"use client";
import { useAlarm } from "@/hooks/useAlarm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

export default function Alarm({ session }: { session: any }) {
  const router = useRouter();
  const [isAlarm, setIsAlarm] = useState(false);

  const {
    alarmData,
    isLoading,
    isError,
    readAlarmMutation,
    deleteAlarmMutation,
    allReadMutation,
  } = useAlarm(session);

  useEffect(() => {
    console.log(alarmData);
  }, [alarmData]);

  const onReadHandler = async (
    e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
    notiId: number,
    postId: number
  ) => {
    e.stopPropagation();
    readAlarmMutation.mutate({ session, notiId, postId });
  };

  const onDeleteHandler = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    notiId: number
  ) => {
    e.stopPropagation();
    deleteAlarmMutation.mutate({ session, notiId });
  };

  const onAllReadHandler = async () => {
    allReadMutation.mutate({ session });
  };

  return (
    <div className="relative">
      <div className="cursor-pointer w-6 md:w-auto">
        <Image
          onClick={() => setIsAlarm(!isAlarm)}
          src="/asset/image/icon/bell.svg"
          alt="알림창"
          width={36}
          height={36}
        />
      </div>
      {isAlarm && (
        <div className="absolute top-full right-0 md:w-[342px] w-[272px] rounded-lg bg-white py-[22px] px-[30px] box-border md:max-h-[334px] max-h-[264px] translate-x-1/4 md:translate-x-0 overflow-y-hidden">
          <div className="flex justify-between">
            <h4 className="text-primary text-base font-semibold">알림</h4>
            <button
              className="text-[13px] text-OnSurface font-semibold"
              type="button"
              onClick={onAllReadHandler}
            >
              모두읽음
            </button>
          </div>
          <div className="mt-[23px]">
            <p className="ml-[3px] text-[13px] text-OnSurface">6월 3일</p>
            <ul className="mt-2">
              {alarmData?.map((elm) => (
                <li
                  className={`flex whitespace-nowrap gap-2 ${
                    !elm.read ? "bg-Surface" : "bg-gray-300"
                  } py-[14px] px-3 rounded items-center cursor-pointer justify-between first:mt-0 mt-2`}
                  key={elm.id}
                  onClick={(e) => onReadHandler(e, elm.id, elm.postId)}
                >
                  <p className="truncate text-[13px]">
                    <span className="text-primary bg-white text-[13px] py-[3px] px-[8.5px] rounded-full mr-2">
                      댓글
                    </span>
                    {elm.message}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => onDeleteHandler(e, elm.id)}
                  >
                    <Image
                      src="/asset/image/icon/remove.svg"
                      alt="삭제 아이콘"
                      width={13.36}
                      height={13.36}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
