interface Props {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

export default function SectionCard({ title, icon, children, delay = 0 }: Props) {
  return (
    <div
      className="animate-fade-in-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-3.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
          {icon}
        </span>
        <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
