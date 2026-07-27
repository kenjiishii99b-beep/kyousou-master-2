"use client";

type SummarySectionProps = {
  summary: string;
};

export default function SummarySection({
  summary,
}: SummarySectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* タイトル */}
      <h2 className="text-xl font-bold text-gray-900">
        スペース概要
      </h2>

      <div className="my-5 border-t border-gray-200" />

      {/* 概要 */}
      <p className="text-sm leading-8 text-gray-600 whitespace-pre-line">
        {summary}
      </p>
    </section>
  );
}