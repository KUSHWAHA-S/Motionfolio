"use client";

import { useEffect, useState, useRef } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { extractSections } from "@/lib/portfolioUtils";
import { HeroSectionData, AboutSectionData } from "@/types/portfolio";
import { ChevronDown } from "lucide-react";
import "./DeveloperTwoColumnTemplate.css";

interface DeveloperTwoColumnTemplateProps {
  portfolioId: string;
  showHeader?: boolean;
}

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
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    heroSection,
    aboutData,
    projectsSection,
    experiencesSection,
    skillsSection,
  } = extractSections(sections);
  const heroData = heroSection?.data as HeroSectionData | undefined;
  const about = aboutData as AboutSectionData | undefined;

  // Fallback hero image if user hasn't provided one (Unsplash).
  // You can replace this with any Unsplash image URL you like.
  const fallbackHeroImageUrl =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80";
  const heroImageUrl = heroData?.imageUrl || fallbackHeroImageUrl;

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
    setActiveSection(targetId);

    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Update active section and navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      // Update navbar background based on scroll position
      setIsScrolled(scrollTop > 0);

      const scrollPosition = scrollTop + 100;

      // Check which section is in view
      const sections = navItems.map((item) => item.id);
      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // If at top, set home as active
      if (scrollTop < 100) {
        setActiveSection("home");
      }
    };

    // Use both scroll and wheel events for better detection
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [navItems]);

  // Typing animation effect
  useEffect(() => {
    const fullText = title || "A Developer";
    const textToType = `I Am ${fullText}.`;
    let currentIndex = 0;
    setDisplayText(""); // Reset on title change

    const typingInterval = setInterval(() => {
      if (currentIndex <= textToType.length) {
        setDisplayText(textToType.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80); // Slightly faster typing speed

    return () => clearInterval(typingInterval);
  }, [title]);

  // Cursor blink animation
  useEffect(() => {
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, []);

  // Social media links - using about section data or defaults
  const socialLinks = {
    facebook: about?.website || "#",
    linkedin: about?.website || "#",
    google: about?.website || "#",
    twitter: about?.website || "#",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Transparent Navigation Bar - Changes to white on scroll */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? "#ffffff" : "transparent",
          backdropFilter: isScrolled ? "none" : "blur(10px)",
          boxShadow: isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand/Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
              isScrolled
                ? "text-black hover:text-gray-800"
                : "text-white hover:text-white/90"
            }`}
          >
            {title || "Portfolio"}
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative text-sm font-medium transition-colors duration-300 py-2 ${
                  isScrolled
                    ? "text-black hover:text-gray-700"
                    : "text-white hover:text-white/90"
                }`}
              >
                {item.label}
                {/* Active indicator dot */}
                {activeSection === item.id && (
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      isScrolled ? "bg-black" : "bg-white"
                    }`}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 ${
              isScrolled ? "text-black hover:text-gray-700" : "text-white hover:text-white/90"
            }`}
            aria-label="Toggle menu"
            onClick={() => {
              // Mobile menu toggle can be added later
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

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

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden "
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImageUrl})`,
            filter: "grayscale(100%) brightness(0.4) contrast(1.1)",
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Bottom shape divider (matches reference: curved sides with center point) */}
        
        {/* Content Container */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Hello & Welcome */}
          <p className="text-lg md:text-xl text-white/90 mb-4 font-light tracking-wide">
            Hello & Welcome
          </p>

          {/* Main Title with Typing Animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white tracking-tight">
            {displayText}
                <span
              className={`inline-block w-0.5 h-12 md:h-16 ml-1 mb-8 align-middle ${
                showCursor ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
              style={{ marginLeft: "4px" }}
            >
              |
                </span>
            </h1>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* Facebook */}
            <a
              href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center text-white hover:text-blue-400 transition-colors"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center text-white hover:text-blue-500 transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
            </a>

            {/* Google+ */}
            <a
              href={socialLinks.google}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center text-white hover:text-red-500 transition-colors"
              aria-label="Google+"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.635 10.909v2.619h4.335c-.173 1.125-1.31 3.295-4.331 3.295-2.604 0-4.731-2.16-4.731-4.823 0-2.662 2.122-4.822 4.728-4.822 1.485 0 2.503.633 3.076 1.178l2.146-2.07c-1.466-1.37-3.373-2.206-5.222-2.206-4.388 0-7.635 3.06-7.635 6.92s3.247 6.92 7.635 6.92c4.41 0 7.247-3.096 7.247-7.435 0-.501-.054-.885-.12-1.265H7.635zm16.365 0h-2.183V8.726h-2.183v2.183h-2.182v2.183h2.184v2.184h2.189v-2.184H24" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href={socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center text-white hover:text-blue-400 transition-colors"
              aria-label="Twitter"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>

          {/* Download CV Button */}
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

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-[100px] left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-bounce">
            <ChevronDown className="w-6 h-6 text-white" />
          </div>
                </div>
            </section>

      {/* Rest of the content sections will go here */}
      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* About Section */}
          {aboutData && (
            <section id="about" className="py-16">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">About</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {aboutData.bio || "Add your bio here..."}
              </p>
            </section>
          )}

          {/* Services Section (Skills) */}
          {skillsSection && (
            <section id="services" className="py-16">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Services
              </h2>
              {/* Skills content will go here */}
            </section>
          )}

          {/* Education Section (Experience) */}
          {experiencesSection && (
            <section id="education" className="py-16">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Education
              </h2>
              {/* Experience content will go here */}
            </section>
          )}

          {/* Work Section (Projects) */}
          {projectsSection && (
            <section id="work" className="py-16">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Work</h2>
              {/* Projects content will go here */}
            </section>
          )}

          {/* Contact Section */}
          {aboutData && (
            <section id="contact" className="py-16">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Contact
              </h2>
              <div className="space-y-2 text-slate-700">
                {aboutData.email && <p>Email: {aboutData.email}</p>}
                {aboutData.location && <p>Location: {aboutData.location}</p>}
                {aboutData.website && (
                  <p>
                    Website:{" "}
                    <a
                      href={aboutData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {aboutData.website}
                    </a>
                </p>
              )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
