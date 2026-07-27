"use client";

import Image from "next/image";
import { DEFAULT_SHOWROOM_IMAGE } from "@/lib/constants";

type ShowroomImageProps = {
  imageUrl?: string;
  alt?: string;
};

export default function ShowroomImage({
  imageUrl,
  alt = "ショールーム画像",
}: ShowroomImageProps) {
  const displayImage =
    imageUrl && imageUrl.trim() !== "" ? imageUrl : DEFAULT_SHOWROOM_IMAGE;

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative h-[420px] w-full">
        <Image
          src={displayImage}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
