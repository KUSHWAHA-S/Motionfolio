// src/app/portfolio/public/[id]/page.tsx
import { headers } from "next/headers";
import PortfolioClientView from "../[id]/PortfolioClientView";

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

  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/portfolios/public/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-slate-600 text-lg">Public portfolio not found.</p>
      </div>
    );
  }

  const portfolio: Portfolio = await res.json();

  return <PortfolioClientView portfolio={portfolio} />;
}
