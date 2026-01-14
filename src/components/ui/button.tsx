// src/components/ui/Button.tsx
"use client";
import React from "react";
import clsx from "clsx";
import { colors } from "@/lib/colors";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  children,
  variant = "default",
  size = "md",
  ...rest
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "default":
        return {
          backgroundColor: colors.primary,
          color: "#FFFFFF",
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: colors.text,
        };
      case "outline":
        return {
          backgroundColor: colors.card,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        };
      default:
        return {
          backgroundColor: colors.primary,
          color: "#FFFFFF",
        };
    }
  };

  const baseStyles = getVariantStyles();

  return (
    <button
      {...rest}
      className={clsx(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer",
        size === "sm" && "px-2 py-1 text-sm",
        size === "md" && "px-3 py-1.5 text-base",
        size === "lg" && "px-4 py-2 text-lg",
        className
      )}
      style={baseStyles}
      onMouseEnter={(e) => {
        if (variant === "default") {
          e.currentTarget.style.backgroundColor = colors.primaryHover;
        } else if (variant === "ghost") {
          e.currentTarget.style.backgroundColor = colors.primaryRgba["10"];
        } else if (variant === "outline") {
          e.currentTarget.style.backgroundColor = colors.background;
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "default") {
          e.currentTarget.style.backgroundColor = colors.primary;
        } else if (variant === "ghost") {
          e.currentTarget.style.backgroundColor = "transparent";
        } else if (variant === "outline") {
          e.currentTarget.style.backgroundColor = colors.card;
        }
      }}
    >
      {children}
    </button>
  );
}

export default Button;
