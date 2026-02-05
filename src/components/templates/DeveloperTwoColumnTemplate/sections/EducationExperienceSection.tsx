"use client";

import { ExperienceCard } from "../components/ExperienceCard";
import { SectionHeading } from "../components/SectionHeading";

interface Experience {
  period?: string;
  title: string;
  company?: string;
  description?: string;
}

interface EducationExperienceSectionProps {
  experiences: Experience[];
}

export function EducationExperienceSection({
  experiences,
}: EducationExperienceSectionProps) {
  if (experiences.length === 0) return null;

  const leftColumnExperiences = experiences.filter((_, index) => index % 2 === 0);
  const rightColumnExperiences = experiences.filter((_, index) => index % 2 === 1);

  return (
    <section id="education" className="py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Education & Experience"
          subtitle="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300" />
            <div className="space-y-6">
              {leftColumnExperiences.map((exp, index) => (
                <div key={`left-${index}`} className="relative pl-10">
                  <span
                    className="absolute top-6 w-3 h-3 rounded-full bg-black"
                    style={{ left: "10.4px" }}
                  />
                  <ExperienceCard
                    period={exp.period}
                    title={exp.title}
                    company={exp.company}
                    description={exp.description}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300" />
            <div className="space-y-6">
              {rightColumnExperiences.map((exp, index) => (
                <div key={`right-${index}`} className="relative pl-10">
                  <span
                    className="absolute top-6 w-3 h-3 rounded-full bg-black"
                    style={{ left: "10.4px" }}
                  />
                  <ExperienceCard
                    period={exp.period}
                    title={exp.title}
                    company={exp.company}
                    description={exp.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
