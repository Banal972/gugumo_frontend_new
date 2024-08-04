import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface BookMarkT {
  session: any;
  q: string;
  page: number;
}

const fetchBookmarks = async ({
  queryKey,
}: {
  queryKey: [string, any, string, number];
}) => {
  const [, session, q, page] = queryKey;
  const response = await fetch(`/back/api/v1/bookmark?q=${q}&page=${page}`, {
    headers: {
      Authorization: session.accessToken,
    },
  });
  if (!response.ok) {
    throw new Error("불러오는데 실패 하였습니다.");
  }
  return response.json();
};

export const bookMarkOptions = ({ session, q, page }: BookMarkT) => {
  return queryOptions({
    queryKey: ["bookmarks", session, q, page],
    queryFn: fetchBookmarks,
  });
};

const addBookmark = async (data: any) => {
  const { session, postId } = data;
  const response = await fetch("/back/api/v1/bookmark/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: session.accessToken,
    },
    body: JSON.stringify({ postId: postId }),
  });
  if (!response.ok) {
    throw new Error("등록에 실패 하였습니다.");
  }
};

const deleteBookmark = async (data: any) => {
  const { session, postId } = data;
  const response = await fetch(`/back/api/v1/bookmark/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: session.accessToken,
    },
  });
  if (!response.ok) {
    throw new Error("삭제에 실패 하였습니다.");
  }
};

export const useBookMutation = () => {
  const queryClient = useQueryClient();

  const addBookmarkMutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["bookmarks"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["recommend"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["meeting"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["postlist"],
        }),
      ]),
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["bookmarks"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["recommend"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["meeting"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["postlist"],
        }),
      ]),
  });

  return {
    addBookmarkMutation,
    deleteBookmarkMutation,
  };
};
