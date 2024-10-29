"use server";

import { baseIntance } from "@/lib/fetchInstance";

const mailSendAction = async (username: string): Promise<Return<string>> => {
  const res = await baseIntance(`${process.env.API_URL}/api/v1/mailSend`, {
    method: "POST",
    body: JSON.stringify({ email: username }),
  });
  return res.json();
};

export default mailSendAction;
