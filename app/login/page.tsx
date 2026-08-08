import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LoginClient from "./login-client";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;
  const callbackUrl = params.callbackUrl || "/";

  if (session?.user) {
    redirect(callbackUrl);
  }

  return <LoginClient callbackUrl={callbackUrl} />;
}
