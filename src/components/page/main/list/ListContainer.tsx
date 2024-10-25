"use client";

import Image from "next/image";
import ListSearch from "@/components/page/main/Search";
import { useEffect, useState } from "react";
import Status from "@/components/page/main/Status";
import Sort from "@/components/page/main/Sort";
import Location from "@/components/page/main/Location";
import Gametype from "@/components/page/main/Gametype";
import { Suspense } from "react";
import SkeletonCard from "@/components/Common/Card/SkeletonCard";
import get from "@/actions/listAction";
import Card from "@/components/Common/Card/Card";
import Paging from "@/components/Layout/Paging/Paging";
import { useRouter } from "next/navigation";

const ListContainer = () => {
  const [contents, setContent] = useState<Content[]>([]);
  const [pageable, setPageable] = useState<Pageable>();
  const [query, setQuery] = useState({
    q: "",
    meetingstatus: "RECRUIT",
    location: "",
    gametype: "",
    sort: "NEW",
    page: 1,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await get({ query });
      setContent(res.data.content);
      setPageable(res.data.pageable);
    };
    fetchPosts();
  }, [query]);

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-6 md:flex-row md:items-center md:justify-between md:gap-5">
        <Status status={query.meetingstatus} setQuery={setQuery} />
        <ListSearch setQuery={setQuery} />
      </div>

      <div className="mt-[25px] md:mt-9">
        <Location location={query.location} setQuery={setQuery} />
      </div>

      <div className="mt-[18px] md:mt-[15px]">
        <Gametype gametype={query.gametype} setQuery={setQuery} />
      </div>

      <div className="mt-[38px] md:mt-[53px] md:rounded-xl md:bg-[#F4F5F8] md:px-[5%] md:pb-[49px] md:pt-[39px] lg:px-[70px]">
        <Sort sort={query.sort} />

        <div className="mt-[10px] grid grid-cols-1 gap-[13px] md:mt-7 md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 xl:grid-cols-4">
          <Suspense
            fallback={new Array(12).fill(0).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          >
            {contents.map((el) => (
              <Card key={el.postId} el={el} />
            ))}
          </Suspense>
        </div>

        {contents.length <= 0 && (
          <p className="text-center">게시물이 존재하지 않습니다.</p>
        )}

        <div className="mt-[13px] text-right md:mt-7">
          <WriteButton />
        </div>

        {pageable && <Paging pageable={pageable} />}
      </div>
    </>
  );
};

export default ListContainer;

const WriteButton = () => {
  const router = useRouter();

  const writeHandler = () => {
    router.push("/post/write");
  };

  return (
    <button
      onClick={writeHandler}
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
  );
};
