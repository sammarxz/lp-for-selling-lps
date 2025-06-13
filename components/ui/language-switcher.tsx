"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "./button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: "pt" | "en") => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
      <Button
        variant={locale === "pt" ? "primary" : "ghost"}
        size="sm"
        onClick={() => switchLanguage("pt")}
        className="text-xs min-w-[40px]"
      >
        🇧🇷 PT
      </Button>
      <Button
        variant={locale === "en" ? "primary" : "ghost"}
        size="sm"
        onClick={() => switchLanguage("en")}
        className="text-xs min-w-[40px]"
      >
        🇺🇸 EN
      </Button>
    </div>
  );
}
