// src/app/portfolio/[id]/page.tsx
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import PortfolioClientView from "./PortfolioClientView";

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
    // Not authorized/owner, try public view
    const { data: publicPortfolio, error: publicError } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .eq("is_public", true)
      .single();
    
    if (publicError || !publicPortfolio) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <p className='text-slate-600 text-lg'>Portfolio not found.</p>
        </div>
      );
    }
    portfolio = publicPortfolio;
  }

  // At this point we have a concrete portfolio object (either private or public)
  return <PortfolioClientView portfolio={portfolio as Portfolio} />;
}
