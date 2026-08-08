"use client";

import { useState } from "react";
import AuthDialogLazy from "@/components/shared/auth-dialog-lazy";

export default function SignInButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="block w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all cursor-pointer"
      >
        Sign In
      </button>

      <AuthDialogLazy open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}