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
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          if (isMounted) {
            setUser(null);
            setLoading(false);
          }
          return;
        }

        const { data, error } = await supabase.auth.getUser();
        if (error && error.name !== "AuthSessionMissingError") {
          console.error("Error fetching user:", error);
        }

        if (isMounted) {
          setUser(data?.user ?? null);
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

    // auth listener updates local state, NOT fetching user again
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    initAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [setUser]);

  // Redirect logic
  useEffect(() => {
    if (loading) return;

    const isDashboard = pathname.startsWith("/dashboard");
    const isNewPortfolio = pathname === "/portfolio/new";
    const isEditPortfolio =
      pathname.startsWith("/portfolio/") && pathname.endsWith("/edit");
    const isProtectedPage = isDashboard || isNewPortfolio || isEditPortfolio;

    if (!user && isProtectedPage) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/auth/login${next}`);
    }
  }, [user, pathname, loading, router]);

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='animate-spin rounded-full h-10 w-10 border-4 border-sky-500 border-t-transparent' />
        <p className='ml-3 text-slate-600 font-medium'>Checking session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
