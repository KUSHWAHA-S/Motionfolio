"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/store/useUserStore";

export default function NavBar() {
  const { user, clearUser } = useUserStore();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    clearUser();
    router.push("/");
  };

  return (
    <nav className='w-full px-6 py-3 flex items-center justify-between bg-white shadow-sm'>
      <div className='flex items-center gap-4'>
        <Link href='/' className='font-bold text-lg'>
          Motionfolio
        </Link>
        <Link href='/dashboard' className='text-sm text-slate-600'>
          Dashboard
        </Link>
      </div>

      <div className='flex items-center gap-4'>
        {user ? (
          <>
            <Link href='/dashboard' className='text-sm text-slate-700'>
              Hi,{" "}
              {user.user_metadata?.preferred_username ??
                user.email?.split("@")[0]}
            </Link>
            <button onClick={handleSignOut} className='text-sm text-red-600'>
              Sign out
            </button>
          </>
        ) : (
          <Link href='/auth/login' className='text-sm text-slate-700'>
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
