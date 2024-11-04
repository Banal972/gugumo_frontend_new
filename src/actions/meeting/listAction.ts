'use server';

import authIntance from '@/lib/fetchInstance';
import { GetData, GetProps, Return } from '@/types/get.type';

const get = async ({ query }: GetProps): Promise<Return<GetData>> => {
  const { q, meetingstatus, location, gametype, sort, page } = query;

  const res = await authIntance(
    `${process.env.API_URL}/api/v1/meeting?q=${q}&meetingstatus=${meetingstatus}&location=${location}&gametype=${gametype}&sort=${sort}&page=${page}`,
  );
  return res.json();
};

export default get;
