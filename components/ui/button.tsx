import { forwardRef } from "react";

import * as fbpixel from "@/lib/fbpixel";
import * as gtag from "@/lib/gtag";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  trackingEvent?: "lead" | "checkout" | "custom";
  trackingData?: Record<string, any>;
}

const buttonVariants = {
  primary: "bg-neutral-950 text-neutral-200 hover:bg-neutral-800",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
};

const buttonSizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6",
  lg: "h-14 px-8 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      children,
      trackingEvent,
      trackingData,
      onClick,
      ...props
    },
    ref
  ) => {
    const locale = useLocale();

    const baseClasses =
      "cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

    const classes = cn(
      baseClasses,
      buttonVariants[variant],
      buttonSizes[size],
      className
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Tracking do Facebook Pixel
      if (trackingEvent === "lead") {
        fbpixel.trackLead(children?.toString());
      } else if (trackingEvent === "checkout") {
        fbpixel.trackInitiateCheckout(trackingData?.source);
      }

      // Tracking do Google Analytics
      if (trackingEvent === "lead") {
        gtag.trackCTAClick(children?.toString(), locale);
      } else if (trackingEvent === "checkout") {
        gtag.trackWhatsAppRedirect(trackingData?.source, locale);
      }

      if (onClick) {
        onClick(e);
      }
    };

    const handleLinkClick = () => {
      // Tracking do Facebook Pixel
      if (trackingEvent === "lead") {
        fbpixel.trackLead(children?.toString());
      } else if (trackingEvent === "checkout") {
        fbpixel.trackInitiateCheckout(trackingData?.source);
      }

      // Tracking do Google Analytics
      if (trackingEvent === "lead") {
        gtag.trackCTAClick(children?.toString(), locale);
      } else if (trackingEvent === "checkout") {
        gtag.trackWhatsAppRedirect(trackingData?.source, locale);
      }
    };

    if (href) {
      return (
        <a href={href} className={classes} onClick={handleLinkClick}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
