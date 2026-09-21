import type { ReportDetail, ReportSummary } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function fetchReports(): Promise<ReportSummary[]> {
  const res = await fetch(`${BASE}/api/reports`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch reports");
  return res.json();
}

export async function fetchReport(id: number): Promise<ReportDetail> {
  const res = await fetch(`${BASE}/api/reports/${id}`, { cache: "no-store" });
  if (res.status === 404) throw new Error("Report not found");
  if (!res.ok) throw new Error("Failed to fetch report");
  return res.json();
}

export async function deleteReport(id: number): Promise<void> {
  const res = await fetch(`${BASE}/api/reports/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete report");
}

export async function* streamResearch(
  companyName: string,
  signal: AbortSignal
): AsyncGenerator<{ event: string; data: unknown }> {
  const res = await fetch(`${BASE}/api/research`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ company_name: companyName }),
    signal,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.detail ?? "Research request failed");
  }

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      const lines = part.trim().split("\n");
      let event = "message";
      let dataStr = "";
      for (const line of lines) {
        if (line.startsWith("event:")) event = line.slice(6).trim();
        else if (line.startsWith("data:")) dataStr = line.slice(5).trim();
      }
      if (dataStr) {
        yield { event, data: JSON.parse(dataStr) };
      }
    }
  }
}
