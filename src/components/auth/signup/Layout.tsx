import ErrorMessage from '@/ui/form/ErrorMessage';
import { HTMLInputTypeAttribute, MouseEventHandler, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type DefaultProps = { children: ReactNode };

interface InputProps {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
}

interface CertificationBtnProps extends DefaultProps {
  active: boolean;
  onClick: MouseEventHandler;
}

export const Title = ({ children }: DefaultProps) => {
  return (
    <p className="mb-5 text-base font-semibold text-primary">{children}</p>
  );
};

export const Container = ({ children }: DefaultProps) => {
  return <div className="mt-[46px] md:mt-[58px]">{children}</div>;
};

export const CertificationBtn = ({
  children,
  active,
  onClick,
}: CertificationBtnProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-md border border-primary px-2 py-1 text-[13px] font-normal ${active ? 'bg-OnPrimary text-primary' : 'bg-primary text-OnPrimary'}`}
    >
      {children}
    </button>
  );
};

export const Input = ({ type, placeholder, register, error }: InputProps) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-Outline px-3 text-base font-medium outline-none placeholder:text-OnBackgroundGray focus:border-primary"
        {...register}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};
