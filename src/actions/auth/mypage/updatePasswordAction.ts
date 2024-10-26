"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const updatePasswordAction = async (
  password: string,
): Promise<Return<boolean>> => {
  const session = (await getServerSession(authOptions)) as any;
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/v1/member/updatePassword`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: session?.accessToken,
        },
        body: JSON.stringify({
          password,
        }),
      },
    );

    if (!res.ok) {
      throw new Error("서버 오류가 발생했습니다.");
    }

    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default updatePasswordAction;
