"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import AdminShell from "@/components/AdminShell";
import {
  getAdminPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
  type AdminPromotion,
} from "@/services/adminPromotions";

const inputCls =
  "w-full rounded-lg border border-white/10 bg-slate-800 px-4 py-2.5 text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30";

const TIER_OPTIONS = [
  { value: "", label: "Mọi hạng" },
  { value: "MEMBER", label: "Member trở lên" },
  { value: "SILVER", label: "Silver trở lên" },
  { value: "GOLD", label: "Gold trở lên" },
  { value: "PLATINUM", label: "Platinum" },
];

const TIER_LABEL: Record<string, string> = {
  MEMBER: "Member+",
  SILVER: "Silver+",
  GOLD: "Gold+",
  PLATINUM: "Platinum+",
};

const EMPTY = {
  code: "",
  name: "",
  description: "",
  discountPercent: "",
  minTier: "",
  startDate: "",
  endDate: "",
  active: true,
};

export default function AdminPromotionsPage() {
  const [promos, setPromos] = useState<AdminPromotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ id: number | null; data: typeof EMPTY } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    reload();
  }, []);

  function reload() {
    setLoading(true);
    getAdminPromotions()
      .then(setPromos)
      .catch(() => setPromos([]))
      .finally(() => setLoading(false));
  }

  function openAdd() {
    setError("");
    setModal({ id: null, data: { ...EMPTY } });
  }

  function openEdit(p: AdminPromotion) {
    setError("");
    setModal({
      id: p.id,
      data: {
        code: p.code,
        name: p.name,
        description: p.description ?? "",
        discountPercent: String(p.discountPercent),
        minTier: p.minTier ?? "",
        startDate: p.startDate,
        endDate: p.endDate,
        active: p.active,
      },
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!modal) return;
    setSaving(true);
    setError("");
    try {
      const payload = {
        code: modal.data.code,
        name: modal.data.name,
        description: modal.data.description || undefined,
        discountPercent: Number(modal.data.discountPercent),
        minTier: modal.data.minTier || undefined,
        startDate: modal.data.startDate,
        endDate: modal.data.endDate,
        active: modal.data.active,
      };
      if (modal.id == null) await createPromotion(payload);
      else await updatePromotion(modal.id, payload);
      setModal(null);
      reload();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Lưu thất bại, vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(p: AdminPromotion) {
    if (!confirm(`Xoá khuyến mãi "${p.name}"?`)) return;
    try {
      await deletePromotion(p.id);
      reload();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Xoá thất bại.");
    }
  }

  return (
    <AdminShell active="promotions" title="Quản lý khuyến mãi">
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-400">Tạo &amp; quản lý chương trình khuyến mãi theo hạng.</p>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 text-white font-semibold px-4 py-2.5 hover:bg-cyan-400 transition"
        >
          <Plus size={18} /> Thêm khuyến mãi
        </button>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <p className="p-5 text-slate-500">Đang tải...</p>
        ) : promos.length === 0 ? (
          <p className="p-5 text-slate-500">Chưa có khuyến mãi nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-white/10">
                  <th className="px-5 py-3 font-medium">Mã</th>
                  <th className="px-3 py-3 font-medium">Tên</th>
                  <th className="px-3 py-3 font-medium">Giảm</th>
                  <th className="px-3 py-3 font-medium">Áp dụng</th>
                  <th className="px-3 py-3 font-medium">Thời gian</th>
                  <th className="px-3 py-3 font-medium">Trạng thái</th>
                  <th className="px-5 py-3 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {promos.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-slate-300">
                        {p.code}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="text-white font-medium">{p.name}</p>
                      {p.description && <p className="text-xs text-slate-500 truncate max-w-[220px]">{p.description}</p>}
                    </td>
                    <td className="px-3 py-3.5 text-cyan-400 font-semibold">-{p.discountPercent}%</td>
                    <td className="px-3 py-3.5 text-slate-400">{p.minTier ? TIER_LABEL[p.minTier] : "Mọi hạng"}</td>
                    <td className="px-3 py-3.5 text-slate-400 whitespace-nowrap">
                      {p.startDate} → {p.endDate}
                    </td>
                    <td className="px-3 py-3.5">
                      {p.active ? (
                        <span className="text-xs font-semibold rounded-full px-2.5 py-0.5 bg-green-500/15 text-green-300">
                          Đang chạy
                        </span>
                      ) : (
                        <span className="text-xs font-semibold rounded-full px-2.5 py-0.5 bg-slate-500/15 text-slate-400">
                          Đã tắt
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-2 text-slate-500 hover:text-cyan-400 transition"
                          title="Sửa"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="p-2 text-slate-500 hover:text-red-400 transition"
                          title="Xoá"
                        >
                          <Trash2 size={16} />
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

      {/* Modal them / sua khuyen mai */}
      {modal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">
                {modal.id == null ? "Thêm khuyến mãi" : "Sửa khuyến mãi"}
              </h2>
              <button onClick={() => setModal(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm px-4 py-3">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <label className="block mb-4">
                  <span className="block text-sm font-medium text-slate-300 mb-1.5">Mã</span>
                  <input
                    value={modal.data.code}
                    onChange={(e) => setModal({ ...modal, data: { ...modal.data, code: e.target.value.toUpperCase() } })}
                    required
                    placeholder="WELCOME10"
                    className={inputCls}
                  />
                </label>
                <label className="block mb-4">
                  <span className="block text-sm font-medium text-slate-300 mb-1.5">Giảm (%)</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={modal.data.discountPercent}
                    onChange={(e) => setModal({ ...modal, data: { ...modal.data, discountPercent: e.target.value } })}
                    required
                    placeholder="10"
                    className={inputCls}
                  />
                </label>
              </div>

              <label className="block mb-4">
                <span className="block text-sm font-medium text-slate-300 mb-1.5">Tên khuyến mãi</span>
                <input
                  value={modal.data.name}
                  onChange={(e) => setModal({ ...modal, data: { ...modal.data, name: e.target.value } })}
                  required
                  placeholder="Chào mừng thành viên mới"
                  className={inputCls}
                />
              </label>

              <label className="block mb-4">
                <span className="block text-sm font-medium text-slate-300 mb-1.5">Mô tả</span>
                <textarea
                  value={modal.data.description}
                  onChange={(e) => setModal({ ...modal, data: { ...modal.data, description: e.target.value } })}
                  rows={2}
                  placeholder="Giảm 10% cho lần rửa đầu tiên."
                  className={`${inputCls} resize-none`}
                />
              </label>

              <label className="block mb-4">
                <span className="block text-sm font-medium text-slate-300 mb-1.5">Áp dụng cho hạng</span>
                <select
                  value={modal.data.minTier}
                  onChange={(e) => setModal({ ...modal, data: { ...modal.data, minTier: e.target.value } })}
                  className={inputCls}
                >
                  {TIER_OPTIONS.map((t) => (
                    <option key={t.value} value={t.value} className="bg-slate-800">
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block mb-4">
                  <span className="block text-sm font-medium text-slate-300 mb-1.5">Từ ngày</span>
                  <input
                    type="date"
                    value={modal.data.startDate}
                    onChange={(e) => setModal({ ...modal, data: { ...modal.data, startDate: e.target.value } })}
                    required
                    className={`${inputCls} [color-scheme:dark]`}
                  />
                </label>
                <label className="block mb-4">
                  <span className="block text-sm font-medium text-slate-300 mb-1.5">Đến ngày</span>
                  <input
                    type="date"
                    value={modal.data.endDate}
                    onChange={(e) => setModal({ ...modal, data: { ...modal.data, endDate: e.target.value } })}
                    required
                    className={`${inputCls} [color-scheme:dark]`}
                  />
                </label>
              </div>

              <label className="flex items-center gap-3 mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={modal.data.active}
                  onChange={(e) => setModal({ ...modal, data: { ...modal.data, active: e.target.checked } })}
                  className="w-4 h-4 accent-cyan-500"
                />
                <span className="text-sm text-slate-300">Đang chạy (hiển thị cho khách hàng)</span>
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="flex-1 rounded-lg border border-white/15 text-slate-300 font-medium py-2.5 hover:bg-white/5 transition"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-cyan-500 text-white font-semibold py-2.5 hover:bg-cyan-400 transition disabled:opacity-60"
                >
                  {saving ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
