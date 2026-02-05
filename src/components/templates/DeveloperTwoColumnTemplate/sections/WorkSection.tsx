"use client";

import { useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";
import { FALLBACK_PROJECT_IMAGES, PROJECT_FILTERS } from "../constants";

interface Project {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  category?: string;
}

interface WorkSectionProps {
  projects: Project[];
}

export function WorkSection({ projects }: WorkSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const normalizedProjects: Project[] =
    projects.length > 0
      ? projects
      : FALLBACK_PROJECT_IMAGES.map((url) => ({ imageUrl: url }));

  const count = normalizedProjects.length;
  const gridClasses =
    count === 1
      ? "grid grid-cols-1 gap-8 max-w-3xl mx-auto"
      : count === 2
      ? "grid grid-cols-1 md:grid-cols-2 gap-8"
      : "grid grid-cols-1 md:grid-cols-3 gap-8";

  return (
    <section id="work" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Our Work"
          subtitle="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        />

        <div className="flex items-center justify-center gap-4 mb-10 text-sm">
          {PROJECT_FILTERS.map((label, index) => (
            <button
              key={label}
              className={`px-4 py-1 rounded-full border text-sm transition-all duration-300 ease-in-out ${
                activeFilter === label || (index === 0 && activeFilter === "All")
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-gray-700 border-transparent hover:bg-black hover:text-white hover:border-black"
              }`}
              type="button"
              onClick={() => setActiveFilter(label)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={gridClasses}>
          {normalizedProjects.map((project, index) => {
            const item = project || {};
            const imageUrl = item.imageUrl || FALLBACK_PROJECT_IMAGES[0];
            const title = item.title || "Project";
            const subtitle =
              item.subtitle || item.category || "Branding / Web Design";

            return (
              <ProjectCard
                key={index}
                imageUrl={imageUrl}
                title={title}
                subtitle={subtitle}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
