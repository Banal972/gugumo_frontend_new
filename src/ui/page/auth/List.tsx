import Card from "@/components/Common/Card/Card";
import SkeletonCard from "@/components/Common/Card/SkeletonCard";
import Paging from "@/components/Layout/Paging/Paging";
import Search from "@/components/page/auth/Search";
import React, { Dispatch, SetStateAction, Suspense } from "react";

const List = ({ label, setQuery, contents, pageable }: ListProps) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start gap-6 text-lg font-medium md:flex-row md:items-center md:justify-between md:gap-5 md:text-2xl">
        <h4>{label}</h4>
        <Search setQuery={setQuery} />
      </div>

      <div className="mt-5 rounded-xl md:mt-[46px] md:bg-Surface md:p-[70px] md:px-[5%]">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 xl:grid-cols-4">
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
          <p className="text-center text-sm text-gray-500">
            게시글이 존재 하지 않습니다.
          </p>
        )}

        {pageable && <Paging pageable={pageable} />}
      </div>
    </>
  );
};

export default List;

interface ListProps {
  label: string;
  setQuery: Dispatch<SetStateAction<{ q: string; page: number }>>;
  contents: Content[];
  pageable?: Pageable;
}
