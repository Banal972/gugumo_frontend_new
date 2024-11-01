import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const oauthCallback = async () => {
  const session = (await getServerSession(authOptions)) as any;
  if (session && !session.accessToken) {
    return redirect('/signup');
  }
  return redirect('/');
};

export default oauthCallback;
