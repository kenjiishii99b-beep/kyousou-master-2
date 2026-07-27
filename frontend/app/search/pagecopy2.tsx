// app/search/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, User } from "lucide-react";

type ApiShowroom = {
  id: number;
  name: string;
  prefecture: string;
  city: string;
  address: string;
  description: string;
  image_url: string | null;
};

export default function SearchPage() {
  const [showrooms, setShowrooms] = useState<ApiShowroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShowrooms = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://127.0.0.1:8000/api/showrooms/");
        if (!res.ok) throw new Error("API取得失敗");
        const data = await res.json();
        setShowrooms(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        console.error(e);
        setError("ショールーム情報を取得できませんでした。");
      } finally {
        setIsLoading(false);
      }
    };
    fetchShowrooms();
  }, []);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ショールーム検索</h1>
        <div className="flex items-center gap-2">
          <User size={18}/>
          <ChevronDown size={18}/>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4 mb-4">
        <strong>検索結果：{showrooms.length}件</strong>
      </div>

      {isLoading && <p>読み込み中...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!isLoading && !error && (
        <div className="space-y-4">
          {showrooms.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 flex gap-4">
              <img
                src={item.image_url ?? "/images/showroom-default.jpg"}
                alt={item.name}
                className="w-28 h-28 rounded object-cover"
              />
              <div className="flex-1">
                <Link href={`/search/${item.id}`} className="font-bold text-lg hover:text-blue-600">
                  {item.name}
                </Link>
                <p>{item.prefecture} {item.city}</p>
                <p className="text-sm text-gray-600">{item.address}</p>
                <p className="mt-2">{item.description}</p>
              </div>
            </div>
          ))}
          {showrooms.length === 0 && <p>該当するショールームがありません。</p>}
        </div>
      )}
    </main>
  );
}
