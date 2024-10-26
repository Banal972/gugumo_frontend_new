"use server";

interface mailCheckActionProps {
  username: string;
  emailAuthNum: string;
}

const mailCheckAction = async ({
  username,
  emailAuthNum,
}: mailCheckActionProps): Promise<Return<string>> => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/mailAuthCheck`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ email: username, emailAuthNum }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    return res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export default mailCheckAction;
