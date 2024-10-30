'use server';

import authIntance from '@/lib/fetchInstance';

const deleteAction = async (data: any) => {
  const res = await authIntance(`/back/api/v1/comment/${data.comment_id}`, {
    method: 'DELETE',
  });
  return res.json();
};

export default deleteAction;
