'use server';

import { authIntance } from '@/lib/fetchInstance';

const getActions = async ({ query }: getProps): Promise<Return<GetData>> => {
  const { q, page } = query;
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/meeting/my?q=${q}&page=${page}`,
    {
      cache: 'no-store',
      next: {
        tags: ['detail'],
      },
    },
  );
  return res.json();
};

export default getActions;
