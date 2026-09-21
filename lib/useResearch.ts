"use client";

import { useCallback, useRef, useState } from "react";
import { streamResearch } from "@/lib/api";
import type { Financials, KeyPerson, StreamState } from "@/lib/types";

const initialState: StreamState = {
  overview: null,
  key_people: null,
  news: null,
  financials: null,
  risks: null,
  report_id: null,
  error: null,
  streaming: false,
  done: false,
};

export function useResearch() {
  const [state, setState] = useState<StreamState>(initialState);
  const abortRef = useRef<AbortController | null>(null);

  const research = useCallback(async (companyName: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ ...initialState, streaming: true });

    try {
      for await (const { event, data } of streamResearch(companyName, controller.signal)) {
        if (event === "section") {
          const { section, data: sectionData } = data as { section: string; data: unknown };
          setState((prev) => ({ ...prev, [section]: sectionData }));
        } else if (event === "complete") {
          const { report_id } = data as { report_id: number };
          setState((prev) => ({ ...prev, report_id, streaming: false, done: true }));
        } else if (event === "error") {
          const { message } = data as { message: string };
          setState((prev) => ({ ...prev, error: message, streaming: false }));
        }
      }
    } catch (err: unknown) {
      if ((err as { name?: string }).name === "AbortError") return;
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Unknown error",
        streaming: false,
      }));
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setState(initialState);
  }, []);

  return { state, research, reset };
}
