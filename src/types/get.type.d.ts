interface Content {
  postId: number;
  meetingStatus: string;
  gameType: string;
  location: string;
  title: string;
  meetingMemberNum: number;
  meetingDeadline: string;
  meetingDateTime: string;
  meetingDays?: string;
  bookmarked: boolean;
}

interface Pageable {
  number: number;
  size: number;
  sort: any[];
  first: boolean;
  last: boolean;
  hasNext: boolean;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  empty: boolean;
}

export interface GetData {
  content: Content[];
  pageable: Pageable;
}

export interface Return<T> {
  status: 'success' | 'fail';
  data: T;
  message: any;
}

export interface MypageReturn {
  username: string;
  nickname: string;
  favoriteSports: string;
}

export interface GetProps {
  query: {
    q?: string;
    meetingstatus?: string;
    location?: string;
    gametype?: string;
    sort?: string;
    page?: number;
  };
}
