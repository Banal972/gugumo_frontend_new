import { z } from 'zod';

export const schema = z
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
    openKakao: z.string().min(1, '오픈 카톡 주소를 입력해야 합니다.'),
    title: z.string().min(1, '제목을 입력해야 합니다.'),
    content: z.string().default(''),
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

export type FieldType = z.infer<typeof schema>;
