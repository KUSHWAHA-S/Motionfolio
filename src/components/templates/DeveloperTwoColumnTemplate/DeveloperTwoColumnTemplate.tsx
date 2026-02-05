"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { extractSections } from "@/lib/portfolioUtils";
import { HeroSectionData, AboutSectionData } from "@/types/portfolio";
import { NavigationBar } from "./sections/NavigationBar";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { EducationExperienceSection } from "./sections/EducationExperienceSection";
import { WorkSection } from "./sections/WorkSection";
import { TestimonialSection } from "./sections/TestimonialSection";
import { ContactSection } from "./sections/ContactSection";
import { useScrollDetection } from "./hooks/useScrollDetection";
import { DeveloperTwoColumnTemplateProps } from "./types";
import "./DeveloperTwoColumnTemplate.css";

/**
 * Professional two‑column developer portfolio template.
 * - Hero section with dark background and typing animation
 * - Social media links and Download CV button
 * - Diagonal cut transition to content sections
 */
export function DeveloperTwoColumnTemplate({
  portfolioId,
  showHeader = true,
}: DeveloperTwoColumnTemplateProps) {
  const { title, sections } = usePortfolioStore();

  const {
    heroSection,
    aboutData,
    projectsSection,
    experiencesSection,
    experiences,
    skillsSection,
    skills,
  } = extractSections(sections);

  const heroData = heroSection?.data as HeroSectionData | undefined;
  const about = aboutData as AboutSectionData | undefined;

  // Build navigation items based on available sections
  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    ...(aboutData ? [{ id: "about", label: "About", href: "#about" }] : []),
    ...(skillsSection
      ? [{ id: "services", label: "Services", href: "#services" }]
      : []),
    ...(experiencesSection
      ? [{ id: "education", label: "Education", href: "#education" }]
      : []),
    ...(projectsSection
      ? [{ id: "work", label: "Work", href: "#work" }] : []),
    ...(aboutData
      ? [{ id: "contact", label: "Contact", href: "#contact" }] : []),
  ];

  // Handle smooth scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");

    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const { activeSection, isScrolled } = useScrollDetection(navItems);

  // Social media links - using about section data or defaults
  const socialLinks = {
    facebook: about?.website || "#",
    linkedin: about?.website || "#",
    google: about?.website || "#",
    twitter: about?.website || "#",
  };

  // Normalize projects array for Work section
  const projectItems: any[] =
    ((projectsSection?.data as any)?.projects as any[]) || [];

  return (
    <div className="min-h-screen bg-white text-white">
      <NavigationBar
        title={title || "Portfolio"}
        navItems={navItems}
        activeSection={activeSection}
        isScrolled={isScrolled}
        onNavClick={handleNavClick}
      />

      {showHeader && (
        <div className="sticky top-[70px] z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between text-xs text-slate-400">
            <span>Developer two‑column template preview</span>
            <button
              onClick={() => {
                window.open(
                  `/portfolio/${portfolioId}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="font-medium text-slate-300 hover:text-slate-50 underline underline-offset-4"
            >
              Open in new tab
            </button>
          </div>
        </div>
      )}

      <HeroSection
        title={title || "Your Name"}
        heroData={heroData}
        socialLinks={socialLinks}
      />

      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {aboutData && (
            <AboutSection
              title={title || "Your Name"}
              aboutData={aboutData}
              skills={skills}
              heroSubtitle={heroData?.subtitle}
            />
          )}

          {experiencesSection && experiences.length > 0 && (
            <EducationExperienceSection experiences={experiences} />
          )}

          {projectsSection && (
            <WorkSection projects={projectItems} />
          )}

          {aboutData && <ContactSection aboutData={aboutData} />}
        </div>
      </div>

      <TestimonialSection />
    </div>
  );
}
