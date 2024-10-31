import DownSVG from '@/asset/image/down.svg';
import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectProps {
  id?: string;
  passive?: boolean;
  register: UseFormRegisterReturn;
  children: ReactNode;
}

const Select = ({ id, passive, children, register }: SelectProps) => {
  return (
    <div className="relative rounded-lg bg-Surface">
      <select
        id={id}
        className={`box-border h-11 w-full appearance-none rounded-lg border border-transparent bg-transparent px-4 text-sm font-medium outline-none focus:border-primary md:h-16 md:text-base ${passive && 'text-gray-400'}`}
        {...register}
      >
        {children}
      </select>
      <DownSVG
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        stroke="#878787"
      />
    </div>
  );
};

export default Select;
