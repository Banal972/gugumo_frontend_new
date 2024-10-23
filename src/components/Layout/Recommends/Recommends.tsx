import Recommend from "./Recommend/Recommend";

export default async function Recommends() {
  return (
    <div className="mt-16">
      <h3 className="text-lg font-bold text-primary md:text-2xl">
        추천 게시물 🎯
      </h3>
      <div className="mt-[22px] flex items-center gap-6 md:mt-11 xl:gap-11">
        <Recommend />
      </div>
    </div>
  );
}
