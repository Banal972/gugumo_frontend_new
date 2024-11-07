'use client';

import { MouseEventHandler, ReactNode } from 'react';

interface BaseBtnProps {
  onClick: MouseEventHandler;
  children: ReactNode;
}

const BaseBtn = ({ onClick, children }: BaseBtnProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer text-[13px] text-OnBackgroundGray"
    >
      {children}
    </button>
  );
};

export default BaseBtn;
