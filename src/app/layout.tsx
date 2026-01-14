import "../styles/globals.css";
import { ReactNode } from "react";
import ConditionalNavBar from "@/components/layout/ConditionalNavBar";
import AuthProvider from "@/components/AuthProvider";
import PageTransition from "@/components/layout/PageTransition";

export const metadata = { title: "Motionfolio" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: "#F9FAFB", color: "#1A1A1A" }}
          >
            <ConditionalNavBar />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
