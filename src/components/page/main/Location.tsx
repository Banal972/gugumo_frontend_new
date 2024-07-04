"use client"
const LOCATION = [{get : "SEOUL",name : "서울"},{get : "GYEONGGI",name : "경기"},{get : "INCHEON",name : "인천"},{get : "DAEGU",name : "대구"},{get : "BUSAN",name : "부산"},{get : "GYEONGNAM",name : "경남"},{get : "GYEONGBUK",name : "경북"},{get : "GANGWON",name : "강원"},{get : "JEONNAM",name : "전남"},{get : "JEONBUK",name : "전북"},{get : "OTHER",name : "그외"}];
export default function Location({location,setLocation} : {location : string,setLocation : any}) {
  return (
    <>
      <p className="text-base md:text-lg font-semibold text-OnSurface">지역</p>
      <div className="flex md:flex-wrap overflow-x-auto gap-[4px] md:gap-[14px] mt-[11px] pb-1">
        <button 
          onClick={()=>setLocation("")} 
          className={`cursor-pointer text-sm md:text-base leading-none md:leading-none font-medium py-2 px-5 md:px-7 rounded-full border border-primary whitespace-nowrap box-border ${location === "" ? "bg-primary text-white" : "text-primary"}`}
        >전체</button>
        {
          LOCATION.map((el,index)=>(
            <button 
              key={index} 
              onClick={()=>setLocation(el.get)} 
              className={`cursor-pointer text-sm md:text-base leading-none md:leading-none font-medium py-2 px-5 md:px-7 rounded-full border border-primary whitespace-nowrap box-border ${location === el.get ? "bg-primary text-white" : "text-primary"}`}
            >{el.name}</button>
          ))
        }
      </div>
    </>
  )
}