"use client";

import { useEffect, useState, startTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";

const DEBOUNCE_MS = 300;

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search")?.toString() ?? "";
  const [term, setTerm] = useState(initialSearch);

  useEffect(() => {
    setTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.get("search") ?? "";

      if (term === current) return;

      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }

      const query = params.toString();
      startTransition(() => {
        router.push(query ? `/?${query}` : "/");
      });
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(handle);
  }, [term, router, searchParams]);

  return (
    <div className="relative w-full max-w-[300px] md:max-w-md">
      <LucideSearch className="absolute left-3.5 top-3 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-slate-400" />
      <Input
        placeholder="Search recipes..."
        className="pl-10 md:pl-12 h-10 md:h-12 rounded-full bg-white border-slate-200 text-base md:text-sm focus:ring-2 focus:ring-orange-100 transition-all"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </div>
  );
}
