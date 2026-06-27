"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import {
  getAdminBookings,
  confirmBooking,
  cancelBookingAdmin,
  type AdminBooking,
} from "@/services/adminOps";
import { BOOKING_STATUS, fmtPrice, fmtTime } from "@/services/booking";

const filters = [
  { key: "ALL", label: "Tất cả" },
  { key: "PENDING", label: "Chờ xác nhận" },
  { key: "CONFIRMED", label: "Đã xác nhận" },
  { key: "IN_PROGRESS", label: "Đang rửa" },
  { key: "DONE", label: "Hoàn tất" },
  { key: "CANCELLED", label: "Đã huỷ" },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    reload();
  }, []);

  function reload() {
    setLoading(true);
    getAdminBookings()
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }

  async function doConfirm(b: AdminBooking) {
    try {
      await confirmBooking(b.id);
      reload();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Thao tác thất bại.");
    }
  }

  async function doCancel(b: AdminBooking) {
    if (!confirm("Huỷ lịch đặt này?")) return;
    try {
      await cancelBookingAdmin(b.id);
      reload();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Huỷ thất bại.");
    }
  }

  const shown = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <AdminShell active="bookings" title="Quản lý lịch đặt">
      <div className="flex flex-wrap gap-2 mb-5">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-sm rounded-full px-3.5 py-1.5 transition ${
              filter === f.key
                ? "bg-cyan-500 text-white"
                : "bg-slate-900 border border-white/10 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <p className="p-5 text-slate-500">Đang tải...</p>
        ) : shown.length === 0 ? (
          <p className="p-5 text-slate-500">Không có lịch đặt nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-white/10">
                  <th className="px-5 py-3 font-medium">Khách hàng</th>
                  <th className="px-3 py-3 font-medium">Dịch vụ</th>
                  <th className="px-3 py-3 font-medium">Thời gian</th>
                  <th className="px-3 py-3 font-medium">Giá</th>
                  <th className="px-3 py-3 font-medium">Trạng thái</th>
                  <th className="px-5 py-3 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((b) => {
                  const st = BOOKING_STATUS[b.status] ?? { label: b.status, cls: "bg-slate-500/15 text-slate-400" };
                  return (
                    <tr key={b.id} className="border-b border-white/5 last:border-0">
                      <td className="px-5 py-3.5">
                        <p className="text-white font-medium">{b.customerName}</p>
                        <p className="text-xs text-slate-500">{b.vehiclePlate}</p>
                      </td>
                      <td className="px-3 py-3.5 text-slate-300">{b.serviceName}</td>
                      <td className="px-3 py-3.5 text-slate-400">{fmtTime(b.scheduledTime)}</td>
                      <td className="px-3 py-3.5 text-cyan-400 font-semibold">{fmtPrice(b.price)}</td>
                      <td className="px-3 py-3.5">
                        <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${st.cls}`}>
                          {st.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="inline-flex gap-3 justify-end">
                          {b.status === "PENDING" && (
                            <button onClick={() => doConfirm(b)} className="text-xs text-blue-300 hover:underline">
                              Xác nhận
                            </button>
                          )}
                          {(b.status === "PENDING" || b.status === "CONFIRMED") && (
                            <button onClick={() => doCancel(b)} className="text-xs text-red-400 hover:underline">
                              Huỷ
                            </button>
                          )}
                          {(b.status === "IN_PROGRESS" || b.status === "DONE" || b.status === "CANCELLED") && (
                            <span className="text-xs text-slate-600">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 mt-3">
        Để <b className="text-slate-400">bắt đầu rửa</b> (xếp xe vào bãi) và <b className="text-slate-400">hoàn tất</b>,
        vào mục <b className="text-slate-400">Bãi rửa</b>.
      </p>
    </AdminShell>
  );
}
