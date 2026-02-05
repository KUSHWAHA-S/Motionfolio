"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Globe } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { extractSections } from "@/lib/portfolioUtils";

// Register GSAP plugins
if (typeof window !== "undefined") {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (e) {
    // ScrollTrigger already registered or not available
  }
}

interface LivePreviewProps {
  portfolioId: string;
  /**
   * Whether to show the internal preview header with the
   * "Open in new tab" link. For public portfolio pages we hide it.
   */
  showHeader?: boolean;
}

export function LivePreview({
  portfolioId,
  showHeader = true,
}: LivePreviewProps) {
  const { title, theme, sections } = usePortfolioStore();
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize section extraction to ensure consistent rendering
  // Must be called before any conditional returns to follow Rules of Hooks
  const {
    heroSection,
    projectsSection,
    projects,
    experiencesSection,
    experiences,
    skillsSection,
    skills,
    aboutData,
  } = useMemo(() => extractSections(sections), [sections]);

  // GSAP Animations (hero only – sections use Framer Motion / static rendering)
  useEffect(() => {
    if (!mounted) return;

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".hero-element"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-xl border border-gray-200">
        <div className="text-gray-500">Loading preview...</div>
      </div>
    );
  }

  // When used inside the editor, show a framed card with header.
  // When used on the public portfolio page, render full-page content.
  const containerClassName = showHeader
    ? "bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
    : "min-h-screen bg-white overflow-hidden";

  const contentMinHeightClass = showHeader ? "min-h-[800px]" : "min-h-screen";

  return (
    <div className={containerClassName}>
      {showHeader && (
        <div
          className="sticky top-0 z-20 border-b px-6 py-4 flex items-center justify-between"
          style={{
            background: "linear-gradient(to right, #F9FAFB, #FFFFFF)",
            borderColor: "#E5E7EB",
          }}
        >
          <div>
            <h3 className="font-semibold" style={{ color: "#1A1A1A" }}>
              Portfolio Preview
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
              Live preview with GSAP animations
            </p>
          </div>
          <button
            onClick={() => {
              window.open(`/portfolio/${portfolioId}`, '_blank', 'noopener,noreferrer');
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open in new tab
          </button>
        </div>
      )}

      {/* Preview Content - Creative Web Portfolio */}
      <div
        className={contentMinHeightClass}
        style={{
          backgroundColor: "#ffffff",
          color: "#1f2937",
        }}
      >
        {/* Hero Section - Full Width Creative */}
        {heroSection && (
          <div
            ref={heroRef}
            className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
            style={{
              background: heroSection.data?.imageUrl
                ? `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%), url(${heroSection.data.imageUrl})`
                : `linear-gradient(135deg, ${theme.primary}15 0%, ${theme.secondary}15 100%)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto hero-element">
              <motion.h1
                className="text-6xl md:text-7xl font-black mb-6 text-white drop-shadow-2xl"
                style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
              >
                {title}
              </motion.h1>
              {heroSection.data?.subtitle && (
                <p className="text-2xl md:text-3xl text-white/90 mb-6 font-light hero-element">
                  {heroSection.data.subtitle}
                </p>
              )}
              {heroSection.data?.description && (
                <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed hero-element">
                  {heroSection.data.description}
                </p>
              )}
              {heroSection.data?.ctaText && (
                <motion.a
                  href={heroSection.data.ctaLink || "#"}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-lg shadow-2xl hover:scale-105 transition-transform hero-element"
                  style={{
                    backgroundColor: theme.primary || "#40E0D0",
                    boxShadow: `0 10px 40px ${theme.primary}40`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {heroSection.data.ctaText}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          </div>
        )}

        {/* About Section - Creative Layout */}
        {aboutData && (
          <section className="py-20 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2
                  className="text-5xl font-bold mb-6"
                  style={{ color: theme.primary || "#40E0D0" }}
                >
                  About Me
                </h2>
                <div
                  className="w-24 h-1 mx-auto mb-8"
                  style={{ backgroundColor: theme.primary || "#0EA5E9" }}
                ></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg max-w-none text-center"
              >
                <p className="text-xl text-gray-700 leading-relaxed">
                  {aboutData.bio || "Add your bio here..."}
                </p>
                {(aboutData.email ||
                  aboutData.location ||
                  aboutData.website) && (
                  <div className="flex flex-wrap justify-center gap-6 mt-8">
                    {aboutData.email && (
                      <a
                        href={`mailto:${aboutData.email}`}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        ✉️ {aboutData.email}
                      </a>
                    )}
                    {aboutData.location && (
                      <span className="text-gray-600">
                        📍 {aboutData.location}
                      </span>
                    )}
                    {aboutData.website && (
                      <a
                        href={aboutData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Projects Section - Creative Grid */}
        {projectsSection && (
          <section ref={projectsRef} className="py-20 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {/* <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='text-center mb-8'
              > */}
              <h2
                className="text-5xl font-bold mb-6 text-gray-900"
                style={{ color: theme.primary || "#0EA5E9" }}
              >
                Featured Projects
              </h2>
              <div
                className="w-24 h-1 mx-auto mb-4"
                style={{ backgroundColor: theme.primary || "#0EA5E9" }}
              ></div>
              {/* </motion.div> */}
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, idx: number) => (
                    <div
                      key={idx}
                      className="project-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                      style={{ opacity: 1 }}
                    >
                      {project.imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={project.imageUrl}
                            alt={project.title || "Project"}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-2 text-gray-900">
                          {project.title || "Project"}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {project.description || ""}
                        </p>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                            style={{ color: theme.primary || "#40E0D0" }}
                          >
                            View Project <ArrowRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No projects added yet</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Add projects in the Projects editor section
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Experience Section - Timeline Style */}
        {experiences.length > 0 && (
          <section className="py-20 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2
                  className="text-5xl font-bold mb-6"
                  style={{ color: theme.primary || "#40E0D0" }}
                >
                  Experience
                </h2>
                <div
                  className="w-24 h-1 mx-auto"
                  style={{ backgroundColor: theme.primary || "#0EA5E9" }}
                ></div>
              </motion.div>
              <div className="relative">
                <div
                  className="absolute left-8 top-0 bottom-0 w-0.5"
                  style={{ backgroundColor: theme.primary || "#0EA5E9" }}
                ></div>
                <div className="space-y-12">
                  {experiences.map((exp, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="relative pl-20"
                    >
                      <div
                        className="absolute left-4 top-2 w-8 h-8 rounded-full border-4 border-white shadow-lg"
                        style={{ backgroundColor: theme.primary || "#0EA5E9" }}
                      ></div>
                      <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <h3 className="font-bold text-xl mb-1 text-gray-900">
                          {exp.title || "Position"}
                        </h3>
                        <p
                          className="text-lg font-semibold mb-2"
                          style={{ color: theme.primary || "#40E0D0" }}
                        >
                          {exp.company || ""}
                        </p>
                        {exp.period && (
                          <p className="text-sm text-gray-500 mb-3">
                            {exp.period}
                          </p>
                        )}
                        {exp.location && (
                          <p className="text-sm text-gray-500 mb-3">
                            📍 {exp.location}
                          </p>
                        )}
                        {exp.description && (
                          <p className="text-gray-700 leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Skills Section - Animated Tags */}
        {skillsSection && (
          <section ref={skillsRef} className="py-20 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              {/* <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='text-center mb-8'
              > */}
              <h2
                className="text-5xl font-bold mb-2 text-gray-900"
                style={{ color: theme.primary || "#0EA5E9" }}
              >
                Skills & Expertise
              </h2>
              <div
                className="w-24 h-1 mx-auto mb-4"
                style={{ backgroundColor: theme.primary || "#0EA5E9" }}
              ></div>
              {/* </motion.div> */}
              {skills.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {skills.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="skill-tag px-6 py-3 rounded-full text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all cursor-default"
                      style={{
                        backgroundColor: theme.primary || "#40E0D0",
                        color: "#ffffff",
                        opacity: 1,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No skills added yet</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Add skills in the Skills editor section
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {sections.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-2">No sections added yet</p>
            <p className="text-sm">
              Start editing to see your creative portfolio preview
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
