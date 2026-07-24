"use client";

import { useSearchParams } from "next/navigation";
import { ApplicationForm } from "@/components/applications/ApplicationForm";

export default function NewApplicationPage() {
  const searchParams = useSearchParams();
  const showroomId = searchParams.get("showroomId") ?? undefined;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <ApplicationForm initialShowroomId={showroomId} />
    </main>
  );
}
