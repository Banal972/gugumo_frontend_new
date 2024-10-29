"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const baseIntance = async (url: string, options = {}) => {
  try {
    const defaultOptions = {
      headers: {
        "Content-Type": "Application/json",
      },
      ...options,
    };
    const res = await fetch(url, defaultOptions);
    if (!res.ok) {
      throw new Error("서버 에러가 발생했습니다.");
    }
    return res;
  } catch (err) {
    throw new Error(err as string);
  }
};

const authIntance = async (url: string, options: RequestInit = {}) => {
  const session = (await getServerSession(authOptions)) as any;
  const AuthorizationOptions: RequestInit = {
    headers: {
      ...options.headers,
      Authorization: session?.accessToken,
    },
    ...options,
  };
  return baseIntance(url, AuthorizationOptions);
};

export { baseIntance, authIntance };
