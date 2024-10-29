"use server";

import { authIntance } from "@/lib/fetchInstance";

const getAction = async (): Promise<Return<MypageReturn>> => {
  const res = await authIntance(`${process.env.API_URL}/api/v1/member`, {
    next: {
      tags: ["/mypage"],
    },
  });
  return res.json();
};

export default getAction;
