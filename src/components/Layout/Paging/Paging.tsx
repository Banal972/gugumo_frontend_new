"use client";

import { Pageable } from "@/actions/listAction";

const Paging = ({ pageable }: { pageable: Pageable }) => {
  const currentGroup = Math.ceil(pageable.number / 5);
  const startPage = (currentGroup - 1) * 5 + 1;
  const endPage = Math.min(startPage + 5 - 1, pageable.totalPages);

  return (
    <div className="mt-[42px] flex justify-center gap-5">
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const page = startPage + index;
        return (
          <button
            type="button"
            className={`cursor-pointer ${pageable.number === page ? "text-primary" : ""}`}
            key={page}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Paging;
