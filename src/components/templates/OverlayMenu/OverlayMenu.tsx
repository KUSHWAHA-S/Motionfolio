"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./OverlayMenu.css";

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  sections: Array<{ id: string; label: string }>;
}

export function OverlayMenu({
  isOpen,
  onClose,
  onNavigate,
  sections,
}: OverlayMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Menu open animation
  useEffect(() => {
    if (isOpen && overlayRef.current && menuItemsRef.current) {
      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Set initial states
      gsap.set(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
      });
      gsap.set(menuItemsRef.current.children, {
        opacity: 0,
        y: 30,
      });

      // Animate overlay in
      tl.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.out",
      });

      // Stagger menu items in
      tl.to(
        menuItemsRef.current.children,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.2"
      );
    }
  }, [isOpen]);

  // Menu close animation
  useEffect(() => {
    if (!isOpen && overlayRef.current && menuItemsRef.current) {
      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => {
          // Ensure overlay is hidden after animation
          if (overlayRef.current) {
            gsap.set(overlayRef.current, {
              pointerEvents: "none",
            });
          }
        },
      });
      timelineRef.current = tl;

      // Stagger menu items out
      tl.to(
        menuItemsRef.current.children,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
          stagger: 0.05,
        },
        0
      );

      // Fade overlay out
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.1"
      );
    }
  }, [isOpen]);

  const handleItemClick = (sectionId: string) => {
    onNavigate(sectionId);
    onClose();
  };

  return (
    <>
      {/* Menu Icon Button */}
      <button
        ref={menuIconRef}
        onClick={onClose}
        className="fixed top-6 right-6 z-50 w-8 h-8 flex items-center justify-center cursor-pointer group"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        style={{
          opacity: 1,
          visibility: "visible",
          zIndex: 100,
        }}
      >
        <div className="relative w-6 h-6">
          <span
            className={`absolute top-0 left-0 w-full h-0.5 transition-all duration-300 ease-out ${
              isOpen ? "rotate-45 top-2.5" : ""
            }`}
            style={{
              transformOrigin: "center",
              backgroundColor: "#8A5D69",
              opacity: 1,
            }}
          />
          <span
            className={`absolute top-2.5 left-0 w-full h-0.5 transition-all duration-300 ease-out ${
              isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
            style={{
              transformOrigin: "center",
              backgroundColor: "#8A5D69",
            }}
          />
          <span
            className={`absolute top-5 left-0 w-full h-0.5 transition-all duration-300 ease-out ${
              isOpen ? "-rotate-45 top-2.5" : ""
            }`}
            style={{
              transformOrigin: "center",
              backgroundColor: "#8A5D69",
              opacity: 1,
            }}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-md"
        style={{ opacity: 0, pointerEvents: "none" }}
        onClick={onClose}
      >
        {/* Menu Items Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <nav
            ref={menuItemsRef}
            className="text-center space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleItemClick(section.id)}
                className="block text-4xl md:text-6xl font-semibold text-slate-100 hover:text-slate-300 transition-colors cursor-pointer nav-title"
                style={{
                  opacity: 0,
                  transform: "translateY(30px)",
                  fontVariationSettings: '"wght" 400, "wdth" 100',
                  transition:
                    "font-variation-settings 0.4s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.fontVariationSettings =
                    '"wght" 900, "wdth" 130';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.fontVariationSettings =
                    '"wght" 400, "wdth" 100';
                }}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
