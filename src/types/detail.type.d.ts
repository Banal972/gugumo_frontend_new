export interface DetailData {
  postId: number;
  author: string;
  meetingType: 'LONG' | 'SHORT';
  gameType: string;
  meetingMemberNum: number;
  meetingDeadline: string;
  openKakao: string;
  location: string;
  title: string;
  content: string;
  createdDateTime: string;
  meetingStatus: 'RECRUIT' | 'END';
  viewCount: number;
  bookmarkCount: number;
  meetingDateTime: string;
  bookmarked: boolean;
  yours: boolean;
  authorExpired: boolean;
  meetingTime?: string;
  meetingDays?: string;
}
