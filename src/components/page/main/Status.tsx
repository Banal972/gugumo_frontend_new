"use client";

import { MouseEventHandler, ReactNode, useState } from "react";

const Status = ({ status }: Status) => {
  const [meetingstatus, setMeetingstatus] = useState(status);

  return (
    <div className="flex gap-5 md:gap-6">
      {STATUS.map((staus) => (
        <Button
          key={staus.type}
          active={meetingstatus === staus.type}
          onClick={() => setMeetingstatus(staus.type)}
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
      className={`cursor-pointer text-nowrap text-lg font-medium text-OnSurface md:text-2xl ${active && "font-semibold text-primary"}`}
    >
      {children}
    </button>
  );
};

const STATUS = [
  { type: "RECRUIT", label: "모집중" },
  { type: "END", label: "모집완료" },
  { type: "ALL", label: "모집중" },
];

interface Button {
  active: boolean;
  onClick: MouseEventHandler;
  children: ReactNode;
}

interface Status {
  status: string;
}
