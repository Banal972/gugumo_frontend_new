import Image from 'next/image';

interface NavButtonProps {
  type: 'left' | 'right';
}

const NavButton = ({ type }: NavButtonProps) => {
  return (
    <button
      type="button"
      className={`relative hidden h-8 w-8 flex-none cursor-pointer rounded-full border border-primary text-primary disabled:hidden md:block xl:h-10 xl:w-10 ${type === 'left' ? 'slide-prev' : 'slide-next'}`}
    >
      <Image
        className={`absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2 ${type === 'right' && '-scale-x-100'} md:w-auto`}
        src="/asset/image/icon/slide-arrow.png"
        width={22}
        height={20}
        alt="네비게이션 버튼"
      />
    </button>
  );
};

export default NavButton;
