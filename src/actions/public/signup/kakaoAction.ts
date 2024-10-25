"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const kakaoAction = async (body: kakaoActionBody): Promise<Return<boolean>> => {
  const session = (await getServerSession(authOptions)) as any;

  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/kakao/member`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        ...body,
        username: session?.username,
        kakaoId: session?.kakaoId,
      }),
    });

    if (!res.ok) {
      const json = await res.json();
      console.log(json);
      throw new Error("서버 에러");
    }

    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default kakaoAction;

interface kakaoActionBody {
  nickname: string;
  favoriteSports: string;
  isAgreeTermsUse: boolean;
  isAgreeCollectingUsingPersonalInformation: boolean;
  isAgreeMarketing: boolean;
}
