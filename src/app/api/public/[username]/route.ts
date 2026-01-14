import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServiceRoleClient } from "@/lib/supabaseServiceRole";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
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
    return NextResponse.json(
      { error: "Profile not found" },
      { status: 404 }
    );
  }

  const {
    data: portfolio,
    error: portfolioError,
  } = await supabase
    .from("portfolios")
    .select("id, title, theme, sections, is_public")
    .eq("owner_id", profile.id)
    .eq("is_public", true)
    .single();

  if (portfolioError || !portfolio) {
    return NextResponse.json(
      { error: "Portfolio not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ profile, portfolio });
}