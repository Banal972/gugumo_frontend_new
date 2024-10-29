import getActions from "@/actions/auth/bookmark/getAction";
import List from "@/ui/page/auth/List";
import { Suspense } from "react";
import Wrap from "@/components/Common/Wrap";
import SkeletonCard from "@/components/Common/Card/SkeletonCard";

const ListPage = async () => {
  const res = await getActions({});

  return (
    <main className="mt-14 pb-[121px] md:pb-[170px]">
      <Wrap>
        <Suspense
          fallback={new Array(12).fill(0).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        >
          <List
            label="북마크"
            content={res.data.content}
            pageable={res.data.pageable}
          />
        </Suspense>
      </Wrap>
    </main>
  );
};
export default ListPage;
