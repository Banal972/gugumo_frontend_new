"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const getDetail = async (postid: string) => {
  const session = (await getServerSession(authOptions)) as any;
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/meeting/${postid}`, {
      headers: {
        Authorization: session?.accessToken,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("서버 에러");
    }
    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default getDetail;
