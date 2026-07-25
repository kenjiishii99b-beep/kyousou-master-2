"use client";

interface MapLocation {
  id: string | number;
  name: string;
  lat?: number | null;
  lng?: number | null;
}

interface StaticMapViewProps {
  locations: MapLocation[];
  className?: string;
}

const LAT_MIN = 25;
const LAT_MAX = 46;
const LNG_MIN = 127;
const LNG_MAX = 146;

const FALLBACK_COORDINATES: {
  keyword: string;
  lat: number;
  lng: number;
}[] = [
  { keyword: "札幌", lat: 43.0618, lng: 141.3545 },
  { keyword: "仙台", lat: 38.2682, lng: 140.8694 },
  { keyword: "さいたま", lat: 35.8617, lng: 139.6455 },
  { keyword: "東京", lat: 35.6762, lng: 139.6503 },
  { keyword: "横浜", lat: 35.4437, lng: 139.638 },
  { keyword: "金沢", lat: 36.5613, lng: 136.6562 },
  { keyword: "名古屋", lat: 35.1815, lng: 136.9066 },
  { keyword: "京都", lat: 35.0116, lng: 135.7681 },
  { keyword: "大阪", lat: 34.6937, lng: 135.5023 },
  { keyword: "広島", lat: 34.3853, lng: 132.4553 },
  { keyword: "福岡", lat: 33.5904, lng: 130.4017 },
  { keyword: "那覇", lat: 26.2124, lng: 127.6809 },
];

function getCoordinates(location: MapLocation) {
  if (
    typeof location.lat === "number" &&
    Number.isFinite(location.lat) &&
    typeof location.lng === "number" &&
    Number.isFinite(location.lng)
  ) {
    return { lat: location.lat, lng: location.lng };
  }

  const fallback = FALLBACK_COORDINATES.find(({ keyword }) =>
    location.name.includes(keyword),
  );

  return fallback ? { lat: fallback.lat, lng: fallback.lng } : null;
}

function toPercent(lat: number, lng: number) {
  const top = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 100;
  const left = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 100;

  return {
    top: Math.min(94, Math.max(6, top)),
    left: Math.min(94, Math.max(6, left)),
  };
}

const ISLANDS: { name: string; points: [number, number][] }[] = [
  {
    name: "hokkaido",
    points: [
      [45.5, 141.7],
      [45.3, 143.3],
      [44.3, 144.9],
      [43.3, 145.6],
      [42.3, 143.5],
      [41.9, 140.9],
      [42.6, 140.2],
      [43.3, 140.7],
      [44.3, 141.0],
      [45.0, 141.4],
    ],
  },
  {
    name: "honshu",
    points: [
      [41.3, 140.9],
      [40.6, 141.9],
      [39.0, 141.9],
      [38.3, 141.5],
      [37.3, 141.0],
      [36.4, 140.7],
      [35.6, 140.7],
      [35.3, 139.7],
      [34.9, 139.1],
      [34.6, 138.0],
      [34.7, 136.9],
      [34.5, 135.4],
      [34.2, 135.1],
      [34.4, 133.9],
      [34.4, 132.5],
      [34.2, 131.5],
      [33.9, 130.9],
      [34.6, 131.7],
      [35.5, 133.3],
      [36.3, 135.3],
      [37.0, 136.9],
      [37.5, 137.3],
      [38.0, 138.6],
      [38.9, 139.7],
      [39.7, 139.9],
      [40.5, 140.0],
      [41.3, 140.9],
    ],
  },
  {
    name: "shikoku",
    points: [
      [34.1, 134.6],
      [33.9, 134.2],
      [33.5, 133.5],
      [32.9, 132.9],
      [33.0, 133.6],
      [33.5, 134.4],
      [33.8, 134.7],
    ],
  },
  {
    name: "kyushu",
    points: [
      [33.9, 130.9],
      [33.6, 129.9],
      [33.2, 129.7],
      [32.5, 129.9],
      [31.9, 130.2],
      [31.0, 130.6],
      [31.2, 131.3],
      [32.0, 131.9],
      [32.8, 131.7],
      [33.3, 131.3],
      [33.6, 130.9],
    ],
  },
];

function RedPin({
  left,
  top,
  name,
}: {
  left: number;
  top: number;
  name: string;
}) {
  return (
    <g transform={`translate(${left} ${top})`}>
      <title>{name}</title>
      <path
        d="
          M 0 0
          C -1.8 -2.2 -3.2 -4.1 -3.2 -6.3
          A 3.2 3.2 0 1 1 3.2 -6.3
          C 3.2 -4.1 1.8 -2.2 0 0
          Z
        "
        fill="#dc2626"
        stroke="#ffffff"
        strokeWidth="0.65"
        vectorEffect="non-scaling-stroke"
        className="drop-shadow"
      />
      <circle cx="0" cy="-6.3" r="1.2" fill="#ffffff" />
    </g>
  );
}

export function StaticMapView({
  locations,
  className = "",
}: StaticMapViewProps) {
  const plottableLocations = locations
    .map((location) => ({
      location,
      coordinates: getCoordinates(location),
    }))
    .filter(
      (
        item,
      ): item is {
        location: MapLocation;
        coordinates: { lat: number; lng: number };
      } => item.coordinates !== null,
    );

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-slate-200 bg-blue-50 ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="ショールーム所在地"
      >
        <rect width="100" height="100" fill="#eff6ff" />

        {ISLANDS.map((island) => {
          const points = island.points
            .map(([lat, lng]) => {
              const position = toPercent(lat, lng);
              return `${position.left},${position.top}`;
            })
            .join(" ");

          return (
            <polygon
              key={island.name}
              points={points}
              fill="#bfdbfe"
              stroke="#93c5fd"
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {plottableLocations.map(({ location, coordinates }) => {
          const position = toPercent(coordinates.lat, coordinates.lng);

          return (
            <RedPin
              key={location.id}
              left={position.left}
              top={position.top}
              name={location.name}
            />
          );
        })}
      </svg>

      {plottableLocations.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
          表示できる地点がありません
        </div>
      )}
    </div>
  );
}
