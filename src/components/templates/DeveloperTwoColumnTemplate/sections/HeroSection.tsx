"use client";

import { ChevronDown } from "lucide-react";
import { SocialLinks } from "../components/SocialLinks";
import { TypingAnimation } from "../components/TypingAnimation";
import { HeroSectionData } from "@/types/portfolio";
import { FALLBACK_HERO_IMAGE_URL } from "../constants";

interface HeroSectionProps {
  title: string;
  heroData?: HeroSectionData;
  socialLinks: {
    facebook: string;
    linkedin: string;
    google: string;
    twitter: string;
  };
}

export function HeroSection({
  title,
  heroData,
  socialLinks,
}: HeroSectionProps) {
  const heroImageUrl = heroData?.imageUrl || FALLBACK_HERO_IMAGE_URL;
  const name = title || "Your Name";
  const profession = heroData?.subtitle || "A Developer";

  const typingTexts = [`I Am ${name}.`, `I Am ${profession}.`];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden clip-path bg-transparent"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat clip-path"
        style={{
          backgroundImage: `url(${heroImageUrl})`,
          filter: "grayscale(100%) brightness(0.4) contrast(1.1)",
        }}
      >
        <div className="absolute inset-0 bg-black/40 clip-path"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-lg md:text-xl text-white/90 mb-4 font-light tracking-wide">
          Hello & Welcome
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white tracking-tight">
          <TypingAnimation texts={typingTexts} />
        </h1>

        <SocialLinks links={socialLinks} />

        <button
          className="px-8 py-3 border-2 border-white text-white font-medium hover:bg-white hover:text-slate-950 transition-all duration-300 rounded-sm"
          onClick={() => {
            if (heroData?.ctaLink) {
              window.open(heroData.ctaLink, "_blank", "noopener,noreferrer");
            }
          }}
        >
          {heroData?.ctaText || "Download CV"}
        </button>
      </div>

      <div className="absolute bottom-[100px] left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-bounce">
          <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </div>
    </section>
  );
}
