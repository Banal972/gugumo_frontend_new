"use server";

import { authIntance } from "@/lib/fetchInstance";

const deleteAction = async (postId: number) => {
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/bookmark/${postId}`,
    {
      method: "DELETE",
    },
  );
  return res.json();
};

export default deleteAction;
