'use server';

import baseIntance from '@/lib/baseInstnace';
import { Return } from '@/types/get.type';

type CheckActionProps = {
  nickname: string;
};

/* 
  @data 타입
  @true 중복일경우
  @false 중복이 아닐경우
*/
const checkAction = async ({
  nickname,
}: CheckActionProps): Promise<Return<boolean>> => {
  const res = await baseIntance(
    `${process.env.API_URL}/api/v1/member/checkDuplicateNickname?nickname=${nickname}`,
  );
  return res.json();
};

export default checkAction;
