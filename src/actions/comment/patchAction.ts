'use server';

import authIntance from '@/lib/fetchInstance';

const patchAction = async (data: any) => {
  const res = await authIntance(`/back/api/v1/comment/${data.comment_id}`, {
    method: 'PATCH',
    body: JSON.stringify(data.body),
  });
  return res.json();
};

export default patchAction;
