// src/app/portfolio/public/[id]/page.tsx
import PortfolioClientView from "../../[id]/PortfolioClientView";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

interface Portfolio {
  id: string;
  title: string;
  theme: any;
  sections: any[];
  owner_id: string;
  template?: string;
}

export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient({ enableCookieWrite: false });

  try {
    const { data: portfolio, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .eq("is_public", true)
      .single();

    if (error || !portfolio) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-slate-600 text-lg">Public portfolio not found.</p>
        </div>
      );
    }

    return <PortfolioClientView portfolio={portfolio as Portfolio} />;
  } catch (err) {
    console.error("Error loading public portfolio:", err);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-slate-600 text-lg">Error loading portfolio.</p>
      </div>
    );
  }
}
