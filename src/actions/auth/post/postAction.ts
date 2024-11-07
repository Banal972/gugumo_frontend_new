'use server';

import authIntance from '@/lib/fetchInstance';
import { FieldType } from '@/lib/schema/post.schema';
import { Return } from '@/types/get.type';
import { revalidateTag } from 'next/cache';

const postAction = async (body: FieldType): Promise<Return<string>> => {
  const res = await authIntance(`${process.env.API_URL}/api/v1/meeting/new`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  revalidateTag('detail');
  return res.json();
};

export default postAction;
