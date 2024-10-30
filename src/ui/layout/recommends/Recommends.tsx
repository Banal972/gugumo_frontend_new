import getRecommend from '@/actions/public/recommendAction';
import Slide from '@/ui/layout/recommends/Slide';
import Image from 'next/image';

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

const NavButton = ({ type }: NavButton) => {
  return (
    <button
      className={`relative hidden h-8 w-8 flex-none cursor-pointer rounded-full border border-primary text-primary disabled:hidden md:block xl:h-10 xl:w-10 ${type === 'left' ? 'slide-prev' : 'slide-next'}`}
    >
      <Image
        className={`absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2 ${type === 'right' && '-scale-x-100'} md:w-auto`}
        src={'/asset/image/icon/slide-arrow.png'}
        width={22}
        height={20}
        alt="네비게이션 버튼"
      />
    </button>
  );
};

interface NavButton {
  type: 'left' | 'right';
}
