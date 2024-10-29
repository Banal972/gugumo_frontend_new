"use server";

import { authOptions } from "@/lib/authOptions";
import { baseIntance } from "@/lib/fetchInstance";
import { getServerSession } from "next-auth";

interface kakaoActionBody {
  nickname: string;
  favoriteSports: string;
  isAgreeTermsUse: boolean;
  isAgreeCollectingUsingPersonalInformation: boolean;
  isAgreeMarketing: boolean;
}

const kakaoAction = async (body: kakaoActionBody): Promise<Return<boolean>> => {
  const session = (await getServerSession(authOptions)) as any;
  const res = await baseIntance(`${process.env.API_URL}/api/v1/kakao/member`, {
    method: "POST",
    body: JSON.stringify({
      ...body,
      username: session?.username,
      kakaoId: session?.kakaoId,
    }),
  });
  return res.json();
};

export default kakaoAction;
