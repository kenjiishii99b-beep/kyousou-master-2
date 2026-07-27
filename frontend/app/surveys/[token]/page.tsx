"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SurveyForm } from "@/components/survey/SurveyForm";
import { fetchSurvey } from "@/lib/api/surveys";
import { SurveyDefinition } from "@/types/survey";

export default function SurveyPage() {
  const params = useParams<{ token: string }>();
  const [survey, setSurvey] = useState<SurveyDefinition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSurvey(params.token)
      .then(setSurvey)
      .catch((e) => setError(e instanceof Error ? e.message : "取得に失敗しました。"))
      .finally(() => setLoading(false));
  }, [params.token]);

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      {loading && <div className="h-64 animate-pulse rounded-lg bg-slate-100" />}

      {!loading && (error || !survey) && (
        <p className="py-16 text-center text-sm text-slate-600">
          {error ?? "アンケートが見つかりませんでした。"}
        </p>
      )}

      {!loading && survey && <SurveyForm survey={survey} />}
    </main>
  );
}
