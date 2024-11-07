'use client';

import { useToast } from '@/provider/ToastProvider';
import { MouseEventHandler } from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';

interface AgreeServiceProps {
  label: any;
  onClick: MouseEventHandler;
  active: boolean;
  className: string;
}

const AgreeService = ({
  label,
  onClick,
  active,
  className,
}: AgreeServiceProps) => {
  const { showToast } = useToast();
  const clickHandler = () => {
    showToast('error', '준비중 입니다.');
  };

  return (
    <div className={`mt-4 flex items-center ${className}`}>
      <div role="none" className="flex cursor-pointer gap-3" onClick={onClick}>
        <div className="relative size-5 flex-none rounded bg-white">
          {active && (
            <IoCheckmarkOutline className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs" />
          )}
        </div>
        <p className="text-base font-medium text-OnPrimary">{label}</p>
      </div>
      <button
        type="button"
        onClick={clickHandler}
        className="ml-auto text-xs text-white underline underline-offset-4"
      >
        내용보기
      </button>
    </div>
  );
};

export default AgreeService;
