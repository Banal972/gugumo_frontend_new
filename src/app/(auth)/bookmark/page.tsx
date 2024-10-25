import Wrap from "@/components/Common/Wrap";
import List from "@/components/page/auth/bookmark/List";

const Bookmark = async () => {
  return (
    <main className="mt-14 pb-[121px] md:pb-[170px]">
      <Wrap>
        <List />
      </Wrap>
    </main>
  );
};
export default Bookmark;
