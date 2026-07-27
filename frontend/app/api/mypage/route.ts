import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      profile: {
        lastName: "山田",
        firstName: "太郎",
        companyName: "株式会社サンプル",
        email: "taro.yamada@sample.co.jp",
        phone: "03-1234-5678",
      },
      applications: [
        {
          id: "a1",
          showroomId: "1",
          showroomName: "Techzeron Startup Lab東京",
          categories: ["キッチン", "バス"],
          periodFrom: "2024-06-01",
          periodTo: "2024-06-30",
          status: "exhibiting",
        },
        {
          id: "a2",
          showroomId: "2",
          showroomName: "Techzeron Startup Lab大阪",
          categories: ["外装・エクステリア"],
          periodFrom: "2024-07-15",
          periodTo: "2024-08-10",
          status: "pending",
        },
        {
          id: "a3",
          showroomId: "3",
          showroomName: "Techzeron Startup Lab福岡",
          categories: ["その他"],
          periodFrom: "2024-04-01",
          periodTo: "2024-04-30",
          status: "finished",
        },
      ],
      reports: [
        {
          id: "r1",
          title: "スマート収納システム 展示結果レポート",
          date: "2024-05-01",
          downloadUrl: "/dummy-report.pdf",
        },
      ],
    },
    { status: 200 }
  );
}
