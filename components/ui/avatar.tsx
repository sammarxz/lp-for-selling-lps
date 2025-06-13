import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  initials?: string;
  className?: string;
}

const avatarSizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-base",
};

export function Avatar({
  src,
  alt,
  size = "md",
  initials,
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-gray-200 flex items-center justify-center",
        avatarSizes[size],
        className
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : initials ? (
        <span className="font-medium text-gray-600">{initials}</span>
      ) : null}
    </div>
  );
}
