import authOptions from '@/lib/authOptions';
import Wrap from '@/ui/layout/Wrap';
import LoginBtn from '@/ui/layout/header/atom/LoginBtn';
import VerifyLayout from '@/ui/layout/header/atom/VerifyLayout';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

const Header = async () => {
  const session = (await getServerSession(authOptions)) as any;
  return (
    <header className="relative z-20 mt-6 w-full md:mt-10">
      <Wrap className="flex items-center justify-between">
        <Link href="/" className="w-[91px] md:w-[172px]">
          <Image
            src="/asset/image/logo.svg"
            alt="로고"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            priority
          />
        </Link>
        {!session?.accessToken && <LoginBtn />}
        {session?.accessToken && <VerifyLayout />}
      </Wrap>
    </header>
  );
};

export default Header;
