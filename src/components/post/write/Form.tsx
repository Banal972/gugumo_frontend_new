'use client';

import patchAction from '@/actions/auth/post/patchAction';
import postAction from '@/actions/auth/post/postAction';
import CalendarSelect from '@/components/post/write/atom/CalendarSelect';
import EditorLayout from '@/components/post/write/atom/EditorLayout';
import Headings from '@/components/post/write/atom/Headings';
import Input from '@/components/post/write/atom/Input';
import Label from '@/components/post/write/atom/Label';
import Select from '@/components/post/write/atom/Select';
import SubmitBtn from '@/components/post/write/atom/SubmitBtn';
import { GAMETYPE, LOCATION } from '@/constant/card/constant';
import useEditorHook from '@/hooks/useEditorHook';
import { DetailData } from '@/types/detail.type';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type FormValue = {
  meetingType: string;
  gameType: string;
  meetingMemberNum: string;
  meetingDate: string;
  meetingDays: string;
  meetingTime: string;
  meetingDeadline: string;
  openKakao: string;
  title: string;
  content: string;
  location: string;
  meetingStatus: string;
};

interface FormProps {
  edit?: DetailData;
}

const Form = ({ edit }: FormProps) => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<FormValue>();
  const [isMeetingDate, setIsMeetingDate] = useState<boolean>(false);
  const [isMeetingDeadline, setIsMeetingDeadline] = useState<boolean>(false);
  const [meetingDate, setMeetingDate] = useState<Value>(new Date());
  const [meetingDeadline, setMeetingDeadline] = useState<Value>(
    new Date(edit?.meetingDeadline || Date.now() + 1 * 24 * 60 * 60 * 1000),
  );
  const [selectDays, setSelectDays] = useState<string[]>([]);
  const meetingTypeWatch = watch('meetingType', 'SHORT');

  const editor = useEditorHook(edit?.content);

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

  const createMutation = async (body: any) => {
    const res = await postAction(body);
    if (res.status === 'fail') return alert('등록에 실패 했습니다.');
    alert('등록이 완료 되었습니다.');
    router.push('/');
  };

  const editMutataion = async ({
    body,
    postId,
  }: {
    body: any;
    postId: number;
  }) => {
    const res = await patchAction({ body, postId });
    if (res.status === 'fail') return alert('수정에 실패 했습니다.');
    alert('수정이 완료 되었습니다.');
    router.push(`/detail/${postId}`);
  };

  const onSubmitHandler = handleSubmit(async (data) => {
    const {
      meetingStatus,
      meetingType,
      location,
      gameType,
      meetingMemberNum,
      meetingTime,
      openKakao,
      title,
    } = data;

    const content = editor.getHTML();

    const body: { [key: string]: string | number } = {
      meetingType,
      gameType,
      meetingMemberNum,
      meetingDate: moment(meetingDate as Date).format('YYYY-MM-DD'),
      meetingDays: selectDays.join(';'),
      meetingTime,
      meetingDeadline: moment(meetingDeadline as Date).format('YYYY-MM-DD'),
      openKakao,
      title,
      content,
      location,
    };

    if (meetingType === 'LONG') {
      if (!meetingTime) return alert('시간대을 선택해주세요.');
      if (selectDays.length <= 0) return alert('요일을 선택해주세요.');
    }

    if (!edit) return createMutation(body);
    body.meetingStatus = meetingStatus;
    editMutataion({ body, postId: edit.postId });
  });

  useEffect(() => {
    if (!edit || !edit.meetingDays) return;
    const array: string[] = edit.meetingDays.split(';');
    setSelectDays([...array]);
  }, [edit, setSelectDays]);

  return (
    <form onSubmit={onSubmitHandler}>
      <Headings order="1" label="모임 정보를 입력해주세요" />

      <div className="mt-5 grid grid-cols-1 gap-3 md:mt-8 md:grid-cols-2 md:gap-7">
        {edit && (
          <div className="flex min-w-0 flex-col gap-[10px]">
            <Label htmlFor="meetingStatus">모집상태</Label>
            <Select
              id="meetingStatus"
              register={register('meetingStatus', {
                value: edit.meetingStatus,
              })}
            >
              <option value="RECRUIT">모집중</option>
              <option value="END">모집완료</option>
            </Select>
          </div>
        )}

        <div className="flex min-w-0 flex-col gap-[10px]">
          <Label htmlFor="meetingType">모집형식</Label>
          <Select
            id="meetingType"
            register={register('meetingType', {
              value: edit?.meetingType,
            })}
          >
            <option value="SHORT">단기모집</option>
            <option value="LONG">장기모집</option>
          </Select>
        </div>

        <div className="flex min-w-0 flex-col gap-[10px]">
          <Label htmlFor="location">지역 선택</Label>
          <Select
            id="location"
            passive={!watch('location')}
            register={register('location', {
              value: edit?.location,
              required: { value: true, message: '지역 선택을 해야합니다.' },
            })}
          >
            <option value="">지역 선택을 선택해주세요.</option>
            {Object.entries(LOCATION).map(([key, value]) => (
              <option key={key} value={key} className="text-black">
                {value}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex min-w-0 flex-col gap-[10px]">
          <Label htmlFor="gameType">구기종목</Label>
          <Select
            id="gameType"
            passive={!watch('gameType')}
            register={register('gameType', {
              value: edit?.gameType,
              required: { value: true, message: '구기종목을 선택해주세요.' },
            })}
          >
            <option value="">구기종목을 선택해주세요.</option>
            {Object.entries(GAMETYPE).map(([key, value]) => (
              <option key={key} value={key} className="text-black">
                {value}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex min-w-0 flex-col gap-[10px]">
          <Label htmlFor="meetingMemberNum">모집 인원</Label>
          <Select
            id="meetingMemberNum"
            passive={!watch('meetingMemberNum')}
            register={register('meetingMemberNum', {
              value: edit?.meetingMemberNum
                ? edit.meetingMemberNum.toString()
                : '',
              required: { value: true, message: '모집인원을 선택해주세요.' },
            })}
          >
            <option value="">모집인원을 선택해주세요.</option>
            {[
              { value: '1', label: '1명' },
              { value: '2', label: '2명' },
              { value: '3', label: '3명' },
              { value: '4', label: '4명' },
              { value: '5', label: '5명이상' },
            ].map(({ value, label }) => (
              <option key={value} value={value} className="text-black">
                {label}
              </option>
            ))}
          </Select>
        </div>

        {meetingTypeWatch === 'SHORT' && (
          <div className="flex min-w-0 flex-col gap-[10px]">
            <Label>모임 날짜</Label>
            <CalendarSelect
              onClick={() => setIsMeetingDate(!isMeetingDate)}
              date={meetingDate}
            >
              {isMeetingDate && (
                <Calendar
                  value={meetingDate}
                  minDate={new Date()}
                  onChange={meetingDateHandler}
                  className="absolute top-full z-10"
                />
              )}
            </CalendarSelect>
          </div>
        )}

        {meetingTypeWatch === 'LONG' && (
          <div className="flex min-w-0 flex-col gap-[10px]">
            <Label htmlFor="meetingTime">시간대</Label>
            <Select
              id="meetingTime"
              passive={!watch('meetingTime')}
              register={register('meetingTime', {
                value: edit ? String(edit?.meetingTime).split(':')[0] : '',
              })}
            >
              <option value="">시간대을 선택해주세요.</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i + 1} className="text-black">
                  {i + 1}시
                </option>
              ))}
            </Select>
          </div>
        )}

        {meetingTypeWatch === 'LONG' && (
          <div className="flex min-w-0 flex-col gap-[10px]">
            <Label>모임 요일</Label>
            <div className="flex min-w-0 flex-wrap justify-start gap-[10px]">
              {['월', '화', '수', '목', '금', '토', '일'].map((el) => (
                <div
                  role="none"
                  onClick={() => selectDayHandler(el)}
                  key={el}
                  className={`relative flex h-14 w-16 flex-none cursor-pointer items-center justify-center rounded-lg text-sm font-medium md:text-base ${selectDays.includes(el) ? 'bg-primary text-white' : 'bg-Surface text-OnSurface'}`}
                >
                  {el}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-col gap-[10px]">
          <Label htmlFor="">모집 마감</Label>
          <CalendarSelect
            onClick={() => setIsMeetingDeadline(!isMeetingDeadline)}
            date={meetingDeadline}
          >
            {isMeetingDeadline && (
              <Calendar
                value={meetingDeadline}
                minDate={new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)}
                onChange={meetingDeadlineHandler}
                className="absolute top-full z-10"
              />
            )}
          </CalendarSelect>
        </div>

        <div className="flex min-w-0 flex-col gap-[10px]">
          <Label htmlFor="openKakao">오픈카톡 주소</Label>
          <Input
            id="openKakao"
            type="text"
            placeholder="오픈카톡 주소를 입력해주세요."
            register={register('openKakao', {
              value: edit?.openKakao,
              required: {
                value: true,
                message: '오픈카톡 주소를 입력해주세요.',
              },
            })}
          />
        </div>
      </div>

      <div className="mt-14 md:mt-[87px]">
        <Headings order="2" label="모임에 대해 소개해주세요" />

        <div className="mt-5 md:mt-8">
          <Label htmlFor="title">제목</Label>
          <div className="mt-3">
            <Input
              type="text"
              placeholder="제목을 입력해주세요."
              register={register('title', {
                value: edit?.title,
                required: { value: true, message: '제목을 입력해주세요.' },
              })}
            />
          </div>
        </div>

        <div className="mt-7">
          <Label htmlFor="">내용</Label>
          <div className="mt-3 border">
            <EditorLayout editor={editor} />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <SubmitBtn>{!edit ? '새글 작성' : '수정 하기'}</SubmitBtn>
      </div>
    </form>
  );
};

export default Form;
