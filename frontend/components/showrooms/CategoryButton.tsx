"use client";

import { LucideIcon } from "lucide-react";

type CategoryButtonProps = {
  icon: LucideIcon;
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function CategoryButton({
  icon: Icon,
  label,
  selected = false,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center
        h-20 w-full rounded-lg border
        transition-all duration-200
        ${
          selected
            ? "border-blue-600 bg-blue-50 text-blue-600"
            : "border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:bg-blue-50"
        }
      `}
    >
      <Icon className="mb-2 h-6 w-6" />

      <span className="text-xs font-medium">
        {label}
      </span>
    </button>
  );
}