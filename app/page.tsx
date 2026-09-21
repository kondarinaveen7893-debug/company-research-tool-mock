"use client";

import { useState } from "react";
import ReportStream from "@/components/ReportStream";
import SearchForm from "@/components/SearchForm";
import { useResearch } from "@/lib/useResearch";

export default function HomePage() {
  const { state, research, reset } = useResearch();
  const [activeCompany, setActiveCompany] = useState("");

  function handleResearch(company: string) {
    setActiveCompany(company);
    research(company);
  }

  function handleReset() {
    setActiveCompany("");
    reset();
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 space-y-8">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
          AI-Powered Research
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Company Research Tool
        </h1>
        <p className="text-sm text-slate-500">
          Get structured research reports streamed in real time
        </p>
      </div>

      <SearchForm onSubmit={handleResearch} onReset={handleReset} loading={state.streaming} />

      <ReportStream state={state} companyName={activeCompany} />
    </div>
  );
}
