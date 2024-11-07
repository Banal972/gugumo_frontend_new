'use server';

import authIntance from '@/lib/fetchInstance';
import { Return } from '@/types/get.type';
import { MailCheckActionProps } from '@/types/user.type';

const mailCheckAction = async ({
  username,
  emailAuthNum,
}: MailCheckActionProps): Promise<Return<string>> => {
  const res = await authIntance(`${process.env.API_URL}/api/v1/mailAuthCheck`, {
    method: 'POST',
    body: JSON.stringify({ email: username, emailAuthNum }),
  });
  return res.json();
};

export default mailCheckAction;
