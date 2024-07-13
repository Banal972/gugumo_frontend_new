"use client";
import Card from "@/components/Common/Card/Card";
import SkeletonCard from "@/components/Common/Card/SkeletonCard";
import Paging from "@/components/Layout/Paging/Paging";
import Gametype from "@/components/page/main/Gametype";
import Location from "@/components/page/main/Location";
import Search from "@/components/page/main/Search";
import Sort from "@/components/page/main/Sort";
import Status from "@/components/page/main/Status";
import { useMeeting } from "@/hooks/useMeeting";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function List() {
  const { data: session } = useSession();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [meetingstatus, setMeetingstatus] = useState("RECRUIT");
  const [location, setLocation] = useState("");
  const [gametype, setGametype] = useState("");
  const [sort, setSort] = useState("NEW");
  const [page, setPage] = useState(1);

  const { meeting, pageable, isLoading, isError } = useMeeting(
    session,
    q,
    meetingstatus,
    location,
    gametype,
    sort,
    page,
  );

  const writeHandler = () => {
    if (!session) return alert("로그인을 해야합니다.");
    router.push("/post/write");
  };

  return (
    <>
      {/* 검색 */}
      <div className="flex flex-col items-start justify-start gap-6 md:flex-row md:items-center md:justify-between md:gap-5">
        <Status
          meetingstatus={meetingstatus}
          setMeetingstatus={setMeetingstatus}
        />
        <Search setQ={setQ} />
      </div>

      {/* 지역 */}
      <div className="mt-[25px] md:mt-9">
        {" "}
        <Location location={location} setLocation={setLocation} />{" "}
      </div>

      {/* 종목 */}
      <div className="mt-[18px] md:mt-[15px]">
        {" "}
        <Gametype gametype={gametype} setGametype={setGametype} />{" "}
      </div>

      <div className="mt-[38px] md:mt-[53px] md:rounded-xl md:bg-[#F4F5F8] md:px-[5%] md:pb-[49px] md:pt-[39px] lg:px-[70px]">
        <Sort sort={sort} setSort={setSort} />

        <div className="mt-[10px] grid grid-cols-1 gap-[13px] md:mt-7 md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 xl:grid-cols-4">
          {isLoading || isError
            ? new Array(12)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : meeting?.map((el: any) => <Card key={el.postId} el={el} />)}
        </div>

        {!isLoading && meeting?.length <= 0 && (
          <p className="text-center">게시물이 존재하지 않습니다.</p>
        )}

        <div className="mt-[13px] text-right md:mt-7">
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
        </div>

        {pageable && <Paging pageable={pageable} setPage={setPage} />}
      </div>
    </>
  );
}
