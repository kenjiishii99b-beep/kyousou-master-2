import { VisitorProfile } from "@/types/showroomDetail";

export function VisitorProfileCard({
  profile,
}: {
  profile: VisitorProfile;
}) {
  return (
    <div className="space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-sm font-semibold text-slate-900">
        来場者属性（参考）
      </h2>

      <div className="space-y-1">
        <p className="text-xs text-slate-500">性別比率</p>
        <div className="flex h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="bg-blue-600"
            style={{ width: `${profile.genderRatio.male}%` }}
          />
          <div
            className="bg-rose-400"
            style={{ width: `${profile.genderRatio.female}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-600">
          <span>男性 {profile.genderRatio.male}%</span>
          <span>女性 {profile.genderRatio.female}%</span>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-slate-500">年齢層</p>
        <div className="space-y-1">
          {profile.ageBrackets.map((bracket) => (
            <div
              key={bracket.label}
              className="flex items-center gap-2 text-xs"
            >
              <span className="w-10 shrink-0 text-slate-600">
                {bracket.label}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-slate-700"
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

      <div className="space-y-1">
        <p className="text-xs text-slate-500">来場目的</p>
        <div className="space-y-1">
          {profile.visitPurpose.map((purpose) => (
            <div
              key={purpose.label}
              className="flex items-center gap-2 text-xs"
            >
              <span className="w-16 shrink-0 text-slate-600">
                {purpose.label}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-slate-700"
                  style={{ width: `${purpose.percentage}%` }}
                />
              </div>
              <span className="w-9 shrink-0 text-right text-slate-600">
                {purpose.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
