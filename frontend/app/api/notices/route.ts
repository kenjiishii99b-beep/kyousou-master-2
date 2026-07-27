import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    notices: [
      {
        id: "n1",
        type: "notice",
        title: "「Techzeron Startup Lab」サービス正式リリースのお知らせ",
        date: "2024/06/01",
      },
      {
        id: "n2",
        type: "event",
        title: "【7/10開催】スタートアップ向けショールーム活用セミナー",
        date: "2024/05/28",
      },
      {
        id: "n3",
        type: "notice",
        title: "ショールーム「名古屋」追加オープンのお知らせ",
        date: "2024/05/15",
      },
      {
        id: "n4",
        type: "notice",
        title: "システムメンテナンスのお知らせ（6/8 0:00〜6:00）",
        date: "2024/05/10",
      },
    ],
    events: [
      {
        id: "e1",
        title: "スタートアップ向けショールーム活用セミナー",
        date: "7.10（水）",
        time: "14:00〜16:00",
        format: "オンライン開催（参加無料）",
      },
    ],
  });
}
