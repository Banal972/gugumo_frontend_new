import { ReactNode } from 'react';

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <p className="mt-2 text-sm text-red-500">{children}</p>;
};

export default ErrorMessage;
