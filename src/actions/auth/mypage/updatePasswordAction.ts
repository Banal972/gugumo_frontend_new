'use server';

import { authIntance } from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';

const updatePasswordAction = async (
  password: string,
): Promise<Return<boolean>> => {
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/member/updatePassword`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        password,
      }),
    },
  );
  return res.json();
};

export default updatePasswordAction;
