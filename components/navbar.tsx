import Link from "next/link";
import { LucideSearch, LucideUser } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-orange-600">
              Whisk
            </span>
          </Link>
        </div>

        <div className="flex-[2] flex justify-center items-center space-x-8 group/nav">
          <div className="relative hidden sm:flex items-center rounded-full border border-slate-200/60 bg-slate-50 px-4 py-2 transition-all duration-300 md:w-80 w-48 hover:border-slate-300 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100/50 focus-within:md:w-96 focus-within:w-64 focus-within:bg-white group/search">
            <LucideSearch className="w-4 h-4 mr-2 text-slate-400 transition-colors group-focus-within/search:text-orange-500" />
            <input
              type="text"
              name="search"
              placeholder="Search recipes, ingredients..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400/90 text-slate-700 font-medium"
            />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-end space-x-4">
          <Link 
            href="/login" 
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200"
          >
            <LucideUser className="w-4 h-4 text-slate-400" />
            <span>Log In</span>
          </Link>
        </div>

      </div>
    </header>
  );
}