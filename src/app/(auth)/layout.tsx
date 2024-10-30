import { authOptions } from '@/lib/authOptions';
import Footer from '@/ui/layout/footer/Footer';
import Header from '@/ui/layout/header/Header';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const session = (await getServerSession(authOptions)) as any;

  if (!session || !session.accessToken) {
    return redirect('/');
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default AuthLayout;

interface AuthLayoutProps {
  children: React.ReactNode;
}
