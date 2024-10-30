import getRecommend from '@/actions/meeting/recommendAction';
import NavButton from '@/ui/layout/recommends/atom/NavButton';
import Slide from '@/ui/layout/recommends/atom/Slide';

const Recommends = async () => {
  const posts = await getRecommend();

  return (
    <div className="mt-16">
      <h3 className="text-lg font-bold text-primary md:text-2xl">
        추천 게시물 🎯
      </h3>
      <div className="mt-[22px] flex items-center gap-6 md:mt-11 xl:gap-11">
        <NavButton type="left" />
        <Slide posts={posts.data} />
        <NavButton type="right" />
      </div>
    </div>
  );
};
export default Recommends;
