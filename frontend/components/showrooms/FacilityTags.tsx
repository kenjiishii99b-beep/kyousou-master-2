import { FACILITY_OPTIONS, FacilityCode } from "@/types/showroom";
import {
  UtensilsCrossed,
  Bath,
  ShowerHead,
  Droplets,
  LayoutGrid,
  DoorOpen,
  Building2,
  MoreHorizontal,
} from "lucide-react";

const ICONS: Record<FacilityCode, React.ComponentType<{ className?: string }>> = {
  kitchen: UtensilsCrossed,
  bath: Bath,
  toilet: ShowerHead,
  washroom: Droplets,
  tile_material: LayoutGrid,
  window_door: DoorOpen,
  exterior: Building2,
  other: MoreHorizontal,
};

export function FacilityTags({ facilities }: { facilities: FacilityCode[] }) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold text-slate-900">
        展示可能なカテゴリ
      </h2>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {FACILITY_OPTIONS.map(({ code, label }) => {
          const Icon = ICONS[code];
          const active = facilities.includes(code);
          return (
            <div
              key={code}
              className={`flex flex-col items-center gap-1 rounded-md border px-2 py-3 text-[11px] ${
                active
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-300"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-center leading-tight">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
