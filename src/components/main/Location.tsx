'use client';

import { LOCATION } from '@/constant/card/constant';
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from 'react';

interface ButtonProps {
  onClick: MouseEventHandler;
  children: ReactNode;
  active: boolean;
}

interface LocationProps {
  location: string;
  setQuery: Dispatch<
    SetStateAction<{
      q: string;
      meetingstatus: string;
      location: string;
      gametype: string;
      sort: string;
      page: number;
    }>
  >;
}

const Location = ({ location, setQuery }: LocationProps) => {
  return (
    <>
      <p className="text-base font-semibold text-OnSurface md:text-lg">지역</p>
      <div className="mt-[11px] flex gap-[4px] overflow-x-auto pb-1 md:flex-wrap md:gap-[14px]">
        <Button
          onClick={() => setQuery((prev) => ({ ...prev, location: '' }))}
          active={location === ''}
        >
          전체
        </Button>
        {Object.entries(LOCATION).map((el) => (
          <Button
            key={el[0]}
            onClick={() => setQuery((prev) => ({ ...prev, location: el[0] }))}
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
