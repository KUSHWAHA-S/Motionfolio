import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
auth: { persistSession: true },
});

export function createAdminSupabase() {
const serviceKey = process.env.SUPABASE_SERVICE_KEY!;
return createBrowserClient(supabaseUrl, serviceKey);
}