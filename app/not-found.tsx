import Link from "next/link";
import { LucideChefHat } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-slate-100 p-6 rounded-full mb-6">
        <LucideChefHat className="w-12 h-12 text-slate-400" />
      </div>
      <h2 className="text-3xl font-black text-slate-900">Oops! Page not found</h2>
      <p className="text-slate-500 mt-2 mb-8 max-w-sm">
        It seems the recipe you are looking for has been moved or doesn't exist in our kitchen.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-500 transition-colors shadow-sm"
      >
        Back to Kitchen
      </Link>
    </div>
  );
}