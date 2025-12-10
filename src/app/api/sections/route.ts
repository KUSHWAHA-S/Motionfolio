import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import type { SupabaseClient } from "@supabase/supabase-js";

async function withAuth() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { supabase, user: null };
  }

  return { supabase, user };
}

async function ensurePortfolioOwnership(
  supabase: SupabaseClient,
  portfolioId: string,
  userId: string
) {
  const { data } = await supabase
    .from("portfolios")
    .select("id")
    .eq("id", portfolioId)
    .eq("owner_id", userId)
    .single();

  return Boolean(data);
}

export async function POST(request: Request) {
  const { supabase, user } = await withAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { portfolio_id, type, data, animation, order_index } = body;

  if (!portfolio_id || !type) {
    return NextResponse.json(
      { error: "portfolio_id and type are required" },
      { status: 400 }
    );
  }

  const ownsPortfolio = await ensurePortfolioOwnership(
    supabase,
    portfolio_id,
    user.id
  );

  if (!ownsPortfolio) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data: inserted, error } = await supabase
    .from("sections")
    .insert([{ portfolio_id, type, data, animation, order_index }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ section: inserted }, { status: 201 });
}

export async function PUT(request: Request) {
  const { supabase, user } = await withAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, data, animation, order_index } = body;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const {
    data: section,
    error: sectionError,
  } = await supabase
    .from("sections")
    .select("portfolio_id")
    .eq("id", id)
    .single();

  if (sectionError || !section) {
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  }

  const ownsPortfolio = await ensurePortfolioOwnership(
    supabase,
    section.portfolio_id,
    user.id
  );

  if (!ownsPortfolio) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data: updated, error } = await supabase
    .from("sections")
    .update({ data, animation, order_index })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ section: updated });
}

export async function DELETE(request: Request) {
  const { supabase, user } = await withAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const {
    data: section,
    error: sectionError,
  } = await supabase
    .from("sections")
    .select("portfolio_id")
    .eq("id", id)
    .single();

  if (sectionError || !section) {
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  }

  const ownsPortfolio = await ensurePortfolioOwnership(
    supabase,
    section.portfolio_id,
    user.id
  );

  if (!ownsPortfolio) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error } = await supabase.from("sections").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}