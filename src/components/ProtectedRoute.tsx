"use client";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait until user store has been hydrated
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && !user) {
      console.log("Redirecting to signin because user missing");
      router.replace("/auth/signin");
    } else if (ready && user) {
      console.log("User logged in:", user.email);
    }
  }, [ready, user, router]);

  if (!ready) return <p>Initializing...</p>;
  if (!user) return <p>Loading...</p>;

  return <>{children}</>;
}
