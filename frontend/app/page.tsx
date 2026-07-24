"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/home/Hero";
import { ServiceOverview } from "@/components/home/ServiceOverview";
import { NoticeList } from "@/components/home/NoticeList";
import { fetchNotices } from "@/lib/api/notices";
import { NoticeItem, EventInfo } from "@/types/notice";

export default function TopPage() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [event, setEvent] = useState<EventInfo | null>(null);

  useEffect(() => {
    fetchNotices()
      .then((res) => {
        setNotices(res.notices);
        setEvent(res.events[0] ?? null);
      })
      .catch(() => {
        setNotices([]);
        setEvent(null);
      });
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4">
      <Hero />
      <ServiceOverview />
      <NoticeList notices={notices} event={event} />
    </main>
  );
}
