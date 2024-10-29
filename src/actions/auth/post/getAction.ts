"use server";

import { authIntance } from "@/lib/fetchInstance";

interface getProps {
  query: {
    q?: string;
    page?: number;
  };
}

const getActions = async ({ query }: getProps): Promise<Return<GetData>> => {
  const { q, page } = query;
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/meeting/my?q=${q}&page=${page}`,
    {
      cache: "no-store",
    },
  );
  return res.json();
};

export default getActions;
