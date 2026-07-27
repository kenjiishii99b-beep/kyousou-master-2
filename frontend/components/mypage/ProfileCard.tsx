import Link from "next/link";
import { Building2, Mail, Phone, Pencil } from "lucide-react";
import { ProfileInfo } from "@/types/mypage";

export function ProfileCard({ profile }: { profile: ProfileInfo }) {
  return (
    <div className="rounded-lg border border-slate-200 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400">登録情報</p>
          <h2 className="mt-0.5 text-lg font-bold text-slate-900">
            {profile.lastName} {profile.firstName}
          </h2>
        </div>
        <Link
          href="/mypage/edit"
          className="flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <Pencil className="h-3.5 w-3.5" />
          編集する
        </Link>
      </div>

      <dl className="mt-4 space-y-2 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 shrink-0 text-slate-400" />
          <dd>{profile.companyName}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 shrink-0 text-slate-400" />
          <dd>{profile.email}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 shrink-0 text-slate-400" />
          <dd>{profile.phone}</dd>
        </div>
      </dl>
    </div>
  );
}
