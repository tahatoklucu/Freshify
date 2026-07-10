import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  LayoutDashboard,
  Users,
  Utensils,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[250px_1fr]">
      <aside className="hidden md:flex flex-col border-r bg-gray-50/40 p-6">
        <div className="font-bold text-xl mb-8">Freshify Admin</div>
        <nav className="flex flex-col gap-3">
          <SidebarLinks />
        </nav>
      </aside>

      <div className="flex flex-col w-full min-w-0 overflow-hidden">
        <header className="flex h-16 items-center border-b bg-white px-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] p-6">
              <div className="font-bold text-xl mb-8">Freshify Admin</div>
              <nav className="flex flex-col gap-2">
                <SheetClose asChild>
                  <SidebarItem
                    href="/admin"
                    label="Dashboard"
                    icon={<LayoutDashboard className="h-4 w-4" />}
                  />
                </SheetClose>
                <SheetClose asChild>
                  <SidebarItem
                    href="/admin/users"
                    label="User Management"
                    icon={<Users className="h-4 w-4" />}
                  />
                </SheetClose>
                <SheetClose asChild>
                  <SidebarItem
                    href="/admin/recipes"
                    label="Recipe Management"
                    icon={<Utensils className="h-4 w-4" />}
                  />
                </SheetClose>
                <SheetClose asChild>
                  <SidebarItem
                    href="/admin/reviews"
                    label="Review Management"
                    icon={<MessageSquare className="h-4 w-4" />}
                  />
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
          <span className="ml-4 font-semibold">Freshify Admin</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}

function SidebarLinks() {
  return (
    <>
      <SidebarItem
        href="/admin"
        label="Dashboard"
        icon={<LayoutDashboard className="h-4 w-4" />}
      />
      <SidebarItem
        href="/admin/users"
        label="User Management"
        icon={<Users className="h-4 w-4" />}
      />
      <SidebarItem
        href="/admin/recipes"
        label="Recipe Management"
        icon={<Utensils className="h-4 w-4" />}
      />
      <SidebarItem
        href="/admin/reviews"
        label="Review Management"
        icon={<MessageSquare className="h-4 w-4" />}
      />
    </>
  );
}

function SidebarItem({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      className="w-full justify-start gap-3 hover:bg-orange-50 hover:text-orange-600 transition-all font-medium"
    >
      <Link href={href}>
        {icon}
        {label}
      </Link>
    </Button>
  );
}
