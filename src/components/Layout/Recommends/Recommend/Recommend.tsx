import getRecommend from "@/actions/recommendAction";
import Slide from "@/ui/recommend/Slide";
import { getServerSession } from "next-auth";
import Image from "next/image";

const BUTTONSTYLE =
  "w-8 h-8 xl:w-10 xl:h-10 rounded-full flex-none border border-primary cursor-pointer text-primary relative hidden md:block disabled:hidden";

const Recommend = async () => {
  const posts = await getRecommend();

  return (
    <>
      <button className={`${BUTTONSTYLE} slide-prev`}>
        <Image
          className="absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2 md:w-auto"
          src={"/asset/image/icon/slide-arrow.png"}
          width={22}
          height={20}
          alt="왼쪽 버튼"
        />
      </button>
      <Slide posts={posts.data} />
      <button className={`${BUTTONSTYLE} slide-next`}>
        <Image
          className="absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2 -scale-x-100 md:w-auto"
          src={"/asset/image/icon/slide-arrow.png"}
          width={22}
          height={20}
          alt="오른쪽 버튼"
        />
      </button>
    </>
  );
};

export default Recommend;
