"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight text-orange-600">
            Whisk
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link href="/" className="transition-colors hover:text-orange-600 text-orange-600">Ana Sayfa</Link>
          <Link href="/tarifler" className="transition-colors hover:text-orange-600">Tarifler</Link>
          <Link href="/populer" className="transition-colors hover:text-orange-600">Popüler</Link>
          <Link href="/Hakkimizda" className="transition-colors hover:text-orange-600">Hakkımızda</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className={`relative hidden sm:block rounded-full border bg-slate-100 px-4 py-1.5 transition-all ${isSearchFocused ? "border-orange-500 ring-2 ring-orange-100 w-64" : "border-transparent w-48"}`}>
            <input
              type="text"
              placeholder="Tarif ara..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          <button className="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors">
            Tarif Paylaş
          </button>
        </div>

      </div>
    </header>
  );
}