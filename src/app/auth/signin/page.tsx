"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import LoadingModal from "../../../components/ui/loading-modal";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setModalOpen(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      alert(err.message || "Sign-in failed");
      setModalOpen(false);
    } finally {
      setLoading(false);
      setTimeout(() => setModalOpen(false), 4000); // auto-hide after message
    }
  };

  const handleGoogleSignIn = async () => {
    setModalOpen(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
    } catch (err: any) {
      alert(err.message || "Google sign-in failed");
      setModalOpen(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-6 relative'>
      <LoadingModal
        open={modalOpen}
        message='Waiting for your authentication...'
      />

      <div className='w-full max-w-md bg-white p-6 rounded shadow'>
        <h2 className='text-xl font-semibold mb-4'>Sign in to Motionfolio</h2>

        <form onSubmit={handleEmailSignIn} className='space-y-3'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@example.com'
            required
            className='w-full border rounded px-3 py-2'
            disabled={loading}
          />
          <button
            disabled={loading}
            className='w-full bg-blue-600 text-white rounded px-3 py-2'
          >
            {loading ? "Sending..." : "Sign in with Email"}
          </button>
        </form>

        <div className='mt-4 text-center'>
          <button
            onClick={handleGoogleSignIn}
            className='inline-block bg-red-500 text-white rounded px-3 py-2'
            disabled={loading}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
