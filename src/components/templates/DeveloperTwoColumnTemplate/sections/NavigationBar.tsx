"use client";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface NavigationBarProps {
  title: string;
  navItems: NavItem[];
  activeSection: string;
  isScrolled: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function NavigationBar({
  title,
  navItems,
  activeSection,
  isScrolled,
  onNavClick,
}: NavigationBarProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? "#ffffff" : "transparent",
        backdropFilter: isScrolled ? "none" : "blur(10px)",
        boxShadow: isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => onNavClick(e, "#home")}
          className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
            isScrolled
              ? "text-black hover:text-gray-800"
              : "text-white hover:text-white/90"
          }`}
        >
          {title || "Portfolio"}
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => onNavClick(e, item.href)}
              className={`relative text-sm font-medium transition-colors duration-300 py-2 ${
                isScrolled
                  ? "text-black hover:text-gray-700"
                  : "text-white hover:text-white/90"
              }`}
            >
              {item.label}
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

        <button
          className={`md:hidden transition-colors duration-300 ${
            isScrolled
              ? "text-black hover:text-gray-700"
              : "text-white hover:text-white/90"
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
  );
}
