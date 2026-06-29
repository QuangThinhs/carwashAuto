"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CalendarClock, Car, Check, Edit3, Mail, Phone, Search, ShieldCheck, UserRound, X } from "lucide-react";
import AdminShell from "@/components/AdminShell";
import { useToast } from "@/components/Toast";
import {
  getAdminCustomers,
  updateAdminCustomer,
  type AdminBooking,
  type AdminCustomer,
  type AdminCustomerPayload,
} from "@/services/adminOps";
import { BOOKING_STATUS, fmtPrice, fmtTime } from "@/services/booking";

const inputCls =
  "w-full rounded-lg border border-white/10 bg-slate-800 px-4 py-2.5 text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30";

const filters = [
  { key: "ALL", label: "Tất cả" },
  { key: "ACTIVE", label: "Đang hoạt động" },
  { key: "LOCKED", label: "Đã khóa" },
];

type CustomerForm = {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  enabled: boolean;
};

function toForm(c: AdminCustomer): CustomerForm {
  return {
    fullName: c.fullName ?? "",
    phone: c.phone ?? "",
    email: c.email ?? "",
    dateOfBirth: c.dateOfBirth ?? "",
    gender: c.gender ?? "",
    address: c.address ?? "",
    enabled: c.enabled,
  };
}

function toPayload(form: CustomerForm): AdminCustomerPayload {
  return {
    fullName: form.fullName.trim(),
    phone: form.phone.trim(),
    email: form.email.trim() || undefined,
    dateOfBirth: form.dateOfBirth || undefined,
    gender: form.gender || undefined,
    address: form.address.trim() || undefined,
    enabled: form.enabled,
  };
}

function StatusBadge({ enabled }: { enabled: boolean }) {
  return enabled ? (
    <span className="text-xs font-semibold rounded-full px-2.5 py-0.5 bg-green-500/15 text-green-300">
      Hoạt động
    </span>
  ) : (
    <span className="text-xs font-semibold rounded-full px-2.5 py-0.5 bg-red-500/15 text-red-300">Đã khóa</span>
  );
}

