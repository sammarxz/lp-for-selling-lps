import Image from "next/image";
import { Rating } from "./rating";
import { SITE_CONFIG } from "@/lib/constants";

export function SocialProof() {
  const { social } = SITE_CONFIG;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      {/* Avatar Stack */}
      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={`user-${index}`}
              src={`/users/${index + 1}.jpg`}
              alt={`Usuário ${index + 1}`}
              width={40}
              height={40}
              className="w-10 h-10 object-cover rounded-full border-2 border-white bg-gray-200"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">
          +{social.userCount} Empreendedores já aprovaram
        </span>

        <div className="flex items-center gap-2">
          <Rating rating={social.rating} size="md" showValue />
          <span className="text-sm text-gray-600">{social.ratingText}</span>
        </div>
      </div>
    </div>
  );
}
