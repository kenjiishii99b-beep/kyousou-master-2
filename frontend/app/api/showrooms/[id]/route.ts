import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const response = await fetch(
    `${API_BASE_URL}/api/showrooms/${encodeURIComponent(id)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    },
  );

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return NextResponse.json(
      body ?? {
        error: {
          code: "E004",
          message: "指定のショールームが見つかりません。",
        },
      },
      { status: response.status },
    );
  }

  return NextResponse.json(body, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
