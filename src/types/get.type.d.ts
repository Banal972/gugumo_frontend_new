interface Content {
  postId: number;
  meetingStatus: string;
  gameType: string;
  location: string;
  title: string;
  meetingMemberNum: number;
  meetingDeadline: string;
  meetingDateTime: string;
  bookmarked: boolean;
}

interface GetData {
  content: Content[];
  pageable: Pageable;
}

interface Return<T> {
  status: string;
  data: T;
  message: any;
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

interface MypageReturn {
  username: string;
  nickname: string;
  favoriteSports: string;
}
