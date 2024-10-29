import Card from "@/ui/layout/card/Card";
import Paging from "@/components/Layout/Paging/Paging";
import Search from "@/ui/form/Search";

interface ListProps {
  label: string;
  data: {
    content: Content[];
    pageable: Pageable;
  };
  searchHandler: any;
}

const List = ({ label, data, searchHandler }: ListProps) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start gap-6 text-lg font-medium md:flex-row md:items-center md:justify-between md:gap-5 md:text-2xl">
        <h4>{label}</h4>
        <Search searchHandler={searchHandler} />
      </div>

      <div className="mt-5 rounded-xl md:mt-[46px] md:bg-Surface md:p-[70px] md:px-[5%]">
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
      </div>
    </>
  );
};

export default List;
