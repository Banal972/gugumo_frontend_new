"use client";

const Location = ({ location }: Location) => {
  return (
    <>
      <p className="text-base font-semibold text-OnSurface md:text-lg">지역</p>
      <div className="mt-[11px] flex gap-[4px] overflow-x-auto pb-1 md:flex-wrap md:gap-[14px]">
        <button
          // onClick={()=>setLocation("")}
          className={`box-border cursor-pointer whitespace-nowrap rounded-full border border-primary px-5 py-2 text-sm font-medium leading-none md:px-7 md:text-base md:leading-none ${location === "" ? "bg-primary text-white" : "text-primary"}`}
        >
          전체
        </button>
        {LOCATION.map((el, index) => (
          <button
            key={index}
            // onClick={()=>setLocation(el.get)}
            className={`box-border cursor-pointer whitespace-nowrap rounded-full border border-primary px-5 py-2 text-sm font-medium leading-none md:px-7 md:text-base md:leading-none ${location === el.get ? "bg-primary text-white" : "text-primary"}`}
          >
            {el.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Location;

const LOCATION = [
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

interface Location {
  location: string;
}
