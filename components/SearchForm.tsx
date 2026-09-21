"use client";

import { FormEvent, useState } from "react";

interface Props {
  onSubmit: (company: string) => void;
  onReset: () => void;
  loading: boolean;
}

const SUGGESTIONS = ["Microsoft", "Google", "Amazon", "Apple", "Salesforce"];

export default function SearchForm({ onSubmit, onReset, loading }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length >= 2) onSubmit(trimmed);
  }

  function handleSuggestion(name: string) {
    setValue(name);
    onSubmit(name);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter a company name…"
            disabled={loading}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm placeholder-slate-400 outline-none transition focus:border-violet-400 focus:ring-3 focus:ring-violet-100 disabled:opacity-60"
          />
        </div>
        {loading ? (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
            Cancel
          </button>
        ) : (
          <button
            type="submit"
            disabled={value.trim().length < 2}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-violet-500 hover:to-indigo-500 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Research
          </button>
        )}
      </form>

      {!loading && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400">Try:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
