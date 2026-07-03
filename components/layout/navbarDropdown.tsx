"use client";

import Link from "next/link";
import { LogOut, User, Settings, PlusCircle } from "lucide-react";
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
  const profileHref = user?.profileToken
    ? `/profile/${user.profileToken}`
    : "/profile";

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
      <DropdownMenuContent className="w-56 p-2" align="end">
        <DropdownMenuLabel className="px-2 py-2">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-2 mb-0.5">
          <Link href={profileHref}>
            <User className="mr-2 h-4 w-4" /> Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-2 mb-0.5">
          <Link href="/recipes/new" className="text-orange-600 font-medium">
            <PlusCircle className="mr-2 h-4 w-4" /> Share Recipe
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-2">
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-red-600 focus:text-red-600 cursor-pointer py-2.5 px-2"
        >
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
