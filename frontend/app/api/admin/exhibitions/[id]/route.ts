import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await request.json();
  const { status, reason } = body;

  // ダミーデータから該当するexhibitionを返す
  const item = {
    id: id,
    showroomName: "Techzeron Startup Lab東京",
    companyName: "株式会社サンプル",
    categories: ["キッチン", "バス"],
    periodFrom: "2024-06-01",
    periodTo: "2024-06-30",
    status: status,
  };

  return NextResponse.json(
    { item },
    { status: 200 }
  );
}
