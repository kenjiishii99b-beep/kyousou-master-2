"use client";

import {
  Ruler,
  Zap,
  Wifi,
  Car,
  Package,
  Building2,
} from "lucide-react";

type FacilitySectionProps = {
  boothType: string;
  boothSize: string;
  power: string;
  wifi: string;
  parking: string;
  carryIn: string;
};

type ItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function Item({ icon, label, value }: ItemProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0e2147] text-white">
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-xs font-medium text-gray-500">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function FacilitySection({
  boothType,
  boothSize,
  power,
  wifi,
  parking,
  carryIn,
}: FacilitySectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">
        ブース仕様・設備
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        <Item
          icon={<Building2 className="h-5 w-5" />}
          label="ブース種別"
          value={boothType}
        />

        <Item
          icon={<Ruler className="h-5 w-5" />}
          label="展示スペース"
          value={boothSize}
        />

        <Item
          icon={<Zap className="h-5 w-5" />}
          label="電源設備"
          value={power}
        />

        <Item
          icon={<Wifi className="h-5 w-5" />}
          label="Wi-Fi"
          value={wifi}
        />

        <Item
          icon={<Car className="h-5 w-5" />}
          label="駐車場"
          value={parking}
        />

        <Item
          icon={<Package className="h-5 w-5" />}
          label="搬入条件"
          value={carryIn}
        />

      </div>
    </section>
  );
}