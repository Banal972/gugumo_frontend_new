"use client";

import { SORT } from "@/constant/card/constant";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const Sort = ({ sort, setQuery }: Sort) => {
  const dropMenuRef = useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const liClickHanlder = (type: string) => {
    setIsOpen(false);
    setQuery((prev) => ({
      ...prev,
      sort: type,
    }));
  };

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (!dropMenuRef.current) return;
      // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
      if (isOpen && !dropMenuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isOpen]);

  return (
    <div className="relative z-10 flex justify-end text-[13px]">
      <div className="relative inline-block">
        <p
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer items-center gap-[5.5px]"
        >
          {SORT[sort]} <IoChevronDown />
        </p>
        <motion.ul
          ref={dropMenuRef}
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          className={`absolute left-1/2 top-full box-border flex -translate-x-1/2 flex-col gap-2 whitespace-nowrap rounded-lg border border-Surface bg-white px-[15px] py-5 text-center ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {Object.entries(SORT).map((sorts) => (
            <li
              onClick={() => liClickHanlder(sorts[0])}
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

interface Sort {
  sort: string;
  setQuery: Dispatch<
    SetStateAction<{
      q: string;
      meetingstatus: string;
      location: string;
      gametype: string;
      sort: string;
      page: number;
    }>
  >;
}
