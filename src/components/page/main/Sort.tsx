import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const SORT : {[key : string] : string } = {
    "NEW" : "최신순",
    "LIKE" : "인기순",
    "OLD" : "오래된순",
}

export default function Sort({sort,setSort} : {sort : string,setSort : any}) {

  const [isSort,setIsSort] = useState(false);

  const liClickHanlder = (type : string)=>{
    setSort(type);
    setIsSort(false);
  }

  return (
    <div className="flex justify-end relative text-[13px] z-10">
        <div className="inline-block relative">
            <p onClick={()=>setIsSort(!isSort)} className="flex items-center gap-[5.5px] cursor-pointer">{SORT[sort]} <IoChevronDown/></p>
            {
              isSort &&
              <ul className="absolute top-full bg-white left-1/2 -translate-x-1/2 whitespace-nowrap text-center py-5 px-[15px] box-border rounded-lg border border-Surface">
                <li onClick={()=>liClickHanlder("NEW")} className="cursor-pointer">최신순</li>
                <li onClick={()=>liClickHanlder("LIKE")} className="cursor-pointer mt-2">인기순</li>
                <li onClick={()=>liClickHanlder("OLD")} className="cursor-pointer mt-2">오래된순</li>
              </ul>
            }
        </div>
    </div>
  )

}