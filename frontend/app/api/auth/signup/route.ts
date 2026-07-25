import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      {
        error: {
          message: "入力内容を確認できませんでした。",
        },
      },
      { status: 400 },
    );
  }

  const backendResponse = await fetch(
    `${API_BASE_URL}/users/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
        display_name: `${body.lastName} ${body.firstName}`.trim(),
        organization_name: body.companyName,
        role: "startup",
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
            "新規会員登録に失敗しました。",
        },
      },
      { status: backendResponse.status },
    );
  }

  return NextResponse.json(
    {
      id: String(responseBody.id),
      name: responseBody.display_name,
      companyName: responseBody.organization_name ?? "",
      email: responseBody.email,
      role: responseBody.role,
    },
    { status: 201 },
  );
}
