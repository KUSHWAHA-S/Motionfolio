"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

/**
 * Conditionally renders NavBar based on the current route.
 * Hides navbar on published portfolio pages to avoid overlap.
 */
export default function ConditionalNavBar() {
  const pathname = usePathname();

  // Hide navbar on published portfolio routes
  const hideNavbarRoutes = [
    "/portfolio/public/", // /portfolio/public/[id]
  ];

  // Check if current path matches any hide routes
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    pathname?.startsWith(route)
  );

  // Also hide on username routes (public profiles) - these are published portfolios
  // Pattern: /username (single segment, not /dashboard, /auth, /portfolio, etc.)
  const isUsernameRoute =
    pathname &&
    pathname.match(/^\/[^\/]+$/) &&
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/auth") &&
    !pathname.startsWith("/portfolio") &&
    !pathname.startsWith("/publish") &&
    !pathname.startsWith("/verify-otp") &&
    pathname !== "/";

  if (shouldHideNavbar || isUsernameRoute) {
    return null;
  }

  return <NavBar />;
}
