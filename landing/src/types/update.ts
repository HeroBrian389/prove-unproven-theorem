export type UpdateSummaryNode =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string; isExternal?: boolean };

export interface ProjectUpdate {
  id: string;
  date: string;
  displayDate: string;
  title: string;
  summary: UpdateSummaryNode[];
}
