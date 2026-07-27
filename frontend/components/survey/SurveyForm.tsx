"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { RatingInput } from "./RatingInput";
import { CommentBox } from "./CommentBox";
import { submitSurveyAnswers } from "@/lib/api/surveys";
import { SurveyAnswers, SurveyDefinition } from "@/types/survey";

export function SurveyForm({ survey }: { survey: SurveyDefinition }) {
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const updateAnswer = (id: string, value: SurveyAnswers[string]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missing = survey.questions.find(
      (q) => q.required && (answers[q.id] === undefined || answers[q.id] === "")
    );
    if (missing) {
      setError(`「${missing.label}」は必須項目です。`);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await submitSurveyAnswers(survey.token, answers);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "回答の送信に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-4 py-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-6 w-6 text-emerald-600" />
        </div>
        <h1 className="text-lg font-bold text-slate-900">ご回答ありがとうございました</h1>
        <p className="text-sm text-slate-600">
          いただいたご意見は、今後のサービス改善に活用させていただきます。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-xs text-slate-400">{survey.showroomName}</p>
        <h1 className="text-lg font-bold text-slate-900">{survey.exhibitTitle}</h1>
        <p className="mt-1 text-sm text-slate-600">
          ご来場ありがとうございます。よろしければ、展示についてのご感想をお聞かせください。
        </p>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <div className="space-y-6">
        {survey.questions.map((question) => (
          <div key={question.id} className="space-y-2 rounded-lg border border-slate-200 p-4">
            <label className="block text-sm font-medium text-slate-900">
              {question.label}
              {question.required && <span className="ml-1 text-red-500">*</span>}
            </label>

            {question.type === "rating" && (
              <RatingInput
                value={(answers[question.id] as number) ?? 0}
                onChange={(v) => updateAnswer(question.id, v)}
              />
            )}

            {question.type === "text" && (
              <CommentBox
                value={(answers[question.id] as string) ?? ""}
                onChange={(v) => updateAnswer(question.id, v)}
              />
            )}

            {question.type === "choice" && question.options && (
              <div className="space-y-2">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm has-[:checked]:border-slate-900"
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => updateAnswer(question.id, option)}
                      className="text-slate-900"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? "送信中..." : "回答を送信する"}
      </button>
    </form>
  );
}
