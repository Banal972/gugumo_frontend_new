import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface AlarmT {
  id: number;
  message: string;
  notificationType: string;
  createDate: string;
  postId: number;
  read: boolean;
}

const alarmfetchs = async ({ queryKey }: { queryKey: [string, any] }) => {
  const [, session] = queryKey;

  if (!session) return;
  const response = await fetch("/back/api/v1/notification", {
    headers: {
      Authorization: session?.accessToken,
    },
  });
  if (!response.ok) return;

  const { data }: { data: AlarmT[] } = await response.json();

  const result = data.reduce<{
    [key: string]: { createDate: string; data: AlarmT[] };
  }>((acc, current) => {
    let date = moment(current.createDate).format("YYYY-MM-DD");

    // 새로운 그룹으로 만들어줌
    if (!acc[date]) {
      acc[date] = {
        createDate: date,
        data: [],
      };
    }

    // 새로운 그룹에 데이터를 넣어줌
    acc[date].data.push(current);

    return acc;
  }, {}); // {}는 초기값

  return Object.values(result); // 객체를 배열로 수정
};

// 읽기
const readHandler = async (data: any) => {
  const { session, notiId } = data;
  const response = await fetch(`/back/api/v1/notification/read/${notiId}`, {
    method: "PATCH",
    headers: {
      Authorization: session?.accessToken,
    },
  });
  if (!response.ok) {
    throw new Error("에러가 발생했습니다.");
  }
};

// 삭제
const deleteHandler = async (data: any) => {
  const { session, notiId } = data;
  const response = await fetch(`/back/api/v1/notification/${notiId}`, {
    method: "DELETE",
    headers: {
      Authorization: session?.accessToken,
    },
  });
  if (!response.ok) {
    throw new Error("에러가 발생했습니다.");
  }
};

// 전체읽기
const allReadHandler = async (data: any) => {
  const { session } = data;
  const response = await fetch("/back/api/v1/notification/read", {
    method: "PATCH",
    headers: {
      Authorization: session?.accessToken,
    },
  });
  if (!response.ok) {
    throw new Error("에러가 발생했습니다.");
  }
};

// customHook
export const useAlarm = (session: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: getAlarms,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["alarm", session],
    queryFn: alarmfetchs,
  });

  const readAlarmMutation = useMutation({
    mutationFn: readHandler,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["alarm"],
      });
      router.push(`/detail/${variables.postId}`);
    },
  });

  const deleteAlarmMutation = useMutation({
    mutationFn: deleteHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alarm"],
      });
    },
  });

  const allReadMutation = useMutation({
    mutationFn: allReadHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alarm"],
      });
    },
  });

  return {
    getAlarms,
    isLoading,
    isError,
    readAlarmMutation,
    deleteAlarmMutation,
    allReadMutation,
  };
};
