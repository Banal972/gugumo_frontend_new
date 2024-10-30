import Footer from '@/ui/layout/footer/Footer';
import Header from '@/ui/layout/header/Header';
import { ReactNode } from 'react';

const RouteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default RouteLayout;
