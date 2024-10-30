import { authOptions } from '@/lib/authOptions';
import Footer from '@/ui/layout/footer/Footer';
import Header from '@/ui/layout/header/Header';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = async ({ children }: PublicLayoutProps) => {
  const session = (await getServerSession(authOptions)) as any;

  if (session && session.accessToken) {
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
export default PublicLayout;
