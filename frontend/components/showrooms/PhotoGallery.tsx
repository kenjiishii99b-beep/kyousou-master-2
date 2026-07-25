"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShowroomPhoto } from "@/types/showroomDetail";

const FALLBACK_IMAGE = "/images/showrooms/showroom-main-v2.jpg";

function GalleryImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_IMAGE);

  useEffect(() => {
    setCurrentSrc(src || FALLBACK_IMAGE);
  }, [src]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover"
      priority={priority}
      onError={() => setCurrentSrc(FALLBACK_IMAGE)}
    />
  );
}

export function PhotoGallery({
  photos,
  alt,
}: {
  photos: ShowroomPhoto[];
  alt: string;
}) {
  const safePhotos =
    Array.isArray(photos) && photos.length > 0
      ? photos
      : [{ id: "fallback", url: FALLBACK_IMAGE }];

  const [activeId, setActiveId] = useState(safePhotos[0].id);

  useEffect(() => {
    setActiveId(safePhotos[0].id);
  }, [safePhotos[0].id]);

  const active =
    safePhotos.find((photo) => photo.id === activeId) ??
    safePhotos[0];

  return (
    <div className="space-y-2">
      <div className="relative h-64 w-full overflow-hidden rounded-lg bg-slate-100 sm:h-80">
        <GalleryImage
          src={active.url}
          alt={`${alt}の外観`}
          sizes="(min-width: 640px) 600px, 100vw"
          priority
        />
      </div>

      {safePhotos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {safePhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveId(photo.id)}
              aria-label={`${alt}の画像を表示`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 ${
                photo.id === active.id
                  ? "border-slate-900"
                  : "border-transparent"
              }`}
            >
              <GalleryImage
                src={photo.url}
                alt=""
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
