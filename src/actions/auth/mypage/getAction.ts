"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const getAction = async (): Promise<Return<MypageReturn>> => {
  const session = (await getServerSession(authOptions)) as any;

  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/member`, {
      headers: {
        Authorization: session?.accessToken,
      },
      next: {
        tags: ["/mypage"],
      },
    });
    if (!res.ok) {
      throw new Error("서버 오류가 발생했습니다.");
    }
    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default getAction;
