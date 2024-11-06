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
import { DAYS, GAMETYPE, LOCATION } from '@/constant/card/constant';
import useEditorHook from '@/hooks/useEditorHook';
import { DetailData } from '@/types/detail.type';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const MEETINGMEMBER = [
  { value: '1', label: '1명' },
  { value: '2', label: '2명' },
  { value: '3', label: '3명' },
  { value: '4', label: '4명' },
  { value: '5', label: '5명이상' },
];

const schema = z
  .object({
    meetingStatus: z.enum(['RECRUIT', 'END']).optional(),
    meetingType: z.enum(['LONG', 'SHORT']),
    location: z.string().min(1, '지역을 선택해야 합니다.'),
    gameType: z.string().min(1, '구기종목을 선택해야 합니다.'),
    meetingMemberNum: z.string().min(1, '모집인원을 선택해야 합니다.'),
    meetingDays: z.string().optional(),
    meetingTime: z.string().optional(),
    meetingDate: z.string().optional(),
    meetingDeadline: z.string(),
    openKakao: z.string(),
    title: z.string().min(1, '제목을 입력해야 합니다.'),
    content: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.meetingType === 'LONG') {
      if (!data.meetingTime || data.meetingTime.trim() === '') {
        ctx.addIssue({
          path: ['meetingTime'],
          message: '시간대를 선택해야 합니다.',
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.meetingDays || data.meetingDays.trim() === '') {
        ctx.addIssue({
          path: ['meetingDays'],
          message: '모임 요일을 선택해야 합니다.',
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (
      data.meetingType === 'SHORT' &&
      (!data.meetingDate || data.meetingDate.trim() === '')
    ) {
      ctx.addIssue({
        path: ['meetingDate'],
        message: '모임 날짜를 선택해야 합니다.',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type FormData = z.infer<typeof schema>;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface FormProps {
  edit?: DetailData;
}

const Form = ({ edit }: FormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      meetingType: 'SHORT',
      meetingDate: moment(new Date() as Date).format('YYYY-MM-DD'),
      meetingDeadline: edit
        ? moment(new Date(edit.meetingDeadline) as Date).format('YYYY-MM-DD')
        : moment(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) as Date).format(
            'YYYY-MM-DD',
          ),
    },
  });
  const [isMeetingDate, setIsMeetingDate] = useState<boolean>(false);
  const [isMeetingDeadline, setIsMeetingDeadline] = useState<boolean>(false);
  const [meetingDate, setMeetingDate] = useState<Value>(new Date());
  const [meetingDeadline, setMeetingDeadline] = useState<Value>(
    new Date(edit?.meetingDeadline || Date.now() + 1 * 24 * 60 * 60 * 1000),
  );

  const meetingTypeWatch = watch('meetingType');
  const meetingDaysWatch = watch('meetingDays');

  const editor = useEditorHook(edit?.content);

  const calenderHandler = (
    field: 'meetingDate' | 'meetingDeadline',
    value: Value,
  ) => {
    const formatDate = moment(value as Date).format('YYYY-MM-DD');

    if (field === 'meetingDate') {
      setMeetingDate(value);
      setIsMeetingDate(false);
    } else if (field === 'meetingDeadline') {
      setMeetingDeadline(value);
      setIsMeetingDeadline(false);
    }

    setValue(field, formatDate);
  };

  const selectDayHandler = (day: string) => {
    const meetingDays = getValues('meetingDays');
    const currentSelectDays = meetingDays ? meetingDays.split(';') : [];
    const updatedSelectDays = currentSelectDays.includes(day)
      ? currentSelectDays.filter((el) => el !== day)
      : [...currentSelectDays, day];
    setValue('meetingDays', updatedSelectDays.join(';'));
  };

  const createMutation = async (body: FormData) => {
    const res = await postAction(body);
    if (res.status === 'fail') return alert('등록에 실패 했습니다.');
    alert('등록이 완료 되었습니다.');
    router.push('/');
  };

  const editMutataion = async ({
    body,
    postId,
  }: {
    body: FormData;
    postId: number;
  }) => {
    const res = await patchAction({ body, postId });
    if (res.status === 'fail') return alert('수정에 실패 했습니다.');
    alert('수정이 완료 되었습니다.');
    router.push(`/detail/${postId}`);
  };

  const onSubmitHandler = handleSubmit(async (data) => {
    setValue('content', editor.getHTML());
    console.log(data);
    // if (!edit) return createMutation(data);
    // editMutataion({ body: data, postId: edit.postId });
  });

  useEffect(() => {
    if (!edit || !edit.meetingDays) return;
    const array: string[] = edit.meetingDays.split(';');
    setValue('meetingDays', [...array].join(';'));
  }, [edit, setValue]);

  useEffect(() => {
    if (meetingTypeWatch === 'LONG') return setValue('meetingDate', '');
  }, [meetingTypeWatch, setValue]);

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

        <div className="min-w-0">
          <div className="flex flex-col gap-[10px]">
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
          {errors?.location && (
            <p className="mt-2 text-sm text-red-500">
              {errors.location?.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-col gap-[10px]">
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
          {errors?.gameType && (
            <p className="mt-2 text-sm text-red-500">
              {errors.gameType?.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-col gap-[10px]">
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
              {MEETINGMEMBER.map(({ value, label }) => (
                <option key={value} value={value} className="text-black">
                  {label}
                </option>
              ))}
            </Select>
          </div>
          {errors?.meetingMemberNum && (
            <p className="mt-2 text-sm text-red-500">
              {errors.meetingMemberNum?.message}
            </p>
          )}
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
                  onChange={(value) => calenderHandler('meetingDate', value)}
                  className="absolute top-full z-10"
                />
              )}
            </CalendarSelect>
          </div>
        )}

        {meetingTypeWatch === 'LONG' && (
          <>
            <div className="min-w-0">
              <div className="flex flex-col gap-[10px]">
                <Label htmlFor="meetingTime">시간대</Label>
                <Select
                  id="meetingTime"
                  passive={!watch('meetingTime')}
                  register={register('meetingTime', {
                    value: edit ? String(edit.meetingTime).split(':')[0] : '',
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
              {errors?.meetingTime && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.meetingTime?.message}
                </p>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex flex-col gap-[10px]">
                <Label>모임 요일</Label>
                <div className="flex min-w-0 flex-wrap justify-start gap-[10px]">
                  {Object.entries(DAYS).map(([key, value]) => (
                    <button
                      type="button"
                      onClick={() => selectDayHandler(key)}
                      key={key}
                      className={`relative flex h-14 w-16 flex-none cursor-pointer items-center justify-center rounded-lg text-sm font-medium md:text-base ${meetingDaysWatch && meetingDaysWatch.split(';').includes(key) ? 'bg-primary text-white' : 'bg-Surface text-OnSurface'}`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              {errors?.meetingDays && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.meetingDays?.message}
                </p>
              )}
            </div>
          </>
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
                onChange={(value) => calenderHandler('meetingDeadline', value)}
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
              })}
            />
          </div>
          {errors?.title && (
            <p className="mt-2 text-sm text-red-500">{errors.title?.message}</p>
          )}
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
    </form>
  );
};

export default Form;
