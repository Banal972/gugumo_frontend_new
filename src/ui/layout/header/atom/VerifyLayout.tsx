'use client';

import { AlarmData } from '@/actions/notification/getAction';
import Alarm from '@/ui/layout/header/atom/Alarm';
import LoginBtn from '@/ui/layout/header/atom/LoginBtn';
import User from '@/ui/layout/header/atom/User';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const VerifyLayout = ({
  notification,
}: {
  notification: { createDate: string; data: AlarmData[] }[];
}) => {
  const { data: session } = useSession() as any;

  return (
    <>
      {!session?.accessToken && <LoginBtn />}

      {session?.accessToken && (
        <div className="flex items-center gap-3 md:gap-[26px]">
          <Alarm notification={notification} />
          <Link className="w-4 md:w-auto" href="/bookmark">
            <Image
              src="/asset/image/icon/bookmark.png"
              width={24}
              height={29}
              alt="북마크"
            />
          </Link>
          <User />
        </div>
      )}
    </>
  );
};

export default VerifyLayout;
