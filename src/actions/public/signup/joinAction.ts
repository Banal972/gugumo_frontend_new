"use server";

const joinAction = async (body: joinActionBody): Promise<Return<boolean>> => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v2/member`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("서버 에러");
    }

    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default joinAction;

interface joinActionBody {
  username: string;
  nickname: string;
  password: string;
  favoriteSports: string;
  isAgreeTermsUse: boolean;
  isAgreeCollectingUsingPersonalInformation: boolean;
  isAgreeMarketing: boolean;
  emailAuthNum: number;
}
