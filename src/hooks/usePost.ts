import { queryOptions } from "@tanstack/react-query";

interface PostT {
  session: any;
  q: string;
  page: number;
}

export const fetchPost = async ({
  queryKey,
}: {
  queryKey: [string, any, string, number];
}) => {
  const [, session, q, page] = queryKey;
  const response = await fetch(`/back/api/v1/meeting/my?q=${q}&page=${page}`, {
    headers: {
      Authorization: session?.accessToken,
    },
  });

  console.log("포스터 : ", response);

  if (!response.ok) {
    throw new Error("불러오는데 실패 하였습니다.");
  }
  return response.json();
};

export const postOptions = ({ session, q, page }: PostT) => {
  return queryOptions({
    queryKey: ["postlist", session, q, page],
    queryFn: fetchPost,
  });
};
