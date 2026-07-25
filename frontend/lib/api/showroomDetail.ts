import {
  ShowroomDetail,
  ShowroomPhoto,
  VisitorProfile,
} from "@/types/showroomDetail";
import { FacilityCode } from "@/types/showroom";

type DetailPreset = {
  keyword: string;
  access: string;
  businessHours: string;
  closedDays: string;
  facilities: FacilityCode[];
  visitorProfile: VisitorProfile;
  photos: ShowroomPhoto[];
};

const DEFAULT_PHOTO = "/images/showrooms/showroom-main-v2.jpg";

const DEFAULT_VISITOR_PROFILE: VisitorProfile = {
  genderRatio: { male: 48, female: 52 },
  ageBrackets: [
    { label: "20代", percentage: 12 },
    { label: "30代", percentage: 27 },
    { label: "40代", percentage: 28 },
    { label: "50代", percentage: 20 },
    { label: "60代以上", percentage: 13 },
  ],
  visitPurpose: [
    { label: "情報収集", percentage: 42 },
    { label: "商品比較", percentage: 31 },
    { label: "新規検討", percentage: 27 },
  ],
};

/**
 * MVP表示用の補完データ。
 * DBに写真・展示カテゴリ・来場者属性が追加されたら、
 * DBの値を優先してこの補完値を段階的に外せます。
 */
