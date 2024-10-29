"use client";

import getActions from "@/actions/auth/post/getAction";
import List from "@/ui/page/auth/List";
import { useState } from "react";
import Wrap from "@/components/Common/Wrap";
import { useSuspenseQuery } from "@tanstack/react-query";
import SkeletonCard from "@/components/Common/Card/SkeletonCard";

type FormValues = {
  search: string;
};

const ListPage = () => {
  const [query, setQuery] = useState<{ q: string; page: number }>({
    q: "",
    page: 1,
  });

  const {
    data: { data },
    isPending,
  } = useSuspenseQuery({
    queryKey: ["post", query],
    queryFn: () => getActions({ query }),
  });

  const searchHandler = (event: FormValues) => {
    const { search } = event;
    setQuery((prev) => ({
      ...prev,
      q: search,
    }));
  };

  return (
    <main className="mt-14 pb-[121px] md:pb-[170px]">
      <Wrap>
        {isPending &&
          new Array(12).fill(0).map((_, index) => <SkeletonCard key={index} />)}

        {!isPending && (
          <List label="북마크" data={data} searchHandler={searchHandler} />
        )}
      </Wrap>
    </main>
  );
};

export default ListPage;
