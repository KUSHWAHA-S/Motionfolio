"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import GlowCursor from "@/components/cursor/GlowCursor";
import "./DeveloperTwoColumnTemplate.css";

interface DeveloperTwoColumnTemplateProps {
  portfolioId: string;
  showHeader?: boolean;
}

/**
 * Professional two‑column developer portfolio template.
 * - Left: fixed sidebar with name, role, nav, social links
 * - Right: scrollable content sections (About, Experience, Projects, Skills)
 * - Dark, high-contrast, typography-focused layout
 */
export function DeveloperTwoColumnTemplate({
  portfolioId,
  showHeader = true,
}: DeveloperTwoColumnTemplateProps) {
  const { title, theme, sections } = usePortfolioStore();
  const titleCharRefs = useRef<HTMLSpanElement[]>([]);

  const {
    heroSection,
    projectsSection,
    projects,
    experiencesSection,
    experiences,
    skillsSection,
    skills,
    aboutData,
  } = useMemo(() => {
    const hero = sections.find((s) => s.type === "hero");
    const projectsSec = sections.find((s) => s.type === "projects");
    const projectsArray = Array.isArray(projectsSec?.data?.projects)
      ? projectsSec.data.projects
      : [];
    const experiencesSec = sections.find((s) => s.type === "experience");
    const experiencesArray = Array.isArray(experiencesSec?.data?.experiences)
      ? experiencesSec.data.experiences
      : [];
    const skillsSec = sections.find((s) => s.type === "skills");
    const skillsArray = Array.isArray(skillsSec?.data?.skills)
      ? skillsSec.data.skills
      : [];
    const about = sections.find((s) => s.type === "about")?.data;

    return {
      heroSection: hero,
      projectsSection: projectsSec,
      projects: projectsArray,
      experiencesSection: experiencesSec,
      experiences: experiencesArray,
      skillsSection: skillsSec,
      skills: skillsArray,
      aboutData: about,
    };
  }, [sections]);
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  const primary = theme.primary || "#38bdf8";

  // Animate title characters when template mounts or title changes
  useEffect(() => {
    const boxes = titleCharRefs.current.filter(Boolean);
    if (!boxes.length) return;

    // Reset initial state for characters
    gsap.set(boxes, {
      scale: 0,
      y: -60,
      x: 40,
      opacity: 0,
    });

    gsap.to(boxes, {
      duration: 1,
      scale: 1,
      y: 10,
      x: 10,
      yoyo: true,
      opacity: 1,
      // repeat: 1,
      // repeatDelay: 0.01,
      // ease: "power1.inOut",
      stagger: {
        // amount: 8,
        each: 0.5,
        grid: [1, 13],
        axis: "x",
        ease: "power2.in",
        from: 0,
      },
    });

    gsap.to("#timeline-dot", {
      duration: 1,
      ease: "none",
      motionPath: {
        path: "#timeline-path",
        align: "#timeline-path",
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
      scrollTrigger: {
        trigger: "#timeline-path",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });
  }, [title]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Show cursor glow only in published view (not in editor preview) */}
      {!showHeader && <GlowCursor color={primary} />}
      {showHeader && (
        <div className="sticky top-[60px] z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between text-xs text-slate-400">
            <span>Developer two‑column template preview</span>
            <a
              href={`/portfolio/${portfolioId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-300 hover:text-slate-50 underline underline-offset-4"
            >
              Open in new tab
            </a>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left sidebar */}
        <aside className="md:w-[260px] flex-shrink-0 space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight">
              {(title || "Your Name").split("").map((ch, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    if (el) {
                      titleCharRefs.current[idx] = el;
                    }
                  }}
                  className="inline-block"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>
            <p className="text-sm text-slate-400">
              {heroSection?.data?.subtitle ||
                "Front-End Engineer / Web Developer"}
            </p>
          </div>

          <nav className="hidden md:block">
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              {aboutData && (
                <li>
                  <a href="#about" className="hover:text-slate-100">
                    ABOUT
                  </a>
                </li>
              )}
              {experiencesSection && experiences.length > 0 && (
                <li>
                  <a href="#experience" className="hover:text-slate-100">
                    EXPERIENCE
                  </a>
                </li>
              )}
              {projectsSection && (
                <li>
                  <a href="#projects" className="hover:text-slate-100">
                    PROJECTS
                  </a>
                </li>
              )}
              {skillsSection && (
                <li>
                  <a href="#skills" className="hover:text-slate-100">
                    SKILLS
                  </a>
                </li>
              )}
            </ul>
          </nav>

          <div className="text-xs text-slate-500 space-y-1">
            {aboutData?.email && <p>{aboutData.email}</p>}
            {aboutData?.location && <p>{aboutData.location}</p>}
            {aboutData?.website && (
              <p>
                <a
                  href={aboutData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-100 underline underline-offset-2"
                >
                  Website
                </a>
              </p>
            )}
          </div>
        </aside>

        {/* Right content column */}
        <main className="flex-1 space-y-16 text-sm leading-relaxed">
          <div className="threeD-bg"></div>
          {/* About */}
          {aboutData && (
            <section id="about" className="space-y-3">
              <h2
                className="text-[11px] tracking-[0.18em] font-semibold text-slate-400"
                style={{ letterSpacing: "0.18em" }}
              >
                ABOUT
              </h2>
              <p className="text-slate-300 whitespace-pre-line">
                {aboutData.bio || "Add your bio here..."}
              </p>
            </section>
          )}
          <svg
            width="100%"
            height="400"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Zigzag / Curve Path */}
            <path
              id="timeline-path"
              d="M 50 20 
       C 150 80, 150 80, 50 160
       C -50 240, 150 280, 50 360"
              stroke="#00adee"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Arrow / Glow Element */}
            <circle
              id="timeline-dot"
              r="8"
              fill="#00adee"
              stroke="white"
              strokeWidth="2"
            />
          </svg>

          {/* Experience */}
          {experiencesSection && experiences.length > 0 && (
            <section id="experience" className="space-y-4">
              <h2
                className="text-[11px] tracking-[0.18em] font-semibold text-slate-400"
                style={{ letterSpacing: "0.18em" }}
              >
                EXPERIENCE
              </h2>
              <div className="space-y-6">
                {experiences.map((exp: any, idx: number) => (
                  <article key={idx} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <div className="text-slate-100 font-medium">
                        {exp.title || "Position"}
                      </div>
                      {exp.period && (
                        <div className="text-xs text-slate-500">
                          {exp.period}
                        </div>
                      )}
                    </div>
                    {exp.company && (
                      <div className="text-xs text-slate-400">
                        {exp.company}
                        {exp.location ? ` · ${exp.location}` : ""}
                      </div>
                    )}
                    {exp.description && (
                      <p className="text-xs text-slate-400 mt-2">
                        {exp.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projectsSection && (
            <section id="projects" className="space-y-4">
              <h2
                className="text-[11px] tracking-[0.18em] font-semibold text-slate-400"
                style={{ letterSpacing: "0.18em" }}
              >
                PROJECTS
              </h2>
              {projects.length > 0 ? (
                <div className="space-y-4">
                  {projects.map((project: any, idx: number) => (
                    <article
                      key={idx}
                      className="rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h3 className="text-sm font-medium text-slate-100">
                          {project.title || "Project"}
                        </h3>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium"
                            style={{ color: primary }}
                          >
                            View
                          </a>
                        )}
                      </div>
                      {project.description && (
                        <p className="mt-1 text-xs text-slate-400">
                          {project.description}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  No projects added yet. Add projects in the Projects editor.
                </p>
              )}
            </section>
          )}

          {/* Skills */}
          {skillsSection && (
            <section id="skills" className="space-y-4 mb-10">
              <h2
                className="text-[11px] tracking-[0.18em] font-semibold text-slate-400"
                style={{ letterSpacing: "0.18em" }}
              >
                SKILLS
              </h2>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] text-slate-200 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  No skills added yet. Add skills in the Skills editor.
                </p>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
