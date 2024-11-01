import { ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
}

const Label = ({ children, htmlFor }: LabelProps) => {
  return (
    <label className="px-2 text-sm font-medium md:text-base" htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
