import { Showroom } from "@/types/showroom";
import { StaticMapView } from "./StaticMapView";

export function MapView({ items }: { items: Showroom[] }) {
  return (
    <StaticMapView
      locations={items}
      className="aspect-[3/4] min-h-[320px] w-full self-start"
    />
  );
}
