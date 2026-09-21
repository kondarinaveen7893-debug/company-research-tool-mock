export default function SkeletonCard({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-3.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
          {icon}
        </span>
        <h2 className="text-sm font-semibold text-slate-400">{title}</h2>
        <span className="ml-auto flex items-center gap-1 text-xs text-violet-500 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
          Researching…
        </span>
      </div>
      <div className="space-y-2.5 p-5">
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-5/6" />
        <div className="skeleton h-3 w-4/6" />
      </div>
    </div>
  );
}
