// import { NextResponse } from 'next/server';
// import { createAdminSupabase } from '@/lib/supabaseClient';


// export async function GET(_request: Request, { params }: { params: { id: string } }) {
// const { id } = params;
// const sb = createAdminSupabase();
// const { data, error } = await sb
// .from('portfolios')
// .select('*, sections(*)')
// .eq('id', id)
// .single();
// if (error) return NextResponse.json({ error: error.message }, { status: 500 });
// return NextResponse.json({ portfolio: data });
// }


// export async function PUT(request: Request, { params }: { params: { id: string } }) {
// const sb = createAdminSupabase();
// const { id } = params;
// const body = await request.json();
// const { title, theme } = body;
// const { data, error } = await sb
// .from('portfolios')
// .update({ title, theme, updated_at: new Date() })
// .eq('id', id)
// .select()
// .single();
// if (error) return NextResponse.json({ error: error.message }, { status: 500 });
// return NextResponse.json({ portfolio: data });
// }


// src/app/api/portfolios/[id]/route.ts
import { getSupabaseServerClient } from "@/lib/supabaseServer";

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
