"use client";

import Link from "next/link";
import { LogOut, User, Settings, BookOpen } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProps {
  name?: string | null;
  image?: string | null;
  profileToken?: string | null;
}

export default function NavbarDropdown({ user }: { user: UserProps }) {
  const profileHref = user?.profileToken ? `/profile/${user.profileToken}` : "/profile";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none transition-all duration-200 hover:bg-slate-100 rounded-full px-3 py-1 -mx-3 cursor-pointer">
        <span className="text-sm font-medium text-slate-700 hidden sm:block">
          {user?.name}
        </span>
        <Avatar className="h-8 w-8 border border-slate-200 ring-2 ring-transparent transition-all hover:ring-orange-500/20">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href={profileHref} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" /> Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/recipes" className="cursor-pointer">
            <BookOpen className="mr-2 h-4 w-4" /> My Recipes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="text-red-600 focus:text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}