import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const email = body?.email ?? "";
  const password = body?.password ?? "";
  const keepLoggedIn = Boolean(body?.keepLoggedIn);

  if (!email || !password) {
    return NextResponse.json(
      {
        error: {
          message:
            "メールアドレスとパスワードを入力してください。",
        },
      },
      { status: 400 },
    );
  }

  const backendResponse = await fetch(
    `${API_BASE_URL}/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
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
            "メールアドレスまたはパスワードが正しくありません。",
        },
      },
      { status: backendResponse.status },
    );
  }

  const member = responseBody.user;

  const response = NextResponse.json(
    {
      user: {
        id: String(member.id),
        name: member.display_name,
        companyName: member.organization_name ?? "",
        email: member.email,
        role: member.role,
      },
    },
    { status: 200 },
  );

  response.cookies.set(
    "tsl_access_token",
    responseBody.access_token,
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: keepLoggedIn ? 60 * 60 * 24 : undefined,
    },
  );

  return response;
}
