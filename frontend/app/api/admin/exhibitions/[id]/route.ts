import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = request.cookies.get("tsl_access_token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        error: {
          message: "\u7ba1\u7406\u8005\u30ed\u30b0\u30a4\u30f3\u304c\u5fc5\u8981\u3067\u3059\u3002",
        },
      },
      { status: 401 },
    );
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);

  const backendResponse = await fetch(
    `${API_BASE_URL}/api/admin/exhibitions/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: body?.status,
        reason: body?.reason ?? null,
      }),
      cache: "no-store",
    },
  );

  const responseBody = await backendResponse.json().catch(() => null);

  if (!backendResponse.ok) {
    const message =
      typeof responseBody?.detail === "string"
        ? responseBody.detail
        : "\u30b9\u30c6\u30fc\u30bf\u30b9\u306e\u66f4\u65b0\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002";

    return NextResponse.json(
      {
        error: {
          message,
        },
      },
      { status: backendResponse.status },
    );
  }

  return NextResponse.json(responseBody, { status: 200 });
}
