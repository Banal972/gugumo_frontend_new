import { ReactNode } from 'react';

const SubmitBtn = ({ children }: { children: ReactNode }) => {
  return (
    <button
      type="submit"
      className="inline-flex cursor-pointer items-center justify-center rounded border border-[#4FAAFF] bg-OnPrimary px-4 py-[9.5px] text-sm font-medium text-primary transition-all hover:bg-primary hover:text-OnPrimary md:text-base"
    >
      {children}
    </button>
  );
};

export default SubmitBtn;
