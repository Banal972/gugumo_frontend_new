"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const getRecommend = async (): Promise<Return<Content>> => {
  const session = (await getServerSession(authOptions)) as any;

  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/meeting/recommend`, {
      headers: {
        Authorization: session?.accessToken,
      },
    });
    if (!res.ok) {
      throw new Error("서버 에러");
    }
    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default getRecommend;
