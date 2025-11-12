// src/app/api/portfolios/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("owner_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    return new Response("Error fetching portfolios", { status: 500 });
  }

  return Response.json(data);
}


export async function POST(req: Request) {
  const supabase = await getSupabaseServerClient();

  // get logged-in user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, theme } = await req.json();

  // Insert portfolio
  const { data, error } = await supabase
    .from("portfolios")
    .insert([
      {
        title: title || "Untitled Portfolio",
        theme: theme || { primary: "#0EA5E9", secondary: "#1E293B" },
        owner_id: user.id,
        sections: [],
        is_public: false,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating portfolio:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
