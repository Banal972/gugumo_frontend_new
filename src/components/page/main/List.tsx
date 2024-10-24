import Image from "next/image";
import ListSearch from "@/components/page/main/Search";
import get from "@/actions/listAction";
import { Suspense } from "react";
import Card from "@/components/Common/Card/Card";
import SkeletonCard from "@/components/Common/Card/SkeletonCard";
import Status from "@/components/page/main/Status";
import Paging from "@/components/Layout/Paging/Paging";
import Sort from "@/components/page/main/Sort";
import Location from "@/components/page/main/Location";
import Gametype from "@/components/page/main/Gametype";

const List = async () => {
  const lists = await get({
    q: "",
    meetingstatus: "RECRUIT",
    location: "",
    gametype: "",
    sort: "NEW",
    page: 1,
  });

  /*
  const writeHandler = () => {
    if (!session)
      return dispatch(
        open({
          Component: Alert,
          props: { message: "로그인을 해야합니다." },
        }),
      );
    router.push("/post/write");
  }; */

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-6 md:flex-row md:items-center md:justify-between md:gap-5">
        <Status status={"RECRUIT"} />
        <ListSearch />
      </div>

      <div className="mt-[25px] md:mt-9">
        <Location location={""} />
      </div>

      <div className="mt-[18px] md:mt-[15px]">
        <Gametype gametype={""} />
      </div>

      <div className="mt-[38px] md:mt-[53px] md:rounded-xl md:bg-[#F4F5F8] md:px-[5%] md:pb-[49px] md:pt-[39px] lg:px-[70px]">
        <Sort sort={"NEW"} />

        <div className="mt-[10px] grid grid-cols-1 gap-[13px] md:mt-7 md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 xl:grid-cols-4">
          <Suspense
            fallback={new Array(12).fill(0).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          >
            {lists.data.content.map((el) => (
              <Card key={el.postId} el={el} />
            ))}
          </Suspense>
        </div>

        {lists.data.content.length <= 0 && (
          <p className="text-center">게시물이 존재하지 않습니다.</p>
        )}

        <div className="mt-[13px] text-right md:mt-7">
          <button
            // onClick={writeHandler}
            className={`group inline-flex cursor-pointer items-center gap-1 rounded border border-primary bg-OnPrimary px-4 py-[0.4em] text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-OnPrimary md:text-base`}
          >
            <Image
              className="group-hover:brightness-0 group-hover:invert"
              src={"/asset/image/icon/write.svg"}
              alt="작성 아이콘"
              width={24}
              height={24}
            />
            새글 작성
          </button>
        </div>

        {lists.data.pageable && <Paging pageable={lists.data.pageable} />}
      </div>
    </>
  );
};

export default List;
