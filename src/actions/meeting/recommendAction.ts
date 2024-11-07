'use server';

import authIntance from '@/lib/fetchInstance';
import { Content, Return } from '@/types/get.type';

const getRecommend = async (): Promise<Return<Content[]>> => {
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/meeting/recommend`,
    {},
  );
  return res.json();
};

export default getRecommend;
