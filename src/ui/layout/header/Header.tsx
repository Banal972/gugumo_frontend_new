import getAction from '@/actions/notification/getAction';
import Wrap from '@/ui/layout/Wrap';
import VerifyLayout from '@/ui/layout/header/atom/VerifyLayout';
import Image from 'next/image';
import Link from 'next/link';

const Header = async () => {
  const res = await getAction();
  const { data: notification } = res;

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
          />
        </Link>

        <VerifyLayout notification={notification} />
      </Wrap>
    </header>
  );
};

export default Header;
