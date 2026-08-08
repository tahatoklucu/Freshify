import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Providers } from "@/components/shared/providers";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Freshify | Discover & Share Fresh Recipes",
  description: "Explore practical, delicious, and easy-to-cook recipes made fresh in your home kitchen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("h-full", inter.variable)}>
      <body className={cn("font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col")}>
        <Providers>
          <Suspense
            fallback={
              <header className="sticky top-0 z-50 w-full h-16 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl" />
            }
          >
            <Navbar />
          </Suspense>
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}