import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabaseClient';


export async function GET(_request: Request, { params }: { params: { id: string } }) {
const { id } = params;
const sb = createAdminSupabase();
const { data, error } = await sb
.from('portfolios')
.select('*, sections(*)')
.eq('id', id)
.single();
if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ portfolio: data });
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
const sb = createAdminSupabase();
const { id } = params;
const body = await request.json();
const { title, theme } = body;
const { data, error } = await sb
.from('portfolios')
.update({ title, theme, updated_at: new Date() })
.eq('id', id)
.select()
.single();
if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ portfolio: data });
}


export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
const { id } = params;
const sb = createAdminSupabase();
const { error } = await sb.from('portfolios').delete().eq('id', id);
if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ ok: true });
}