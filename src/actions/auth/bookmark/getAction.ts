'use server';

import authIntance from '@/lib/fetchInstance';
import { GetData, GetProps, Return } from '@/types/get.type';

const getAction = async ({ query }: GetProps): Promise<Return<GetData>> => {
  const { q, page } = query;
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/bookmark?q=${q}&page=${page}`,
    {
      cache: 'no-store',
    },
  );
  return res.json();
};

export default getAction;
