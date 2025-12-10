// src/app/api/portfolios/publish/route.ts
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await getSupabaseServerClient();
  const { id, publish } = await req.json();

  if (!id || typeof publish !== "boolean") {
    return NextResponse.json(
      { error: "id and publish flag are required" },
      { status: 400 }
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    data: portfolio,
    error: portfolioError,
  } = await supabase
    .from("portfolios")
    .select("owner_id")
    .eq("id", id)
    .single();

  if (portfolioError || !portfolio || portfolio.owner_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error } = await supabase
    .from("portfolios")
    .update({ is_public: publish })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, is_public: publish });
}
