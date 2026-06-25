import { api } from "./api";

export interface Promotion {
  id: number;
  code: string;
  name: string;
  description: string | null;
  discountPercent: number;
  minTierLabel: string | null;
}

export async function getPromotions(): Promise<Promotion[]> {
  const res = await api.get<Promotion[]>("/api/promotions");
  return res.data;
}
