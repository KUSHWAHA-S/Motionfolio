import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import {
  createErrorResponse,
  createSuccessResponse,
  handleApiError,
} from "@/lib/apiUtils";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await getSupabaseServerClient({ enableCookieWrite: false });
    const { id } = await params;

    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .eq("is_public", true)
      .single();

    if (error || !data) {
      return createErrorResponse("Public portfolio not found", 404);
    }

    return createSuccessResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}


