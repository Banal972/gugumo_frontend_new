"use server";

import { authIntance } from "@/lib/fetchInstance";

interface getProps {
  query?: {
    q: string;
    page: number;
  };
}

const getAction = async ({
  query = { q: "", page: 1 },
}: getProps): Promise<Return<GetData>> => {
  const { q, page } = query;
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/bookmark?q=${q}&page=${page}`,
    {
      next: {
        tags: ["bookmark"],
      },
    },
  );
  return res.json();
};

export default getAction;
