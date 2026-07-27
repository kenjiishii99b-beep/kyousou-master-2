"use client";

interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface StaticMapViewProps {
  locations: MapLocation[];
  className?: string;
}

const LAT_MIN = 26;
const LAT_MAX = 46;
const LNG_MIN = 128.5;
const LNG_MAX = 146;

function toPercent(lat: number, lng: number) {
  const top = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 100;
  const left = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 100;
  return {
    top: Math.min(98, Math.max(2, top)),
    left: Math.min(98, Math.max(2, left)),
  };
}

const ISLANDS: { name: string; points: [number, number][] }[] = [
  {
    name: "hokkaido",
    points: [
      [45.5, 141.7], [45.3, 143.3], [44.3, 144.9], [43.3, 145.6],
      [42.3, 143.5], [41.9, 140.9], [42.6, 140.2], [43.3, 140.7],
      [44.3, 141.0], [45.0, 141.4],
    ],
  },
  {
    name: "honshu",
    points: [
      [41.3, 140.9], [40.6, 141.9], [39.0, 141.9], [38.3, 141.5],
      [37.3, 141.0], [36.4, 140.7], [35.6, 140.7], [35.3, 139.7],
      [34.9, 139.1], [34.6, 138.0], [34.7, 136.9], [34.5, 135.4],
      [34.2, 135.1], [34.4, 133.9], [34.4, 132.5], [34.2, 131.5],
      [33.9, 130.9], [34.6, 131.7], [35.5, 133.3], [36.3, 135.3],
      [37.0, 136.9], [37.5, 137.3], [38.0, 138.6], [38.9, 139.7],
      [39.7, 139.9], [40.5, 140.0], [41.3, 140.9],
    ],
  },
  {
    name: "shikoku",
    points: [
      [34.1, 134.6], [33.9, 134.2], [33.5, 133.5], [32.9, 132.9],
      [33.0, 133.6], [33.5, 134.4], [33.8, 134.7],
    ],
  },
  {
    name: "kyushu",
    points: [
      [33.9, 130.9], [33.6, 129.9], [33.2, 129.7], [32.5, 129.9],
      [31.9, 130.2], [31.0, 130.6], [31.2, 131.3], [32.0, 131.9],
      [32.8, 131.7], [33.3, 131.3], [33.6, 130.9],
    ],
  },
];

function JapanSilhouette() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <rect width="100" height="100" fill="#eff6ff" />
      {ISLANDS.map((island) => {
        const pts = island.points
          .map(([lat, lng]) => {
            const p = toPercent(lat, lng);
            return `${p.left},${p.top}`;
          })
          .join(" ");
        return (
          <polygon
            key={island.name}
            points={pts}
            fill="#bfdbfe"
            stroke="#93c5fd"
            strokeWidth="0.3"
          />
        );
      })}
    </svg>
  );
}

export function StaticMapView({ locations, className = "" }: StaticMapViewProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-slate-200 ${className}`}
    >
      <JapanSilhouette />

      {locations.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
          表示できる地点がありません
        </div>
      )}

      {locations.map((loc) => {
        const pos = toPercent(loc.lat, loc.lng);
        return (
          <div
            key={loc.id}
            className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
            style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
          >
            <span className="mb-1 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700 shadow">
              {loc.name}
            </span>
            <svg width="20" height="26" viewBox="0 0 20 26" className="drop-shadow">
              <path
                d="M10 0C4.48 0 0 4.48 0 10c0 7.5 10 16 10 16s10-8.5 10-16C20 4.48 15.52 0 10 0z"
                fill="#dc2626"
              />
              <circle cx="10" cy="10" r="4" fill="white" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
