import DownSVG from '@/asset/image/down.svg';
import moment from 'moment';
import React, { MouseEventHandler, ReactNode } from 'react';

interface CalendarSelectProps {
  onClick: MouseEventHandler;
  date: any;
  children: ReactNode;
}

const CalendarSelect = ({ onClick, date, children }: CalendarSelectProps) => {
  return (
    <div className="relative">
      <div
        role="none"
        onClick={onClick}
        className="box-border flex h-11 w-full cursor-pointer items-center rounded-lg bg-Surface px-4 text-sm font-medium md:h-14 md:text-base"
      >
        {moment(date).format('YYYY-MM-DD')}
      </div>
      {children}
      <DownSVG
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        stroke="#878787"
      />
    </div>
  );
};

export default CalendarSelect;
