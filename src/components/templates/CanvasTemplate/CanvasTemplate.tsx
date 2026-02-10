"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { extractSections } from "@/lib/portfolioUtils";
import { HeroSectionData, AboutSectionData } from "@/types/portfolio";
import { FALLBACK_HERO_IMAGE_URL } from "../DeveloperTwoColumnTemplate/constants";
import "./CanvasTemplate.css";

interface CanvasTemplateProps {
  portfolioId: string;
  showHeader?: boolean;
}

/**
 * Canvas template with a modern hero section featuring:
 * - Rounded card layout with organic curved separator
 * - Two-column hero with white content area and yellow image area
 * - Clean, friendly design perfect for creative professionals
 */
export function CanvasTemplate({
  portfolioId,
  showHeader = true,
}: CanvasTemplateProps) {
  const { title, sections } = usePortfolioStore();

  const {
    heroSection,
    aboutData,
  } = extractSections(sections);

  const heroData = heroSection?.data as HeroSectionData | undefined;
  const about = aboutData as AboutSectionData | undefined;

  const heroImageUrl = heroData?.imageUrl || FALLBACK_HERO_IMAGE_URL;
  const name = title || "Your Name";
  const profession = heroData?.subtitle || "UI/UX DESIGNER";
  const greeting = `Hello, my name is ${name}`;
  const description =
    heroData?.description ||
    "Short text with details about you, what you do or your professional career. You can add more information on the about page.";

  // Handle navigation clicks
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

  // Handle button clicks
  const handleProjectsClick = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLinkedInClick = () => {
    if (about?.website) {
      window.open(about.website, "_blank", "noopener,noreferrer");
    } else if (heroData?.ctaLink) {
      window.open(heroData.ctaLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="canvas-template">
      {/* Hero Section */}
      <section id="home" className="canvas-hero-section">
        <div className="canvas-hero-card">
          {/* Left Section - White Background */}
          <div className="canvas-hero-left">
            <div className="canvas-name">{name}</div>
            <div className="canvas-profession">{profession}</div>
            <h1 className="canvas-greeting">{greeting}</h1>
            <p className="canvas-description">{description}</p>
            <div className="canvas-buttons">
              <button
                className="canvas-btn canvas-btn-primary"
                onClick={handleProjectsClick}
              >
                Projects
              </button>
              <button
                className="canvas-btn canvas-btn-secondary"
                onClick={handleLinkedInClick}
              >
                LinkedIn
              </button>
            </div>
          </div>

          {/* Right Section - Yellow Background with Image */}
          <div className="canvas-hero-right">
            <nav className="canvas-nav">
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "#about")}
                className="canvas-nav-link"
              >
                About
              </a>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "#projects")}
                className="canvas-nav-link"
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="canvas-nav-link"
              >
                Contacts
              </a>
            </nav>
            <div className="canvas-hero-image-wrapper">
              <img
                src={heroImageUrl}
                alt={name}
                className="canvas-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for other sections */}
      <div className="canvas-content">
        {/* Additional sections can be added here */}
      </div>
    </div>
  );
}
