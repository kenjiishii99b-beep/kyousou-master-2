import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  // 1. params の型を Promise に変更します
  { params }: { params: Promise<{ token: string }> }
) {
  // 2. await を使って token を取り出します
  const { token } = await params;

  return NextResponse.json(
    {
      token: token,
      showroomName: "Techzeron Startup Lab東京",
      exhibitTitle: "スマート収納システム",
      questions: [
        {
          id: "q1",
          type: "rating",
          label: "展示内容の満足度を教えてください",
          required: true,
        },
        {
          id: "q2",
          type: "choice",
          label: "ご来場の目的は何ですか？",
          required: true,
          options: ["情報収集", "商品比較", "新規検討"],
        },
        {
          id: "q3",
          type: "text",
          label: "ご感想・ご意見があればお聞かせください",
          required: false,
        },
      ],
    },
    { status: 200 }
  );
}