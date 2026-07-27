import { NextRequest, NextResponse } from "next/server";

const DUMMY_EXHIBITIONS = [
  {
    id: "ex1",
    showroomName: "Techzeron Startup Lab東京",
    companyName: "株式会社サンプル",
    categories: ["キッチン", "バス"],
    periodFrom: "2024-06-01",
    periodTo: "2024-06-30",
    status: "exhibiting" as const,
  },
  {
    id: "ex2",
    showroomName: "Techzeron Startup Lab大阪",
    companyName: "株式会社テスト",
    categories: ["トイレ", "洗面"],
    periodFrom: "2024-06-10",
    periodTo: "2024-07-10",
    status: "pending" as const,
  },
  {
    id: "ex3",
    showroomName: "Techzeron Startup Lab福岡",
    companyName: "株式会社デモ",
    categories: ["タイル・建材"],
    periodFrom: "2024-06-20",
    periodTo: "2024-07-20",
    status: "finished" as const,
  },
  {
    id: "ex4",
    showroomName: "Techzeron Startup Lab東京",
    companyName: "株式会社キャンセル",
    categories: ["窓・ドア", "外装・エクステリア"],
    periodFrom: "2024-07-01",
    periodTo: "2024-07-15",
    status: "cancelled" as const,
  },
  {
    id: "ex5",
    showroomName: "Techzeron Startup Lab大阪",
    companyName: "株式会社プレビュー",
    categories: ["その他"],
    periodFrom: "2024-07-05",
    periodTo: "2024-07-31",
    status: "pending" as const,
  },
  {
    id: "ex6",
    showroomName: "Techzeron Startup Lab福岡",
    companyName: "株式会社フィニッシュ",
    categories: ["キッチン", "タイル・建材"],
    periodFrom: "2024-06-15",
    periodTo: "2024-06-25",
    status: "finished" as const,
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { items: DUMMY_EXHIBITIONS },
    { status: 200 }
  );
}
