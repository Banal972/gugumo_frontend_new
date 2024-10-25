"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const get = async (postid: string): Promise<Return<DetailData>> => {
  const session = (await getServerSession(authOptions)) as any;
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/meeting/${postid}`, {
      headers: {
        Authorization: session?.accessToken,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("서버 에러");
    }
    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default get;

export interface DetailData {
  postId: number;
  author: string;
  meetingType: string;
  gameType: string;
  meetingMemberNum: number;
  meetingDeadline: string;
  openKakao: string;
  location: string;
  title: string;
  content: string;
  createdDateTime: string;
  meetingStatus: string;
  viewCount: number;
  bookmarkCount: number;
  meetingDateTime: string;
  bookmarked: boolean;
  yours: boolean;
  authorExpired: boolean;
  meetingTime?: string;
  meetingDays?: string;
}
