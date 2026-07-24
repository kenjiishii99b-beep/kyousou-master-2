import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;

  return NextResponse.json(
    {
      success: true,
      token,
    },
    { status: 200 }
  );
}