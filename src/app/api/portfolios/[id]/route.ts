import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await getSupabaseServerClient();
  const { id } = await params;

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .eq("owner_id", user.id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await getSupabaseServerClient();
  const body = await req.json();
  const { id } = await params;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
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

  const updates: Record<string, any> = {
    title: body.title,
    theme: body.theme,
    sections: body.sections,
    updated_at: new Date().toISOString(),
  };

  // Persist template when provided. This assumes a `template` column exists
  // on the `portfolios` table; if not, add it via your DB migration.
  if (body.template) {
    updates.template = body.template;
  }

  const { error } = await supabase
    .from("portfolios")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { id } = await params;

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
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting portfolio" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
