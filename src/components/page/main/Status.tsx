'use client';

import { STATUS } from '@/constant/card/constant';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  active: boolean;
  onClick: MouseEventHandler;
  children: ReactNode;
}

interface StatusProps {
  status: string;
}

const Status = ({ status }: StatusProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (key: string) => {
    const params = new URLSearchParams(searchParams);
    if (key) {
      params.set('status', key);
      params.delete('page');
    } else {
      params.delete('status');
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-5 md:gap-6">
      {Object.entries(STATUS).map((staus) => (
        <Button
          key={staus[0]}
          active={status === staus[0]}
          onClick={() => handleSearch(staus[0])}
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
