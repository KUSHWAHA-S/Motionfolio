import "../styles/globals.css";
import { ReactNode } from "react";
import ConditionalNavBar from "@/components/layout/ConditionalNavBar";
import AuthProvider from "@/components/AuthProvider";

export const metadata = { title: "Motionfolio" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@400;900&family=Saira:wght@400;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-slate-50 text-slate-900">
            <ConditionalNavBar />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
