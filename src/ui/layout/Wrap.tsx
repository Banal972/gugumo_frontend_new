import { ReactNode } from 'react';

interface WrapProps {
  children?: ReactNode;
  className?: string;
}

export default function Wrap({ children, className }: WrapProps) {
  return (
    <div className={`mx-auto max-w-[1200px] px-4 ${className}`}>{children}</div>
  );
}
