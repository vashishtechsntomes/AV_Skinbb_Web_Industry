export type StatusType = "active" | "closed" | "pending" | "inactive";

export interface Brand {
  name: string;
  category: string;
  image: string;
  status: StatusType;
  products: number;
  surveys: number;
  promotions: number;
  earnings: number;
}
