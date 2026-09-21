export interface KeyPerson {
  name: string;
  title: string;
}

export interface Financials {
  revenue: string | null;
  employee_count: string | null;
  market_cap: string | null;
  yoy_growth: string | null;
}

export interface ReportData {
  overview: string;
  key_people: KeyPerson[];
  news: string[];
  financials: Financials;
  risks: string[];
}

export interface ReportSummary {
  id: number;
  company_name: string;
  created_at: string;
}

export interface ReportDetail extends ReportSummary {
  report_data: ReportData;
}

export type SectionName = "overview" | "key_people" | "news" | "financials" | "risks";

export interface SectionEvent {
  section: SectionName;
  data: ReportData[SectionName];
}

export interface StreamState {
  overview: string | null;
  key_people: KeyPerson[] | null;
  news: string[] | null;
  financials: Financials | null;
  risks: string[] | null;
  report_id: number | null;
  error: string | null;
  streaming: boolean;
  done: boolean;
}
