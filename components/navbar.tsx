"use client";

import Link from "next/link";
import { LucideUser, LucideChefHat, LucideLogOut } from "lucide-react";
import AuthDialog from "@/components/authDialog";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-orange-600 p-1.5 rounded-lg text-white">
              <LucideChefHat className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
              Whisk
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-end">
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700">
                {session.user?.name}
              </span>
              <button 
                onClick={() => signOut()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 cursor-pointer"
              >
                <LucideLogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <AuthDialog>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all duration-200 border border-transparent hover:border-slate-200 cursor-pointer">
                <LucideUser className="w-4 h-4" />
                <span>Log In</span>
              </button>
            </AuthDialog>
          )}
        </div>
      </div>
    </header>
  );
}