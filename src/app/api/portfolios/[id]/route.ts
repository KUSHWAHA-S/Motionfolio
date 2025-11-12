import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await getSupabaseServerClient();
  const body = await req.json();

  const updates = {
    title: body.title,
    theme: body.theme,
    sections: body.sections,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("portfolios")
    .update(updates)
    .eq("id", params.id);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { id } = await params;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
console.log("Deleting portfolio:", id, "for user:", user.id);

  const { error } = await supabase
    .from("portfolios")
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) {
    console.error(error);
    return new Response("Error deleting portfolio", { status: 500 });
  }

  return new Response("Deleted successfully", { status: 200 });
}


