"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const addAction = async (postId: number) => {
  const session = (await getServerSession(authOptions)) as any;

  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/bookmark/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: session.accessToken,
      },
      body: JSON.stringify({ postId: postId }),
    });
    if (!res.ok) {
      throw new Error("등록에 실패 하였습니다.");
    }
    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default addAction;
