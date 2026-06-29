"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";

export function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        router.push(`/?${params.toString()}`);
    } 
    
    return (
        <div className="relative w-full max-w-[280px] md:max-w-md">
          <LucideSearch className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search recipes..."
            className="pl-10 h-9 md:h-10 rounded-full bg-white border-slate-200 focus:ring-2 focus:ring-orange-100 transition-all"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get("search")?.toString()}
          />
        </div>
      );
}