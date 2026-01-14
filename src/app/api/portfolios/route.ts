// src/app/api/portfolios/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { defaultTheme } from "@/lib/colors";

export async function GET() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("owner_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching portfolios" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}


export async function POST(req: Request) {
  const supabase = await getSupabaseServerClient();

  // get logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, theme, template } = await req.json();

  // Ensure a profile row exists for this user to satisfy FK constraints
  const defaultUsername = user.email?.split("@")[0] ?? "user";
  const { error: profileError } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        username: defaultUsername,
      },
      { onConflict: "id" }
    );

  if (profileError) {
    console.error("Error ensuring profile for portfolio:", profileError);
    return NextResponse.json(
      { error: "Failed to sync profile for portfolio" },
      { status: 500 }
    );
  }

  // Insert portfolio
  const { data, error } = await supabase
    .from("portfolios")
    .insert([
      {
        title: title || "Untitled Portfolio",
        theme: theme || defaultTheme,
        owner_id: user.id,
        sections: [],
        is_public: false,
        // Default template is the original modern design unless specified
        template: template || "modern-creative",
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
