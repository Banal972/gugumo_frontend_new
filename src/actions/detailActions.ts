"use server";

import { authIntance } from "@/lib/fetchInstance";

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

const get = async (postid: string): Promise<Return<DetailData>> => {
  const res = await authIntance(
    `${process.env.API_URL}/api/v1/meeting/${postid}`,
  );
  return res.json();
};

export default get;
