"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { ApplicationForm } from "@/components/applications/ApplicationForm";

function NewApplicationContent() {
  const searchParams = useSearchParams();
  const showroomId =
    searchParams.get("showroomId") ?? undefined;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <ApplicationForm initialShowroomId={showroomId} />
    </main>
  );
}

export default function NewApplicationPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-4xl px-4 py-8">
          <div className="h-64 animate-pulse rounded-lg bg-slate-100" />
        </main>
      }
    >
      <NewApplicationContent />
    </Suspense>
  );
}
