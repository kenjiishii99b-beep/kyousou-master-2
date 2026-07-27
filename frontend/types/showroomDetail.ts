import { FacilityCode } from "./showroom";

// ショールーム詳細画面（F05）用の型定義
// 仕様書 3.2「GET /api/showrooms/{id}」に対応

export interface ShowroomPhoto {
  id: string;
  url: string;
}

export interface VisitorProfile {
  genderRatio: {
    male: number; // %
    female: number; // %
  };
  ageBrackets: { label: string; percentage: number }[];
  visitPurpose: { label: string; percentage: number }[];
}

export interface ShowroomDetail {
  id: string;
  name: string;
  prefecture: string;
  city: string;
  address: string;
  access: string;
  businessHours: string;
  closedDays: string;
  monthlyVisitors: number;
  availableFrom: string;
  availableTo?: string;
  photos: ShowroomPhoto[];
  facilities: FacilityCode[];
  visitorProfile: VisitorProfile;
  lat: number;
  lng: number;
}
