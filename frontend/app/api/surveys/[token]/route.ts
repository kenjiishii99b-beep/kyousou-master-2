import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  const backendResponse = await fetch(
    `${API_BASE_URL}/api/surveys/${encodeURIComponent(token)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
        : "\u30a2\u30f3\u30b1\u30fc\u30c8\u306e\u53d6\u5f97\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002";

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
