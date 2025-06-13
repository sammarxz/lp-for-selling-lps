import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "popular" | "urgent";
  className?: string;
}

const badgeVariants = {
  default: "bg-gray-100 text-gray-800",
  popular: "bg-orange-500 text-white",
  urgent: "bg-red-500 text-white",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
