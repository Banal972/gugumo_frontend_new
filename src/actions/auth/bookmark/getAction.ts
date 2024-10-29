"use server";

import { authIntance } from "@/lib/fetchInstance";

const getAction = async ({ query }: getProps): Promise<Return<GetData>> => {
  const { q, page } = query;
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/bookmark?q=${q}&page=${page}`,
    {
      cache: "no-store",
    },
  );
  return await res.json();
};

export default getAction;
