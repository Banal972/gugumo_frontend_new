import { ReactNode } from 'react';

const Grid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-[62px_1fr] items-center gap-3 text-xs font-medium text-OnSurface md:grid-cols-[102px_1fr] md:text-lg">
      {children}
    </div>
  );
};

export default Grid;
