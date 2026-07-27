import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const body = await request.json();
  const { status, reason } = body;

  // ダミーデータから該当するexhibitionを返す
  const item = {
    id,
    showroomName: "Techzeron Startup Lab東京",
    companyName: "株式会社サンプル",
    categories: ["キッチン", "バス"],
    periodFrom: "2024-06-01",
    periodTo: "2024-06-30",
    status,
  };

  return NextResponse.json(
    { item },
    { status: 200 }
  );
}