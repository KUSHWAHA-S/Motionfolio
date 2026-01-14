"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/store/useUserStore";
import { useRouter, usePathname } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        // Use getSession() which is faster and already contains user data
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (isMounted) {
          // session.user is already available from getSession(), no need for getUser()
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    // auth listener updates local state when auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    initAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [setUser]);

  // Redirect logic - protect all routes except homepage, auth pages, and public portfolio views
  useEffect(() => {
    if (loading) return;
    if (!pathname) return;

    // Public routes that don't require authentication
    const publicRoutes = ["/", "/auth/login", "/auth/signin", "/verify-otp"];

    // Check if it's a public route - allow access immediately
    if (publicRoutes.includes(pathname)) {
      return; // Allow access
    }

    // Check if it's a public portfolio route
    const isPublicPortfolio = pathname.startsWith("/portfolio/public/");

    // Check if it's a username route (public profile)
    // Single segment route that's not a known protected route
    const knownProtectedRoutes = [
      "/dashboard",
      "/portfolio",
      "/publish",
      "/api",
    ];
    const isUsernameRoute =
      pathname.match(/^\/[^\/]+$/) &&
      !knownProtectedRoutes.some((route) => pathname.startsWith(route));

    const isPublicRoute = isPublicPortfolio || isUsernameRoute;

    // If user is not logged in and trying to access a protected route
    if (!user && !isPublicRoute) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/auth/login${next}`);
    }
  }, [user, pathname, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-sky-500 border-t-transparent" />
        <p className="ml-3 text-slate-600 font-medium">Checking session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
