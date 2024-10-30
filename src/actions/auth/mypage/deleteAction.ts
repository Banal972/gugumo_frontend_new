'use server';

import { authIntance } from '@/lib/fetchInstance';

const deleteUserAction = async (): Promise<Return<boolean>> => {
  const response = await authIntance(`${process.env.API_URL}/api/v1/member`, {
    method: 'DELETE',
  });

  return response.json();
};

export default deleteUserAction;
