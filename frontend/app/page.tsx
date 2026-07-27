"use client";

import HeroSection from "@/components/home/HeroSection";
import FlowSection from "@/components/home/FlowSection";
import NoticeSection from "@/components/home/NoticeSection";
import EventSection from "@/components/home/EventSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <main className="mx-auto max-w-6xl space-y-16 px-6 py-12">
        <HeroSection />
        <FlowSection />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <NoticeSection />
          </div>

          <div className="lg:col-span-5">
            <EventSection />
          </div>
        </div>
      </main>
    </div>
  );
}
