import { Dispatch, SetStateAction, useEffect } from 'react';

interface UseOutsideClickProps {
  ref: any;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const useOutsideClick = ({ ref, isOpen, setIsOpen }: UseOutsideClickProps) => {
  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (!ref.current) return;
      // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
      if (isOpen && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
  }, [ref, isOpen, setIsOpen]);
};

export default useOutsideClick;
