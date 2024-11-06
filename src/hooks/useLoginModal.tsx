import { useState } from 'react';

const useLoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const loginOpenHandler = () => {
    setIsOpen(true);
  };

  const loginCloseHandler = () => {
    setIsOpen(false);
  };

  return { isOpen, loginOpenHandler, loginCloseHandler };
};

export default useLoginModal;
