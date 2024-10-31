import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  id?: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  register: UseFormRegisterReturn;
}

const Input = ({ id, type, placeholder, register }: InputProps) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="mt-3 h-11 w-full rounded-lg border border-transparent bg-Surface px-4 text-sm font-medium outline-none focus:border-primary md:h-14 md:text-base"
      {...register}
    />
  );
};

export default Input;
