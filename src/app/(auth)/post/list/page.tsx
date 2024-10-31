'use client';

import getActions from '@/actions/auth/post/getAction';
import Wrap from '@/ui/layout/Wrap';
import SkeletonCard from '@/ui/layout/card/skeleton/SkeletonCard';
import List from '@/ui/page/auth/List';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

type FormValues = {
  search: string;
};

const ListPage = () => {
  const [query, setQuery] = useState<{ q: string; page: number }>({
    q: '',
    page: 1,
  });

  const { data, isPending } = useQuery({
    queryKey: ['post', query],
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
        {!data ||
          (isPending &&
            Array.from({ length: 12 }, (_, index) => index).map((item) => (
              <SkeletonCard key={item} />
            )))}

        {data && !isPending && (
          <List label="작성글" data={data.data} searchHandler={searchHandler} />
        )}
      </Wrap>
    </main>
  );
};

export default ListPage;
