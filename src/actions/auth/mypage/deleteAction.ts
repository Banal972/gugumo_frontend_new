"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const deleteUserAction = async (): Promise<Return<boolean>> => {
  const session = (await getServerSession(authOptions)) as any;
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/member`, {
      method: "DELETE",
      headers: {
        Authorization: session?.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error("서버 오류가 발생했습니다.");
    }

    return response.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default deleteUserAction;