function BookingStatus({ status }: { status: string }) {
  const st = BOOKING_STATUS[status] ?? { label: status, cls: "bg-slate-500/15 text-slate-400" };
  return <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${st.cls}`}>{st.label}</span>;
}

export default function AdminCustomersPage() {
  const toast = useToast();
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<CustomerForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    reload();
  }, []);

  function reload() {
    setLoading(true);
    getAdminCustomers()
      .then((data) => {
        setCustomers(data);
        setSelectedId((current) => current ?? data[0]?.id ?? null);
      })
      .catch(() => setCustomers([]))
      .finally(() => setLoading(false));
  }

  const selected = customers.find((c) => c.id === selectedId) ?? null;

  useEffect(() => {
    if (selected && !editing) {
      setForm(toForm(selected));
    }
  }, [selected, editing]);

  const stats = useMemo(() => {
    const active = customers.filter((c) => c.enabled).length;
    const locked = customers.length - active;
    const revenue = customers.reduce((sum, c) => sum + (c.revenue ?? 0), 0);
    return { active, locked, revenue };
  }, [customers]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter((c) => {
      const matchesStatus =
        filter === "ALL" || (filter === "ACTIVE" && c.enabled) || (filter === "LOCKED" && !c.enabled);
      if (!matchesStatus) return false;
      if (!q) return true;
      const hay = [
        c.fullName,
        c.phone,
        c.email ?? "",
        c.address ?? "",
        c.tier ?? "",
        ...((c.vehicles ?? []).map((v) => `${v.licensePlate} ${v.brand ?? ""} ${v.type ?? ""}`)),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [customers, filter, query]);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!selected || !form) return;
    if (!form.fullName.trim() || !form.phone.trim()) {
      setErr("Vui lòng nhập họ tên và số điện thoại.");
      return;
    }
    setSaving(true);
    setErr("");
    try {
      const updated = await updateAdminCustomer(selected.id, toPayload(form));
      setCustomers((items) => items.map((c) => (c.id === updated.id ? updated : c)));
      setSelectedId(updated.id);
      setEditing(false);
      toast("Đã cập nhật khách hàng.", "success");
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Cập nhật khách hàng thất bại.");
    } finally {
      setSaving(false);
    }
  }

  function startEdit() {
    if (!selected) return;
    setForm(toForm(selected));
    setErr("");
    setEditing(true);
  }

  return (
    <AdminShell active="customers" title="Quản lý khách hàng">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Stat icon={<UserRound size={20} />} label="Tổng khách hàng" value={String(customers.length)} />
        <Stat icon={<ShieldCheck size={20} />} label="Đang hoạt động" value={String(stats.active)} />
        <Stat icon={<CalendarClock size={20} />} label="Doanh thu khách" value={fmtPrice(stats.revenue)} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-5">
        <section>
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm tên, SĐT, email, biển số"
                className={`${inputCls} pl-9`}
              />
            </div>
            <div className="flex flex-wrap gap-2">
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
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
            {loading ? (
              <p className="p-5 text-slate-500">Đang tải...</p>
            ) : shown.length === 0 ? (
              <p className="p-5 text-slate-500">Không tìm thấy khách hàng phù hợp.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-400 border-b border-white/10">
                      <th className="px-5 py-3 font-medium">Khách hàng</th>
                      <th className="px-3 py-3 font-medium">Liên hệ</th>
                      <th className="px-3 py-3 font-medium">Xe</th>
                      <th className="px-3 py-3 font-medium">Lượt rửa</th>
                      <th className="px-5 py-3 font-medium text-right">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shown.map((c) => {
                      const active = selectedId === c.id;
                      return (
                        <tr
                          key={c.id}
                          onClick={() => {
                            setSelectedId(c.id);
                            setEditing(false);
                          }}
                          className={`border-b border-white/5 last:border-0 cursor-pointer transition ${
                            active ? "bg-cyan-500/10" : "hover:bg-white/[0.03]"
                          }`}
                        >
                          <td className="px-5 py-3.5">
                            <p className="text-white font-medium">{c.fullName}</p>
                            <p className="text-xs text-slate-500">Hạng {c.tier ?? "MEMBER"} · {c.pointsBalance} điểm</p>
                          </td>
                          <td className="px-3 py-3.5">
                            <p className="text-slate-300">{c.phone}</p>
                            <p className="text-xs text-slate-500">{c.email || "Chưa có email"}</p>
                          </td>
                          <td className="px-3 py-3.5 text-slate-300">{c.vehicles?.length ?? 0}</td>
                          <td className="px-3 py-3.5 text-slate-300">{c.completedBookings ?? 0}</td>
                          <td className="px-5 py-3.5 text-right">
                            <StatusBadge enabled={c.enabled} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        <aside className="bg-slate-900 border border-white/10 rounded-2xl p-5 h-fit">
          {!selected || !form ? (
            <p className="text-sm text-slate-500">Chọn một khách hàng để xem chi tiết.</p>
          ) : editing ? (
            <form onSubmit={handleSave}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white">Cập nhật hồ sơ</h2>
                <button type="button" onClick={() => setEditing(false)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              {err && <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm px-4 py-3">{err}</div>}
              <Field label="Họ tên">
                <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Số điện thoại">
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Email">
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Ngày sinh">
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                    className={`${inputCls} [color-scheme:dark]`}
                  />
                </Field>
                <Field label="Giới tính">
                  <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className={inputCls}>
                    <option value="" className="bg-slate-800">Chưa chọn</option>
                    <option value="Nam" className="bg-slate-800">Nam</option>
                    <option value="Nu" className="bg-slate-800">Nữ</option>
                    <option value="Khac" className="bg-slate-800">Khác</option>
                  </select>
                </Field>
              </div>
              <Field label="Địa chỉ">
                <textarea
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className={`${inputCls} resize-none`}
                />
              </Field>
              <label className="mb-5 flex items-center justify-between rounded-lg bg-slate-800 border border-white/10 px-4 py-3">
                <span className="text-sm text-slate-300">Tài khoản hoạt động</span>
                <input
                  type="checkbox"
                  checked={form.enabled}
                  onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500"
                />
              </label>
              <button
                type="submit"
                disabled={saving}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 text-white font-semibold py-2.5 hover:bg-cyan-400 transition disabled:opacity-60"
              >
                <Check size={17} /> {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </form>
          ) : (
            <CustomerDetail customer={selected} onEdit={startEdit} />
          )}
        </aside>
      </div>
    </AdminShell>
  );
}

function CustomerDetail({ customer, onEdit }: { customer: AdminCustomer; onEdit: () => void }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-white truncate">{customer.fullName}</h2>
          <div className="mt-1">
            <StatusBadge enabled={customer.enabled} />
          </div>
        </div>
        <button
          onClick={onEdit}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-sm px-3 py-1.5 transition"
        >
          <Edit3 size={15} /> Sửa
        </button>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <Info icon={<Phone size={15} />} label="SĐT" value={customer.phone} />
        <Info icon={<Mail size={15} />} label="Email" value={customer.email || "Chưa có"} />
        <Info icon={<UserRound size={15} />} label="Địa chỉ" value={customer.address || "Chưa có"} />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <MiniStat label="Điểm" value={String(customer.pointsBalance ?? 0)} />
        <MiniStat label="Hạng" value={customer.tier ?? "MEMBER"} />
        <MiniStat label="Lượt rửa" value={String(customer.visitCount ?? 0)} />
        <MiniStat label="Đã chi" value={fmtPrice(customer.lifetimeSpend ?? 0)} />
      </div>

      <Section title={`Xe đã đăng ký (${customer.vehicles?.length ?? 0})`}>
        {customer.vehicles?.length ? (
          <div className="space-y-2">
            {customer.vehicles.map((v) => (
              <div key={v.id} className="rounded-lg bg-slate-800 border border-white/10 px-3 py-2">
                <p className="text-sm font-medium text-white flex items-center gap-2">
                  <Car size={14} className="text-cyan-400" /> {v.licensePlate}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {[v.category, v.brand, v.type].filter(Boolean).join(" · ") || "Chưa có thông tin xe"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Khách chưa đăng ký xe.</p>
        )}
      </Section>

      <Section title="Lịch sử gần đây">
        {customer.recentBookings?.length ? (
          <div className="space-y-2">
            {customer.recentBookings.map((b) => (
              <BookingRow key={b.id} booking={b} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Chưa có lịch đặt nào.</p>
        )}
      </Section>
    </>
  );
}

function BookingRow({ booking }: { booking: AdminBooking }) {
  return (
    <div className="rounded-lg bg-slate-800 border border-white/10 px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-white truncate">{booking.serviceName}</p>
        <BookingStatus status={booking.status} />
      </div>
      <p className="text-xs text-slate-500 mt-1">
        {fmtTime(booking.scheduledTime)} · {booking.vehiclePlate || "Không có biển số"} · {fmtPrice(booking.price)}
      </p>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
      <div className="rounded-xl bg-cyan-500/10 text-cyan-400 p-2.5">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-lg font-bold text-white truncate">{value}</p>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-800 border border-white/10 px-3 py-2">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-white truncate">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-semibold text-slate-300 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-slate-300 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-slate-400 shrink-0 inline-flex items-center gap-1.5">
        {icon} {label}
      </span>
      <span className="text-right text-slate-200 break-words">{value}</span>
    </div>
  );
}