const DETAIL_PRESETS: DetailPreset[] = [
  {
    keyword: "東京",
    access: "JR新宿駅より徒歩5分",
    businessHours: "10:00〜17:00",
    closedDays: "水曜日（祝日の場合は営業）・年末年始",
    facilities: ["kitchen", "bath", "toilet", "washroom"],
    visitorProfile: {
      genderRatio: { male: 48, female: 52 },
      ageBrackets: [
        { label: "20代", percentage: 11 },
        { label: "30代", percentage: 27 },
        { label: "40代", percentage: 27 },
        { label: "50代", percentage: 20 },
        { label: "60代以上", percentage: 15 },
      ],
      visitPurpose: [
        { label: "情報収集", percentage: 45 },
        { label: "商品比較", percentage: 30 },
        { label: "新規検討", percentage: 25 },
      ],
    },
    photos: [
      { id: "tokyo-main", url: "/images/showrooms/showroom-main-v2.jpg" },
      { id: "tokyo-sub", url: "/images/showrooms/showroom-main-v2.jpg" },
    ],
  },
  {
    keyword: "名古屋",
    access: "地下鉄栄駅より徒歩4分",
    businessHours: "10:00〜18:00",
    closedDays: "水曜日・年末年始",
    facilities: ["kitchen", "toilet", "tile_material"],
    visitorProfile: {
      genderRatio: { male: 46, female: 54 },
      ageBrackets: [
        { label: "20代", percentage: 12 },
        { label: "30代", percentage: 26 },
        { label: "40代", percentage: 29 },
        { label: "50代", percentage: 20 },
        { label: "60代以上", percentage: 13 },
      ],
      visitPurpose: [
        { label: "情報収集", percentage: 38 },
        { label: "商品比較", percentage: 32 },
        { label: "新規検討", percentage: 30 },
      ],
    },
    photos: [{ id: "nagoya-main", url: "/images/showrooms/showroom-main-v2.jpg" }],
  },
  {
    keyword: "大阪",
    access: "JR大阪駅より徒歩7分",
    businessHours: "10:00〜18:00",
    closedDays: "火曜日・年末年始",
    facilities: ["kitchen", "window_door", "exterior"],
    visitorProfile: {
      genderRatio: { male: 44, female: 56 },
      ageBrackets: [
        { label: "20代", percentage: 15 },
        { label: "30代", percentage: 30 },
        { label: "40代", percentage: 25 },
        { label: "50代", percentage: 18 },
        { label: "60代以上", percentage: 12 },
      ],
      visitPurpose: [
        { label: "情報収集", percentage: 40 },
        { label: "商品比較", percentage: 35 },
        { label: "新規検討", percentage: 25 },
      ],
    },
    photos: [{ id: "osaka-main", url: "/images/showrooms/showroom-main-v2.jpg" }],
  },
  {
    keyword: "福岡",
    access: "地下鉄天神駅より徒歩3分",
    businessHours: "10:00〜17:00",
    closedDays: "月曜日・年末年始",
    facilities: ["bath", "washroom", "tile_material", "other"],
    visitorProfile: {
      genderRatio: { male: 50, female: 50 },
      ageBrackets: [
        { label: "20代", percentage: 13 },
        { label: "30代", percentage: 25 },
        { label: "40代", percentage: 28 },
        { label: "50代", percentage: 19 },
        { label: "60代以上", percentage: 15 },
      ],
      visitPurpose: [
        { label: "情報収集", percentage: 42 },
        { label: "商品比較", percentage: 28 },
        { label: "新規検討", percentage: 30 },
      ],
    },
    photos: [{ id: "fukuoka-main", url: "/images/showrooms/showroom-main-v2.jpg" }],
  },
  {
    keyword: "札幌",
    access: "JR札幌駅より徒歩2分",
    businessHours: "10:00〜17:00",
    closedDays: "木曜日・年末年始",
    facilities: ["kitchen", "bath", "toilet", "washroom"],
    visitorProfile: {
      genderRatio: { male: 49, female: 51 },
      ageBrackets: [
        { label: "20代", percentage: 10 },
        { label: "30代", percentage: 24 },
        { label: "40代", percentage: 30 },
        { label: "50代", percentage: 22 },
        { label: "60代以上", percentage: 14 },
      ],
      visitPurpose: [
        { label: "情報収集", percentage: 44 },
        { label: "商品比較", percentage: 26 },
        { label: "新規検討", percentage: 30 },
      ],
    },
    photos: [{ id: "sapporo-main", url: "/images/showrooms/showroom-main-v2.jpg" }],
  },
  {
    keyword: "仙台",
    access: "JR仙台駅より徒歩8分",
    businessHours: "10:00〜17:00",
    closedDays: "水曜日・年末年始",
    facilities: ["kitchen", "bath", "window_door"],
    visitorProfile: DEFAULT_VISITOR_PROFILE,
    photos: [{ id: "sendai-main", url: "/images/showrooms/showroom-main-v2.jpg" }],
  },
  {
    keyword: "さいたま",
    access: "JRさいたま新都心駅より徒歩5分",
    businessHours: "10:00〜17:00",
    closedDays: "水曜日・年末年始",
    facilities: ["kitchen", "washroom", "exterior"],
    visitorProfile: DEFAULT_VISITOR_PROFILE,
    photos: [{ id: "saitama-main", url: "/images/showrooms/showroom-main-v2.jpg" }],
  },
  {
    keyword: "横浜",
    access: "JR横浜駅より徒歩8分",
    businessHours: "10:00〜18:00",
    closedDays: "水曜日・年末年始",
    facilities: ["kitchen", "bath", "toilet", "exterior"],
    visitorProfile: DEFAULT_VISITOR_PROFILE,
    photos: [{ id: "yokohama-main", url: "/images/showrooms/showroom-main-v2.jpg" }],
  },
  {
    keyword: "金沢",
    access: "JR金沢駅より徒歩10分",
    businessHours: "10:00〜17:00",
    closedDays: "水曜日・年末年始",
    facilities: ["kitchen", "tile_material", "window_door"],
    visitorProfile: DEFAULT_VISITOR_PROFILE,
    photos: [{ id: "kanazawa-main", url: "/images/showrooms/showroom-main-v2.jpg" }],
  },
  {
    keyword: "京都",
    access: "地下鉄烏丸御池駅より徒歩5分",
    businessHours: "10:00〜17:00",
    closedDays: "火曜日・年末年始",
    facilities: ["kitchen", "bath", "tile_material"],
    visitorProfile: DEFAULT_VISITOR_PROFILE,
    photos: [{ id: "kyoto-main", url: "/images/showrooms/showroom-main-v2.jpg" }],
  },
  {
    keyword: "広島",
    access: "広島駅より徒歩10分",
    businessHours: "10:00〜17:00",
    closedDays: "水曜日・年末年始",
    facilities: ["bath", "washroom", "exterior"],
    visitorProfile: DEFAULT_VISITOR_PROFILE,
    photos: [{ id: "hiroshima-main", url: "/images/showrooms/showroom-main-v2.jpg" }],
  },
  {
    keyword: "那覇",
    access: "ゆいレール県庁前駅より徒歩6分",
    businessHours: "10:00〜17:00",
    closedDays: "水曜日・年末年始",
    facilities: ["kitchen", "bath", "other"],
    visitorProfile: DEFAULT_VISITOR_PROFILE,
    photos: [{ id: "naha-main", url: "/images/showrooms/showroom-main-v2.jpg" }],
  },
];

