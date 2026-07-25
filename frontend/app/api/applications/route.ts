import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken =
    cookieStore.get("tsl_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      {
        error: {
          message: "ログインが必要です。",
        },
      },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      {
        error: {
          message: "展示申請の入力内容を確認できませんでした。",
        },
      },
      { status: 400 },
    );
  }

  const backendResponse = await fetch(
    `${API_BASE_URL}/api/applications`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        showroomId: Number(body.showroomId),
        showroomName: body.showroomName ?? "",
        periodFrom: body.periodFrom,
        periodTo: body.periodTo,
        categories: body.categories ?? [],
        exhibitTitle: body.exhibitTitle,
        exhibitDescription: body.exhibitDescription,
      }),
      cache: "no-store",
    },
  );

  const responseBody = await backendResponse
    .json()
    .catch(() => null);

  if (!backendResponse.ok) {
    return NextResponse.json(
      {
        error: {
          message:
            responseBody?.detail ??
            "展示申請の登録に失敗しました。",
        },
      },
      { status: backendResponse.status },
    );
  }

  return NextResponse.json(
    responseBody,
    { status: 201 },
  );
}
