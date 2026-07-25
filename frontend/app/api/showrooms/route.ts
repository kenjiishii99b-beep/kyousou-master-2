import { NextResponse } from "next/server";

const data = {
  items: [
    {
      id: "1",
      name: "Techzeron Startup Lab東京",
      prefecture: "東京都",
      city: "新宿区",
      address: "西新宿1-24-1",
      monthlyVisitors: 2150,
      facilities: ["kitchen", "bath", "toilet", "washroom"],
      availableFrom: "2024-06-01",
      thumbnailUrl: "/showroom-main.jpg",
      lat: 35.6895,
      lng: 139.6917,
    },
    {
      id: "2",
      name: "Techzeron Startup Lab大阪",
      prefecture: "大阪府",
      city: "大阪市北区",
      address: "梅田3-1-3",
      monthlyVisitors: 1870,
      facilities: ["kitchen", "window_door", "exterior"],
      availableFrom: "2024-07-15",
      thumbnailUrl: "/placeholder.svg",
      lat: 34.7055,
      lng: 135.4983,
    },
    {
      id: "3",
      name: "Techzeron Startup Lab福岡",
      prefecture: "福岡県",
      city: "福岡市中央区",
      address: "天神1-4-1",
      monthlyVisitors: 1420,
      facilities: ["bath", "washroom", "tile_material", "other"],
      availableFrom: "2024-08-01",
      thumbnailUrl: "/placeholder.svg",
      lat: 33.5903,
      lng: 130.4017,
    },
    {
      id: "4",
      name: "Techzeron Startup Lab名古屋",
      prefecture: "愛知県",
      city: "名古屋市中区",
      address: "栄3-15-1",
      monthlyVisitors: 980,
      facilities: ["kitchen", "toilet", "tile_material"],
      availableFrom: "2024-09-01",
      thumbnailUrl: "/placeholder.svg",
      lat: 35.1681,
      lng: 136.9066,
    },
    {
      id: "5",
      name: "Techzeron Startup Lab札幌",
      prefecture: "北海道",
      city: "札幌市中央区",
      address: "北4条西4-1",
      monthlyVisitors: 1250,
      facilities: ["kitchen", "bath", "toilet", "washroom"],
      availableFrom: "2024-06-01",
      thumbnailUrl: "/placeholder.svg",
      lat: 43.0687,
      lng: 141.3508,
    },
  ],
  total: 5,
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const _prefecture = params.get("prefecture");
  const _category = params.get("category");
  const _visitorAttribute = params.get("visitor_attribute");
  const _equipments = params.getAll("equipments[]");

  return NextResponse.json(data);
}
