"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteReport } from "@/lib/api";
import type { ReportSummary } from "@/lib/types";

interface Props {
  reports: ReportSummary[];
}

export default function ReportList({ reports: initial }: Props) {
  const router = useRouter();
  const [reports, setReports] = useState(initial);
  const [deleting, setDeleting] = useState<number | null>(null);

  async function handleDelete(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    setDeleting(id);
    try {
      await deleteReport(id);
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch {
      // keep in list on failure
    } finally {
      setDeleting(null);
    }
  }

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-600">No saved reports yet</p>
        <p className="mt-1 text-xs text-slate-400">
          <a href="/" className="text-violet-600 hover:underline">Research a company</a> to get started
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {reports.map((r, i) => (
        <li
          key={r.id}
          onClick={() => router.push(`/history/${r.id}`)}
          className="animate-fade-in-up group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-violet-200 hover:shadow-md"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 text-sm font-bold text-violet-700">
              {r.company_name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">
                {r.company_name}
              </p>
              <p className="text-xs text-slate-400">{new Date(r.created_at).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg className="h-4 w-4 text-slate-300 group-hover:text-violet-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <button
              onClick={(e) => handleDelete(e, r.id)}
              disabled={deleting === r.id}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
            >
              {deleting === r.id ? "…" : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
