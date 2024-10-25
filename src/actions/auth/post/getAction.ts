"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const getActions = async ({ query }: getProps) => {
  const session = (await getServerSession(authOptions)) as any;

  const { q, page } = query;

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/v1/meeting/my?q=${q}&page=${page}`,
      {
        headers: {
          Authorization: session?.accessToken,
        },
      },
    );

    if (!res.ok) {
      throw new Error("불러오는데 실패 하였습니다.");
    }
    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default getActions;

interface getProps {
  query: {
    q: string;
    page: number;
  };
}
