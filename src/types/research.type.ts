export type MarketResearchStatus = "active" | "draft" | "closed";

export interface MarketResearch {
  id: string;
  description:string;
  title: string;
  category: string;
  startDate: string;
  respondents: number | string;
  cost: string;
  status: MarketResearchStatus;
}
