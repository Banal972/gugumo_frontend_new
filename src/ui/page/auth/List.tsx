import { Content, Pageable } from '@/types/get.type';
import Paging from '@/ui/layout/Paging';
import Card from '@/ui/layout/card/Card';

interface ListProps {
  data: {
    content: Content[];
    pageable: Pageable;
  };
}

const List = ({ data }: ListProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 xl:grid-cols-4">
        {data.content.map((el) => (
          <Card key={el.postId} el={el} />
        ))}
      </div>

      {data.content.length <= 0 && (
        <p className="text-center text-sm text-gray-500">
          게시글이 존재 하지 않습니다.
        </p>
      )}

      <Paging pageable={data.pageable} />
    </>
  );
};

export default List;
