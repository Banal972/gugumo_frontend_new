import React, { ReactNode } from 'react';

const EditBtn = ({ children }: { children: ReactNode }) => {
  return (
    <button
      type="submit"
      className="ml-auto mt-2 block cursor-pointer rounded bg-primary px-4 py-2 text-sm font-semibold text-OnPrimary transition-colors hover:bg-[#3f92e0] md:mt-6 md:text-base"
    >
      {children}
    </button>
  );
};

export default EditBtn;
