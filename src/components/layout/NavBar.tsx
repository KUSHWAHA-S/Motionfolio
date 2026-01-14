"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/store/useUserStore";
import { Edit } from "lucide-react";
import { colors } from "@/lib/colors";

export default function NavBar() {
  const { user, clearUser } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    clearUser();
    router.push("/");
  };

  // Extract portfolio ID from pathname if on portfolio preview page
  // Pattern: /portfolio/[id] (not /portfolio/[id]/edit, not /portfolio/new, not /portfolio/public/[id])
  const portfolioIdMatch = pathname?.match(/^\/portfolio\/([^\/]+)$/);
  const portfolioId = portfolioIdMatch ? portfolioIdMatch[1] : null;
  // Only show edit button on preview page (not edit page, not new page, not public page)
  const isPreviewPage =
    portfolioId !== null &&
    user !== null &&
    !pathname?.includes("/edit") &&
    !pathname?.includes("/new") &&
    !pathname?.includes("/public");

  return (
    <nav
      className="w-full h-[72px] px-6 lg:px-10 py-4 flex items-center justify-between sticky top-0 z-30 backdrop-blur-xl border-b"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderColor: "rgba(226, 232, 240, 0.8)",
        fontFamily:
          "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="font-bold text-2xl tracking-tight transition-all duration-300 relative group"
          style={{
            color: "#0F172A",
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.primary;
            e.currentTarget.style.transform = "scale(1.03)";
            const underline = e.currentTarget.querySelector(
              ".logo-underline"
            ) as HTMLElement;
            if (underline) underline.style.width = "100%";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.textDark;
            e.currentTarget.style.transform = "scale(1)";
            const underline = e.currentTarget.querySelector(
              ".logo-underline"
            ) as HTMLElement;
            if (underline) underline.style.width = "0%";
          }}
        >
          Motionfolio
          <span
            className="logo-underline absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
            style={{
              width: "0%",
              background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
            }}
          />
        </Link>
        {user && (
          <>
            <div className="hidden md:flex items-center gap-1">
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
            </div>
            <Link
              href="/dashboard"
              className="hidden md:flex text-sm font-semibold transition-all duration-200 px-4 py-2 rounded-lg relative group"
              style={{
                color: "#475569",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.primary;
                e.currentTarget.style.backgroundColor =
                  colors.primaryRgba["10"];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#475569";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Dashboard
            </Link>
          </>
        )}
        {isPreviewPage && (
          <Link
            href={`/portfolio/${portfolioId}/edit`}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#40E0D0",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primaryHover;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primaryRgba["30"]}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }}
          >
            <Edit className="w-4 h-4" />
            <span className="hidden sm:inline">Edit Portfolio</span>
            <span className="sm:hidden">Edit</span>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div
              className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: "rgba(241, 245, 249, 0.6)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(241, 245, 249, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(241, 245, 249, 0.6)";
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: "#40E0D0",
                  color: "#FFFFFF",
                }}
              >
                {(
                  user.user_metadata?.preferred_username ??
                  (user.email?.split("@")[0] || "U")
                )
                  .charAt(0)
                  .toUpperCase()}
              </div>
              <Link
                href="/dashboard"
                className="text-sm font-semibold transition-colors duration-200"
                style={{
                  color: "#0F172A",
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#0F172A";
                }}
              >
                {user.user_metadata?.preferred_username ??
                  user.email?.split("@")[0]}
              </Link>
            </div>
            <button
              onClick={handleSignOut}
              className="text-sm font-semibold transition-all duration-200 px-4 py-2 rounded-lg"
              style={{
                color: "#64748B",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(241, 245, 249, 0.8)";
                e.currentTarget.style.color = "#0F172A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#64748B";
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="text-sm font-semibold transition-all duration-200 px-5 py-2.5 rounded-xl shadow-sm"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#40E0D0",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primaryHover;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primaryRgba["30"]}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#40E0D0";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }}
          >
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
