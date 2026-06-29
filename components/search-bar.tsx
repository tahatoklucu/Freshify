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
        <div className="relative w-full max-w-[300px] md:max-w-md">
          <LucideSearch className="absolute left-3.5 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-slate-400" />
          <Input
            placeholder="Search recipes..."
            className="pl-10 md:pl-12 h-10 md:h-12 rounded-full bg-white border-slate-200 text-base md:text-sm focus:ring-2 focus:ring-orange-100 transition-all"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get("search")?.toString()}
          />
        </div>
      );
}