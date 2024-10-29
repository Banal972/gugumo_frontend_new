"use server";

import { baseIntance } from "@/lib/fetchInstance";

interface joinActionBody {
  username: string;
  nickname: string;
  password: string;
  favoriteSports: string;
  isAgreeTermsUse: boolean;
  isAgreeCollectingUsingPersonalInformation: boolean;
  isAgreeMarketing: boolean;
  emailAuthNum: number;
}

const joinAction = async (body: joinActionBody): Promise<Return<boolean>> => {
  const res = await baseIntance(`${process.env.API_URL}/api/v2/member`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res.json();
};

export default joinAction;
