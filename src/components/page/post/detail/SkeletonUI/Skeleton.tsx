'use client';

const Skeleton = () => {
  return (
    <div className="animate-pulse transition-all">
      <div className="h-8 w-full bg-slate-200" />

      <div className="mt-2 flex justify-between border-b border-Outline pb-[18px] md:mt-7">
        <div className="flex items-center gap-[10px] md:gap-[18px]">
          <div className="h-5 w-20 bg-slate-200" />
          <div className="h-5 w-20 bg-slate-200" />
          <div className="h-5 w-20 bg-slate-200" />
        </div>
        <div className="size-8 bg-slate-200" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:mt-8 md:gap-5">
        <div className="h-10 w-full bg-slate-200" />
        <div className="h-10 w-full bg-slate-200" />
        <div className="h-10 w-full bg-slate-200" />
        <div className="h-10 w-full bg-slate-200" />
        <div className="h-10 w-full bg-slate-200" />
        <div className="h-10 w-full bg-slate-200" />
      </div>

      <div className="mt-8 h-96 bg-slate-200 md:mt-24" />
    </div>
  );
};

export default Skeleton;
