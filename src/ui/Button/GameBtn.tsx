import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface ButtonProps {
  onClick: MouseEventHandler;
  active: boolean;
  get: string;
  label: string;
  option?: {
    src: string;
    width: number;
    height: number;
  };
}

const GameBtn = ({ onClick, option, active, get, label }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative box-border size-[77px] flex-none cursor-pointer overflow-hidden rounded-full border border-primary transition-colors hover:bg-primary hover:text-white ${active ? 'bg-primary text-white' : 'bg-background text-primary'}`}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-sm font-medium ${get === '' ? '' : 'flex-col gap-[2px]'}`}
      >
        {option && (
          <Image
            src={
              active && get === 'BADMINTON'
                ? '/asset/image/balltype/ball01_active.png'
                : option.src
            }
            width={0}
            height={0}
            sizes="100vw"
            alt={label}
            style={{ width: option?.width, height: option?.height }}
          />
        )}
        {label}
      </div>
    </button>
  );
};

export default GameBtn;
