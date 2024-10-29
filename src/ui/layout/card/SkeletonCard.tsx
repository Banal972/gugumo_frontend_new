export default function SkeletonCard() {
  return (
    <div className="bg-white rounded p-5 animate-pulse border md:border-none">
        <div className="flex gap-2">
            <div className="bg-slate-200 h-4 w-12 rounded"></div>
            <div className="bg-slate-200 h-4 w-12 rounded"></div>
            <div className="bg-slate-200 h-4 w-12 rounded"></div>
        </div>
        <div className="bg-slate-200 h-4 w-full rounded mt-4"></div>
        <div className="mt-10 flex flex-col gap-2">
            <div className="bg-slate-200 h-4 w-full rounded"></div>
            <div className="bg-slate-200 h-4 w-full rounded"></div>
            <div className="bg-slate-200 h-4 w-full rounded"></div>
        </div>
        <div className="flex justify-between border-t border-slate-200 mt-4 pt-4">
            <div className="bg-slate-200 h-4 w-24 rounded"></div>
            <div className="size-6 bg-slate-200"></div>
        </div>
    </div>
  )
}
