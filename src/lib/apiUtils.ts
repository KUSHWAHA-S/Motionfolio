/**
 * Utility functions for API routes
 */

import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export interface ApiError {
  error: string;
  status: number;
}

/**
 * Get authenticated user from Supabase
 * Returns user or throws an error response
 */
export async function getAuthenticatedUser() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw {
      error: "Unauthorized",
      status: 401,
    } as ApiError;
  }

  return { user, supabase };
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  error: string,
  status: number = 500
): NextResponse {
  return NextResponse.json({ error }, { status });
}

/**
 * Create a standardized success response
 */
export function createSuccessResponse<T>(
  data: T,
  status: number = 200
): NextResponse {
  return NextResponse.json(data, { status });
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: unknown): NextResponse {
  if (error && typeof error === "object" && "status" in error) {
    const apiError = error as ApiError;
    return createErrorResponse(apiError.error, apiError.status);
  }

  console.error("Unexpected API error:", error);
  return createErrorResponse("Internal Server Error", 500);
}
