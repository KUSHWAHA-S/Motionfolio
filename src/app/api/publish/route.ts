import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabaseClient';


export async function POST(request: Request) {
const body = await request.json();
const sb = createAdminSupabase();
const { portfolio_id, slug, public } = body;
if (!portfolio_id) return NextResponse.json({ error: 'portfolio_id required' }, { status: 400 });


// set slug + public flag
const { data, error } = await sb.from('portfolios').update({ slug, public: !!public, updated_at: new Date() }).eq('id', portfolio_id).select().single();
if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ portfolio: data });
}