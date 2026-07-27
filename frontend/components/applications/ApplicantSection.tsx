"use client";

type ApplicantSectionProps = {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
};

export default function ApplicantSection({
  companyName = "",
  contactName = "",
  email = "",
  phone = "",
}: ApplicantSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      <h2 className="text-xl font-bold text-gray-900">
        申請者情報
      </h2>

      <div className="mt-8 grid gap-6">

        {/* 企業名 */}
        <div>
          <label
            htmlFor="companyName"
            className="mb-2 block text-sm font-semibold"
          >
            企業名
          </label>

          <input
            id="companyName"
            type="text"
            defaultValue={companyName}
            placeholder="株式会社サンプル"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* 担当者名 */}
        <div>
          <label
            htmlFor="contactName"
            className="mb-2 block text-sm font-semibold"
          >
            担当者名
          </label>

          <input
            id="contactName"
            type="text"
            defaultValue={contactName}
            placeholder="山田 太郎"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* メールアドレス */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold"
          >
            メールアドレス
          </label>

          <input
            id="email"
            type="email"
            defaultValue={email}
            placeholder="sample@example.co.jp"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* 電話番号 */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold"
          >
            電話番号
          </label>

          <input
            id="phone"
            type="tel"
            defaultValue={phone}
            placeholder="03-1234-5678"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
          />
        </div>

      </div>

    </section>
  );
}