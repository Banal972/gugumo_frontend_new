'use client';

import { STATUS } from '@/constant/card/constant';
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from 'react';

interface ButtonProps {
  active: boolean;
  onClick: MouseEventHandler;
  children: ReactNode;
}

interface StatusProps {
  status: string;
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

const Status = ({ status, setQuery }: StatusProps) => {
  return (
    <div className="flex gap-5 md:gap-6">
      {Object.entries(STATUS).map((staus) => (
        <Button
          key={staus[0]}
          active={status === staus[0]}
          onClick={() =>
            setQuery((prev) => ({ ...prev, meetingstatus: staus[0] }))
          }
        >
          {staus[1]}
        </Button>
      ))}
    </div>
  );
};

export default Status;

const Button = ({ active, onClick, children }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer text-nowrap text-lg font-medium text-OnSurface transition-colors hover:text-primary md:text-2xl ${active && 'font-semibold text-primary'}`}
    >
      {children}
    </button>
  );
};
