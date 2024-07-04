import Headers from "@/components/Layout/Headers/Headers";
import Wrap from "@/components/Common/Wrap";
import Banner from "@/components/page/main/Banner";
import Footers from "@/components/Layout/Footers/Footers";
import Recommends from "@/components/Layout/Recommends/Recommends";
import List from "@/components/page/main/List";

export default async function Home() {
  return (
    <>
      <Headers/>
      <main className="md:pt-[50px] md:pb-[170px] pt-6 pb-[121px]">
        <Banner/>
        <Wrap>
          <Recommends/>
        </Wrap>
        <Wrap className="pt-8 mt-8 md:mt-[100px] md:pt-0 border-t-[6px] border-Surface md:border-none">
          <List/>
        </Wrap>
      </main>
      <Footers/>
    </>
  )
}