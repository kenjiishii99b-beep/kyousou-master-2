import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="grid gap-8 py-8 md:grid-cols-2 md:items-center">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold leading-snug text-slate-900 md:text-3xl">
          住生活領域の共創で、
          <br />
          未来のくらしをつくる。
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Techzeron Startup Labは、住設のショールームを活用し、スタートアップ企業の商品・サービス展示、実証実験（PoC）・顧客フィードバック収集を支援するプラットフォームです。
        </p>
        <Link
          href="/about"
          className="inline-block rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          サービスについて詳しく見る
        </Link>
      </div>

      <div className="relative h-56 w-full overflow-hidden rounded-lg bg-slate-100 md:h-72">
        <Image
          src="/showroom-main.jpg"
          alt="Techzeron Startup Labのショールームイメージ"
          fill
          sizes="(min-width: 768px) 500px, 100vw"
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
