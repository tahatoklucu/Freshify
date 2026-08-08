"use client";

import dynamic from "next/dynamic";

const AuthDialog = dynamic(() => import("@/components/shared/authDialog"), {
  ssr: false,
});

export default AuthDialog;
