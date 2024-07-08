import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  return data;
};

const readHandler = async (data: any) => {
  const { session, notiId } = data;
  const response = await fetch(`/back/api/v1/notification/read/${notiId}`, {
    method: "PATCH",
    headers: {
      Authorization: session?.accessToken,
    },
  });
  if (!response.ok) return;
};

const deleteHandler = async (data: any) => {
  const { session, notiId } = data;
  const response = await fetch(`/back/api/v1/notification/${notiId}`, {
    method: "DELETE",
    headers: {
      Authorization: session?.accessToken,
    },
  });
  if (!response.ok) return;
};

export const useAlarm = (session: any) => {
  const queryClient = useQueryClient();

  const {
    data: alarmData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["alarm", session],
    queryFn: alarmfetchs,
  });

  const readAlarmMutation = useMutation({
    mutationFn: readHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alarm"],
      });
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

  return {
    alarmData,
    isLoading,
    isError,
    readAlarmMutation,
    deleteAlarmMutation,
  };
};
