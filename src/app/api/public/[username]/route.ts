import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServiceRoleClient } from "@/lib/supabaseServiceRole";
import {
  createErrorResponse,
  createSuccessResponse,
  handleApiError,
} from "@/lib/apiUtils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const supabase = getSupabaseServiceRoleClient();

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, bio")
      .eq("username", username)
      .single();

    if (profileError || !profile) {
      return createErrorResponse("Profile not found", 404);
    }

    const {
      data: portfolio,
      error: portfolioError,
    } = await supabase
      .from("portfolios")
      .select("id, title, theme, sections, is_public, template")
      .eq("owner_id", profile.id)
      .eq("is_public", true)
      .single();

    if (portfolioError || !portfolio) {
      return createErrorResponse("Portfolio not found", 404);
    }

    return createSuccessResponse({ profile, portfolio });
  } catch (error) {
    return handleApiError(error);
  }
}