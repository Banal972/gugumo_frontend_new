"use server";

import { authIntance } from "@/lib/fetchInstance";

const addAction = async (postId: number) => {
  const res = await authIntance(`${process.env.API_URL}/api/v1/bookmark/new`, {
    method: "POST",
    body: JSON.stringify({ postId: postId }),
  });
  return res.json();
};

export default addAction;
