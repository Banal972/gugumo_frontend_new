import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined') return null;

  return mounted ? createPortal(children, document.body) : null;
};

export default ModalPortal;
