'use server';

import { authIntance } from '@/lib/fetchInstance';

const get = async (postid: string): Promise<Return<DetailData>> => {
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/meeting/${postid}`,
  );
  return res.json();
};

export default get;
