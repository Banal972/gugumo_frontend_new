"use client";

import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";

const Status = ({ status, setQuery }: Status) => {
  return (
    <div className="flex gap-5 md:gap-6">
      {STATUS.map((staus) => (
        <Button
          key={staus.type}
          active={status === staus.type}
          onClick={() =>
            setQuery((prev) => ({ ...prev, meetingstatus: staus.type }))
          }
        >
          {staus.label}
        </Button>
      ))}
    </div>
  );
};

export default Status;

const Button = ({ active, onClick, children }: Button) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer text-nowrap text-lg font-medium text-OnSurface transition-colors hover:text-primary md:text-2xl ${active && "font-semibold text-primary"}`}
    >
      {children}
    </button>
  );
};

const STATUS = [
  { type: "RECRUIT", label: "모집중" },
  { type: "END", label: "모집완료" },
  { type: "ALL", label: "전체" },
];

interface Button {
  active: boolean;
  onClick: MouseEventHandler;
  children: ReactNode;
}

interface Status {
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
