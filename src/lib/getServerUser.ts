import { getSupabaseServerClient } from "./supabaseServer";

export async function getServerUser() {
  const supabase = await getSupabaseServerClient({
    enableCookieWrite: false,
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(); // <-- secure verified call

  if (error) {
    console.error("Error fetching authenticated user:", error);
    return null;
  }

  return user ?? null;
}
