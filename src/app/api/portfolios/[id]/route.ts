import { NextResponse } from "next/server";
import {
  getAuthenticatedUser,
  createErrorResponse,
  createSuccessResponse,
  handleApiError,
} from "@/lib/apiUtils";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user, supabase } = await getAuthenticatedUser();
    const { id } = await params;

    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .eq("owner_id", user.id)
      .single();

    if (error || !data) {
      return createErrorResponse("Portfolio not found", 404);
    }

    return createSuccessResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user, supabase } = await getAuthenticatedUser();
    const body = await req.json();
    const { id } = await params;

    const {
      data: portfolio,
      error: portfolioError,
    } = await supabase
      .from("portfolios")
      .select("owner_id")
      .eq("id", id)
      .single();

    if (portfolioError || !portfolio || portfolio.owner_id !== user.id) {
      return createErrorResponse("Forbidden", 403);
    }

    const updates: Record<string, unknown> = {
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
      console.error("Error updating portfolio:", error);
      return createErrorResponse("Failed to update portfolio", 500);
    }

    return createSuccessResponse({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user, supabase } = await getAuthenticatedUser();
    const { id } = await params;

    const {
      data: portfolio,
      error: portfolioError,
    } = await supabase
      .from("portfolios")
      .select("owner_id")
      .eq("id", id)
      .single();

    if (portfolioError || !portfolio || portfolio.owner_id !== user.id) {
      return createErrorResponse("Forbidden", 403);
    }

    const { error } = await supabase
      .from("portfolios")
      .delete()
      .eq("id", id)
      .eq("owner_id", user.id);

    if (error) {
      console.error("Error deleting portfolio:", error);
      return createErrorResponse("Error deleting portfolio", 500);
    }

    return createSuccessResponse({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
