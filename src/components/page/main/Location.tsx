'use client';

import { LOCATION } from '@/constant/card/constant';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  onClick: MouseEventHandler;
  children: ReactNode;
  active: boolean;
}

interface LocationProps {
  location: string;
}

const Location = ({ location }: LocationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleLocation = (key: string) => {
    const params = new URLSearchParams(searchParams);
    if (key) {
      params.set('location', key);
      params.delete('page');
    } else {
      params.delete('location');
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <p className="text-base font-semibold text-OnSurface md:text-lg">지역</p>
      <div className="mt-[11px] flex gap-[4px] overflow-x-auto pb-1 md:flex-wrap md:gap-[14px]">
        <Button onClick={() => handleLocation('')} active={location === ''}>
          전체
        </Button>
        {Object.entries(LOCATION).map((el) => (
          <Button
            key={el[0]}
            onClick={() => handleLocation(el[0])}
            active={location === el[0]}
          >
            {el[1]}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Location;

const Button = ({ onClick, children, active }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`box-border cursor-pointer whitespace-nowrap rounded-full border border-primary px-5 py-2 text-sm font-medium leading-none transition-colors hover:bg-primary hover:text-white md:px-7 md:text-base md:leading-none ${active ? 'bg-primary text-white' : 'text-primary'}`}
    >
      {children}
    </button>
  );
};
