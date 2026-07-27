"use client";

type AgreementSectionProps = {
  required?: boolean;
};

export default function AgreementSection({
  required = true,
}: AgreementSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">
        利用規約・同意事項
      </h2>

      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <div className="max-h-56 overflow-y-auto text-sm leading-7 text-gray-600">
          <p>
            展示申請を行う前に、以下の内容をご確認ください。
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>申請内容は審査後に承認・却下を決定します。</li>
            <li>展示内容によっては追加資料をご提出いただく場合があります。</li>
            <li>展示期間・展示場所は調整となる場合があります。</li>
            <li>虚偽の申請が確認された場合は申請を取り消します。</li>
            <li>展示物の管理責任は申請者が負います。</li>
          </ul>
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3">
        <input
          type="checkbox"
          required={required}
          className="mt-1 h-5 w-5 rounded border-gray-300"
        />

        <span className="text-sm text-gray-700">
          利用規約および個人情報保護方針に同意します。
        </span>
      </label>
    </section>
  );
}