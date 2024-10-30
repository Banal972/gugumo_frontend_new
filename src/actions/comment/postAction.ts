'use server';

import authIntance from '@/lib/fetchInstance';

const postAction = async (newComment: any) => {
  const res = await authIntance('/back/api/v1/comment/new', {
    method: 'POST',
    body: JSON.stringify(newComment.body),
  });

  return res.json();
};

export default postAction;
