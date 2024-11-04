type DefaultPostId = number;

export interface PatchBody {
  meetingType: string;
  gameType: string;
  meetingMemberNum: string;
  meetingDate: string;
  meetingDays: string;
  meetingTime: string;
  meetingDeadline: string;
  openKakao: string;
  title: string;
  content: string;
  location: string;
  meetingStatus?: string;
}

export interface PatchActionProps {
  body: PatchBody;
  postId: DefaultPostId;
}
