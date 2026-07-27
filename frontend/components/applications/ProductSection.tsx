"use client";

const categories = [
  "キッチン",
  "バス",
  "トイレ",
  "洗面",
  "タイル・建材",
  "窓・ドア",
  "外装・エクステリア",
  "その他",
];

type ProductSectionProps = {
  productName?: string;
  category?: string;
  description?: string;
  purpose?: string;
};

export default function ProductSection({
  productName = "",
  category = "",
  description = "",
  purpose = "",
}: ProductSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">
        展示商品情報
      </h2>

      <div className="mt-8 space-y-6">

        {/* 商品名 */}
        <div>
          <label
            htmlFor="productName"
            className="mb-2 block text-sm font-semibold"
          >
            商品名
          </label>

          <input
            id="productName"
            type="text"
            defaultValue={productName}
            placeholder="商品名を入力してください"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* 商品カテゴリ */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-semibold"
          >
            商品カテゴリ
          </label>

          <select
            id="category"
            defaultValue={category}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
          >
            <option value="">選択してください</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* 商品概要 */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold"
          >
            商品概要
          </label>

          <textarea
            id="description"
            rows={5}
            defaultValue={description}
            placeholder="商品の特徴・仕様・アピールポイントを入力してください"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* 展示目的 */}
        <div>
          <label
            htmlFor="purpose"
            className="mb-2 block text-sm font-semibold"
          >
            展示目的
          </label>

          <textarea
            id="purpose"
            rows={4}
            defaultValue={purpose}
            placeholder="展示目的や期待する効果を入力してください"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none focus:border-blue-600 focus:outline-none"
          />
        </div>

      </div>
    </section>
  );
}