"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Rating } from "./rating";
import { getSiteConfig } from "@/lib/constants";

export function SocialProof() {
  const t = useTranslations("socialProof");
  const locale = useLocale();
  const config = getSiteConfig(locale);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      {/* Avatar Stack */}
      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={`user-${index}`}
              src={`/users/${index + 1}.jpg`}
              alt={
                locale === "en" ? `User ${index + 1}` : `Usuário ${index + 1}`
              }
              width={40}
              height={40}
              className="w-10 h-10 object-cover rounded-full border-2 border-white bg-gray-200"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">
          {t("users", { count: config.social.userCount })}
        </span>

        <div className="flex items-center gap-2">
          <Rating rating={config.social.rating} size="md" showValue />
          <span className="text-sm text-gray-600">{t("rating")}</span>
        </div>
      </div>
    </div>
  );
}
