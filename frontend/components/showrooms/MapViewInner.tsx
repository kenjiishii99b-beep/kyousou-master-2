"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Showroom } from "@/types/showroom";
import Link from "next/link";

// Leafletデフォルトのマーカーアイコン画像のパス問題を解決
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const LOCATION_COORDS: Record<string, [number, number]> = {
  東京: [35.6895, 139.6917],
  名古屋: [35.1815, 136.9064],
  札幌: [43.0642, 141.3469],
  仙台: [38.2682, 140.8694],
  大阪: [34.6937, 135.5023],
  福岡: [33.5904, 130.4017],
};

interface MapViewProps {
  showrooms?: Showroom[]; // 💡 undefined を許容
}

// 💡 デフォルト引数 showrooms = [] を設定
export default function MapViewInner({ showrooms = [] }: MapViewProps) {
  const defaultCenter: [number, number] = [36.2048, 138.2529];

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-slate-200 shadow-inner min-h-[400px]">
      <MapContainer
        center={defaultCenter}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 💡 ?.map と安全ガードを追加 */}
        {showrooms?.map((showroom) => {
          if (!showroom) return null;

          let lat = (showroom as any).latitude;
          let lng = (showroom as any).longitude;

          if (!lat || !lng) {
            const matchedKey = Object.keys(LOCATION_COORDS).find(
              (key) =>
                showroom.name?.includes(key) ||
                showroom.prefecture?.includes(key),
            );
            const coords = matchedKey
              ? LOCATION_COORDS[matchedKey]
              : defaultCenter;
            lat = coords[0] + (Math.random() - 0.5) * 0.05;
            lng = coords[1] + (Math.random() - 0.5) * 0.05;
          }

          return (
            <Marker key={showroom.id} position={[lat, lng]}>
              <Popup>
                <div className="p-1 text-slate-800">
                  <p className="font-bold text-sm mb-1">{showroom.name}</p>
                  <p className="text-xs text-slate-500 mb-2">
                    {showroom.prefecture}
                    {showroom.city}
                  </p>
                  <Link
                    href={`/showrooms/${showroom.id}`}
                    className="inline-block rounded bg-slate-900 px-2 py-1 text-[11px] font-medium text-white hover:bg-slate-800"
                  >
                    詳細を見る
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
