// src/app/[username]/page.tsx
import React from "react";

type Params = { params: { username: string } };

export default async function PublicProfile({ params }: Params) {
  const { username } = params;
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/public/${encodeURIComponent(username)}`, { cache: "no-store" });

  if (!res.ok) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-semibold">Portfolio not found</h2>
        <p className="text-slate-600 mt-2">This user hasn't published a portfolio yet.</p>
      </div>
    );
  }

  const json = await res.json();
  const profile = json.profile;
  const portfolio = json.portfolio;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex items-center gap-4">
        {profile.avatar_url ? <img src={profile.avatar_url} alt={profile.username} className="w-16 h-16 rounded-full" /> : <div className="w-16 h-16 rounded-full bg-slate-200" />}
        <div>
          <h1 className="text-2xl font-bold">{profile.username}</h1>
          <p className="text-slate-600">{profile.bio}</p>
        </div>
      </header>

      <main className="mt-8 space-y-6">
        {portfolio.sections?.map((s: any) => (
          <section key={s.id} className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold">{s.data?.heading}</h3>
            <p className="mt-2 text-slate-600">{s.data?.description}</p>
          </section>
        ))}
      </main>
    </div>
  );
}
