"use client";
import Alert from "@/components/Modal/Alert";
import Success from "@/components/Modal/Success";
import { open } from "@/lib/store/features/modals/modal";
import { useAppDispatch } from "@/lib/store/hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BUTTONSTYLE =
  "inline-flex items-center bg-OnPrimary text-sm md:text-base font-medium border rounded py-[9.5px] px-4 justify-center cursor-pointer";

export default function BtnList({
  postid,
  yours,
}: {
  postid: string;
  yours: boolean;
}) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession() as any;

  const editHandler = () => {
    router.push(`/post/edit/${postid}`);
  };

  const removeMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`/back/api/v1/meeting/${postid}`, {
          method: "DELETE",
          headers: {
            Authorization: session.accessToken,
          },
        });
        if (response.ok) {
          const data = await response.json();

          if (data.status === "success") {
            dispatch(
              open({
                Component: Success,
                props: {
                  message: "게시글을 삭제 하였습니다.",
                  onClick: () => {
                    router.push("/");
                  },
                },
              }),
            );
          } else {
            return dispatch(
              open({
                Component: Alert,
                props: {
                  message: "삭제하는데 실패 하였습니다.",
                  onClick: () => {
                    router.push("/");
                  },
                },
              }),
            );
          }
        } else {
          return dispatch(
            open({
              Component: Alert,
              props: {
                message: "삭제하는데 실패 하였습니다.",
                onClick: () => {
                  router.push("/");
                },
              },
            }),
          );
        }
      } catch (err) {
        return dispatch(
          open({
            Component: Alert,
            props: {
              message: "오류가 발생 했습니다.",
              onClick: () => {
                router.push("/");
              },
            },
          }),
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meeting"],
      });
    },
  });

  return (
    <div className="mt-7 flex justify-center gap-5 md:mt-8">
      {yours && (
        <button
          onClick={() => removeMutation.mutate()}
          className={`${BUTTONSTYLE} border-Error text-Error transition-all hover:bg-Error hover:text-white`}
        >
          삭제 하기
        </button>
      )}
      <button
        onClick={() => router.push("/")}
        className={`${BUTTONSTYLE} border-primary text-primary transition-all hover:bg-primary hover:text-white`}
      >
        목록 보기
      </button>
      {yours && (
        <button
          onClick={editHandler}
          className={`${BUTTONSTYLE} border-SubColor4 text-SubColor4 transition-all hover:bg-SubColor4 hover:text-white`}
        >
          수정 하기
        </button>
      )}
    </div>
  );
}
