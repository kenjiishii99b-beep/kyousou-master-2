import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("tsl_access_token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        error: {
          message:
            "\u7ba1\u7406\u8005\u30ed\u30b0\u30a4\u30f3\u304c\u5fc5\u8981\u3067\u3059\u3002",
        },
      },
      { status: 401 },
    );
  }

  const backendResponse = await fetch(
    `${API_BASE_URL}/api/admin/exhibitions`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const responseBody = await backendResponse
    .json()
    .catch(() => null);

  if (!backendResponse.ok) {
    const message =
      typeof responseBody?.detail === "string"
        ? responseBody.detail
        : "\u5c55\u793a\u4e00\u89a7\u306e\u53d6\u5f97\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002";

    return NextResponse.json(
      {
        error: {
          message,
        },
      },
      { status: backendResponse.status },
    );
  }

  return NextResponse.json(responseBody, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get("tsl_access_token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        error: {
          message:
            "\u7ba1\u7406\u8005\u30ed\u30b0\u30a4\u30f3\u304c\u5fc5\u8981\u3067\u3059\u3002",
        },
      },
      { status: 401 },
    );
  }

  const confirm = "DELETE_ALL_EXHIBITIONS";

  const backendResponse = await fetch(
    `${API_BASE_URL}/api/admin/exhibitions/all?confirm=${encodeURIComponent(
      confirm,
    )}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const responseBody = await backendResponse
    .json()
    .catch(() => null);

  if (!backendResponse.ok) {
    const message =
      typeof responseBody?.detail === "string"
        ? responseBody.detail
        : "\u5c55\u793a\u30c7\u30fc\u30bf\u306e\u524a\u9664\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002";

    return NextResponse.json(
      {
        error: {
          message,
        },
      },
      { status: backendResponse.status },
    );
  }

  return NextResponse.json(responseBody, {
    status: 200,
  });
}
