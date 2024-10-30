export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded border bg-white p-5 md:border-none">
      <div className="flex gap-2">
        <div className="h-4 w-12 rounded bg-slate-200"></div>
        <div className="h-4 w-12 rounded bg-slate-200"></div>
        <div className="h-4 w-12 rounded bg-slate-200"></div>
      </div>
      <div className="mt-4 h-4 w-full rounded bg-slate-200"></div>
      <div className="mt-10 flex flex-col gap-2">
        <div className="h-4 w-full rounded bg-slate-200"></div>
        <div className="h-4 w-full rounded bg-slate-200"></div>
        <div className="h-4 w-full rounded bg-slate-200"></div>
      </div>
      <div className="mt-4 flex justify-between border-t border-slate-200 pt-4">
        <div className="h-4 w-24 rounded bg-slate-200"></div>
        <div className="size-6 bg-slate-200"></div>
      </div>
    </div>
  );
}
