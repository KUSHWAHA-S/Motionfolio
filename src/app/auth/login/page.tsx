"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import LoadingModal from "@/components/ui/loading-modal";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const redirectAfterAuth = () => {
    router.replace(next);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setModalOpen(true);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error || !data.session) {
        throw error || new Error("No session returned");
      }
      setModalOpen(false);
      redirectAfterAuth();
    } catch (err: any) {
      setErrorMessage(err.message || "Sign-in failed");
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <LoadingModal open={modalOpen} message="Authenticating..." />

      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Log in to Motionfolio</h2>

        {errorMessage && (
          <p className="mb-3 text-sm text-red-600">{errorMessage}</p>
        )}

        <form onSubmit={handleSignIn} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border rounded px-3 py-2"
            disabled={loading}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
            className="w-full border rounded px-3 py-2"
            disabled={loading}
          />
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded px-3 py-2"
          >
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/signin")}
              className="text-blue-600 underline"
              disabled={loading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
