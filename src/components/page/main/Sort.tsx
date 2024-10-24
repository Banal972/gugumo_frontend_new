"use client";

import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const Sort = ({ sort }: Sort) => {
  const [isSort, setIsSort] = useState(false);

  const liClickHanlder = (type: string) => {
    setIsSort(false);
  };

  return (
    <div className="relative z-10 flex justify-end text-[13px]">
      <div className="relative inline-block">
        <p
          onClick={() => setIsSort(!isSort)}
          className="flex cursor-pointer items-center gap-[5.5px]"
        >
          {SORT[sort]} <IoChevronDown />
        </p>
        {isSort && (
          <ul className="absolute left-1/2 top-full box-border -translate-x-1/2 whitespace-nowrap rounded-lg border border-Surface bg-white px-[15px] py-5 text-center">
            <li
              onClick={() => liClickHanlder("NEW")}
              className="cursor-pointer"
            >
              최신순
            </li>
            <li
              onClick={() => liClickHanlder("LIKE")}
              className="mt-2 cursor-pointer"
            >
              인기순
            </li>
            <li
              onClick={() => liClickHanlder("OLD")}
              className="mt-2 cursor-pointer"
            >
              오래된순
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sort;

const SORT: { [key: string]: string } = {
  NEW: "최신순",
  LIKE: "인기순",
  OLD: "오래된순",
};

interface Sort {
  sort: string;
}
