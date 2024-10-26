"use server";

const resetPwdAction = async (email: string): Promise<Return<boolean>> => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      throw new Error("서버 에러");
    }

    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default resetPwdAction;
