"use client";

import { useEffect, useState } from "react";
import AuthDialog from "@/components/shared/authDialog";

interface LoginClientProps {
  callbackUrl: string;
}

export default function LoginClient({ callbackUrl }: LoginClientProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-orange-600">Freshify</h1>
        <p className="text-slate-500 text-sm">
          Sign in to continue to your destination.
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer"
        >
          Open Sign In
        </button>
      </div>

      <AuthDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        callbackUrl={callbackUrl}
      />
    </div>
  );
}
