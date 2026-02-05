// src/app/api/portfolios/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { defaultTheme } from "@/lib/colors";
import {
  getAuthenticatedUser,
  createErrorResponse,
  createSuccessResponse,
  handleApiError,
} from "@/lib/apiUtils";
import { DEFAULT_TEMPLATE } from "@/types/constants";

export async function GET() {
  try {
    const { user, supabase } = await getAuthenticatedUser();

    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("owner_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching portfolios:", error);
      return createErrorResponse("Error fetching portfolios", 500);
    }

    return createSuccessResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}


export async function POST(req: Request) {
  try {
    const { user, supabase } = await getAuthenticatedUser();
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
      return createErrorResponse("Failed to sync profile for portfolio", 500);
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
          template: template || DEFAULT_TEMPLATE,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating portfolio:", error);
      return createErrorResponse(error.message, 500);
    }

    return createSuccessResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}
