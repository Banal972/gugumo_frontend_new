'use server';

import authOptions from '@/lib/authOptions';
import baseIntance from '@/lib/baseInstnace';
import { Return } from '@/types/get.type';
import { KakaoActionBody } from '@/types/user.type';
import { getServerSession } from 'next-auth';

const kakaoAction = async (body: KakaoActionBody): Promise<Return<boolean>> => {
  const session = (await getServerSession(authOptions)) as any;
  const res = await baseIntance(`${process.env.API_URL}/api/v1/kakao/member`, {
    method: 'POST',
    body: JSON.stringify({
      ...body,
      username: session?.username,
      kakaoId: session?.kakaoId,
    }),
  });
  return res.json();
};

export default kakaoAction;
