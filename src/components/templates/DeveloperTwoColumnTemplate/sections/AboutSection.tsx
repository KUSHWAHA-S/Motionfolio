"use client";

import { useRef } from "react";
import { AboutSectionData } from "@/types/portfolio";
import { ProgressBar } from "../components/ProgressBar";
import { SectionHeading } from "../components/SectionHeading";
import { useProgressBarAnimation } from "../hooks/useProgressBarAnimation";
import { SKILL_PERCENTAGES } from "../constants";

interface AboutSectionProps {
  title: string;
  aboutData: AboutSectionData;
  skills: string[];
  heroSubtitle?: string;
}

export function AboutSection({
  title,
  aboutData,
  skills,
  heroSubtitle,
}: AboutSectionProps) {
  const aboutSectionRef = useRef<HTMLElement>(null);
  const progressBarsRef = useProgressBarAnimation(
    aboutSectionRef,
    skills.length
  );

  return (
    <section
      ref={aboutSectionRef}
      id="about"
      className="py-20 px-4 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="About Me" />

        <p className="text-center text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
          {aboutData.bio?.split(".")[0] ||
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
          .
        </p>

        <div className="text-center mb-4">
          <h3
            className="text-6xl md:text-7xl font-serif italic text-black"
            style={{
              fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
            }}
          >
            {title || "Your Name"}
          </h3>
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-600">
            {heroSubtitle
              ? heroSubtitle
                  .split("/")
                  .map((role) => role.trim())
                  .join(" • ")
              : "UI/UX Designer • Photographer • Developer"}
          </p>
        </div>

        {skills.length > 0 && (
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => {
                const percentage =
                  SKILL_PERCENTAGES[index % SKILL_PERCENTAGES.length] || 70;

                return (
                  <ProgressBar
                    key={index}
                    skill={skill}
                    percentage={percentage}
                    index={index}
                    progressBarRef={(el) => {
                      if (el) {
                        progressBarsRef.current[index] = el;
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
