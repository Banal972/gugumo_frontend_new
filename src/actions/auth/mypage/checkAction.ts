"use server";

/* 
  @data 타입
  @true 중복일경우
  @false 중복이 아닐경우
*/
const checkAction = async ({
  nickname,
}: checkActionProps): Promise<Return<boolean>> => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/v1/member/checkDuplicateNickname?nickname=${nickname}`,
    );

    if (!res.ok) {
      throw new Error("서버 오류가 발생했습니다.");
    }
    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default checkAction;

interface checkActionProps {
  nickname: string;
}
