import Wrap from "@/components/Common/Wrap";
import Image from "next/image";

export default function Footers() {
  return (
    <footer className="bg-Surface h-auto md:h-[180px] py-7 px-[5%] md:px-[43px] md:p-0">
        <Wrap className="block md:flex md:flex-col md:justify-center md:h-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">

                <div className="flex flex-col justify-center md:justify-normal items-center md:items-start text-center md:text-left w-full md:w-auto mt-[19px] md:mt-0">
                    <Image src={"/asset/image/simbol.svg"} alt="구구모 심볼" width={100} height={56}/>
                    <div className="flex flex-col items-center mt-[5px] md:block md:mt-0">
                        <a className="text-[11px] text-[#4FAAFF] font-medium mt-[10px]" href='mailTo:gugumo024@gmail.com'>gugumo024@gmail.com</a>
                        <p className="text-[11px] text-[#4FAAFF] font-medium mt-[10px]">Copyright Gugumo. All rights reserved</p>
                    </div>
                </div>

                <div className="-order-1 md:order-1 gap-1 justify-between w-full md:w-auto text-[12px] flex md:gap-[72px] font-medium text-OnSurface md:text-[13px]">
                    <button type="button">이용약관</button>
                    <button type="button">개인정보처리방침</button>
                    <button type="button">서비스 소개</button>
                </div>

            </div>
        </Wrap>
    </footer> 
  )
}
