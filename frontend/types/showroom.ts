// ショールーム検索まわりの型定義
// 仕様書 4.2「テーブル定義（概略）」と 3.2「/api/showrooms」に対応

export type FacilityCode =
  | "kitchen"
  | "bath"
  | "toilet"
  | "washroom"
  | "tile_material"
  | "window_door"
  | "exterior"
  | "other";

export const FACILITY_OPTIONS: { code: FacilityCode; label: string }[] = [
  { code: "kitchen", label: "キッチン" },
  { code: "bath", label: "バス" },
  { code: "toilet", label: "トイレ" },
  { code: "washroom", label: "洗面" },
  { code: "tile_material", label: "タイル・建材" },
  { code: "window_door", label: "窓・ドア" },
  { code: "exterior", label: "外装・エクステリア" },
  { code: "other", label: "その他" },
];

export interface Showroom {
  id: number;
  name: string;
  prefecture: string;
  city: string;
  address: string;

  monthlyVisitors: number;

  facilities: FacilityCode[];

  availableFrom: string;

  thumbnailUrl?: string;

  lat?: number;
  lng?: number;
}

export interface SearchFilters {
  prefecture: string;
  area: string;
  categories: FacilityCode[];
  visitorAttribute: string;
  page: number;
  limit: number;
}

export const DEFAULT_FILTERS: SearchFilters = {
  prefecture: "",
  area: "",
  categories: [],
  visitorAttribute: "",
  page: 1,
  limit: 10,
};

export interface ShowroomSearchResponse {
  items: Showroom[];
  total: number;
}