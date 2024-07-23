import { queryOptions } from "@tanstack/react-query";

export const fetchRecommend = async ({
  queryKey,
}: {
  queryKey: [string, any];
}) => {
  const [, session] = queryKey;

  const response = await fetch(`/back/api/v1/meeting/recommend`, {
    headers: {
      Authorization: session?.accessToken,
    },
  });

  console.log("추천 : ", response);

  if (!response.ok) {
    throw new Error("불러오는데 실패 하였습니다.");
  }

  return response.json();
};

export const recommendOptions = ({ session }: { session: any }) => {
  return queryOptions({
    queryKey: ["recommend", session],
    queryFn: fetchRecommend,
  });
};
