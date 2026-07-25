import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken =
      cookieStore.get("tsl_access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          error: {
            message: "ログインが必要です。",
          },
        },
        { status: 401 },
      );
    }

    const authHeaders = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const [
      memberResponse,
      applicationResponse,
      reportResponse,
    ] = await Promise.all([
      fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        headers: authHeaders,
        cache: "no-store",
      }),
      fetch(`${API_BASE_URL}/api/applications/mine`, {
        method: "GET",
        headers: authHeaders,
        cache: "no-store",
      }),
      fetch(`${API_BASE_URL}/api/mypage/reports`, {
        method: "GET",
        headers: authHeaders,
        cache: "no-store",
      }),
    ]);

    const memberBody = await memberResponse
      .json()
      .catch(() => null);

    const applicationBody = await applicationResponse
      .json()
      .catch(() => null);

    const reportBody = await reportResponse
      .json()
      .catch(() => null);

    if (!memberResponse.ok) {
      return NextResponse.json(
        {
          error: {
            message:
              memberBody?.detail ??
              "会員情報の取得に失敗しました。",
          },
        },
        { status: memberResponse.status },
      );
    }

    if (!applicationResponse.ok) {
      return NextResponse.json(
        {
          error: {
            message:
              applicationBody?.detail ??
              "展示申請履歴の取得に失敗しました。",
          },
        },
        { status: applicationResponse.status },
      );
    }

    if (!reportResponse.ok) {
      throw new Error(
        reportBody?.detail ??
          "レポート履歴の取得に失敗しました。",
      );
    }

    const displayName =
      memberBody.display_name?.trim() ?? "";

    const nameParts = displayName
      ? displayName.split(/\s+/)
      : [];

    return NextResponse.json(
      {
        profile: {
          lastName: nameParts[0] ?? "",
          firstName: nameParts.slice(1).join(" "),
          companyName:
            memberBody.organization_name ?? "",
          email: memberBody.email ?? "",
          phone: "",
        },
        applications:
          applicationBody?.applications ?? [],
        reports: reportBody?.reports ?? [],
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message:
            error instanceof Error
              ? error.message
              : "マイページ情報の取得に失敗しました。",
        },
      },
      { status: 502 },
    );
  }
}
