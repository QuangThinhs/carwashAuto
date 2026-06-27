import { api } from "./api";
import type { AdminBooking } from "./admin";

export type { AdminBooking };

export interface WashBay {
  id: number;
  name: string;
  status: string; // FREE | OCCUPIED
  bookingId: number | null;
  customerName: string | null;
  vehiclePlate: string | null;
  serviceName: string | null;
  price: number;
}

export async function getBays(): Promise<WashBay[]> {
  const res = await api.get<WashBay[]>("/api/admin/bays");
  return res.data;
}

export async function assignBay(bayId: number, bookingId: number): Promise<void> {
  await api.post(`/api/admin/bays/${bayId}/assign?bookingId=${bookingId}`);
}

export async function completeBay(bayId: number): Promise<void> {
  await api.post(`/api/admin/bays/${bayId}/complete`);
}

export async function getAdminBookings(): Promise<AdminBooking[]> {
  const res = await api.get<AdminBooking[]>("/api/admin/bookings");
  return res.data;
}

export async function confirmBooking(id: number): Promise<void> {
  await api.post(`/api/admin/bookings/${id}/confirm`);
}

export async function cancelBookingAdmin(id: number): Promise<void> {
  await api.post(`/api/admin/bookings/${id}/cancel`);
}
