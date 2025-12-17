"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import LoadingModal from "@/components/ui/loading-modal";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("shalini.kushwaha@gmail.com");
  const [password, setPassword] = useState("shalini");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const redirectAfterAuth = () => {
    router.replace(next);
  };

  const handleSignUp = async () => {
    setLoading(true);
    setModalOpen(true);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Create or update profile for this user at signup time
        const defaultUsername = data.user.email?.split("@")[0] ?? "user";
        const profileUsername = username.trim() || defaultUsername;
        const profileBio = bio.trim();

        const { error: profileError } = await supabase.from("profiles").upsert(
          {
            id: data.user.id,
            username: profileUsername,
            bio: profileBio,
          },
          { onConflict: "id" }
        );

        if (profileError) {
          console.error("Error syncing profile on signup:", profileError);
        }
      }

      if (data.session) {
        setModalOpen(false);
        redirectAfterAuth();
      } else {
        setModalOpen(false);
        alert("Check your email to confirm your account, then sign in.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Sign-up failed");
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <LoadingModal open={modalOpen} message="Authenticating..." />

      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sign up for Motionfolio</h2>

        {errorMessage && (
          <p className="mb-3 text-sm text-red-600">{errorMessage}</p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
          className="space-y-3"
        >
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
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-slate-600">Tell us a bit about you:</p>
          <div className="space-y-2 mb-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username (optional)"
              className="w-full border rounded px-3 py-2 text-sm"
              disabled={loading}
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Short bio (optional)"
              className="w-full border rounded px-3 py-2 text-sm resize-none"
              rows={3}
              disabled={loading}
            />
          </div>
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="text-blue-600 underline"
              disabled={loading}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
