// src/app/[username]/page.tsx
import PortfolioClientView from "../portfolio/[id]/PortfolioClientView";

type Params = { params: { username: string } };

interface Portfolio {
  id: string;
  title: string;
  theme: any;
  sections: any[];
  template?: string;
}

export default async function PublicProfile({ params }: Params) {
  const { username } = params;
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const res = await fetch(
    `${base}/api/public/${encodeURIComponent(username)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-semibold">Portfolio not found</h2>
        <p className="text-slate-600 mt-2">
          This user hasn't published a portfolio yet.
        </p>
      </div>
    );
  }

  const json = await res.json();
  const portfolio: Portfolio = json.portfolio;

  if (!portfolio) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-semibold">Portfolio not found</h2>
        <p className="text-slate-600 mt-2">
          This user hasn't published a portfolio yet.
        </p>
      </div>
    );
  }

  return <PortfolioClientView portfolio={portfolio} />;
}
