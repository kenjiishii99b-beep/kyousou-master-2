"use client";

import { Star } from "lucide-react";

export function RatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((score) => (
        <button
          key={score}
          type="button"
          onClick={() => onChange(score)}
          aria-label={`${score}点`}
          className="p-1"
        >
          <Star
            className={`h-8 w-8 ${
              score <= value ? "fill-amber-400 text-amber-400" : "fill-none text-slate-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
