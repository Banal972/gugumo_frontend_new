import Wrap from "@/ui/layout/Wrap";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="h-auto bg-Surface px-[5%] py-7 md:h-[180px] md:p-0 md:px-[43px]">
      <Wrap className="block md:flex md:h-full md:flex-col md:justify-center">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <div className="mt-[19px] flex w-full flex-col items-center justify-center text-center md:mt-0 md:w-auto md:items-start md:justify-normal md:text-left">
            <Image
              src={"/asset/image/simbol.svg"}
              alt="구구모 심볼"
              width={100}
              height={56}
            />
            <div className="mt-[5px] flex flex-col items-center md:mt-0 md:block">
              <a
                className="mt-[10px] text-[11px] font-medium text-[#4FAAFF]"
                href="mailTo:gugumo024@gmail.com"
              >
                gugumo024@gmail.com
              </a>
              <p className="mt-[10px] text-[11px] font-medium text-[#4FAAFF]">
                Copyright Gugumo. All rights reserved
              </p>
            </div>
          </div>

          <div className="-order-1 flex w-full justify-between gap-1 text-[12px] font-medium text-OnSurface md:order-1 md:w-auto md:gap-[72px] md:text-[13px]">
            {/* 
                @ Todo
                @ 추후에 이용약관 개인정보처리방침 이 필요할것 같음
                <button type="button">이용약관</button>
                <button type="button">개인정보처리방침</button> 
              */}
            <button type="button">서비스 소개</button>
          </div>
        </div>
      </Wrap>
    </footer>
  );
};

export default Footer;
