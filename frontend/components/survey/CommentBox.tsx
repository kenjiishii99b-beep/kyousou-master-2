"use client";

const MAX_LENGTH = 500;

export function CommentBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        placeholder={placeholder ?? "ご自由にご記入ください"}
        rows={4}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      />
      <p className="text-right text-xs text-slate-400">
        {value.length} / {MAX_LENGTH}
      </p>
    </div>
  );
}
