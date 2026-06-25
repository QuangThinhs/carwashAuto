import { api } from "./api";

export interface LoyaltySummary {
  tier: string;
  tierLabel: string;
  pointsBalance: number;
  lifetimeSpend: number;
  visitCount: number;
  discountPercent: number;
  bookingWindowDays: number;
  nextTierLabel: string | null;
  spendToNextTier: number;
  progressPercent: number;
}

export interface PointHistory {
  id: number;
  type: string;
  points: number;
  description: string | null;
  createdAt: string;
}

export async function getLoyalty(): Promise<LoyaltySummary> {
  const res = await api.get<LoyaltySummary>("/api/loyalty/me");
  return res.data;
}

export async function getPointHistory(): Promise<PointHistory[]> {
  const res = await api.get<PointHistory[]>("/api/loyalty/me/history");
  return res.data;
}
