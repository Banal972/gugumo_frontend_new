import Card from "@/components/Common/Card/Card";
import Paging from "@/components/Layout/Paging/Paging";

interface ListProps {
  label: string;
  content: Content[];
  pageable: Pageable;
}

const List = ({ label, content, pageable }: ListProps) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start gap-6 text-lg font-medium md:flex-row md:items-center md:justify-between md:gap-5 md:text-2xl">
        <h4>{label}</h4>
        {/* <Search setQuery={setQuery} /> */}
      </div>

      <div className="mt-5 rounded-xl md:mt-[46px] md:bg-Surface md:p-[70px] md:px-[5%]">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 xl:grid-cols-4">
          {content.map((el) => (
            <Card key={el.postId} el={el} />
          ))}
        </div>

        {content.length <= 0 && (
          <p className="text-center text-sm text-gray-500">
            게시글이 존재 하지 않습니다.
          </p>
        )}

        <Paging pageable={pageable} />
      </div>
    </>
  );
};

export default List;
