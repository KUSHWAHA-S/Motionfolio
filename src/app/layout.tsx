import "../styles/globals.css";
import { ReactNode } from "react";
import NavBar from "../components/layout/NavBar"
import AuthProvider from "../components/AuthProvider";

export const metadata = { title: "Motionfolio" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-slate-50 text-slate-900">
            <NavBar />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
