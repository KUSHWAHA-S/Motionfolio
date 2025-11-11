// src/components/AuthProvider.tsx
"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * AuthProvider: place near top (e.g., in layout) to ensure a profiles row exists
 * for every authenticated user. Uses client-side upsert.
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let mounted = true;

    async function createProfileIfNeeded() {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) return;

      // prepare username default (safe, but encourage user to change)
      const defaultUsername =
        (user.user_metadata as any)?.preferred_username ||
        user.email?.split("@")[0] ||
        user.id.substring(0, 8);

      // upsert profile (id = auth.users.id)
      await supabase.from("profiles").upsert({
        id: user.id,
        username: defaultUsername,
        avatar_url: (user.user_metadata as any)?.avatar_url || null,
      });
    }

    createProfileIfNeeded();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const u = session?.user;
      if (!u) return;
      // upsert again on new login events
      supabase.from("profiles").upsert({
        id: u.id,
        username: (u.user_metadata as any)?.preferred_username || u.email?.split("@")[0] || u.id.substring(0, 8),
        avatar_url: (u.user_metadata as any)?.avatar_url || null,
      });
    });

    return () => {
      mounted = false;
      sub?.subscription.unsubscribe();
    };
  }, []);

  return <>{children}</>;
}
