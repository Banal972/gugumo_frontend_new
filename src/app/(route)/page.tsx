import Banner from '@/components/main/Banner';
import ListContainer from '@/components/main/ListContainer';
import Wrap from '@/ui/layout/Wrap';
import Recommends from '@/ui/layout/recommends/Recommends';

const Home = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    page?: number;
    status?: string;
  }>;
}) => {
  return (
    <main className="pb-[121px] pt-6 md:pb-[170px] md:pt-[50px]">
      <Banner />
      <Wrap>
        <Recommends />
      </Wrap>
      <Wrap className="mt-8 border-t-[6px] border-Surface pt-8 md:mt-[100px] md:border-none md:pt-0">
        <ListContainer searchParams={searchParams} />
      </Wrap>
    </main>
  );
};

export default Home;
