"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/store/useUserStore";
import { useRouter, usePathname } from "next/navigation";

/**
 * AuthProvider
 * -------------------------------------------------------------
 * - Initializes Supabase session on app load.
 * - Listens to auth state changes.
 * - Updates Zustand user store.
 * - Handles clean redirects between public and private routes.
 */

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

    const initSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error("Error fetching session:", error);

        const currentUser = data.session?.user ?? null;
        if (isMounted) setUser(currentUser);
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Listen for auth changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const updatedUser = session?.user ?? null;
      setUser(updatedUser);
    });

    initSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [setUser]);

  // Wait until session check finishes
 if (loading) {
   return (
     <div className='flex h-screen items-center justify-center'>
       <div className='animate-spin rounded-full h-10 w-10 border-4 border-sky-500 border-t-transparent' />
       <p className='ml-3 text-slate-600 font-medium'>Checking session...</p>
     </div>
   );
 }

  // 🔐 Redirect authenticated users away from /auth routes
  if (user && (pathname === "/" || pathname.startsWith("/auth"))) {
    router.replace("/dashboard");
    return null;
  }

  // 🚫 Redirect unauthenticated users away from protected routes
  if (!user && pathname.startsWith("/dashboard")) {
    router.replace("/auth/signin");
    return null;
  }

  // ✅ Otherwise, render app
  return <>{children}</>;
}
