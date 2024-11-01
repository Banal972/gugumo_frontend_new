'use client';

import { Pageable } from '@/types/get.type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Paging = ({ pageable }: { pageable: Pageable }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activePage = searchParams.get('page') || '1';

  const currentGroup = Math.ceil(pageable.number / 5);
  const startPage = (currentGroup - 1) * 5 + 1;
  const endPage = Math.min(startPage + 5 - 1, pageable.totalPages);

  const clickHandler = (page: string) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set('page', page);
    } else {
      params.delete('page');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (!pageable.empty) {
    return (
      <div className="mt-[42px] flex justify-center gap-5">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const page = startPage + index;
          return (
            <button
              type="button"
              className={`cursor-pointer ${activePage === String(page) && 'text-primary'}`}
              onClick={() => clickHandler(String(page))}
              key={page}
            >
              {page}
            </button>
          );
        })}
      </div>
    );
  }

  return null;
};

export default Paging;
