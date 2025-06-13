import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";

interface LinkPreviewProps {
  title: string;
  description: string;
  url: string;
  image: string;
  domain: string;
}

export function LinkPreview({
  title,
  description,
  url,
  image,
  domain,
}: LinkPreviewProps) {
  console.log(title, image);

  return (
    <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-gray-300 transition-colors max-w-sm">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        {/* Image */}
        <div className="relative h-32 bg-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 384px"
          />
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-500 uppercase font-medium">
              {domain}
            </span>
            <ExternalLinkIcon className="w-3 h-3 text-gray-400" />
          </div>

          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
            {title}
          </h3>

          <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
        </div>
      </a>
    </div>
  );
}
