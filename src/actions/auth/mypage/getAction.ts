'use server';

import { authIntance } from '@/lib/fetchInstance';
import { MypageReturn, Return } from '@/types/get.type';

const getAction = async (): Promise<Return<MypageReturn>> => {
  const res = await authIntance(`${process.env.API_URL}/api/v1/member`);
  return res.json();
};

export default getAction;
