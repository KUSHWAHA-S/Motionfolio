import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabaseClient';


export async function POST(request: Request) {
const sb = createAdminSupabase();
const body = await request.json();
const { portfolio_id, type, data, animation, order_index } = body;
if (!portfolio_id) return NextResponse.json({ error: 'portfolio_id required' }, { status: 400 });
const { data: inserted, error } = await sb.from('sections').insert([{ portfolio_id, type, data, animation, order_index }]).select().single();
if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ section: inserted }, { status: 201 });
}


export async function PUT(request: Request) {
const sb = createAdminSupabase();
const body = await request.json();
const { id, data, animation, order_index } = body;
if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
const { data: updated, error } = await sb.from('sections').update({ data, animation, order_index }).eq('id', id).select().single();
if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ section: updated });
}


export async function DELETE(request: Request) {
const sb = createAdminSupabase();
const body = await request.json();
const { id } = body;
if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
const { error } = await sb.from('sections').delete().eq('id', id);
if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ ok: true });
}