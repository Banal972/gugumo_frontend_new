import { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  className: string;
}

const Tag = ({ children, className }: TagProps) => {
  return (
    <div
      className={`whitespace-nowrap rounded px-[6px] py-1 text-[13px] leading-none ${className}`}
    >
      {children}
    </div>
  );
};

export default Tag;
