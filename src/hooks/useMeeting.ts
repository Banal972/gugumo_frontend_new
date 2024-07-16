import { queryOptions } from "@tanstack/react-query";

interface MeetingT {
  session: any;
  q: string;
  meetingstatus: string;
  location: string;
  gametype: string;
  sort: string;
  page: number;
}

const fetchMeeting = async ({
  queryKey,
}: {
  queryKey: [string, any, string, string, string, string, string, number];
}) => {
  const [, session, q, meetingstatus, location, gametype, sort, page] =
    queryKey;

  const response = await fetch(
    `/back/api/v1/meeting?q=${q}&meetingstatus=${meetingstatus}&location=${location}&gametype=${gametype}&sort=${sort}&page=${page}`,
    {
      headers: {
        Authorization: session?.accessToken,
      },
    }
  );

  console.log("미팅 : ", response);

  if (!response.ok) {
    throw new Error("불러오는데 실패 하였습니다.");
  }
  return response.json();
};

export const meetingOptions = ({
  session,
  q,
  meetingstatus,
  location,
  gametype,
  sort,
  page,
}: MeetingT) => {
  return queryOptions({
    queryKey: [
      "meeting",
      session,
      q,
      meetingstatus,
      location,
      gametype,
      sort,
      page,
    ],
    queryFn: fetchMeeting,
  });
};
