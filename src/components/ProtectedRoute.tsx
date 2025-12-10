"use client";

import { useUserStore } from "@/store/useUserStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (!user) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/auth/login${next}`);
    }
  }, [ready, user, router, pathname]);

  if (!ready || !user) {
    return (
      <div className='flex min-h-[50vh] items-center justify-center text-slate-500'>
        Checking your session…
      </div>
    );
  }

  return <>{children}</>;
}
