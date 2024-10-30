'use server';

import authIntance from '@/lib/fetchInstance';
import { DetailData } from '@/types/detail.type';
import { Return } from '@/types/get.type';

const get = async (postid: string): Promise<Return<DetailData>> => {
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/meeting/${postid}`,
  );
  return res.json();
};

export default get;
