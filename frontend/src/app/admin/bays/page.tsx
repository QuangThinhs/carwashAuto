"use client";

import { useEffect, useState } from "react";
import { Car, CheckCircle, Plus, X, Clock } from "lucide-react";
import AdminShell from "@/components/AdminShell";
import {
  getBays,
  getAdminBookings,
  assignBay,
  completeBay,
  type WashBay,
  type AdminBooking,
} from "@/services/adminOps";
import { fmtPrice, fmtTime } from "@/services/booking";

export default function AdminBaysPage() {
  const [bays, setBays] = useState<WashBay[]>([]);
  const [waiting, setWaiting] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignTo, setAssignTo] = useState<WashBay | null>(null);

  useEffect(() => {
    reload();
  }, []);

  function reload() {
    setLoading(true);
    Promise.all([getBays(), getAdminBookings()])
      .then(([b, bk]) => {
        setBays(b);
        setWaiting(bk.filter((x) => x.status === "PENDING" || x.status === "CONFIRMED"));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  async function doAssign(bay: WashBay, booking: AdminBooking) {
    try {
      await assignBay(bay.id, booking.id);
      setAssignTo(null);
      reload();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Xếp xe thất bại.");
    }
  }

  async function doComplete(bay: WashBay) {
    if (!confirm(`Hoàn tất rửa xe tại ${bay.name}?`)) return;
    try {
      await completeBay(bay.id);
      reload();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Thao tác thất bại.");
    }
  }

  const occupied = bays.filter((b) => b.status === "OCCUPIED").length;

  return (
    <AdminShell active="bays" title="Quản lý bãi rửa">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <p className="text-slate-400">
          <b className="text-white">{occupied}</b>/{bays.length} bãi đang rửa ·{" "}
          <b className="text-cyan-400">{bays.length - occupied}</b> bãi trống
        </p>
        <span className="text-sm text-slate-400">{waiting.length} xe đang chờ xếp</span>
      </div>

      {loading ? (
        <p className="text-slate-500">Đang tải...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bays.map((bay) => {
            const isFree = bay.status === "FREE";
            return (
              <div
                key={bay.id}
                className={`rounded-2xl border p-4 ${
                  isFree ? "border-white/10 bg-slate-900" : "border-cyan-500/30 bg-cyan-500/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{bay.name}</span>
                  {isFree ? (
                    <span className="text-xs font-semibold rounded-full px-2 py-0.5 bg-slate-500/15 text-slate-400">
                      Trống
                    </span>
                  ) : (
                    <span className="text-xs font-semibold rounded-full px-2 py-0.5 bg-cyan-500/15 text-cyan-300">
                      Đang rửa
                    </span>
                  )}
                </div>

                {isFree ? (
                  <div className="mt-5 flex flex-col items-center justify-center text-slate-600">
                    <Car size={28} strokeWidth={1.5} />
                    <button
                      onClick={() => setAssignTo(bay)}
                      className="mt-3 text-sm text-cyan-400 font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <Plus size={14} /> Xếp xe
                    </button>
                  </div>
                ) : (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-white truncate">{bay.customerName}</p>
                    <p className="text-xs text-slate-400 truncate">
                      {bay.serviceName} · {bay.vehiclePlate}
                    </p>
                    <p className="text-sm font-semibold text-cyan-400 mt-1">{fmtPrice(bay.price)}</p>
                    <button
                      onClick={() => doComplete(bay)}
                      className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-green-500/15 text-green-300 hover:bg-green-500 hover:text-white font-medium py-2 text-sm transition"
                    >
                      <CheckCircle size={15} /> Hoàn tất
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal chon xe de xep vao bai */}
      {assignTo && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setAssignTo(null)}
        >
          <div
            className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Xếp xe vào {assignTo.name}</h2>
              <button onClick={() => setAssignTo(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            {waiting.length === 0 ? (
              <p className="text-slate-500 py-6 text-center">Không có xe nào đang chờ.</p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {waiting.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => doAssign(assignTo, b)}
                    className="w-full text-left bg-slate-800 hover:bg-slate-700 rounded-lg p-3 transition"
                  >
                    <p className="font-medium text-white">
                      {b.customerName} · {b.vehiclePlate}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      {b.serviceName} · <Clock size={11} /> {fmtTime(b.scheduledTime)}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
