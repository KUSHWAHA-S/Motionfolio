import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabaseClient';


export async function GET(_request: Request, { params }: { params: { username: string } }) {
const { username } = params;
const sb = createAdminSupabase();
const { data: profile } = await sb.from('profiles').select('id, username, avatar_url, bio').eq('username', username).single();
if (!profile) return NextResponse.json({ error: 'not found' }, { status: 404 });
const { data: portfolio } = await sb.from('portfolios').select('*, sections(*)').eq('user_id', profile.id).eq('public', true).single();
if (!portfolio) return NextResponse.json({ error: 'portfolio not found' }, { status: 404 });
return NextResponse.json({ profile, portfolio });
}