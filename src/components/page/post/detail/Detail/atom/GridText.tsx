import { ReactNode } from 'react';

const GridText = ({ children }: { children: ReactNode }) => {
  return (
    <h4 className="box-border flex h-8 w-full items-center justify-center text-nowrap rounded bg-Surface text-center md:h-10 md:px-6 md:py-3">
      {children}
    </h4>
  );
};

export default GridText;
