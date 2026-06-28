"use client";

import { useEffect, useState } from "react";
import { Eye, X } from "lucide-react";
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
];

function StatusBadge({ status }: { status: string }) {
  const st = BOOKING_STATUS[status] ?? { label: status, cls: "bg-slate-500/15 text-slate-400" };
  return <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${st.cls}`}>{st.label}</span>;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [detail, setDetail] = useState<AdminBooking | null>(null);

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
          <p className="p-5 text-slate-500">Không có đơn hàng nào đang hoạt động.</p>
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
                {shown.map((b) => (
                  <tr key={b.id} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-3.5">
                      <p className="text-white font-medium flex items-center gap-1.5">
                        {b.customerName}
                        {b.walkIn && (
                          <span className="text-[10px] bg-amber-500/15 text-amber-300 rounded px-1.5 py-0.5">
                            Vãng lai
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500">{b.vehiclePlate}</p>
                    </td>
                    <td className="px-3 py-3.5 text-slate-300">{b.serviceName}</td>
                    <td className="px-3 py-3.5 text-slate-400">{fmtTime(b.scheduledTime)}</td>
                    <td className="px-3 py-3.5 text-cyan-400 font-semibold">{fmtPrice(b.price)}</td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="inline-flex gap-3 justify-end items-center">
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
                        <button
                          onClick={() => setDetail(b)}
                          className="text-slate-500 hover:text-cyan-400 transition"
                          title="Chi tiết"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 mt-3">
        Đây là các đơn <b className="text-slate-400">đang chờ / đang rửa</b>. Đơn đã hoàn tất hoặc huỷ xem ở{" "}
        <b className="text-slate-400">Lịch sử đơn hàng</b>. Để xếp xe vào bãi, vào mục{" "}
        <b className="text-slate-400">Bãi rửa</b>.
      </p>

      {/* Modal chi tiet lich dat */}
      {detail && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setDetail(null)}
        >
          <div
            className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Chi tiết lịch đặt #{detail.id}</h2>
              <button onClick={() => setDetail(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <Row label="Khách hàng">
                <span className="text-white font-medium">{detail.customerName}</span>
                {detail.walkIn && (
                  <span className="ml-2 text-[10px] bg-amber-500/15 text-amber-300 rounded px-1.5 py-0.5">
                    Khách vãng lai
                  </span>
                )}
              </Row>
              <Row label="Số điện thoại">{detail.customerPhone || "—"}</Row>
              <Row label="Biển số xe">{detail.vehiclePlate || "—"}</Row>
              <Row label="Thông tin xe">{detail.vehicleInfo || "—"}</Row>
              <Row label="Dịch vụ">{detail.serviceName}</Row>
              <Row label="Thời gian">{fmtTime(detail.scheduledTime)}</Row>
              <Row label="Trạng thái">
                <StatusBadge status={detail.status} />
              </Row>
              <Row label="Ghi chú">{detail.note || "—"}</Row>
              <div className="flex items-center justify-between rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-4 py-3 mt-2">
                <span className="text-slate-300">Tổng tiền</span>
                <span className="text-xl font-bold text-cyan-300">{fmtPrice(detail.price)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-400 shrink-0">{label}</span>
      <span className="text-right text-slate-200">{children}</span>
    </div>
  );
}
