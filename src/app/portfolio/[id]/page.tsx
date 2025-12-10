// src/app/portfolio/[id]/page.tsx
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

interface Portfolio {
  id: string;
  title: string;
  theme: any;
  sections: any[];
  owner_id: string;
}

export default async function PrivatePortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // SSR-safe: load private (owner) portfolio directly from Supabase
  const supabase = await getSupabaseServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  let portfolio = null;

  if (!userError && userData.user) {
    const { data: ownerPortfolio, error: portfolioError } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .eq("owner_id", userData.user.id)
      .single();
    if (!portfolioError && ownerPortfolio) {
      portfolio = ownerPortfolio;
    }
  }

  if (!portfolio) {
    // Not authorized/owner, try public view via API (keep fallback for logic)
    const headerList = await headers();
    const host = headerList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;
    const publicRes = await fetch(`${baseUrl}/api/portfolios/public/${id}`, {
      cache: "no-store",
    });
    if (!publicRes.ok) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <p className='text-slate-600 text-lg'>Portfolio not found.</p>
        </div>
      );
    }
    portfolio = await publicRes.json();
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <h1 className='text-3xl font-bold text-center mt-10'>
        {portfolio.title}
      </h1>
      <pre className='mt-6 p-4 bg-white shadow rounded-lg max-w-2xl mx-auto'>
        {JSON.stringify(portfolio, null, 2)}
      </pre>
    </div>
  );
}