const VALID_FACILITY_CODES = new Set<FacilityCode>([
  "kitchen",
  "bath",
  "toilet",
  "washroom",
  "tile_material",
  "window_door",
  "exterior",
  "other",
]);

function findPreset(raw: Record<string, unknown>): DetailPreset | undefined {
  const searchableText = [raw.name, raw.prefecture, raw.city]
    .filter((value): value is string => typeof value === "string")
    .join(" ");

  return DETAIL_PRESETS.find(({ keyword }) =>
    searchableText.includes(keyword),
  );
}

function parseFacilities(value: unknown): FacilityCode[] {
  let values: unknown[] = [];

  if (Array.isArray(value)) {
    values = value;
  } else if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      values = Array.isArray(parsed) ? parsed : [];
    } catch {
      values = [];
    }
  }

  return values.filter(
    (item): item is FacilityCode =>
      typeof item === "string" &&
      VALID_FACILITY_CODES.has(item as FacilityCode),
  );
}

function parsePhotos(value: unknown): ShowroomPhoto[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((photo, index) => {
      if (typeof photo === "string") {
        return { id: `api-photo-${index}`, url: photo };
      }

      if (
        typeof photo === "object" &&
        photo !== null &&
        "url" in photo &&
        typeof photo.url === "string"
      ) {
        return {
          id:
            "id" in photo && typeof photo.id === "string"
              ? photo.id
              : `api-photo-${index}`,
          url: photo.url,
        };
      }

      return null;
    })
    .filter((photo): photo is ShowroomPhoto => photo !== null);
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

function textValue(...values: unknown[]): string | undefined {
  return values.find(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0,
  );
}

function formatShowroomDetail(raw: Record<string, unknown>): ShowroomDetail {
  const preset = findPreset(raw);
  const apiFacilities = parseFacilities(raw.facilities);
  const apiPhotos = parsePhotos(raw.photos);
  const imageUrl = textValue(
    raw.image_url,
    raw.imageUrl,
    raw.thumbnailUrl,
  );

  const photos =
    apiPhotos.length > 0
      ? apiPhotos
      : imageUrl
        ? [{ id: "database-main", url: imageUrl }]
        : preset?.photos ?? [{ id: "default-main", url: DEFAULT_PHOTO }];

  return {
    ...raw,
    id: String(raw.id ?? ""),
    name: textValue(raw.name) ?? "名称未設定",
    prefecture: textValue(raw.prefecture) ?? "",
    city: textValue(raw.city) ?? "",
    address: textValue(raw.address) ?? "",
    description: textValue(raw.description) ?? "",

    access:
      textValue(raw.access, raw.access_info) ??
      preset?.access ??
      "アクセス情報は準備中です",
    businessHours:
      textValue(raw.businessHours, raw.business_hours) ??
      preset?.businessHours ??
      "10:00〜17:00",
    closedDays:
      textValue(raw.closedDays, raw.closed_days) ??
      preset?.closedDays ??
      "水曜日",

    monthlyVisitors: toNumber(
      raw.monthlyVisitors ?? raw.monthly_visitors ?? raw.capacity,
      0,
    ),

    availableFrom:
      textValue(raw.availableFrom, raw.available_from) ?? "随時",
    availableTo:
      textValue(raw.availableTo, raw.available_to) ?? null,

    facilities:
      apiFacilities.length > 0
        ? apiFacilities
        : preset?.facilities ?? ["other"],

    photos,
    thumbnailUrl: photos[0]?.url ?? DEFAULT_PHOTO,

    visitorProfile:
      (raw.visitorProfile as VisitorProfile | undefined) ??
      (raw.visitor_profile as VisitorProfile | undefined) ??
      preset?.visitorProfile ??
      DEFAULT_VISITOR_PROFILE,

    lat:
      raw.lat == null ? null : toNumber(raw.lat),
    lng:
      raw.lng == null ? null : toNumber(raw.lng),
  } as ShowroomDetail;
}

export async function fetchShowroomDetail(
  id: string,
): Promise<ShowroomDetail> {
  const res = await fetch(
    `/api/showrooms/${encodeURIComponent(id)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const body = await res.json().catch(() => null);

    if (res.status === 404) {
      throw new Error(
        body?.detail ??
          body?.error?.message ??
          "指定のショールームが見つかりません。",
      );
    }

    throw new Error(
      body?.detail ??
        body?.error?.message ??
        `詳細情報の取得に失敗しました。（Status: ${res.status}）`,
    );
  }

  const raw = (await res.json()) as Record<string, unknown>;
  return formatShowroomDetail(raw);
}
