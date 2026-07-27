import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email;
  const password = body?.password;

  if (!email || !password) {
    return NextResponse.json(
      {
        error: {
          code: "E001",
          message: "メールアドレスとパスワードを入力してください。",
        },
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    user: {
      id: "u1",
      name: "山田 太郎",
      companyName: "株式会社サンプル",
      email,
      role: "startup",
    },
  });
}
