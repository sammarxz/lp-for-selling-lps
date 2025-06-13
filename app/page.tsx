"use client";

import { ChatSection } from "@/components/sections/chat";
import { HeroSection } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { useScrollTracking } from "@/hooks/useScrollTracking";

export default function Home() {
  useScrollTracking();

  return (
    <div className="py-12 md:py-32 min-h-screen font-sans relative space-y-24 md:space-y-32">
      <HeroSection />
      <Projects />
      <ChatSection />
    </div>
  );
}
