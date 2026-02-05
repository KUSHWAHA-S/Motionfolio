"use client";

import { useRef, useState } from "react";
import { ProjectCardProps } from "../types";

export function ProjectCard({ imageUrl, title, subtitle }: ProjectCardProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsOverlayVisible(true);
    setIsTextVisible(true);
  };

  const handleMouseLeave = () => {
    setIsOverlayVisible(false);
    setIsTextVisible(false);
  };

  return (
    <div
      className="group bg-gray-50 rounded-md overflow-hidden border border-gray-200 shadow-sm w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={title || "Project image"}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-2 rounded-md overflow-hidden">
          <div
            ref={overlayRef}
            className={`absolute inset-0 rounded-md bg-black/60 transition-all duration-300 ease-out origin-center ${
              isOverlayVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />

          <div
            ref={textWrapperRef}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out ${
              isTextVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col items-center space-y-1 px-4">
              <div className="relative inline-block">
                <span className="relative z-10 text-xs md:text-sm font-medium text-white whitespace-nowrap">
                  {title}
                </span>
              </div>
              <div className="relative inline-block">
                <span className="relative z-10 text-[11px] md:text-xs text-gray-200 whitespace-nowrap">
                  {subtitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
