import { VisitorProfile } from "@/types/showroomDetail";

// 💡 profile?: VisitorProfile とすることで undefined を許容
export function VisitorProfileCard({ profile }: { profile?: VisitorProfile }) {
  // 💡 データが無い時の安全対策（フォールバック値）を用意
  const genderRatio = profile?.genderRatio ?? { male: 50, female: 50 };
  const ageBrackets = profile?.ageBrackets ?? [];
  const visitPurpose = profile?.visitPurpose ?? [];

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-sm font-semibold text-slate-900">
        来場者属性（参考）
      </h2>

      <div className="space-y-1">
        <p className="text-xs text-slate-500">性別比率</p>
        <div className="flex h-2 overflow-hidden rounded-full bg-slate-100">
          {/* 💡 profile.genderRatio ではなく安全な genderRatio を使用 */}
          <div
            className="bg-blue-600 transition-all duration-300"
            style={{ width: `${genderRatio.male}%` }}
          />
          <div
            className="bg-rose-400 transition-all duration-300"
            style={{ width: `${genderRatio.female}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-600">
          <span>男性 {genderRatio.male}%</span>
          <span>女性 {genderRatio.female}%</span>
        </div>
      </div>

      {/* 💡 年齢層データがある時だけ表示 */}
      {ageBrackets.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-slate-500">年齢層</p>
          <div className="space-y-1">
            {ageBrackets.map((bracket) => (
              <div
                key={bracket.label}
                className="flex items-center gap-2 text-xs"
              >
                <span className="w-10 shrink-0 text-slate-600">
                  {bracket.label}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full bg-slate-700 transition-all duration-300"
                    style={{ width: `${bracket.percentage}%` }}
                  />
                </div>
                <span className="w-9 shrink-0 text-right text-slate-600">
                  {bracket.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 💡 来場目的データがある時だけ表示 */}
      {visitPurpose.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-slate-500">来場目的</p>
          <ul className="space-y-1 text-xs text-slate-600">
            {visitPurpose.map((purpose) => (
              <li key={purpose.label} className="flex justify-between">
                <span>{purpose.label}</span>
                <span>{purpose.percentage}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
