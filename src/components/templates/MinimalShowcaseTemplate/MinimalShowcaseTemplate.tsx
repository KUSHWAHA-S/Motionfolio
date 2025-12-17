"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { gsap } from "gsap";
import { OverlayMenu } from "../OverlayMenu";
import "./MinimalShowcaseTemplate.css";

interface MinimalShowcaseTemplateProps {
  portfolioId: string;
  showHeader?: boolean;
}

/**
 * A second template: clean, minimal, content-focused.
 * - Simple top hero with text + optional image
 * - Stacked sections with subtle dividers
 * - No heavy animations
 */
export function MinimalShowcaseTemplate({
  portfolioId,
  showHeader = true,
}: MinimalShowcaseTemplateProps) {
  const { title, theme, sections } = usePortfolioStore();

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

  const accent = theme.primary || "#f97316";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const zigzagRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<gsap.core.Animation | null>(null);

  // Section refs for smooth scrolling
  const heroRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Navigation menu sections - aligned with actual template sections
  const menuSections = useMemo(() => {
    const sections = [{ id: "hero", label: "Accueil" }];

    if (projectsSection) {
      sections.push({ id: "projects", label: "Projets" });
    }

    if (experiencesSection && experiences.length > 0) {
      sections.push({ id: "experience", label: "Expérience" });
    }

    if (aboutData) {
      sections.push({ id: "about", label: "À propos" });
    }

    if (skillsSection || aboutData) {
      sections.push({ id: "contact", label: "Contact" });
    }

    return sections;
  }, [
    projectsSection,
    experiencesSection,
    experiences,
    aboutData,
    skillsSection,
  ]);

  // Handle navigation to section - only through menu clicks
  const handleNavigate = (sectionId: string) => {
    // Update state immediately
    setActiveSection(sectionId);

    // Get all sections
    const sections = document.querySelectorAll("main > section");
    const targetSection = document.getElementById(sectionId);

    // Create timeline for smooth transition
    const tl = gsap.timeline();

    // Fade out all sections and hide them
    tl.to(sections, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // Hide all sections completely
        sections.forEach((section) => {
          const el = section as HTMLElement;
          el.style.visibility = "hidden";
          el.style.pointerEvents = "none";
          el.style.zIndex = "1";
        });
      },
    });

    // Show and fade in target section
    if (targetSection) {
      tl.set(targetSection, {
        visibility: "visible",
        pointerEvents: "auto",
        zIndex: "10",
      });
      tl.to(targetSection, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  // Continuous runner animation on hover - seamless infinite flow
  useEffect(() => {
    if (svgRef.current) {
      // Initialize SVG position to 0
      gsap.set(svgRef.current, { x: 0 });

      if (isTitleHovered) {
        // Kill existing animation if any
        if (animationRef.current) {
          animationRef.current.kill();
        }
        // Create new animation
        animationRef.current = gsap.to(svgRef.current, {
          x: -200,
          duration: 8,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => {
              const num = parseFloat(x);
              // When we reach -200, wrap back to 0 seamlessly
              return num <= -200 ? "0" : x;
            }),
          },
        });
      } else {
        // Pause animation at current position (don't reset)
        if (animationRef.current) {
          animationRef.current.pause();
        }
      }
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [isTitleHovered]);

  // Initialize active section
  useEffect(() => {
    if (!showHeader) {
      setActiveSection("hero");
    }
  }, [showHeader]);

  return (
    <div
      className="min-h-screen text-slate-50"
      style={{
        color: "#9CA8C0",
        fontWeight: 400,
        backgroundImage: "url('/background1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay Menu - only show when not in editor mode */}
      {!showHeader && (
        <OverlayMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(!isMenuOpen)}
          onNavigate={handleNavigate}
          sections={menuSections}
        />
      )}

      {showHeader && (
        <header className="sticky top-[60px] z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-xs md:text-sm font-semibold tracking-[0.18em] uppercase text-slate-400">
              Portfolio Template
            </div>
            <a
              href={`/portfolio/${portfolioId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium text-slate-300 hover:text-slate-50 underline underline-offset-4"
            >
              Ouvrir dans un nouvel onglet
            </a>
          </div>
        </header>
      )}

      <main
        id="top"
        className="overflow-hidden h-screen relative"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Hero */}
        <section
          ref={heroRef}
          id="hero"
          className="absolute inset-0 flex items-center justify-center px-6 md:px-10"
          style={{
            opacity: activeSection === "hero" ? 1 : 0,
            pointerEvents: activeSection === "hero" ? "auto" : "none",
            visibility: activeSection === "hero" ? "visible" : "hidden",
            zIndex: activeSection === "hero" ? 10 : 1,
          }}
        >
          <div className="max-w-4xl w-full text-center space-y-8 flex flex-col items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                <span className="outlined-text">Hello, I'm </span>
                <span
                  className="relative inline-block"
                  onMouseEnter={() => setIsTitleHovered(true)}
                  onMouseLeave={() => setIsTitleHovered(false)}
                  style={{
                    fontVariationSettings: '"wght" 900, "wdth" 150',
                  }}
                >
                  {title || "Name"}
                  {/* Wave SVG path positioned at 3/4 down the name - repeating pattern */}
                  <div
                    className="absolute left-0 w-full overflow-hidden"
                    style={{
                      top: "75%",
                      transform: "translateY(-50%)",
                      height: "24px",
                      pointerEvents: "none",
                    }}
                  >
                    <svg
                      ref={svgRef}
                      className="absolute"
                      viewBox="0 0 400 24"
                      preserveAspectRatio="none"
                      style={{
                        height: "24px",
                        width: "calc(200% + 20px)",
                        left: "-10px",
                        pointerEvents: "none",
                      }}
                    >
                      {/* Denser wave pattern - multiple duplicates for seamless infinite loop */}
                      <g>
                        <path
                          ref={zigzagRef}
                          d="M 0 12 Q 5 2 10 12 T 20 12 T 30 12 T 40 12 T 50 12 T 60 12 T 70 12 T 80 12 T 90 12 T 100 12 T 110 12 T 120 12 T 130 12 T 140 12 T 150 12 T 160 12 T 170 12 T 180 12 T 190 12 T 200 12"
                          stroke="#B8C4D9"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          style={{
                            filter:
                              "drop-shadow(0 0 6px rgba(184,196,217,0.4))",
                          }}
                        />
                        {/* Duplicate patterns for seamless loop */}
                        <path
                          d="M 0 12 Q 5 2 10 12 T 20 12 T 30 12 T 40 12 T 50 12 T 60 12 T 70 12 T 80 12 T 90 12 T 100 12 T 110 12 T 120 12 T 130 12 T 140 12 T 150 12 T 160 12 T 170 12 T 180 12 T 190 12 T 200 12"
                          stroke="#B8C4D9"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          transform="translate(200, 0)"
                          style={{
                            filter:
                              "drop-shadow(0 0 6px rgba(184,196,217,0.4))",
                          }}
                        />
                        <path
                          d="M 0 12 Q 5 2 10 12 T 20 12 T 30 12 T 40 12 T 50 12 T 60 12 T 70 12 T 80 12 T 90 12 T 100 12 T 110 12 T 120 12 T 130 12 T 140 12 T 150 12 T 160 12 T 170 12 T 180 12 T 190 12 T 200 12"
                          stroke="#B8C4D9"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          transform="translate(400, 0)"
                          style={{
                            filter:
                              "drop-shadow(0 0 6px rgba(184,196,217,0.4))",
                          }}
                        />
                      </g>
                    </svg>
                  </div>
                </span>
                <span className="outlined-text">.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400">
                <span className="outlined-text">Showcasing my work as a </span>
                {heroSection?.data?.subtitle || "Designation"}
                <span className="outlined-text">.</span>
              </p>
            </div>

            {/* Two links at the bottom */}
            <div className="flex flex-wrap gap-4 justify-center pt-8">
              {heroSection?.data?.ctaText && (
                <a
                  href={heroSection.data.ctaLink || "#projects"}
                  className="inline-flex items-center rounded-full px-8 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: accent }}
                >
                  {heroSection.data.ctaText}
                </a>
              )}
              <a
                href="#about"
                className="inline-flex items-center rounded-full border border-slate-700 px-8 py-3 text-sm font-semibold hover:bg-slate-900/60 transition-colors"
              >
                {heroSection?.data?.ctaText ? "Learn More" : "View Work"}
              </a>
            </div>
          </div>
        </section>

        {/* Projects */}
        {projectsSection && (
          <section
            ref={projectsRef}
            id="projects"
            className="absolute inset-0 flex items-center justify-center px-6 md:px-10"
            style={{
              opacity: activeSection === "projects" ? 1 : 0,
              pointerEvents: activeSection === "projects" ? "auto" : "none",
              visibility: activeSection === "projects" ? "visible" : "hidden",
              zIndex: activeSection === "projects" ? 10 : 1,
            }}
          >
            <div className="max-w-6xl w-full space-y-4">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">
                Projets
              </h2>
              {projects.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {projects.map((project: any, idx: number) => (
                    <article
                      key={idx}
                      className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-4 flex flex-col justify-between gap-2 hover:border-slate-500 transition-colors"
                    >
                      <div>
                        <h3 className="text-sm font-semibold text-slate-50">
                          {project.title || "Projet"}
                        </h3>
                        {project.description && (
                          <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        )}
                      </div>
                      {project.link && (
                        <div className="pt-1">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-medium"
                            style={{ color: accent }}
                          >
                            Voir le projet
                          </a>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  Aucun projet ajouté pour le moment.
                </p>
              )}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiencesSection && experiences.length > 0 && (
          <section
            ref={experienceRef}
            id="experience"
            className="absolute inset-0 flex items-center justify-center px-6 md:px-10"
            style={{
              opacity: activeSection === "experience" ? 1 : 0,
              pointerEvents: activeSection === "experience" ? "auto" : "none",
              visibility: activeSection === "experience" ? "visible" : "hidden",
              zIndex: activeSection === "experience" ? 10 : 1,
            }}
          >
            <div className="max-w-6xl w-full space-y-4">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">
                Expérience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp: any, idx: number) => (
                  <article key={idx} className="space-y-1 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <div className="text-slate-100 font-medium">
                        {exp.title || "Poste"}
                      </div>
                      {exp.period && (
                        <div className="text-slate-500">{exp.period}</div>
                      )}
                    </div>
                    {exp.company && (
                      <div className="text-slate-400">
                        {exp.company}
                        {exp.location ? ` · ${exp.location}` : ""}
                      </div>
                    )}
                    {exp.description && (
                      <p className="text-slate-400 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* About */}
        {aboutData && (
          <section
            ref={aboutRef as React.RefObject<HTMLElement>}
            id="about"
            className="absolute inset-0 flex items-center justify-center px-6 md:px-10"
            style={{
              opacity: activeSection === "about" ? 1 : 0,
              pointerEvents: activeSection === "about" ? "auto" : "none",
              visibility: activeSection === "about" ? "visible" : "hidden",
              zIndex: activeSection === "about" ? 10 : 1,
            }}
          >
            <div className="max-w-6xl w-full space-y-6">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">
                À propos
              </h2>
              <div className="text-xs text-slate-400 leading-relaxed space-y-4">
                <p>{aboutData.bio || "Ajoutez votre biographie ici..."}</p>
                {(aboutData.email ||
                  aboutData.location ||
                  aboutData.website) && (
                  <div className="flex flex-wrap gap-3 pt-1">
                    {aboutData.email && <span>{aboutData.email}</span>}
                    {aboutData.location && <span>· {aboutData.location}</span>}
                    {aboutData.website && (
                      <a
                        href={aboutData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        Site web
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Skills / Contact */}
        {(skillsSection || aboutData) && (
          <section
            ref={contactRef}
            id="contact"
            className="absolute inset-0 flex items-center justify-center px-6 md:px-10"
            style={{
              opacity: activeSection === "contact" ? 1 : 0,
              pointerEvents: activeSection === "contact" ? "auto" : "none",
              visibility: activeSection === "contact" ? "visible" : "hidden",
              zIndex: activeSection === "contact" ? 10 : 1,
            }}
          >
            <div className="max-w-6xl w-full grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.3fr)] items-start">
              {skillsSection && (
                <div>
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-3">
                    Compétences
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
                      Aucune compétence ajoutée pour le moment.
                    </p>
                  )}
                </div>
              )}

              {aboutData && (
                <div className="space-y-3">
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">
                    Contact
                  </h2>
                  <p className="text-xs text-slate-400">
                    Disponible pour de nouveaux projets, collaborations ou
                    opportunités.
                  </p>
                  <div className="flex flex-col gap-1 text-xs text-slate-300">
                    {aboutData.email && <span>{aboutData.email}</span>}
                    {aboutData.location && <span>{aboutData.location}</span>}
                    {aboutData.website && (
                      <a
                        href={aboutData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        Site web
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
