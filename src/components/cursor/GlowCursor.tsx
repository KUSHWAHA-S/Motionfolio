"use client";
import { useEffect, useState } from "react";
import "./GlowCursor.css";

interface GlowCursorProps {
  color?: string;
}

export default function GlowCursor({
  color = "rgba(99, 102, 241, 0.35)",
}: GlowCursorProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Convert hex color to rgba for the gradient
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getGradientColors = () => {
    if (color.startsWith("#")) {
      return {
        primary: hexToRgba(color, 0.35),
        secondary: hexToRgba(color, 0.15),
        tertiary: hexToRgba(color, 0.05),
      };
    }
    // Default indigo if color is already rgba or invalid
    return {
      primary: "rgba(99, 102, 241, 0.35)",
      secondary: "rgba(99, 102, 241, 0.15)",
      tertiary: "rgba(99, 102, 241, 0.05)",
    };
  };

  const gradientColors = getGradientColors();

  return (
    <div
      className="cursor-glow"
      style={{
        left: pos.x,
        top: pos.y,
        background: `radial-gradient(circle, ${gradientColors.primary} 0%, ${gradientColors.secondary} 30%, ${gradientColors.tertiary} 50%, transparent 70%)`,
      }}
    />
  );
}
