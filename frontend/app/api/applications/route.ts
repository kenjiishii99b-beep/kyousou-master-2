import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { applicationId: "app_001" },
    { status: 201 }
  );
}
