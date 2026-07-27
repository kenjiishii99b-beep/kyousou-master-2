"use client";

import { useState } from "react";
import Image from "next/image";
import { ShowroomPhoto } from "@/types/showroomDetail";

// 💡 デフォルト画像（写真データが未設定の場合のフォールバック画像）
const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%' height='100%' fill='%23f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='16'>画像準備中</text></svg>";

interface PhotoGalleryProps {
  photos?: ShowroomPhoto[]; // 💡 undefined を許容
  alt: string;
}

// 💡 デフォルト引数 photos = [] を追加
export function PhotoGallery({ photos = [], alt }: PhotoGalleryProps) {
  // 安全に photos[0] へアクセス
  const [activeId, setActiveId] = useState<string | undefined>(photos?.[0]?.id);

  // photos が空配列または undefined の場合の安全ガード
  const safePhotos = photos ?? [];
  const active = safePhotos.find((p) => p.id === activeId) ?? safePhotos[0];

  // 写真が1枚もない場合（DB側にデータがない場合）はフォールバック用画像を表示
  if (!safePhotos.length || !active) {
    return (
      <div className="relative h-72 w-full overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
        <Image src={FALLBACK_IMAGE} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* メイン画像 */}
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
        <Image
          src={active.url || FALLBACK_IMAGE}
          alt={alt}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* サムネイル一覧（複数枚ある場合） */}
      {safePhotos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safePhotos.map((p, idx) => (
            <button
              key={p.id ?? idx}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                (activeId ?? safePhotos[0]?.id) === p.id
                  ? "border-slate-900 ring-1 ring-slate-900"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={p.url || FALLBACK_IMAGE}
                alt={`${alt} ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
