'use client';

import patchAction from '@/actions/auth/post/patchAction';
import postAction from '@/actions/auth/post/postAction';
import CalendarSelect from '@/components/page/post/write/atom/CalendarSelect';
import EditorLayout from '@/components/page/post/write/atom/EditorLayout';
import Headings from '@/components/page/post/write/atom/Headings';
import Input from '@/components/page/post/write/atom/Input';
import Label from '@/components/page/post/write/atom/Label';
import Select from '@/components/page/post/write/atom/Select';
import SubmitBtn from '@/components/page/post/write/atom/SubmitBtn';
import { DAYS, GAMETYPE, LOCATION } from '@/constant/card/constant';
import useEditorHook from '@/hooks/useEditorHook';
import { FieldType, schema } from '@/lib/schema/post.schema';
import { useToast } from '@/provider/ToastProvider';
import { DetailData } from '@/types/detail.type';
import ErrorMessage from '@/ui/form/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form';

const MEETINGMEMBER = [
  { value: '1', label: '1명' },
  { value: '2', label: '2명' },
  { value: '3', label: '3명' },
  { value: '4', label: '4명' },
  { value: '5', label: '5명이상' },
];

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface FormProps {
  edit?: DetailData;
}

const Form = ({ edit }: FormProps) => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FieldType>({
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

  const createMutation = async (body: FieldType) => {
    const res = await postAction(body);
    if (res.status === 'fail')
      return showToast('error', '등록에 실패 했습니다.');
    showToast('success', '등록이 완료 되었습니다.');
    router.push('/');
  };

  const editMutataion = async ({
    body,
    postId,
  }: {
    body: FieldType;
    postId: number;
  }) => {
    const res = await patchAction({ body, postId });
    if (res.status === 'fail')
      return showToast('error', '수정에 실패 했습니다.');
    showToast('success', '수정이 완료 되었습니다.');
    router.push(`/detail/${postId}`);
  };

  const onSubmitHandler = handleSubmit(async (data) => {
    if (!edit) return createMutation({ ...data, content: editor.getHTML() });
    editMutataion({
      body: { ...data, content: editor.getHTML() },
      postId: edit.postId,
    });
  });

  useEffect(() => {
    if (!edit || !edit.meetingDays) return;
    const array: string[] = edit.meetingDays.split(';');
    setValue('meetingDays', [...array].join(';'));
  }, [edit, setValue]);

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
            <ErrorMessage>{errors.location?.message}</ErrorMessage>
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
            <ErrorMessage>{errors.gameType?.message}</ErrorMessage>
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
            <ErrorMessage>{errors.meetingMemberNum?.message}</ErrorMessage>
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
                <ErrorMessage>{errors.meetingTime?.message}</ErrorMessage>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex flex-col gap-[10px]">
                <Label>모임 요일</Label>
                <div className="flex min-w-0 flex-wrap justify-start gap-[10px]">
                  {Object.entries(DAYS).map(([key, value]) => (
                    <button
                      type="button"
                      onClick={() => selectDayHandler(value)}
                      key={key}
                      className={`relative flex h-14 w-16 flex-none cursor-pointer items-center justify-center rounded-lg text-sm font-medium md:text-base ${meetingDaysWatch && meetingDaysWatch.split(';').includes(value) ? 'bg-primary text-white' : 'bg-Surface text-OnSurface'}`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              {errors?.meetingDays && (
                <ErrorMessage>{errors.meetingDays?.message}</ErrorMessage>
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
          {errors?.openKakao && (
            <ErrorMessage>{errors.openKakao?.message}</ErrorMessage>
          )}
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
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
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
      </div>
    </form>
  );
};

export default Form;
