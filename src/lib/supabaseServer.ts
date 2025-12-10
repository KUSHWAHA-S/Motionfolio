// src/lib/supabaseServer.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type CookieWriteOption = {
  enableCookieWrite?: boolean;
};

export const getSupabaseServerClient = async (
  options: CookieWriteOption = {}
) => {
  const cookieStore = await cookies();
  const mutableStore = cookieStore as unknown as {
    set?: (name: string, value: string, options?: any) => void;
  };

  const canWriteCookies =
    options.enableCookieWrite ??
    typeof mutableStore.set === "function";

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          if (!canWriteCookies || typeof mutableStore.set !== "function") {
            return;
          }

          cookiesToSet.forEach(({ name, value, options }) => {
            mutableStore.set?.(name, value, options);
          });
        },
      },
    }
  );
};
