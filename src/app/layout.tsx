import '@/app/font.css';
import '@/app/globals.css';
import '@/lib/firebase';
import AuthProvider from '@/provider/AuthProvider';
import FCMProvider from '@/provider/FCMProvider';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import 'react-calendar/dist/Calendar.css';
import 'swiper/css';

export const metadata: Metadata = {
  title: '구구모 - 구기종목 매칭 서비스',
  description: '동네 구기종목 매칭 서비스 구구모 입니다.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        url: '/icons/apple-icon-57x57.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        url: '/icons/apple-icon-60x60.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        url: '/icons/apple-icon-72x72.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        url: '/icons/apple-icon-76x76.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        url: '/icons/apple-icon-114x114.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        url: '/icons/apple-icon-120x120.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        url: '/icons/apple-icon-144x144.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        url: '/icons/apple-icon-152x152.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/icons/apple-icon-180x180.png',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <FCMProvider>{children}</FCMProvider>
        </AuthProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  );
};

export default RootLayout;

interface RootLayoutProps {
  children: React.ReactNode;
}
