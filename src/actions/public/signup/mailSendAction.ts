"use server";

const mailSendAction = async (username: string): Promise<Return<string>> => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/mailSend`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ email: username }),
    });

    if (!res.ok) {
      throw new Error("서버 에러");
    }

    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default mailSendAction;
