'use server';

import authIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';
import moment from 'moment';

export interface AlarmData {
  id: number;
  message: string;
  notificationType: string;
  createDate: string;
  postId: number;
  read: boolean;
}

const getAction = async (): Promise<
  Return<{ createDate: string; data: AlarmData[] }[]>
> => {
  const res = await authIntance(`${process.env.API_URL}/api/v1/notification`);

  const {
    data,
    status,
    message,
  }: { data: AlarmData[]; status: 'success' | 'fail'; message: string } =
    await res.json();

  const result = data.reduce<{
    [key: string]: { createDate: string; data: AlarmData[] };
  }>((acc, current) => {
    const date = moment(current.createDate).format('YYYY-MM-DD');

    if (!acc[date]) {
      acc[date] = {
        createDate: date,
        data: [],
      };
    }
    acc[date].data.push(current);

    return acc;
  }, {});

  return {
    status,
    data: Object.values(result),
    message,
  };
};

export default getAction;
