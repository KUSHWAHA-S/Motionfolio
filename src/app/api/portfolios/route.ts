import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabaseClient';


export async function GET(request: Request) {
// expects ?user_id=uuid
const url = new URL(request.url);
const user_id = url.searchParams.get('user_id');
if (!user_id) return NextResponse.json({ error: 'user_id required' }, { status: 400 });


const sb = createAdminSupabase();
const { data, error } = await sb.from('portfolios').select('*').eq('user_id', user_id);
if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ portfolios: data });
}


export async function POST(request: Request) {
const sb = createAdminSupabase();
const body = await request.json();
const { user_id, title, theme } = body;
if (!user_id) return NextResponse.json({ error: 'user_id required' }, { status: 400 });


const { data, error } = await sb.from('portfolios').insert([{ user_id, title, theme }]).select().single();
if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ portfolio: data }, { status: 201 });
}