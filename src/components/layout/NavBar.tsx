// src/components/layout/NavBar.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function NavBar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => setUser(session?.user ?? null));
    return () => sub?.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="w-full px-6 py-3 flex items-center justify-between bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-bold text-lg">Motionfolio</Link>
        <Link href="/dashboard" className="text-sm text-slate-600">Dashboard</Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link href="/dashboard" className="text-sm text-slate-700">Hi, {user.user_metadata?.preferred_username ?? user.email?.split("@")[0]}</Link>
            <button onClick={handleSignOut} className="text-sm text-red-600">Sign out</button>
          </>
        ) : (
          <Link href="/auth" className="text-sm text-slate-700">Sign in</Link>
        )}
      </div>
    </nav>
  );
}
