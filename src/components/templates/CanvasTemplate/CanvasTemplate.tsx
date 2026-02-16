"use client";

import { useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { extractSections } from "@/lib/portfolioUtils";
import { HeroSectionData, AboutSectionData } from "@/types/portfolio";
import "./CanvasTemplate.css";

interface CanvasTemplateProps {
  portfolioId: string;
  showHeader?: boolean;
}

// Default hero image for the Canvas template – local cut‑out image from the public folder.
// Place `woman.png` in your `public` folder; Next.js will serve it at `/woman.png`.
const CANVAS_HERO_IMAGE_URL = "/woman.png";

// Default Unsplash images for projects
const DEFAULT_PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80", // Woman in yoga pose
  "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80", // Desk with notebook
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80", // Phone on tablet
];

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
  const [activeSection, setActiveSection] = useState<"home" | "projects" | "contact">("home");
  const { title, sections } = usePortfolioStore();

  const {
    heroSection,
    aboutData,
    projectsSection,
    projects,
  } = extractSections(sections);

  const heroData = heroSection?.data as HeroSectionData | undefined;
  const about = aboutData as AboutSectionData | undefined;

  const heroImageUrl = heroData?.imageUrl || CANVAS_HERO_IMAGE_URL;
  const name = title || "Madelyn Torff";
  const profession = heroData?.subtitle || "UI/UX DESIGNER";
  const description =
    heroData?.description ||
    "Short text with details about you, what you do or your professional career. You can add more information on the about page.";

  // Handle navigation clicks - switch sections without scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: "home" | "projects" | "contact") => {
    e.preventDefault();
    setActiveSection(section);
  };

  // Handle button clicks
  const handleProjectsClick = () => {
    setActiveSection("projects");
  };

  const handleLinkedInClick = () => {
    if (about?.website) {
      window.open(about.website, "_blank", "noopener,noreferrer");
    } else if (heroData?.ctaLink) {
      window.open(heroData.ctaLink, "_blank", "noopener,noreferrer");
    }
  };

  // Use projects from store or create default ones with Unsplash images
  const displayProjects = projects.length > 0 
    ? projects.map((p, i) => ({
        ...p,
        imageUrl: p.imageUrl || DEFAULT_PROJECT_IMAGES[i % DEFAULT_PROJECT_IMAGES.length],
      }))
    : [
        {
          title: "Project Name",
          description: "I created this personal project in order to show how to create an interface in Figma using a portfolio as an example.",
          imageUrl: DEFAULT_PROJECT_IMAGES[0],
          link: "#",
        },
        {
          title: "Project Name",
          description: "What was your role, your deliverables, if the project was personal, freelancing.",
          imageUrl: DEFAULT_PROJECT_IMAGES[1],
          link: "#",
        },
        {
          title: "Project Name",
          description: "You can also add in this description the type of the project, if it was for web, mobile, electron.",
          imageUrl: DEFAULT_PROJECT_IMAGES[2],
          link: "#",
        },
      ];

  return (
    <div className="canvas-template">
      {/* Fixed Navigation - visible on all sections */}
      <nav className="canvas-fixed-nav">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className={`canvas-nav-link ${activeSection === "home" ? "active" : ""}`}
        >
          About
        </a>
        <a
          href="#projects"
          onClick={(e) => handleNavClick(e, "projects")}
          className={`canvas-nav-link ${activeSection === "projects" ? "active" : ""}`}
        >
          Projects
        </a>
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "contact")}
          className={`canvas-nav-link ${activeSection === "contact" ? "active" : ""}`}
        >
          Contacts
        </a>
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className={`canvas-hero-section ${activeSection === "home" ? "active" : ""}`}
      >
        <div className="canvas-hero-card">
          {/* Left Section - White Background */}
          <div className="canvas-hero-left">
            <div className="canvas-name">{name}</div>
            <div className="canvas-profession">{profession}</div>
            <h1 className="canvas-greeting">
              <span className="canvas-greeting-line">Hello, my name</span>
              <span className="canvas-greeting-line">is {name}</span>
            </h1>
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

          {/* Right Section - Image with decorative blob in the top‑right */}
          <div className="canvas-hero-right">
            <div className="canvas-hero-blob" aria-hidden="true">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#facc15"
                  d="M21.9,-40.3C33.4,-31.2,51.5,-35.6,63.3,-31.2C75.1,-26.7,80.8,-13.4,78.6,-1.3C76.4,10.8,66.4,21.7,55.2,27.3C44.1,32.9,31.7,33.3,22.3,44.4C12.9,55.6,6.5,77.6,0,77.6C-6.5,77.6,-12.9,55.6,-26.1,46.6C-39.2,37.5,-58.9,41.5,-70.9,35.9C-82.9,30.3,-87,15.1,-86.7,0.2C-86.4,-14.8,-81.7,-29.6,-74.3,-43.1C-66.9,-56.6,-56.9,-68.9,-44,-77.2C-31.2,-85.6,-15.6,-90.2,-5.2,-81.1C5.1,-72,10.3,-49.4,21.9,-40.3Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
            <nav className="canvas-nav">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "home")}
                className="canvas-nav-link"
              >
                About
              </a>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "projects")}
                className="canvas-nav-link"
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="canvas-nav-link"
              >
                Contacts
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className={`canvas-projects-section ${activeSection === "projects" ? "active" : ""}`}
      >
        <div className="canvas-projects-container">
          <h2 className="canvas-projects-title">Projects</h2>
          <div className="canvas-projects-grid">
            {displayProjects.map((project, index) => (
                <div key={index} className="canvas-project-card">
                  {index % 2 === 0 ? (
                    <>
                      <div className="canvas-project-content">
                        <h3 className="canvas-project-title">
                          {project.title || "Project Name"}
                        </h3>
                        <p className="canvas-project-description">
                          {project.description ||
                            "I created this personal project in order to show how to create an interface in Figma using a portfolio as an example."}
                        </p>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="canvas-project-link"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                      {project.imageUrl && (
                        <div className="canvas-project-image">
                          <img
                            src={project.imageUrl}
                            alt={project.title || "Project"}
                            className="canvas-project-img"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {project.imageUrl && (
                        <div className="canvas-project-image">
                          <img
                            src={project.imageUrl}
                            alt={project.title || "Project"}
                            className="canvas-project-img"
                          />
                        </div>
                      )}
                      <div className="canvas-project-content">
                        <h3 className="canvas-project-title">
                          {project.title || "Project Name"}
                        </h3>
                        <p className="canvas-project-description">
                          {project.description ||
                            "What was your role, your deliverables, if the project was personal, freelancing."}
                        </p>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="canvas-project-link"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer - part of projects section */}
          <footer className="canvas-footer">
        <div className="canvas-footer-icons">
          <a
            href={about?.website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="canvas-footer-icon"
            aria-label="Instagram"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4 2.209 0 4 1.791 4 4 0 2.21-1.791 4-4 4zm6.406-11.845c-.79 0-1.418-.628-1.418-1.417 0-.789.628-1.418 1.418-1.418.789 0 1.419.629 1.419 1.418 0 .789-.63 1.417-1.419 1.417z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href={about?.website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="canvas-footer-icon"
            aria-label="LinkedIn"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href={`mailto:${about?.email || "#"}`}
            className="canvas-footer-icon"
            aria-label="Email"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                fill="currentColor"
              />
            </svg>
          </a>
          </div>
          <p className="canvas-footer-text">{name} 2021</p>
        </footer>
      </section>
    </div>
  );
}
