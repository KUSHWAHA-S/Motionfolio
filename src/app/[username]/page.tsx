// src/app/[username]/page.tsx
import PortfolioClientView from "../portfolio/[id]/PortfolioClientView";
import { getSupabaseServiceRoleClient } from "@/lib/supabaseServiceRole";

type Params = { params: Promise<{ username: string }> };

interface Portfolio {
  id: string;
  title: string;
  theme: any;
  sections: any[];
  template?: string;
}

export default async function PublicProfile({ params }: Params) {
  const { username } = await params;
  const supabase = getSupabaseServiceRoleClient();

  try {
    // Get profile by username
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, bio")
      .eq("username", username)
      .single();

    if (profileError || !profile) {
      return (
        <div className="p-8">
          <h2 className="text-2xl font-semibold">Portfolio not found</h2>
          <p className="text-slate-600 mt-2">
            This user hasn't published a portfolio yet.
          </p>
        </div>
      );
    }

    // Get public portfolio for this user
    const { data: portfolio, error: portfolioError } = await supabase
      .from("portfolios")
      .select("id, title, theme, sections, is_public, template")
      .eq("owner_id", profile.id)
      .eq("is_public", true)
      .single();

    if (portfolioError || !portfolio) {
      return (
        <div className="p-8">
          <h2 className="text-2xl font-semibold">Portfolio not found</h2>
          <p className="text-slate-600 mt-2">
            This user hasn't published a portfolio yet.
          </p>
        </div>
      );
    }

    return <PortfolioClientView portfolio={portfolio as Portfolio} />;
  } catch (err) {
    console.error("Error loading public profile:", err);
    return (
      <div className="p-8">
        <h2 className="text-2xl font-semibold">Error loading portfolio</h2>
        <p className="text-slate-600 mt-2">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }
}
