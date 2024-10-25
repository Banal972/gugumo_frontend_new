"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const get = async ({ query }: Get): Promise<Return<Content>> => {
  const session = (await getServerSession(authOptions)) as any;

  const { q, meetingstatus, location, gametype, sort, page } = query;

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/v1/meeting?q=${q}&meetingstatus=${meetingstatus}&location=${location}&gametype=${gametype}&sort=${sort}&page=${page}`,
      {
        headers: {
          Authorization: session?.accessToken,
        },
      },
    );

    if (!res.ok) {
      throw new Error("서버 에러");
    }

    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default get;

interface Get {
  query: {
    q: string;
    meetingstatus: string;
    location: string;
    gametype: string;
    sort: string;
    page: number;
  };
}
