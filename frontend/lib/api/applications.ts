import { ApplicationFormData } from "@/types/application";

export async function submitApplication(
  data: ApplicationFormData
): Promise<{ applicationId: string }> {
  const res = await fetch("/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? "申請の送信に失敗しました。");
  }

  return res.json();
}
