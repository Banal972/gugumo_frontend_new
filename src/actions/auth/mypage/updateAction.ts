"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const updateAction = async (nickname: string): Promise<Return<string>> => {
  const session = (await getServerSession(authOptions)) as any;

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/v1/member/updateNickname`,
      {
        method: "PATCH",
        headers: {
          Authorization: session?.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname: nickname }),
      },
    );

    if (!res.ok) {
      throw new Error("서버 오류가 발생했습니다.");
    }

    revalidatePath("/mypage");
    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default updateAction;
