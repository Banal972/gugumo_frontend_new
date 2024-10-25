"use client";

import getActions from "@/actions/auth/post/getAction";
import List from "@/ui/page/auth/List";
import { useEffect, useState } from "react";
import Wrap from "@/components/Common/Wrap";

const ListPage = () => {
  const [query, setQuery] = useState<{ q: string; page: number }>({
    q: "",
    page: 1,
  });

  const [contents, setContent] = useState<Content[]>([]);
  const [pageable, setPageable] = useState<Pageable>();

  useEffect(() => {
    const fetchBookamrk = async () => {
      const res = await getActions({ query });
      const { content, pageable } = res.data;
      setPageable(pageable);
      setContent(content);
    };
    fetchBookamrk();
  }, [query]);

  return (
    <main className="mt-14 pb-[121px] md:pb-[170px]">
      <Wrap>
        <List
          label="작성글"
          setQuery={setQuery}
          contents={contents}
          pageable={pageable}
        />
      </Wrap>
    </main>
  );
};

export default ListPage;
