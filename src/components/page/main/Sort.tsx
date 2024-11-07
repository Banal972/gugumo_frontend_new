'use client';

import { SORT } from '@/constant/card/constant';
import useOutsideClick from '@/hooks/useOutsideClick';
import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

interface SortProps {
  sort: string;
}

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const Sort = ({ sort }: SortProps) => {
  const dropMenuRef = useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = (key: string) => {
    const params = new URLSearchParams(searchParams);
    if (key) {
      params.set('sort', key);
      params.delete('page');
    } else {
      params.delete('sort');
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useOutsideClick({ ref: dropMenuRef, isOpen, setIsOpen });

  return (
    <div className="relative z-10 flex justify-end text-[13px]">
      <div className="relative inline-block">
        <p
          role="none"
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer items-center gap-[5.5px]"
        >
          {SORT[sort]} <IoChevronDown />
        </p>
        <motion.ul
          ref={dropMenuRef}
          animate={isOpen ? 'open' : 'closed'}
          variants={variants}
          className={`absolute left-1/2 top-full box-border flex -translate-x-1/2 flex-col gap-2 whitespace-nowrap rounded-lg border border-Surface bg-white px-[15px] py-5 text-center ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          {Object.entries(SORT).map((sorts) => (
            <li
              role="none"
              key={sorts[0]}
              onClick={() => handleSort(sorts[0])}
              className="cursor-pointer"
            >
              {sorts[1]}
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Sort;
