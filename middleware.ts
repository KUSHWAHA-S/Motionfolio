import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Attach Supabase cookies so server APIs know who is logged in
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: '', ...options });
        }
      }
    }
  );

  // Refresh session if expired - this ensures cookies are updated
  await supabase.auth.getSession();

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/api/:path*", 
    "/portfolio/:path*",
  ],
};
