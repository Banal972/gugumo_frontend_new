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

interface GetReturn {
  status: string;
  data: GetData;
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
