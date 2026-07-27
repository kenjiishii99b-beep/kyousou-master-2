import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("tsl_access_token")?.value;

  if (!token) {
    redirect("/login?as=admin");
  }

  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    redirect("/login?as=admin");
  }

  const member = await response.json();

  if (member.role !== "admin") {
    redirect("/mypage");
  }

  return <>{children}</>;
}
