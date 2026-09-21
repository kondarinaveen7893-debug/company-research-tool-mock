import type { Financials, KeyPerson, StreamState } from "@/lib/types";
import SectionCard from "./SectionCard";
import SkeletonCard from "./SkeletonCard";

interface Props {
  state: StreamState;
  companyName: string;
}

const SECTIONS = [
  {
    key: "overview" as const,
    label: "Company Overview",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    key: "key_people" as const,
    label: "Key People",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    key: "news" as const,
    label: "Recent News",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
  },
  {
    key: "financials" as const,
    label: "Financial Highlights",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    key: "risks" as const,
    label: "Risk Factors",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
] as const;

function getNextPendingSection(state: StreamState): string | null {
  if (!state.streaming) return null;
  for (const s of SECTIONS) {
    if (state[s.key] === null) return s.key;
  }
  return null;
}

export default function ReportStream({ state, companyName }: Props) {
  if (!state.streaming && !state.done && !state.error) return null;

  if (state.error) {
    return (
      <div className="animate-fade-in-up flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <p className="text-sm text-red-700">{state.error}</p>
      </div>
    );
  }

  const pendingKey = getNextPendingSection(state);

  return (
    <div className="space-y-4">
      {companyName && (
        <div className="animate-fade-in-up flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">{companyName}</h2>
          {state.streaming && (
            <span className="flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
              Streaming…
            </span>
          )}
          {state.done && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Complete
            </span>
          )}
        </div>
      )}

      {SECTIONS.map((section, i) => {
        const data = state[section.key];
        const isPending = pendingKey === section.key;

        if (data === null && !isPending) return null;

        if (isPending) {
          return <SkeletonCard key={section.key} title={section.label} icon={section.icon} />;
        }

        return (
          <SectionCard key={section.key} title={section.label} icon={section.icon} delay={i * 60}>
            {section.key === "overview" && (
              <p className="text-sm leading-relaxed text-slate-600">{data as string}</p>
            )}

            {section.key === "key_people" && (
              <ul className="divide-y divide-slate-100">
                {(data as KeyPerson[]).map((p, idx) => (
                  <li key={idx} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 text-xs font-semibold text-violet-700">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {section.key === "news" && (
              <ul className="space-y-3">
                {(data as string[]).map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-600">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-400" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {section.key === "financials" && (
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { key: "revenue", label: "Revenue", color: "from-violet-50 to-indigo-50", text: "text-violet-700" },
                  { key: "market_cap", label: "Market Cap", color: "from-blue-50 to-cyan-50", text: "text-blue-700" },
                  { key: "employee_count", label: "Employees", color: "from-emerald-50 to-teal-50", text: "text-emerald-700" },
                  { key: "yoy_growth", label: "YoY Growth", color: "from-amber-50 to-orange-50", text: "text-amber-700" },
                ].map(({ key, label, color, text }) => (
                  <div key={key} className={`rounded-xl bg-gradient-to-br ${color} p-3.5`}>
                    <dt className="text-xs font-medium text-slate-500">{label}</dt>
                    <dd className={`mt-1 text-sm font-bold ${text}`}>
                      {(data as Financials)[key as keyof Financials] ?? "—"}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {section.key === "risks" && (
              <ul className="space-y-2.5">
                {(data as string[]).map((item, idx) => (
                  <li key={idx} className="flex gap-3 rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-slate-700">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        );
      })}

      {state.done && state.report_id && (
        <div className="animate-fade-in-up flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3.5">
          <p className="text-sm text-emerald-700 font-medium">Report saved successfully</p>
          <a
            href={`/history/${state.report_id}`}
            className="text-sm font-semibold text-emerald-700 underline-offset-2 hover:underline"
          >
            View in history →
          </a>
        </div>
      )}
    </div>
  );
}
