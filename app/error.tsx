"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl font-black text-slate-900">Something went wrong!</h2>
      <p className="text-slate-500 mt-2 mb-8 max-w-sm">
        Our chefs are working hard to fix the stove. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors shadow-sm"
      >
        Try Again
      </button>
    </div>
  );
}