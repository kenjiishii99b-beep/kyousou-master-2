"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ExhibitionItem, ExhibitionStatus, STATUS_LABEL } from "@/types/exhibition";

const STATUS_OPTIONS: ExhibitionStatus[] = ["pending", "exhibiting", "finished", "cancelled"];

interface StatusModalProps {
  item: ExhibitionItem;
  onClose: () => void;
  onUpdate: (status: ExhibitionStatus, reason?: string) => Promise<void>;
}

export function StatusModal({ item, onClose, onUpdate }: StatusModalProps) {
  const [status, setStatus] = useState<ExhibitionStatus>(item.status);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (status === "cancelled" && !reason) {
      setError("中止（差戻し）の場合は理由を入力してください。");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await onUpdate(status, reason || undefined);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "更新に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-base font-semibold text-slate-900">ステータス更新</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <dl className="mb-4 space-y-1 text-sm text-slate-600">
          <div className="flex justify-between">
            <dt>ショールーム</dt>
            <dd className="text-slate-900">{item.showroomName}</dd>
          </div>
          <div className="flex justify-between">
            <dt>企業名</dt>
            <dd className="text-slate-900">{item.companyName}</dd>
          </div>
          <div className="flex justify-between">
            <dt>期間</dt>
            <dd className="text-slate-900">
              {item.periodFrom}〜{item.periodTo}
            </dd>
          </div>
        </dl>

        {error && (
          <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <div className="mb-4 space-y-1">
          <label className="text-sm font-medium text-slate-700">ステータス</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ExhibitionStatus)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>

        {status === "cancelled" && (
          <div className="mb-4 space-y-1">
            <label className="text-sm font-medium text-slate-700">差戻し理由</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="差戻し・中止の理由を入力してください。"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "更新中..." : "保存する"}
          </button>
        </div>
      </div>
    </div>
  );
}
