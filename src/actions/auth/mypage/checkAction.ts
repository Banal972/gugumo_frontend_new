'use server';

import { baseIntance } from '@/lib/fetchInstance';

interface checkActionProps {
  nickname: string;
}

/* 
  @data 타입
  @true 중복일경우
  @false 중복이 아닐경우
*/
const checkAction = async ({
  nickname,
}: checkActionProps): Promise<Return<boolean>> => {
  const res = await baseIntance(
    `${process.env.API_URL}/api/v1/member/checkDuplicateNickname?nickname=${nickname}`,
  );
  return res.json();
};

export default checkAction;
