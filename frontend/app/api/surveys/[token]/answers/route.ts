import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  return NextResponse.json({ success: true }, { status: 200 });
}
