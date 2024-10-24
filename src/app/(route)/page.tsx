import Headers from "@/components/Layout/Headers/Headers";
import Wrap from "@/components/Common/Wrap";
import Banner from "@/components/page/main/Banner";
import Footers from "@/components/Layout/Footers/Footers";
import Recommends from "@/components/Layout/Recommends/Recommends";
import List from "@/components/page/main/List";

const Home = async () => {
  return (
    <>
      <Headers />
      <main className="pb-[121px] pt-6 md:pb-[170px] md:pt-[50px]">
        <Banner />
        <Wrap>
          <Recommends />
        </Wrap>
        <Wrap className="mt-8 border-t-[6px] border-Surface pt-8 md:mt-[100px] md:border-none md:pt-0">
          <List />
        </Wrap>
      </main>
      <Footers />
    </>
  );
};

export default Home;
