import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const lastName = body?.lastName ?? "";
  const firstName = body?.firstName ?? "";
  const companyName = body?.companyName ?? "";
  const email = body?.email ?? "";

  return NextResponse.json(
    {
      user: {
        id: "u2",
        name: `${lastName} ${firstName}`.trim(),
        companyName,
        email,
        role: "startup",
      },
    },
    { status: 201 }
  );
}
