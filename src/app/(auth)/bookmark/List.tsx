"use client";
import Card from "@/components/Common/Card/Card";
import SkeletonCard from "@/components/Common/Card/SkeletonCard";
import Paging from "@/components/Layout/Paging/Paging";
import Search from "@/components/page/auth/Search";
import { bookMarkOptions } from "@/hooks/useBookmark";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function List({ session }: { session: any }) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery(
    bookMarkOptions({ session, q, page }),
  );

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-6 text-lg font-medium md:flex-row md:items-center md:justify-between md:gap-5 md:text-2xl">
        <h4>북마크</h4>
        <Search setQ={setQ} />
      </div>

      <div className="mt-5 rounded-xl md:mt-[46px] md:bg-Surface md:p-[70px] md:px-[5%]">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 xl:grid-cols-4">
          {isLoading || isError
            ? new Array(12)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : data?.data.content.map((el: any) => (
                <Card key={el.postId} el={el} />
              ))}
        </div>
        {!isLoading && data?.data.content.length <= 0 && (
          <p className="text-center">게시글이 존재 하지 않습니다.</p>
        )}

        {data?.data.pageable && (
          <Paging pageable={data.data.pageable} setPage={setPage} />
        )}
      </div>
    </>
  );
}
