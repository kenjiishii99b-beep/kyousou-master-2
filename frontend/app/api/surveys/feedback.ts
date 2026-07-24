import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. フロントエンド（画面）から送信された入力データを受け取る
    const body = await request.json();
    
    // 中身の確認（rating, purpose, comment などが入っています）
    console.log("受信したデータ:", body);

    // 💡 2. ここでAzureのデータベースや、Azureで動いている別APIにデータを送る処理を書きます
    // 例: await fetch("https://your-azure-backend.../api/feedback", { ... })

    // 3. 画面側に成功したことを返す
    return NextResponse.json(
      { status: "success", message: "アンケートを送信しました" },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("エラーが発生しました:", error);
    // エラーが起きた場合は500エラーを返す
    return NextResponse.json(
      { status: "error", message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}