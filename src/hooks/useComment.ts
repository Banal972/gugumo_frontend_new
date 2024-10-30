import deleteAction from '@/actions/comment/deleteAction';
import getAction from '@/actions/comment/getAction';
import patchAction from '@/actions/comment/patchAction';
import postAction from '@/actions/comment/postAction';
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

interface CommentOptionsT {
  postid: string;
}

export const commentOptions = ({ postid }: CommentOptionsT) => {
  return queryOptions({
    queryKey: ['commnet', postid],
    queryFn: () => getAction(postid),
  });
};

export const usePostCommnet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newComment: any) => postAction(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['commnet'],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => deleteAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['commnet'],
      });
    },
  });
};

export const usePatchCommnet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => patchAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['commnet'],
      });
    },
  });
};
