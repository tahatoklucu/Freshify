import Link from "next/link";
import { LucideChefHat, User } from "lucide-react";
import AuthDialog from "@/components/authDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NavbarDropdown from "./navbarDropdown";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

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
            <NavbarDropdown user={session.user} />
          ) : (
            <AuthDialog>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 cursor-pointer">
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