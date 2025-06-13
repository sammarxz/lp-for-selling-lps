"use client";

import { useTranslations } from "next-intl";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SocialProof } from "@/components/ui/social-proof";
import { ArrowDownIcon } from "@/components/ui/arrow-down-icon";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function HeroSection() {
  const t = useTranslations();

  return (
    <header className="max-w-xl mx-auto px-6 space-y-12">
      <div className="flex items-center justify-between">
        {/* Author Info */}
        <div className="flex items-center gap-3">
          <Avatar src={"/sammarxz.jpeg"} alt={`Sam Marxz photo`} size="md" />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">
              {t("author.name")}
            </div>
            <div className="text-xs text-gray-500">{t("author.role")}</div>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Headline */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-gray-900">
          {t("hero.title")}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          {t("hero.description")}
        </p>
      </div>

      {/* CTA & Badge */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <Button
          href="#chat"
          size="lg"
          className="group relative overflow-hidden"
        >
          <span className="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">
            {t("hero.cta")}
          </span>
          <span className="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowDownIcon className="h-6 w-6" />
          </span>
        </Button>

        <Badge className="inline-flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          {t("hero.badge")}
        </Badge>
      </div>

      {/* Social Proof */}
      <SocialProof />
    </header>
  );
}
