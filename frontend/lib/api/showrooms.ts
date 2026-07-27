import { SearchFilters, Showroom } from "@/types/showroom";

const API_BASE_URL = "http://127.0.0.1:8000";

interface FetchShowroomsResponse {
  items: Showroom[];
  total: number;
}

export async function fetchShowrooms(
  filters: SearchFilters
): Promise<FetchShowroomsResponse> {
  const params = new URLSearchParams();

  // 都道府県
  if (filters.prefecture) {
    params.append("prefecture", filters.prefecture);
  }

  // 地域
  if (filters.area) {
    params.append("area", filters.area);
  }

  // カテゴリ
  if (filters.categories && filters.categories.length > 0) {
    params.append("categories", filters.categories.join(","));
  }

  // 来場者属性
  if (filters.visitorAttribute) {
    params.append("visitorAttribute", filters.visitorAttribute);
  }

  const url = `${API_BASE_URL}/api/showrooms/?${params.toString()}`;

  console.log("検索URL:", url);
  console.log("検索条件:", filters);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`APIエラーが発生しました (Status: ${res.status})`);
  }

  const data = await res.json();

  const formatShowrooms = (list: any[]): Showroom[] => {
    return list.map((item) => {
      let parsedFacilities: string[] = [];

      if (typeof item.facilities === "string") {
        try {
          parsedFacilities = JSON.parse(item.facilities);
        } catch {
          parsedFacilities = [];
        }
      } else if (Array.isArray(item.facilities)) {
        parsedFacilities = item.facilities;
      }

      return {
        ...item,

        // FastAPI(image_url) → フロント(thumbnailUrl)
        thumbnailUrl: item.image_url,

        facilities: parsedFacilities,

        monthlyVisitors:
          typeof item.capacity === "number"
            ? item.capacity
            : (item.monthlyVisitors ?? 0),

        availableFrom:
          item.availableFrom ??
          (item.created_at
            ? new Date(item.created_at).toLocaleDateString()
            : "随時"),
      };
    });
  };

  return {
    items: formatShowrooms(data.items ?? []),
    total: data.total ?? 0,
  };
}