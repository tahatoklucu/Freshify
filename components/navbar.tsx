"use client";

import Link from "next/link";
import { LucideChefHat, LogOut, User, Settings, BookOpen } from "lucide-react";
import AuthDialog from "@/components/authDialog";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none transition-all duration-200 hover:bg-slate-100 rounded-full px-3 py-1 -mx-3 cursor-pointer">
                <span className="text-sm font-medium text-slate-700 hidden sm:block">
                  {session.user?.name}
                </span>
                <Avatar className="h-8 w-8 border border-slate-200 ring-2 ring-transparent transition-all group-hover:ring-orange-500/20">
                  <AvatarImage src={session.user?.image || ""} />
                  <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> Profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/recipes" className="cursor-pointer">
                    <BookOpen className="mr-2 h-4 w-4" /> Tariflerim
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" /> Ayarlar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Çıkış Yap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <AuthDialog>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                <User className="w-4 h-4" />
                <span>Log In</span>
              </button>
            </AuthDialog>
          )}
        </div>
      </div>
    </header>
  );
}
