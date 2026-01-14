"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import LoadingModal from "@/components/ui/loading-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function SignInPage() {
  const [email, setEmail] = useState("shalini.kushwaha@gmail.com");
  const [password, setPassword] = useState("shalini");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUserStore();
  const next = searchParams.get("next") ?? "/dashboard";

  // Redirect if already logged in - only check user from store (AuthProvider already loaded it)
  useEffect(() => {
    // Just check the store - AuthProvider already populated it
    // No need for additional session check
    if (user) {
      router.replace("/dashboard");
      setCheckingAuth(false);
      return;
    }

    // If user is not in store yet, wait a bit for AuthProvider to load
    // Then check again
    const timeout = setTimeout(() => {
      if (!user) {
        setCheckingAuth(false);
      }
    }, 100);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F9FAFB" }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent mx-auto mb-4"
            style={{ borderColor: "#40E0D0" }}
          />
          <p style={{ color: "#64748B" }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{ backgroundColor: "#F9FAFB" }}
    >
      <LoadingModal open={modalOpen} message="Authenticating..." />

      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl"
        style={{
          padding: "3rem 2.5rem",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            color: "#0F172A",
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Sign up for Motionfolio
        </h2>
        <p className="text-sm mb-8" style={{ color: "#64748B" }}>
          Create your account and start building your portfolio.
        </p>

        {errorMessage && (
          <div
            className="mb-6 p-4 rounded-xl text-sm"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#DC2626",
              border: "1px solid rgba(239, 68, 68, 0.2)",
            }}
          >
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
          className="space-y-5"
        >
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#374151" }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl px-4 py-3.5 transition-all duration-200 focus:outline-none focus:ring-2"
              style={{
                border: "1px solid #E5E7EB",
                fontSize: "15px",
                backgroundColor: "#FFFFFF",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#40E0D0";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(64, 224, 208, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.boxShadow = "none";
              }}
              disabled={loading}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#374151" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              className="w-full rounded-xl px-4 py-3.5 transition-all duration-200 focus:outline-none focus:ring-2"
              style={{
                border: "1px solid #E5E7EB",
                fontSize: "15px",
                backgroundColor: "#FFFFFF",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#40E0D0";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(64, 224, 208, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.boxShadow = "none";
              }}
              disabled={loading}
            />
          </div>
          <div className="pt-2">
            <p className="text-sm mb-4" style={{ color: "#64748B" }}>
              Tell us a bit about you (optional):
            </p>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#374151" }}
                >
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full rounded-xl px-4 py-3.5 transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    border: "1px solid #E5E7EB",
                    fontSize: "15px",
                    backgroundColor: "#FFFFFF",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#40E0D0";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(64, 224, 208, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E5E7EB";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#374151" }}
                >
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Short bio about yourself"
                  className="w-full rounded-xl px-4 py-3.5 transition-all duration-200 focus:outline-none focus:ring-2 resize-none"
                  style={{
                    border: "1px solid #E5E7EB",
                    fontSize: "15px",
                    backgroundColor: "#FFFFFF",
                    minHeight: "100px",
                  }}
                  rows={4}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#40E0D0";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(64, 224, 208, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E5E7EB";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
          <button
            disabled={loading}
            className="w-full text-white rounded-xl px-4 py-3.5 font-semibold text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: loading ? "#9CA3AF" : "#40E0D0",
              boxShadow: loading
                ? "none"
                : "0 4px 6px -1px rgba(64, 224, 208, 0.3), 0 2px 4px -1px rgba(64, 224, 208, 0.2)",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#20B2AA";
                e.currentTarget.style.boxShadow =
                  "0 6px 8px -1px rgba(32, 178, 170, 0.4), 0 4px 6px -1px rgba(32, 178, 170, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#40E0D0";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(64, 224, 208, 0.3), 0 2px 4px -1px rgba(64, 224, 208, 0.2)";
              }
            }}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: "#64748B" }}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="font-semibold transition-all duration-200 hover:underline"
              style={{ color: "#40E0D0" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#20B2AA";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#40E0D0";
              }}
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
