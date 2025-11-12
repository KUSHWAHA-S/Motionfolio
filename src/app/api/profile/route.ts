import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, email, username, avatar_url, bio } = body;

    if (!id || !email) {
      return NextResponse.json(
        { error: "Missing required fields (id, email)" },
        { status: 400 }
      );
    }

    const defaultUsername = email.split("@")[0];

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id,
          username: username || defaultUsername,
          avatar_url: avatar_url || "",
          bio: bio || "",
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("Error creating/updating profile:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Profile synced successfully" });
  } catch (err) {
    console.error("Error in /api/profile:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
