"use client";

import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";

const Location = ({ location, setQuery }: Location) => {
  return (
    <>
      <p className="text-base font-semibold text-OnSurface md:text-lg">지역</p>
      <div className="mt-[11px] flex gap-[4px] overflow-x-auto pb-1 md:flex-wrap md:gap-[14px]">
        {LOCATION.map((el) => (
          <Button
            key={el.get}
            onClick={() => setQuery((prev) => ({ ...prev, location: el.get }))}
            active={location === el.get}
          >
            {el.name}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Location;

const Button = ({ onClick, children, active }: Button) => {
  return (
    <button
      onClick={onClick}
      className={`box-border cursor-pointer whitespace-nowrap rounded-full border border-primary px-5 py-2 text-sm font-medium leading-none transition-colors hover:bg-primary hover:text-white md:px-7 md:text-base md:leading-none ${active ? "bg-primary text-white" : "text-primary"}`}
    >
      {children}
    </button>
  );
};

const LOCATION = [
  { get: "", name: "전체" },
  { get: "SEOUL", name: "서울" },
  { get: "GYEONGGI", name: "경기" },
  { get: "INCHEON", name: "인천" },
  { get: "DAEGU", name: "대구" },
  { get: "BUSAN", name: "부산" },
  { get: "GYEONGNAM", name: "경남" },
  { get: "GYEONGBUK", name: "경북" },
  { get: "GANGWON", name: "강원" },
  { get: "JEONNAM", name: "전남" },
  { get: "JEONBUK", name: "전북" },
  { get: "OTHER", name: "그외" },
];

interface Button {
  onClick: MouseEventHandler;
  children: ReactNode;
  active: boolean;
}

interface Location {
  location: string;
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
