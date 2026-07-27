import { NextResponse } from "next/server";

// FastAPI の URL（環境変数がない場合はローカルの 8000 ポート）
const FASTAPI_BASE_URL = process.env.FASTAPI_BASE_URL || "http://127.0.0.1:8000";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // 💡 FastAPI 経由で Azure MySQL のショールーム詳細データを取得
    const res = await fetch(`${FASTAPI_BASE_URL}/api/showrooms/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // 最新データを取得するためキャッシュを無効化
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          error: {
            code: "E004",
            message: "指定されたショールームが見つかりません。",
          },
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("FastAPI 接続エラー:", error);
    return NextResponse.json(
      {
        error: {
          code: "E500",
          message: "データベース通信エラーが発生しました。",
        },
      },
      { status: 500 }
    );
  }
}