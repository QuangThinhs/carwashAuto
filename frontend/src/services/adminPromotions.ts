import { api } from "./api";

export interface AdminPromotion {
  id: number;
  code: string;
  name: string;
  description: string | null;
  discountPercent: number;
  minTier: string | null;
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface PromotionPayload {
  code: string;
  name: string;
  description?: string;
  discountPercent: number;
  minTier?: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

export async function getAdminPromotions(): Promise<AdminPromotion[]> {
  const res = await api.get<AdminPromotion[]>("/api/admin/promotions");
  return res.data;
}

export async function createPromotion(data: PromotionPayload): Promise<AdminPromotion> {
  const res = await api.post<AdminPromotion>("/api/admin/promotions", data);
  return res.data;
}

export async function updatePromotion(id: number, data: PromotionPayload): Promise<AdminPromotion> {
  const res = await api.put<AdminPromotion>(`/api/admin/promotions/${id}`, data);
  return res.data;
}

export async function deletePromotion(id: number): Promise<void> {
  await api.delete(`/api/admin/promotions/${id}`);
}
