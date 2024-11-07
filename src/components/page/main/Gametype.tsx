'use client';

import { GAMETYPE } from '@/constant/card/constant';
import getImageOption from '@/lib/getImageOption';
import GameBtn from '@/ui/Button/GameBtn';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface GametypeProps {
  gametype: string;
}

const Gametype = ({ gametype }: GametypeProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const gametypeHanlder = (key: string) => {
    const params = new URLSearchParams(searchParams);
    if (key) {
      params.set('gametype', key);
      params.delete('page');
    } else {
      params.delete('gametype');
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <p className="text-base font-semibold text-OnSurface md:text-lg">종목</p>
      <div className="mt-[11px] flex gap-[4px] overflow-x-auto pb-1 md:flex-wrap md:gap-[14px]">
        <GameBtn
          active={gametype === ''}
          onClick={() => gametypeHanlder('')}
          get=""
          label="전체"
        />
        {Object.entries(GAMETYPE).map(([key, value]) => (
          <GameBtn
            key={key}
            option={getImageOption(key)}
            active={gametype === key}
            onClick={() => gametypeHanlder(key)}
            get={key}
            label={value}
          />
        ))}
      </div>
    </>
  );
};

export default Gametype;
