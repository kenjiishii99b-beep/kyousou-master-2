import { SearchFilters, Showroom } from "@/types/showroom";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface FetchShowroomsResponse {
  items: Showroom[];
  total: number;
}

export async function fetchShowrooms(filters: SearchFilters): Promise<FetchShowroomsResponse> {
  const params = new URLSearchParams();

  if (filters.prefecture) {
    params.append("prefecture", filters.prefecture);
  }

  const url = `${API_BASE_URL}/api/showrooms/?${params.toString()}`;

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

  // 💡 Azureのカラムデータをフロントエンドの型に安全にマッピングします
  const formatShowrooms = (list: any[]): Showroom[] => {
    return list.map((item) => {
      // 1. facilities のパース（前回の修正分）
      let parsedFacilities = [];
      if (typeof item.facilities === "string") {
        try {
          parsedFacilities = JSON.parse(item.facilities);
        } catch (e) {
          parsedFacilities = [];
        }
      } else if (Array.isArray(item.facilities)) {
        parsedFacilities = item.facilities;
      }

      // 2. 画面が期待するプロパティへのマッピングとオプショナル保護
      return {
        ...item,
        facilities: parsedFacilities,
        
        // 💡 Azure上の `capacity` を `monthlyVisitors` としてマッピング（なければ0）
        monthlyVisitors: typeof item.capacity === "number" ? item.capacity : (item.monthlyVisitors ?? 0),
        
        // 💡 `availableFrom` が未定義の場合のフォールバック（日付文字列など）
        availableFrom: item.availableFrom ?? (item.created_at ? new Date(item.created_at).toLocaleDateString() : "随時"),
      };
    });
  };

  if (Array.isArray(data)) {
    return {
      items: formatShowrooms(data),
      total: data.length,
    };
  }

  return {
    items: formatShowrooms(data.items || []),
    total: data.total || 0,
  };
}
