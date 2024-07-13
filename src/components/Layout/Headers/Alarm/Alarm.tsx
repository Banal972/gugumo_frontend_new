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
    postId: number,
  ) => {
    e.stopPropagation();
    readAlarmMutation.mutate({ session, notiId, postId });
  };

  const onDeleteHandler = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    notiId: number,
  ) => {
    e.stopPropagation();
    deleteAlarmMutation.mutate({ session, notiId });
  };

  const onAllReadHandler = async () => {
    allReadMutation.mutate({ session });
  };

  return (
    <div className="relative">
      <div className="w-6 cursor-pointer md:w-auto">
        <Image
          onClick={() => setIsAlarm(!isAlarm)}
          src="/asset/image/icon/bell.svg"
          alt="알림창"
          width={36}
          height={36}
        />
      </div>
      {isAlarm && (
        <div className="absolute right-0 top-full box-border max-h-[264px] w-[272px] translate-x-1/4 overflow-y-hidden rounded-lg bg-white px-[30px] py-[22px] md:max-h-[334px] md:w-[342px] md:translate-x-0">
          <div className="flex justify-between">
            <h4 className="text-base font-semibold text-primary">알림</h4>
            <button
              className="text-[13px] font-semibold text-OnSurface"
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
                  className={`flex gap-2 whitespace-nowrap ${
                    !elm.read ? "bg-Surface" : "bg-gray-300"
                  } mt-2 cursor-pointer items-center justify-between rounded px-3 py-[14px] first:mt-0`}
                  key={elm.id}
                  onClick={(e) => onReadHandler(e, elm.id, elm.postId)}
                >
                  <p className="truncate text-[13px]">
                    <span className="mr-2 rounded-full bg-white px-[8.5px] py-[3px] text-[13px] text-primary">
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
