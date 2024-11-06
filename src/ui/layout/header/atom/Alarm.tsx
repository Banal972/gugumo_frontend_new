'use client';

import allReadAction from '@/actions/notification/allReadAction';
import deleteAction from '@/actions/notification/deleteAction';
import readAction from '@/actions/notification/readAction';
import { useToast } from '@/provider/ToastProvider';
import { GetNotification } from '@/types/notification.type';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useState } from 'react';

interface AlarmProps {
  notification: { createDate: string; data: GetNotification[] }[];
}

const Alarm = ({ notification }: AlarmProps) => {
  const { showToast } = useToast();
  const [isAlarm, setIsAlarm] = useState(false);

  const router = useRouter();

  const onReadHandler = async (
    e: MouseEvent,
    notiId: number,
    postId: number,
  ) => {
    e.stopPropagation();
    const res = await readAction(notiId);
    if (res.status === 'fail')
      return showToast('error', '읽는데 실패하였습니다.');
    router.push(`/detail/${postId}`);
  };

  const onDeleteHandler = async (e: MouseEvent, notiId: number) => {
    e.stopPropagation();
    const res = await deleteAction(notiId);
    if (res.status === 'fail')
      return showToast('error', '삭제하는데 실패하였습니다.');
  };

  const onAllReadHandler = async () => {
    const res = await allReadAction();
    if (res.status === 'fail')
      return showToast('error', '읽는데 실패하였습니다.');
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="w-6 cursor-pointer align-middle md:w-auto"
        onClick={() => setIsAlarm(!isAlarm)}
      >
        <Image
          src="/asset/image/icon/bell.svg"
          alt="알림창"
          width={36}
          height={36}
        />
      </button>
      {isAlarm && (
        <div className="absolute right-0 top-full box-border flex max-h-[264px] w-[272px] translate-x-1/4 flex-col overflow-y-hidden rounded-lg bg-white px-[30px] py-[22px] md:max-h-[334px] md:w-[342px] md:translate-x-0">
          <div className="flex flex-none justify-between">
            <h4 className="text-base font-semibold text-primary">알림</h4>
            <button
              className="text-[13px] font-semibold text-OnSurface"
              type="button"
              onClick={onAllReadHandler}
            >
              모두읽음
            </button>
          </div>
          <div className="mt-[23px] flex-1 overflow-y-auto">
            {notification.length > 0 && (
              <>
                {notification.map((alarm) => (
                  <div className="mt-4 first:mt-0" key={alarm.createDate}>
                    <p className="ml-[3px] text-[13px] text-OnSurface">
                      {moment(alarm.createDate).format('MM월 DD일')}
                    </p>
                    <ul className="mt-2">
                      {alarm.data.map((elm) => (
                        <li
                          role="none"
                          key={elm.id}
                          className={`mt-2 flex cursor-pointer items-center justify-between gap-2 whitespace-nowrap rounded px-3 py-[14px] first:mt-0 ${!elm.read ? 'bg-Surface' : 'bg-gray-300'}`}
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
                ))}
              </>
            )}
            {notification.length <= 0 && (
              <p className="text-center text-sm text-OnBackgroundGray">
                알림이 존재하지 않습니다.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alarm;
