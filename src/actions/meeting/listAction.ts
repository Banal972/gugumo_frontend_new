'use server';

import authIntance from '@/lib/fetchInstance';
import { GetData, Return } from '@/types/get.type';

interface Get {
  query: {
    q: string;
    meetingstatus: string;
    location: string;
    gametype: string;
    sort: string;
    page: number;
  };
}

const get = async ({ query }: Get): Promise<Return<GetData>> => {
  const { q, meetingstatus, location, gametype, sort, page } = query;

  const res = await authIntance(
    `${process.env.API_URL}/api/v1/meeting?q=${q}&meetingstatus=${meetingstatus}&location=${location}&gametype=${gametype}&sort=${sort}&page=${page}`,
  );
  return res.json();
};

export default get;
